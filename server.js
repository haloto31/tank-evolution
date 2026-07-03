const crypto = require("crypto");
const fs = require("fs");
const http = require("http");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT || 8787);
const clients = new Map();
let hostId = null;

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
};

const server = http.createServer((req, res) => {
  const urlPath = req.url === "/" ? "/index.html" : decodeURIComponent(req.url.split("?")[0]);
  const filePath = path.join(root, urlPath);
  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    res.writeHead(200, { "content-type": mime[path.extname(filePath)] || "application/octet-stream" });
    res.end(data);
  });
});

server.on("upgrade", (req, socket) => {
  if (req.url !== "/ws") {
    socket.destroy();
    return;
  }
  const key = req.headers["sec-websocket-key"];
  const accept = crypto.createHash("sha1").update(`${key}258EAFA5-E914-47DA-95CA-C5AB0DC85B11`).digest("base64");
  socket.write(
    "HTTP/1.1 101 Switching Protocols\r\n" +
      "Upgrade: websocket\r\n" +
      "Connection: Upgrade\r\n" +
      `Sec-WebSocket-Accept: ${accept}\r\n\r\n`
  );
  const id = crypto.randomBytes(5).toString("hex");
  const role = hostId ? "enemy" : "host";
  if (!hostId) hostId = id;
  clients.set(id, socket);
  send(socket, { type: "role", id, role });

  socket.on("data", (chunk) => {
    for (const text of decodeFrames(chunk)) {
      let message;
      try {
        message = JSON.parse(text);
      } catch {
        continue;
      }
      if (id === hostId && message.type === "snapshot") {
        broadcast({ type: "snapshot", state: message.state }, id);
      } else if (id !== hostId && message.type === "input") {
        const host = clients.get(hostId);
        if (host) send(host, { type: "enemyInput", id, input: message.input });
      }
    }
  });

  socket.on("close", () => leave(id));
  socket.on("error", () => leave(id));
});

function leave(id) {
  if (!clients.has(id)) return;
  clients.delete(id);
  if (id === hostId) {
    hostId = clients.keys().next().value || null;
    if (hostId) send(clients.get(hostId), { type: "role", id: hostId, role: "host" });
  } else if (hostId && clients.has(hostId)) {
    send(clients.get(hostId), { type: "leave", id });
  }
}

function broadcast(message, exceptId) {
  for (const [id, socket] of clients) {
    if (id !== exceptId) send(socket, message);
  }
}

function send(socket, data) {
  const payload = Buffer.from(JSON.stringify(data));
  const header = payload.length < 126 ? Buffer.from([0x81, payload.length]) : Buffer.from([0x81, 126, payload.length >> 8, payload.length & 255]);
  socket.write(Buffer.concat([header, payload]));
}

function decodeFrames(buffer) {
  const messages = [];
  let offset = 0;
  while (offset + 2 <= buffer.length) {
    const byte1 = buffer[offset++];
    const byte2 = buffer[offset++];
    const opcode = byte1 & 0x0f;
    let length = byte2 & 0x7f;
    if (length === 126) {
      if (offset + 2 > buffer.length) break;
      length = buffer.readUInt16BE(offset);
      offset += 2;
    } else if (length === 127) {
      break;
    }
    const masked = (byte2 & 0x80) !== 0;
    const mask = masked ? buffer.subarray(offset, offset + 4) : null;
    if (masked) offset += 4;
    if (offset + length > buffer.length) break;
    const payload = Buffer.from(buffer.subarray(offset, offset + length));
    offset += length;
    if (opcode === 8) break;
    if (masked) {
      for (let i = 0; i < payload.length; i += 1) payload[i] ^= mask[i % 4];
    }
    messages.push(payload.toString("utf8"));
  }
  return messages;
}

server.listen(port, "0.0.0.0", () => {
  console.log(`Tank Evolution multiplayer: http://localhost:${port}`);
});
