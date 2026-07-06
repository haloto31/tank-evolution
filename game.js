const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const screens = {
  start: document.getElementById("start-screen"),
  level: document.getElementById("level-screen"),
  pause: document.getElementById("pause-screen"),
  gameOver: document.getElementById("game-over-screen"),
};

const tankGrid = document.getElementById("tank-grid");
const modeButtons = document.querySelectorAll(".mode-card");
const upgradeGrid = document.getElementById("upgrade-grid");
const pendingUpgradePanel = document.getElementById("pending-upgrade-panel");
const pendingUpgradeList = document.getElementById("pending-upgrade-list");
const pendingUpgradeCount = document.getElementById("pending-upgrade-count");
const startLeaderboard = document.getElementById("start-leaderboard");
const gameOverLeaderboard = document.getElementById("game-over-leaderboard");
const waveSkipInput = document.getElementById("wave-skip-input");
const waveSkipPassword = document.getElementById("wave-skip-password");
const waveSkipStatus = document.getElementById("wave-skip-status");
const finalStats = document.getElementById("final-stats");
const resumeButton = document.getElementById("resume-button");
const endGameButton = document.getElementById("end-game-button");
const restartButton = document.getElementById("restart-button");
const moveStick = document.getElementById("move-stick");
const moveStickKnob = moveStick?.querySelector("span");
const fireTouch = document.getElementById("fire-touch");

const TAU = Math.PI * 2;
const ENEMY_CAP = 10;
const ENEMY_HP_MULTIPLIER = 1.5;
const SPECIAL_ENEMY_HP_SCALE = 0.5;
const INFANTRY_ARMY_CAP = 95;
const ALLY_SPAWN_CHANCE = 0.01;
const ALLY_POWER_MULTIPLIER = 0.1;
const PLAYER_WEAPON_PIERCE = 5;
const GAMMA_BLUE = "#4db8ff";
const GAMMA_BLUE_SOFT = "#9ddcff";
const GAMMA_BLUE_WHITE = "#e6f7ff";
const GAMMA_DAMAGE = 3.6;
const SHOTGUN_DAMAGE = 1.55;
const GAMMA_FIRE_RATE_MULTIPLIER = 3;
const GAMMA_RANGE_MULTIPLIER = 1.6;
const GAMMA_SHORT_LIFE = 0.62;
const GAMMA_MAX_PELLETS = 12;
const GAMMA_LIGHTNING_MULTIPLIER = 1.5;
const GAMMA_LIGHTNING_RADIUS = 175;
const GAMMA_LIGHTNING_CHAIN_COUNT = 3;
const GAMMA_LIGHTNING_CHAIN_FALLOFF = 0.68;
const GAMMA_LIGHTNING_STUN_SECONDS = 0.3;
const GAMMA_STORM_COOLDOWN = 15;
const GAMMA_STORM_DAMAGE = 55;
const GAMMA_STORM_STRIKES = 20;
const GAMMA_STORM_INTERVAL = 0.12;
const TAZER_STUN_COOLDOWN = 20;
const TAZER_SCREEN_STUN_SECONDS = 10;
const TAZER_CHAIN_DAMAGE = 18;
const TAZER_CHAIN_RANGE = 360;
const TAZER_CHAIN_JUMPS = 5;
const TAZER_CHAIN_JUMP_RANGE = 230;
const TAZER_BEAM_COOLDOWN = 24;
const TAZER_BEAM_DAMAGE = 145;
const TAZER_BEAM_DURATION = 2;
const TAZER_END_STORM_STRIKES = 100;
const TAZER_END_STORM_INTERVAL = 0.055;
const TAZER_END_STORM_DAMAGE = 30;
const TAZER_END_STORM_RADIUS = 115;
const TAZER_END_STORM_STUN = 3;
const TAZER_MINI_COOLDOWN = 50;
const TAZER_MINI_COUNT = 3;
const TAZER_MINI_DAMAGE = 20;
const TAZER_CANNON_COOLDOWN = 65;
const TAZER_CANNON_COUNT = 6;
const TAZER_CANNON_DURATION = 3;
const TAZER_CANNON_DAMAGE_MULTIPLIER = 50;
const TAZER_CANNON_RADIUS = 96;
const TAZER_CANNON_WAVE_DURATION = 0.9;
const TAZER_CANNON_WAVE_RADIUS = 520;
const TAZER_CANNON_WAVE_WIDTH = 56;
const TAZER_CANNON_WAVE_DAMAGE = 100;
const TAZER_CANNON_WAVE_LAYERS = 7;
const TAZER_CANNON_WAVE_STRIKES = 8;
const TAZER_FOCUS_STRIKES = 200;
const TAZER_FOCUS_DAMAGE = 400;
const TAZER_FOCUS_INTERVAL = 0.012;
const TAZER_FOCUS_MAX_HP_MULTIPLIER = 0.05;
const TAZER_FOCUS_COOLDOWN = 70;
const THUNDER_GOD_BUFF_COOLDOWN = 30;
const THUNDER_GOD_BUFF_DURATION = 10;
const THUNDER_GOD_STAT_MULT = 1.9;
const THUNDER_GOD_SPEED_MULT = 1.3;
const THUNDER_GOD_FOCUS_COOLDOWN = 55;
const THUNDER_GOD_FOCUS_STRIKES = 100;
const THUNDER_GOD_FOCUS_INTERVAL = 0.055;
const THUNDER_GOD_FOCUS_DAMAGE_MULT = 0.5;
const THUNDER_GOD_REVIVE_MAX = 3;
const THUNDER_GOD_REVIVE_WINDOW = 30;
const THUNDER_GOD_REVIVE_STAT_MULT = 1.5;
const TAZER_GUARD_COOLDOWN = 45;
const TAZER_GUARD_DURATION = 10;
const TAZER_GUARD_DAMAGE_MULTIPLIER = 0.05;
const TAZER_GUARD_MAX_HP_MULTIPLIER = 0.5;
const TAZER_GUARD_TEMP_HP_MULTIPLIER = 2;
const TAZER_GUARD_REGEN_PER_SECOND = 40;
const TAZER_ENERGY_DRAIN = 0.34;
const TAZER_ENERGY_REGEN = 0.26;
const RAILGUN_DPS = 95;
const PLAYER_RAILGUN_DAMAGE_MULTIPLIER = 1 / 1.5;
const RAILGUN_GIANT_E_WIDTH = 10;
const RAILGUN_GIANT_COOLDOWN = 10;
const AIRSTRIKE_COOLDOWN = 5;
const TROOPER_HELI_COOLDOWN = 10;
const DRAGON_HORDE_COOLDOWN = 10;
const ADULT_DRAGON_COOLDOWN = 10;
const BLACK_DRAGON_COOLDOWN = 18;
const BABY_DRAGON_COUNT = 5;
const RAILGUN_ENERGY_DRAIN = 0.46;
const RAILGUN_ENERGY_REGEN = 0.32;
const RAILGUN_CHAIN_RANGE = 185;
const RAILGUN_CHAIN_COUNT = 3;
const FLAME_DPS = 10;
const FLAME_BULLET_BURN_SECONDS = 3;
const RAILGUN_BULLET_BURN_SECONDS = 1;
const REGEN_PERCENT_PER_SECOND = 0.05;
const LOW_REGEN_PERCENT_PER_SECOND = 0.02;
const TAZER_REGEN_PERCENT_PER_SECOND = 0.005;
const HIT_KNOCKBACK_SPEED = 135;
const DEFAULT_BULLET_DAMAGE = 7.5;
const BOSS_LEVEL_INTERVAL = 10;
const BOSS_WEAKNESS_MULTIPLIER = 0.5;
const LEVEL_TEN_BOSS_HP_MULTIPLIER = 100;
const LEVEL_TEN_BOSS_DAMAGE_MULTIPLIER = 50;
const FINAL_BOSS_LEVEL = 20;
const VICTORY_BOSS_LEVEL = 21;
const FINAL_BOSS_DAMAGE_MULTIPLIER = 1 / 3;
const FINAL_BOSS_RELOAD = 5;
const WAVE_SKIP_PASSWORD = "01028224915";
const LEADERBOARD_KEY = "tankEvolutionHighestLevels";
const LEADERBOARD_LIMIT = 5;
const FIRE_SHIELD_DAMAGE_TAKEN_MULT = 0.4;
const FIRE_SHIELD_DURATION = 30;
const FIRE_SHIELD_COOLDOWN = 45;
const JUGGERNAUT_DOMAIN_COOLDOWN = 50;
const JUGGERNAUT_DOMAIN_DURATION = 10;
const JUGGERNAUT_DOMAIN_RADIUS = 520;
const JUGGERNAUT_DOMAIN_PLAYER_BUFF = 1.5;
const JUGGERNAUT_DOMAIN_ENEMY_MULT = 0.7;
const JUGGERNAUT_JUDGMENT_COOLDOWN = 20;
const JUGGERNAUT_JUDGMENT_DURATION = 6;
const JUGGERNAUT_JUDGMENT_SLOW = 0.01;
const JUGGERNAUT_JUDGMENT_DAMAGE_MULT = 1.3;
const JUGGERNAUT_RESOLVE_COOLDOWN = 40;
const JUGGERNAUT_RESOLVE_DURATION = 10;
const JUGGERNAUT_RESOLVE_HP_MULT = 1.4;
const JUGGERNAUT_RESOLVE_DAMAGE_BUFF = 1.2;
const JUGGERNAUT_RESOLVE_DAMAGE_TAKEN_MULT = 0.5;
const JUGGERNAUT_RESOLVE_ENEMY_HP_MULT = 0.7;
const JUGGERNAUT_RESOLVE_ENEMY_DAMAGE_MULT = 0.7;
const MAX_EVOLUTION_STAGE = 30;
const MAX_SPARKS = 24;
const MAX_LIGHTNING = 24;
const MAX_PLAYER_BULLETS = 90;
const MAX_ENEMY_BULLETS = 95;
const MAX_FLAMES = 14;
const MAX_BABY_DRAGONS = 5;
const MAX_ADULT_DRAGONS = 1;
const keys = new Set();
const mouse = { x: 0, y: 0, down: false };
const touchMove = { dx: 0, dy: 0, id: null };
const touchFire = { active: false };
let lastTime = performance.now();
let spawnCarry = 0;
let gameState = "start";
let upgradeChoices = [];
let pendingUpgradeTokens = 0;
let nextEnemyId = 1;
const bossSpawnedLevels = new Set();
let runLeaderboardRecorded = false;
let selectedGameMode = "evolution";
let activeGameMode = "evolution";
let infantryArmySpawned = 0;
let hudHidden = false;
const entityCounts = {
  hostiles: 0,
  infantry: 0,
  armyThreats: 0,
  allies: 0,
};

const world = {
  w: 2600,
  h: 1800,
};

const warMap = {
  name: "Open Front",
  theme: "#182019",
  trenches: [],
  craters: [],
  barriers: [],
};

const camera = {
  x: 0,
  y: 0,
  scale: 1,
  shake: 0,
};

const player = {
  x: world.w / 2,
  y: world.h / 2,
  r: 23,
  hp: 100,
  maxHp: 100,
  speed: 190,
  angle: 0,
  level: 1,
  xp: 0,
  xpNext: 100,
  kills: 0,
  tankKey: "default",
  tankStage: 1,
  lockedTank: false,
  perks: {},
  maxHpPenaltyMult: 1,
  buildName: "Default Tank",
  cooldown: 0,
  trooperHeliCooldown: 0,
  dragonCooldown: 0,
  adultDragonCooldown: 0,
  blackDragonCooldown: 0,
  gammaStormCooldown: 0,
  thunderBuffCooldown: 0,
  thunderBuffActive: 0,
  thunderFocusCooldown: 0,
  thunderRevivesUsed: 0,
  thunderReviveReady: false,
  thunderReviveTrial: 0,
  thunderReviveTargetLevel: 0,
  fireShieldCooldown: 0,
  fireShieldActive: 0,
  juggernautDomainCooldown: 0,
  juggernautDomain: null,
  juggernautJudgmentCooldown: 0,
  juggernautJudgmentArmed: false,
  juggernautResolveCooldown: 0,
  juggernautResolveActive: 0,
  juggernautResolveHpBonus: 0,
  tazerCooldown: 0,
  tazerBeamCooldown: 0,
  tazerBeamActive: 0,
  tazerMiniCooldown: 0,
  tazerCannonCooldown: 0,
  tazerGuardCooldown: 0,
  tazerGuardActive: 0,
  tazerGuardHpBonus: 0,
  tazerFocusCooldown: 0,
  tazerEnergy: 1,
  railEnergy: 1,
  railGiantCooldown: 0,
  railGiantArmed: false,
  railGiantActive: false,
  invuln: 0,
  color: "#d5d9c8",
  accent: "#f2ca52",
  mods: {
    fireRate: 1,
    bulletSpeed: 1,
    bulletCount: 1,
    bulletSpread: 0,
    shellDamage: 1,
    shellSize: 1,
    fireworkFragments: 0,
    nukeExplosion: false,
    fireShieldAbility: false,
    omniFire: false,
    range: 1,
    flameWidth: 1,
    burnTime: 1,
    gammaArcs: 1,
    gammaReach: 1,
    gammaLightningDamage: 1,
    gammaLightningChain: 0,
    gammaLightningRadius: 1,
    gammaLightningBurst: 1,
    gammaLightningStun: 1,
    beamWidth: 1,
    beamCount: 1,
    pelletCount: 1,
  },
};

const bullets = [];
const enemyBullets = [];
const flames = [];
const enemies = [];
const sparks = [];
const lightning = [];
const nukes = [];
const gammaStorms = [];
const tazerEndStorms = [];
const tazerCannonTraps = [];
const tazerCannonWaves = [];
const tazerFocusStorms = [];
const thunderFocusStorms = [];

const multiplayer = {
  enabled: location.protocol === "http:" || location.protocol === "https:",
  socket: null,
  id: null,
  role: "offline",
  remoteInputs: new Map(),
  remoteSnapshot: null,
  sendTimer: 0,
  stateTimer: 0,
};

const starters = [
  {
    key: "default",
    name: "Default Tank",
    color: "#d5d9c8",
    accent: "#f2ca52",
    description: "A steady starter with slow, normal shells. It rewards careful aim and kiting.",
    stats: ["7.5 damage shells", "Pierces 5 enemies", "Balanced body"],
  },
  {
    key: "flame",
    name: "Flamethrower Tank",
    color: "#e65735",
    accent: "#ffb545",
    description: "Holds out a constant flame cone that burns enemies and leaves afterburn behind.",
    stats: ["Burns bullets", "Pierces 5 enemies", "Afterburn trail"],
  },
  {
    key: "gamma",
    name: "Gamma Tank",
    color: "#5aa9ff",
    accent: "#c7ecff",
    description: "Fires a Wi-Fi-shaped gamma spray that curves back like a boomerang.",
    stats: ["3x faster fire", "Returning shots", "Pierces 5 enemies"],
  },
  {
    key: "enemyMimic",
    familyKey: "default",
    variant: "defaultBase",
    name: "Enemy Tank",
    color: "#8b4141",
    accent: "#ece6cc",
    description: "A playable red enemy-style tank that levels up like you.",
    stats: ["Enemy skin", "Default cannon", "Levels normally"],
  },
  {
    key: "railgun",
    variant: "railgunBase",
    name: "Railgun Tank",
    color: "#dfe6ef",
    accent: "#88f7ff",
    description: "A fragile sniper tank that holds a high-damage piercing beam with chain lightning jumps.",
    stats: ["Hold beam", "Chain lightning", "Low HP"],
    perks: { maxHpMult: 0.6 },
  },
  {
    key: "tazer",
    variant: "tazerBase",
    name: "Tazer Tank",
    color: "#17283d",
    accent: "#ffe66d",
    description: "Shoots front-facing chain lightning. Press E to stun every visible enemy for 10 seconds.",
    stats: ["Front lightning", "Chain zap", "E screen stun"],
    perks: { maxHpMult: 2 },
  },
  {
    key: "shotgun",
    variant: "shotgunBase",
    name: "Shotgun Tank",
    color: "#d8d2bd",
    accent: "#ff9f5a",
    description: "A close-range spray tank with more pellets, higher damage, and fast reloads.",
    stats: ["Big pellet spray", "High damage", "Fast reload"],
  },
  {
    key: "airstrike",
    variant: "airstrikeBase",
    name: "Airstrike Tank",
    color: "#c8d7e0",
    accent: "#ffcf5f",
    description: "Clicks anywhere on screen to call down a Juggernaut-style Ultra nuke shell.",
    stats: ["Click target", "5 sec cooldown", "Built-in regen"],
    perks: { regenMult: 2 },
  },
  {
    key: "helicopter",
    variant: "helicopterBase",
    name: "Helicopter",
    color: "#9fb7c4",
    accent: "#f2ca52",
    description: "An air troop with a front minigun. Ground tank weapons pass underneath it.",
    stats: ["Flying", "Front minigun", "Needs anti-air to hit"],
  },
  {
    key: "infantry",
    variant: "infantryBase",
    name: "Puncher Infantry",
    color: "#7b735e",
    accent: "#f2ca52",
    description: "A heavy melee infantry brawler with level-10 Juggernaut HP and hard punches.",
    stats: ["Level 10 Juggernaut HP", "10 damage punches", "Own family"],
    perks: { maxHpMult: 8.3, speedBonus: 14 },
  },
  {
    key: "trooper",
    variant: "trooperBase",
    modeOnly: "infantryArmy",
    name: "Trooper Tank",
    color: "#66726a",
    accent: "#a7c7ff",
    description: "Army-mode support tank with moving shielders and a helicopter call-in, but no regen.",
    stats: ["5 moving shielders", "E sends heli", "No regen"],
  },
  {
    key: "dragonTamer",
    name: "Dragon Tamer",
    color: "#384d43",
    accent: "#ff8d45",
    description: "A sword fighter who calls baby, grown, and black dragons that leave afterburn.",
    stats: ["Sword slash", "E/Q/R dragons", "Burning bites"],
    perks: { speedBonus: 12 },
  },
];

const upgradePools = {
  default: [
    ["Twin Cannon Tank", "A broad double-barrel cannon tank built for clearing lanes.", { variant: "defaultTwin", color: "#d9ddcb", accent: "#f5d15f" }],
    ["Rail Loader Tank", "A compact cannon tank that wins by throwing shells nonstop.", { variant: "defaultLoader", color: "#cfd8d9", accent: "#8ed2ff" }],
    ["Longshot Tank", "A lean cannon tank with faster shells and longer reach.", { variant: "defaultLongshot", color: "#d6d0bf", accent: "#ffdf8a" }],
    ["Tri-Cannon Tank", "A three-barrel cannon tank that keeps a tight center lane.", { variant: "defaultTri", color: "#d7ded7", accent: "#d9f26c" }],
    ["Fanfire Tank", "A wide fan-shot tank for sweeping crowds off your sides.", { variant: "defaultFan", color: "#ccd7dc", accent: "#7fc7ff" }],
    ["Siege Cannon Tank", "A heavy cannon tank with slow, chunky shells that hit harder.", { variant: "defaultSiege", color: "#bbb7a8", accent: "#ff8d5a" }],
    ["Needle Ranger Tank", "A long-range needle cannon tank with fast, narrow shots.", { variant: "defaultNeedle", color: "#d8dde3", accent: "#b7f7ff" }],
    ["Auto Sponson Tank", "A rapid side-cannon tank that floods the lane with smaller shells.", { variant: "defaultAuto", color: "#cbd6c9", accent: "#a8f28b" }],
    ["Firework Tank", "A cannon tank that fires one shell which bursts into pellets on impact.", { variant: "defaultFirework", color: "#d8d6ee", accent: "#ffcf5f" }],
    ["Quad Battery Tank", "A staged four-cannon tank with steady forward pressure.", { variant: "defaultQuad", color: "#d8ded0", accent: "#f3ff80" }],
    ["Scatterline Tank", "A staged scatter cannon that blankets close enemies.", { variant: "defaultScatter", color: "#cbd5dd", accent: "#8cc8ff" }],
    ["Breaker Cannon Tank", "A staged destroyer-style cannon with huge shells.", { variant: "defaultBreaker", color: "#bdb5a8", accent: "#ff6f56" }],
    ["Cyclone Battery Tank", "A final-stage rapid battery that fills the screen with fire.", { variant: "defaultCyclone", color: "#d3ddd2", accent: "#8dff98" }],
    ["Bulwark Cannon Tank", "A final-stage heavy cannon tank with brutal impact shots.", { variant: "defaultBulwark", color: "#aca99d", accent: "#ffd36d" }],
  ],
  flame: [
    ["Blue Flame Tank", "A wide blue-flame tank that washes over packed enemies.", { variant: "flameWide", color: "#3566e6", accent: "#7ff0ff" }],
    ["Cinder Trail Tank", "A burn-focused tank that leaves nastier afterburn behind.", { variant: "flameCinder", color: "#7f3d30", accent: "#ff7b38" }],
    ["Torch Engine Tank", "A faster flame tank that gets closer and keeps moving.", { variant: "flameTorch", color: "#d94a24", accent: "#ffd15c" }],
    ["Flame Lancer Tank", "A staged narrow flame lance with extra reach.", { variant: "flameLancer", color: "#e84b2f", accent: "#ffe28a" }],
    ["Halo Burner Tank", "A staged burner with a wide defensive flame wash.", { variant: "flameHalo", color: "#2f78d8", accent: "#9ff7ff" }],
    ["Meteor Torch Tank", "A high-stage torch tank with longer afterburn and speed.", { variant: "flameMeteor", color: "#922f2f", accent: "#ff9f45" }],
    ["Inferno Core Tank", "A final-stage flame tank that floods a wide cone.", { variant: "flameInferno", color: "#441f32", accent: "#ff4d2e" }],
  ],
  gamma: [
    ["Tri-Gamma Tank", "A denser Wi-Fi spray tank with more returning arcs.", { variant: "gammaTri", color: "#4db8ff", accent: "#c7ecff" }],
    ["Wideband Tank", "A wide signal tank that sends boomerangs across more space.", { variant: "gammaWide", color: "#5aa9ff", accent: "#9ddcff" }],
    ["Thunder Snap Tank", "A snappy gamma tank that calls heavier lightning strikes when shots finish.", { variant: "gammaSnap", color: "#6ec8ff", accent: "#e6f7ff" }],
    ["Forked Signal Tank", "A staged gamma tank that splits into sharper returning lanes.", { variant: "gammaFork", color: "#3fa4ff", accent: "#e6f7ff" }],
    ["Orbit Signal Tank", "A staged gamma tank with longer, looping return control.", { variant: "gammaOrbit", color: "#5bd5c8", accent: "#a1ffea" }],
    ["Lightning Storm Tank", "A high-stage gamma tank with dense spray and stronger chain strikes.", { variant: "gammaStorm", color: "#2d8fff", accent: "#b8e8ff" }],
    ["Thunder Nova Tank", "A final-stage gamma tank built around huge chained lightning impacts.", { variant: "gammaNova", color: "#8fd2ff", accent: "#e6f7ff" }],
  ],
  railgun: [
    ["Rail Lance Tank", "A cleaner rail beam tank with longer reach and sharper aim.", { variant: "railgunLance", color: "#dfe6ef", accent: "#88f7ff" }],
    ["Volt Rail Tank", "A faster rail frame that gives up armor for quicker beam shots.", { variant: "railgunVolt", color: "#d9eff0", accent: "#a8ffde" }],
    ["Siege Rail Tank", "A heavy rail tank with a thicker beam and brutal impact damage.", { variant: "railgunSiege", color: "#c9d0d8", accent: "#ffe28a" }],
    ["Twin Rail Tank", "A dual-cannon railgun that holds two piercing beams at once.", { variant: "railgunTwin", color: "#dcecf2", accent: "#8dffff" }],
  ],
  shotgun: [
    ["Buckshot Tank", "A wider shotgun tank with a heavier close-range pellet blast.", { variant: "shotgunBuck", color: "#d8d2bd", accent: "#ff9f5a" }],
    ["Burst Shotgun Tank", "A faster shotgun frame that throws more pellets more often.", { variant: "shotgunBurst", color: "#d8c7b8", accent: "#ffd36d" }],
    ["Slugstorm Tank", "A chunky shotgun tank with fewer but harder-hitting pellets.", { variant: "shotgunSlug", color: "#bfae9e", accent: "#ff765b" }],
  ],
  tazer: [
    ["Coil Tazer Tank", "A longer-reach Tazer frame with a wider front lightning bite.", { variant: "tazerCoil", color: "#1d3554", accent: "#ffe66d" }],
    ["Arc Tazer Tank", "A harder-hitting Tazer frame that jumps through targets more cleanly.", { variant: "tazerArc", color: "#203f5f", accent: "#eaffff" }],
    ["Storm Tazer Tank", "A control-focused Tazer frame with heavier electric reach and stun pressure.", { variant: "tazerStorm", color: "#112f46", accent: "#fff39a" }],
  ],
};

const familyUpgradeLines = {
  triCannon: [
    ["Triple Bore Tank", "A tighter three-barrel cannon with cleaner lanes and better shell rhythm.", { variant: "triCannon2", color: "#d7ded7", accent: "#d9f26c" }],
    ["Tri-Barrel Array Tank", "A reinforced tri-cannon that keeps the same lane style with denser pressure.", { variant: "triCannon3", color: "#dfe8d8", accent: "#cfff66" }],
    ["Prism Tri-Cannon Tank", "A sharp tri-cannon stage with faster shells and heavier center fire.", { variant: "triCannon4", color: "#c8ded3", accent: "#b8ff7a" }],
    ["Apex Tri-Cannon Tank", "A final tri-cannon form that stays locked to triple-lane pressure.", { variant: "triCannon5", color: "#e2efd9", accent: "#f2ff72" }],
  ],
  fanfire: [
    ["Wide Fanfire Tank", "A wider fan-shot tank that keeps sweeping enemies across the front arc.", { variant: "fanfire2", color: "#ccd7dc", accent: "#7fc7ff" }],
    ["Starfan Tank", "A denser fan pattern with more small shells for close crowd control.", { variant: "fanfire3", color: "#c4dbe5", accent: "#8de8ff" }],
    ["Hurricane Fan Tank", "A high-stage fan tank that blankets a wide area with quick pellets.", { variant: "fanfire4", color: "#b9d0de", accent: "#70ffcf" }],
    ["Apex Fanfire Tank", "A final fanfire form with huge spread coverage and fast reloads.", { variant: "fanfire5", color: "#d4e9ee", accent: "#a5f7ff" }],
  ],
  siege: [
    ["Bastion Siege Tank", "A heavier siege cannon with slow shots that hit much harder.", { variant: "siege2", color: "#bbb7a8", accent: "#ff8d5a" }],
    ["Earthshaker Tank", "A brutal siege stage with larger shells and stronger impact bursts.", { variant: "siege3", color: "#aaa696", accent: "#ffb35f" }],
    ["Fortress Breaker Tank", "A high-stage siege tank that punches through enemies with giant shells.", { variant: "siege4", color: "#9c9687", accent: "#ff765b" }],
    ["Dreadnought Siege Tank", "A final siege form with massive shells and slow unstoppable pressure.", { variant: "siege5", color: "#8f8b7f", accent: "#ffd36d" }],
  ],
  needle: [
    ["Needle Marksman Tank", "A faster precision cannon that keeps the long-range needle style.", { variant: "needle2", color: "#d8dde3", accent: "#b7f7ff" }],
    ["Lance Needle Tank", "A longer needle cannon with sharper shells and more range.", { variant: "needle3", color: "#dce8ee", accent: "#8fefff" }],
    ["Rail Needle Tank", "A high-stage needle tank with blazing shell speed and long reach.", { variant: "needle4", color: "#c8d8e5", accent: "#d4fbff" }],
    ["Apex Needle Tank", "A final precision form that stays fast, narrow, and punishing.", { variant: "needle5", color: "#e7eff3", accent: "#9dffff" }],
  ],
  auto: [
    ["Auto Sponson Tank", "A better rapid-fire side-pressure tank with small fast shells.", { variant: "auto2", color: "#cbd6c9", accent: "#a8f28b" }],
    ["Minigun Sponson Tank", "A denser auto-cannon stage that keeps the rapid-fire identity.", { variant: "auto3", color: "#c2d8c5", accent: "#95ff79" }],
    ["Cyclone Auto Tank", "A high-stage auto tank that fills lanes with quick small shells.", { variant: "auto4", color: "#b9d7c1", accent: "#84ff9f" }],
    ["Apex Auto Tank", "A final auto form with relentless fire and strong movement.", { variant: "auto5", color: "#d3ddd2", accent: "#8dff98" }],
  ],
  firework: [
    ["Firework Mortar Tank", "A stronger single-shell firework tank whose main shot bursts on death.", { variant: "firework2", color: "#d8d6ee", accent: "#ffcf5f" }],
    ["Festival Mortar Tank", "A staged firework tank with a bigger shell and brighter burst.", { variant: "firework3", color: "#d6cceb", accent: "#ffd96d" }],
    ["Nova Firework Tank", "A high-stage firework cannon with heavy impact damage and more fragments.", { variant: "firework4", color: "#cec6ef", accent: "#ff8fd8" }],
    ["Supernova Firework Tank", "A final firework form built around one huge exploding shell.", { variant: "firework5", color: "#e5daf4", accent: "#ffcf5f" }],
  ],
  incendiary: [
    ["Cinder Bomber Tank", "A stronger incendiary bomber with hotter afterburn and a heavier shell.", { variant: "incendiary2", color: "#654237", accent: "#ff7b38" }],
    ["Napalm Mortar Tank", "A staged incendiary bomber that coats crowds in longer-lasting fire.", { variant: "incendiary3", color: "#5a382f", accent: "#ff9f45" }],
    ["Fire Shield Bomber Tank", "A shielded incendiary bomber with 150% damage reduction and nuclear molotov attacks.", { variant: "incendiaryFireShield", color: "#4d2422", accent: "#ffef88" }],
    ["Wildfire Howitzer Tank", "A high-stage bomber with larger burning bursts and stronger fire pellets.", { variant: "incendiary4", color: "#4e332e", accent: "#ffcf5f" }],
    ["Apex Incendiary Bomber Tank", "A final incendiary form built around brutal burning explosions.", { variant: "incendiary5", color: "#3d2a28", accent: "#ff4d2e" }],
  ],
  railgun: [
    ["Rail Lance Tank", "A sharper railgun stage with more reach and beam damage.", { variant: "railgun2", color: "#dfe6ef", accent: "#88f7ff" }],
    ["Volt Rail Tank", "A faster railgun stage that reloads sooner but stays fragile.", { variant: "railgun3", color: "#d9eff0", accent: "#a8ffde" }],
    ["Siege Rail Tank", "A heavy railgun stage with a wider high-impact beam.", { variant: "railgun4", color: "#c9d0d8", accent: "#ffe28a" }],
    ["Apex Railgun Tank", "A final railgun form built around all-piercing beam shots.", { variant: "railgun5", color: "#edf5ff", accent: "#8dffff" }],
    ["Twin Rail Tank", "A railgun stage that adds a second beam cannon.", { variant: "railgunTwin", color: "#dcecf2", accent: "#8dffff" }],
    ["Tri Rail Tank", "A railgun stage that holds three beam cannons at once.", { variant: "railgunTri", color: "#d7eef5", accent: "#b8ffff" }],
    ["Quad Rail Tank", "A railgun stage that holds four beam cannons at once.", { variant: "railgunQuad", color: "#d2eaf4", accent: "#ffe28a" }],
    ["Penta Rail Tank", "A railgun stage that holds five beam cannons at once.", { variant: "railgunMulti5", color: "#dbefff", accent: "#8dffff" }],
  ],
  shotgun: [
    ["Buckshot Tank", "A stronger shotgun stage with a wider pellet wall.", { variant: "shotgun2", color: "#d8d2bd", accent: "#ff9f5a" }],
    ["Street Sweeper Tank", "A staged shotgun tank with very fast close-range reloads.", { variant: "shotgun3", color: "#d8c7b8", accent: "#ffd36d" }],
    ["Slugstorm Tank", "A heavy shotgun tank with dense high-damage pellets.", { variant: "shotgun4", color: "#bfae9e", accent: "#ff765b" }],
    ["Apex Shotgun Tank", "A final close-range pellet storm form.", { variant: "shotgun5", color: "#e8d0bd", accent: "#ffb45f" }],
  ],
  tazer: [
    ["Coil Tazer Tank", "A stronger Tazer stage with longer frontal chain range.", { variant: "tazer2", color: "#1d3554", accent: "#ffe66d" }],
    ["Arc Tazer Tank", "A staged Tazer tank with heavier chain lightning damage.", { variant: "tazer3", color: "#203f5f", accent: "#eaffff" }],
    ["Storm Tazer Tank", "A high-stage Tazer tank with wider electric control.", { variant: "tazer4", color: "#112f46", accent: "#fff39a" }],
    ["Apex Tazer Tank", "A final electric tank built around long, violent chain zaps.", { variant: "tazer5", color: "#1b263b", accent: "#ffe66d" }],
  ],
  thunderGod: [
    ["Storm Avatar", "A stronger Thunder God stage with faster targeted sky strikes.", { variant: "thunderGod2", color: "#17395f", accent: "#fff06d" }],
    ["Skybreaker", "A staged Thunder God form with wider chained lightning blasts.", { variant: "thunderGod3", color: "#12315a", accent: "#8df5ff" }],
    ["Judgment Thunder God", "A high-stage Thunder God with stronger divine storm pressure.", { variant: "thunderGod4", color: "#102849", accent: "#d7fbff" }],
    ["Worldstorm Thunder God", "A final divine lightning form with huge gamma-airstrike bursts.", { variant: "thunderGod5", color: "#0d2447", accent: "#fff39a" }],
  ],
  juggernaut: [
    ["Fortress Juggernaut Tank", "A stronger one-shot nuke cannon with a heavier shell.", { variant: "juggernaut2", color: "#72756b", accent: "#f0d37a" }],
    ["Quake Juggernaut Tank", "A bigger blast juggernaut with more nuke fragments.", { variant: "juggernaut3", color: "#686b64", accent: "#ffcf5f" }],
    ["Citadel Juggernaut Tank", "A reinforced juggernaut whose single shot hits harder.", { variant: "juggernaut4", color: "#5e625e", accent: "#ffe58a" }],
    ["Apex Juggernaut Tank", "A final one-shot nuke fortress with brutal impact.", { variant: "juggernaut5", color: "#565a56", accent: "#ff9f5f" }],
  ],
  airstrike: [
    ["Marker Airstrike Tank", "A faster targeting airstrike tank with the same nuke shell.", { variant: "airstrike2", color: "#c8d7e0", accent: "#ffcf5f" }],
    ["Bunker Buster Tank", "A heavier airstrike tank with a larger falling nuke shell.", { variant: "airstrike3", color: "#b7c7d2", accent: "#ffe58a" }],
    ["Storm Caller Tank", "An airstrike tank with extra mini-nuke fragments after impact.", { variant: "airstrike4", color: "#cbd2e8", accent: "#ff8fd8" }],
    ["Apex Airstrike Tank", "A final airstrike tank that drops brutal Ultra nuke shells.", { variant: "airstrike5", color: "#dde8ef", accent: "#ffcf5f" }],
  ],
  helicopter: [
    ["Twin Minigun Helicopter", "A flying gunship with a denser front minigun stream.", { variant: "helicopter2", color: "#9fb7c4", accent: "#f2ca52" }],
    ["Strafe Helicopter", "A faster helicopter that sweeps enemies from the front.", { variant: "helicopter3", color: "#94adbd", accent: "#8de8ff" }],
    ["Gunship Helicopter", "A heavier helicopter with stronger forward rounds.", { variant: "helicopter4", color: "#879eac", accent: "#ffcf5f" }],
    ["Apex Helicopter", "A final air troop with relentless frontal minigun fire.", { variant: "helicopter5", color: "#a9c4d0", accent: "#f2ca52" }],
  ],
  infantry: [
    ["Boxer Infantry", "A puncher infantry stage with quicker close-range jabs.", { variant: "infantry2", color: "#80775f", accent: "#f2ca52" }],
    ["Bruiser Infantry", "A puncher infantry stage with heavier body blows.", { variant: "infantry3", color: "#706a5a", accent: "#ff9f5a" }],
    ["Dash Punch Infantry", "A puncher infantry stage with better reach and speed.", { variant: "infantry4", color: "#676d59", accent: "#a8ff8d" }],
    ["Apex Puncher Infantry", "A final melee infantry brawler with brutal punches.", { variant: "infantry5", color: "#8b8067", accent: "#ffe58a" }],
  ],
};

Object.assign(upgradePools, familyUpgradeLines);

const variantAliases = {
  triCannon2: "defaultTri",
  triCannon3: "defaultTri",
  triCannon4: "defaultTri",
  triCannon5: "defaultTri",
  fanfire2: "defaultFan",
  fanfire3: "defaultScatter",
  fanfire4: "defaultScatter",
  fanfire5: "defaultScatter",
  siege2: "defaultSiege",
  siege3: "defaultSiege",
  siege4: "defaultBreaker",
  siege5: "defaultBulwark",
  needle2: "defaultNeedle",
  needle3: "defaultNeedle",
  needle4: "defaultNeedle",
  needle5: "defaultNeedle",
  auto2: "defaultAuto",
  auto3: "defaultAuto",
  auto4: "defaultCyclone",
  auto5: "defaultCyclone",
  firework2: "defaultFirework",
  firework3: "defaultFirework",
  firework4: "defaultFirework",
  firework5: "defaultFirework",
  incendiary2: "defaultIncendiary",
  incendiary3: "defaultIncendiary",
  incendiaryFireShield: "defaultIncendiary",
  incendiary4: "defaultIncendiary",
  incendiary5: "defaultIncendiary",
  railgun2: "railgunBase",
  railgun3: "railgunVolt",
  railgun4: "railgunSiege",
  railgun5: "railgunLance",
  shotgun2: "shotgunBuck",
  shotgun3: "shotgunBurst",
  shotgun4: "shotgunSlug",
  shotgun5: "shotgunBuck",
  tazer2: "tazerCoil",
  tazer3: "tazerArc",
  tazer4: "tazerStorm",
  tazer5: "tazerStorm",
  thunderGod2: "thunderGodBase",
  thunderGod3: "thunderGodBase",
  thunderGod4: "thunderGodBase",
  thunderGod5: "thunderGodBase",
  juggernaut2: "defaultJuggernaut",
  juggernaut3: "defaultJuggernaut",
  juggernaut4: "defaultJuggernaut",
  juggernaut5: "defaultJuggernaut",
  airstrike2: "airstrikeBase",
  airstrike3: "airstrikeBase",
  airstrike4: "airstrikeBase",
  airstrike5: "airstrikeBase",
  helicopter2: "helicopterBase",
  helicopter3: "helicopterBase",
  helicopter4: "helicopterBase",
  helicopter5: "helicopterBase",
  infantry2: "infantryBase",
  infantry3: "infantryBase",
  infantry4: "infantryBase",
  infantry5: "infantryBase",
};

const variantStages = {
  defaultTwin: 2,
  defaultLoader: 2,
  defaultLongshot: 2,
  defaultTri: 2,
  defaultFan: 2,
  defaultSiege: 2,
  defaultNeedle: 2,
  defaultAuto: 2,
  defaultFirework: 2,
  defaultQuad: 3,
  defaultScatter: 3,
  defaultBreaker: 4,
  defaultCyclone: 5,
  defaultBulwark: 5,
  flameWide: 2,
  flameCinder: 2,
  flameTorch: 2,
  flameLancer: 3,
  flameHalo: 3,
  flameMeteor: 4,
  flameInferno: 5,
  gammaTri: 2,
  gammaWide: 2,
  gammaSnap: 2,
  gammaFork: 3,
  gammaOrbit: 3,
  gammaStorm: 4,
  gammaNova: 5,
  triCannon2: 2,
  triCannon3: 3,
  triCannon4: 4,
  triCannon5: 5,
  fanfire2: 2,
  fanfire3: 3,
  fanfire4: 4,
  fanfire5: 5,
  siege2: 2,
  siege3: 3,
  siege4: 4,
  siege5: 5,
  needle2: 2,
  needle3: 3,
  needle4: 4,
  needle5: 5,
  auto2: 2,
  auto3: 3,
  auto4: 4,
  auto5: 5,
  firework2: 2,
  firework3: 3,
  firework4: 4,
  firework5: 5,
  defaultIncendiary: 1,
  incendiary2: 2,
  incendiary3: 3,
  incendiaryFireShield: 3,
  incendiary4: 4,
  incendiary5: 5,
  railgunLance: 2,
  railgunVolt: 2,
  railgunSiege: 2,
  railgunTwin: 2,
  railgunTri: 3,
  railgunQuad: 4,
  railgunMulti5: 5,
  railgun2: 2,
  railgun3: 3,
  railgun4: 4,
  railgun5: 5,
  shotgunBuck: 2,
  shotgunBurst: 2,
  shotgunSlug: 2,
  shotgun2: 2,
  shotgun3: 3,
  shotgun4: 4,
  shotgun5: 5,
  tazerBase: 1,
  tazerCoil: 2,
  tazerArc: 2,
  tazerStorm: 3,
  tazer2: 2,
  tazer3: 3,
  tazer4: 4,
  tazer5: 5,
  thunderGodBase: 1,
  thunderGod2: 2,
  thunderGod3: 3,
  thunderGod4: 4,
  thunderGod5: 5,
  defaultJuggernaut: 1,
  juggernaut2: 2,
  juggernaut3: 3,
  juggernaut4: 4,
  juggernaut5: 5,
  airstrikeBase: 1,
  airstrike2: 2,
  airstrike3: 3,
  airstrike4: 4,
  airstrike5: 5,
  helicopterBase: 1,
  helicopter2: 2,
  helicopter3: 3,
  helicopter4: 4,
  helicopter5: 5,
  infantryBase: 1,
  infantry2: 2,
  infantry3: 3,
  infantry4: 4,
  infantry5: 5,
  antiAirBase: 1,
};

const generatedStageColors = ["#e6efd8", "#d8efe7", "#d9e6f0", "#eadff2", "#f0e7d7"];
const stageTitles = {
  2: "Advanced",
  3: "Split",
  4: "Heavy",
  5: "Apex",
  6: "Elite",
  7: "Mythic",
  8: "Omega",
  9: "Prime",
  10: "Ascendant",
  11: "Radiant",
  12: "Tempest",
  13: "Vanguard",
  14: "Phantom",
  15: "Titan",
  16: "Quantum",
  17: "Eclipse",
  18: "Paragon",
  19: "Nova",
  20: "Celestial",
  21: "Obsidian",
  22: "Hyperion",
  23: "Aether",
  24: "Singularity",
  25: "Infinity",
  26: "Dominion",
  27: "Cataclysm",
  28: "Genesis",
  29: "Eternal",
  30: "Final",
};

const familyStageForms = {
  default: [
    { key: "battery", title: "Battery", base: "defaultCyclone", accent: "#8dff98", color: "#d3ddd2", focus: "rapid multi-barrel fire" },
    { key: "bulwark", title: "Bulwark", base: "defaultBulwark", accent: "#ffd36d", color: "#aca99d", focus: "huge armor-piercing impact shells" },
    { key: "fireburst", title: "Fireburst", base: "defaultFirework", accent: "#ffcf5f", color: "#d8d6ee", focus: "single explosive shells that burst into pellets" },
  ],
  flame: [
    { key: "lancer", title: "Lancer", base: "flameLancer", accent: "#ffe28a", color: "#e84b2f", focus: "a narrow long-range flame spear" },
    { key: "halo", title: "Halo", base: "flameHalo", accent: "#9ff7ff", color: "#2f78d8", focus: "a wide defensive flame wash" },
    { key: "cinder", title: "Cinder", base: "flameCinder", accent: "#ff7b38", color: "#7f3d30", focus: "afterburn and lingering damage" },
  ],
  gamma: [
    { key: "fork", title: "Forked", base: "gammaFork", accent: "#e6f7ff", color: "#3fa4ff", focus: "split returning signal lanes" },
    { key: "orbit", title: "Orbit", base: "gammaOrbit", accent: "#a1ffea", color: "#5bd5c8", focus: "long looping boomerang control" },
    { key: "storm", title: "Lightning Storm", base: "gammaStorm", accent: "#b8e8ff", color: "#2d8fff", focus: "larger chained lightning strikes" },
  ],
  triCannon: [
    { key: "prism", title: "Prism", base: "defaultTri", accent: "#f2ff72", color: "#e2efd9", focus: "three sharp center lanes" },
    { key: "array", title: "Array", base: "defaultQuad", accent: "#cfff66", color: "#dfe8d8", focus: "extra synchronized cannon lanes" },
    { key: "needle", title: "Needle Tri", base: "defaultNeedle", accent: "#9dffff", color: "#dce8ee", focus: "thin high-speed triple precision shots" },
  ],
  fanfire: [
    { key: "starfan", title: "Starfan", base: "defaultScatter", accent: "#8de8ff", color: "#c4dbe5", focus: "dense close-range fan coverage" },
    { key: "hurricane", title: "Hurricane", base: "defaultCyclone", accent: "#70ffcf", color: "#b9d0de", focus: "fast sweeping fan pressure" },
    { key: "cometfan", title: "Cometfan", base: "defaultFirework", accent: "#ffcf5f", color: "#d6d6eb", focus: "wide shots that burst into fragments" },
  ],
  siege: [
    { key: "earthshaker", title: "Earthshaker", base: "defaultBreaker", accent: "#ffb35f", color: "#aaa696", focus: "giant slow cannon hits" },
    { key: "dreadnought", title: "Dreadnought", base: "defaultBulwark", accent: "#ffd36d", color: "#8f8b7f", focus: "two massive fortress barrels" },
    { key: "mortar", title: "Mortar", base: "defaultFirework", accent: "#ffcf5f", color: "#b7ab99", focus: "heavy explosive siege shells" },
  ],
  needle: [
    { key: "rail", title: "Rail", base: "defaultNeedle", accent: "#9dffff", color: "#e7eff3", focus: "extreme range and shell speed" },
    { key: "longbow", title: "Longbow", base: "defaultLongshot", accent: "#ffdf8a", color: "#d6d0bf", focus: "long heavy sniper shots" },
    { key: "splinter", title: "Splinter", base: "defaultTri", accent: "#b7f7ff", color: "#d8dde3", focus: "thin multi-needle lanes" },
  ],
  auto: [
    { key: "minigun", title: "Minigun", base: "defaultAuto", accent: "#95ff79", color: "#c2d8c5", focus: "constant rapid small shells" },
    { key: "cyclone", title: "Cyclone", base: "defaultCyclone", accent: "#8dff98", color: "#d3ddd2", focus: "many fast spinning barrels" },
    { key: "sponson", title: "Sponson", base: "defaultTwin", accent: "#a8f28b", color: "#cbd6c9", focus: "paired side-pressure cannons" },
  ],
  firework: [
    { key: "mortar", title: "Mortar", base: "defaultFirework", accent: "#ffcf5f", color: "#d8d6ee", focus: "one big shell that bursts on death" },
    { key: "nova", title: "Nova", base: "defaultFirework", accent: "#ff8fd8", color: "#cec6ef", focus: "larger fragment explosions" },
    { key: "cracker", title: "Cracker", base: "defaultScatter", accent: "#ffd96d", color: "#d6cceb", focus: "smaller fireworks spread across crowds" },
  ],
  incendiary: [
    { key: "cinder", title: "Cinder", base: "defaultIncendiary", accent: "#ff7b38", color: "#654237", focus: "hotter afterburn and burning shell bursts" },
    { key: "napalm", title: "Napalm", base: "defaultIncendiary", accent: "#ff9f45", color: "#5a382f", focus: "longer-lasting fire patches after impact" },
    { key: "wildfire", title: "Wildfire", base: "defaultIncendiary", accent: "#ffcf5f", color: "#4e332e", focus: "larger fire pellet explosions" },
  ],
  railgun: [
    { key: "lance", title: "Lance", base: "railgunLance", accent: "#88f7ff", color: "#dfe6ef", focus: "a long thin all-piercing beam" },
    { key: "volt", title: "Volt", base: "railgunVolt", accent: "#a8ffde", color: "#d9eff0", focus: "faster beam reloads on a fragile frame" },
    { key: "siege", title: "Siege", base: "railgunSiege", accent: "#ffe28a", color: "#c9d0d8", focus: "a thicker high-damage rail beam" },
    { key: "multi", title: "Multi-Rail", base: "railgunLance", accent: "#8dffff", color: "#dcecf2", focus: "more rail cannons firing together" },
  ],
  shotgun: [
    { key: "buck", title: "Buckshot", base: "shotgunBuck", accent: "#ff9f5a", color: "#d8d2bd", focus: "a wide straight pellet wall" },
    { key: "burst", title: "Street Sweeper", base: "shotgunBurst", accent: "#ffd36d", color: "#d8c7b8", focus: "faster reload and more pellets" },
    { key: "slug", title: "Slugstorm", base: "shotgunSlug", accent: "#ff765b", color: "#bfae9e", focus: "harder-hitting close-range pellets" },
  ],
  tazer: [
    { key: "coil", title: "Coil", base: "tazerCoil", accent: "#ffe66d", color: "#1d3554", focus: "wider long zaps that start chains sooner" },
    { key: "arc", title: "Arc", base: "tazerArc", accent: "#eaffff", color: "#203f5f", focus: "harder chain jumps and faster recharge" },
    { key: "storm", title: "Storm", base: "tazerStorm", accent: "#fff39a", color: "#112f46", focus: "screen control and dense electric reach" },
  ],
  thunderGod: [
    { key: "stormlord", title: "Stormlord", base: "thunderGodBase", accent: "#fff06d", color: "#17395f", focus: "faster targeted thunder airstrikes" },
    { key: "skybreaker", title: "Skybreaker", base: "thunderGodBase", accent: "#8df5ff", color: "#12315a", focus: "larger chained gamma lightning detonations" },
    { key: "judgment", title: "Judgment", base: "thunderGodBase", accent: "#d7fbff", color: "#102849", focus: "stronger god-mode and judgment storms" },
  ],
  juggernaut: [
    { key: "fortress", title: "Fortress", base: "defaultJuggernaut", accent: "#f0d37a", color: "#72756b", focus: "one heavier Ultra-style nuke shell" },
    { key: "quake", title: "Quake", base: "defaultJuggernaut", accent: "#ffcf5f", color: "#686b64", focus: "a wider nuke blast with more fragments" },
    { key: "citadel", title: "Citadel", base: "defaultJuggernaut", accent: "#ffe58a", color: "#5e625e", focus: "slower fortified shots that hit harder" },
  ],
  airstrike: [
    { key: "marker", title: "Marker", base: "airstrikeBase", accent: "#ffcf5f", color: "#c8d7e0", focus: "faster targeting cooldowns" },
    { key: "buster", title: "Bunker Buster", base: "airstrikeBase", accent: "#ffe58a", color: "#b7c7d2", focus: "larger falling nuke shells" },
    { key: "storm", title: "Storm Caller", base: "airstrikeBase", accent: "#ff8fd8", color: "#cbd2e8", focus: "extra mini-nuke fragments" },
  ],
  helicopter: [
    { key: "twin", title: "Twin Minigun", base: "helicopterBase", accent: "#f2ca52", color: "#9fb7c4", focus: "denser forward minigun fire" },
    { key: "strafe", title: "Strafe", base: "helicopterBase", accent: "#8de8ff", color: "#94adbd", focus: "faster flight and sweeping aim" },
    { key: "gunship", title: "Gunship", base: "helicopterBase", accent: "#ffcf5f", color: "#879eac", focus: "stronger forward minigun rounds" },
  ],
  infantry: [
    { key: "boxer", title: "Boxer", base: "infantryBase", accent: "#f2ca52", color: "#80775f", focus: "fast close-range punch combos" },
    { key: "bruiser", title: "Bruiser", base: "infantryBase", accent: "#ff9f5a", color: "#706a5a", focus: "heavier melee hits" },
    { key: "dash", title: "Dash Punch", base: "infantryBase", accent: "#a8ff8d", color: "#676d59", focus: "faster footwork and longer punch reach" },
  ],
};

function addEvolutionStages(familyKey, label, baseVariant, accent, startStage = 6) {
  const forms = familyStageForms[familyKey];
  for (let stage = startStage; stage <= MAX_EVOLUTION_STAGE; stage += 1) {
    forms.forEach((form, choiceIndex) => {
      const variant = `${familyKey}${stage}${form.key}`;
      const title = `${stageTitles[stage] || `Mk ${stage}`} ${form.title} ${label} Tank`;
      upgradePools[familyKey].push([
        title,
        `A stage ${stage} ${label.toLowerCase()} form built around ${form.focus}.`,
        {
          variant,
          color: form.color || generatedStageColors[(stage + choiceIndex) % generatedStageColors.length],
          accent: form.accent || accent,
        },
      ]);
      variantAliases[variant] = form.base || baseVariant;
      variantStages[variant] = stage;
    });
  }
}

addEvolutionStages("default", "Core Cannon", "defaultCyclone", "#f3ff80");
addEvolutionStages("flame", "Inferno", "flameInferno", "#ff4d2e");
addEvolutionStages("gamma", "Gamma Nova", "gammaNova", "#76fff1");
addEvolutionStages("triCannon", "Tri-Cannon", "defaultTri", "#f2ff72");
addEvolutionStages("fanfire", "Fanfire", "defaultScatter", "#a5f7ff");
addEvolutionStages("siege", "Siege", "defaultBulwark", "#ffd36d");
addEvolutionStages("needle", "Needle", "defaultNeedle", "#9dffff");
addEvolutionStages("auto", "Auto", "defaultCyclone", "#8dff98");
addEvolutionStages("firework", "Firework", "defaultFirework", "#ffcf5f");
addEvolutionStages("incendiary", "Incendiary", "defaultIncendiary", "#ff7b38");
addEvolutionStages("railgun", "Railgun", "railgunLance", "#88f7ff");
addEvolutionStages("shotgun", "Shotgun", "shotgunBuck", "#ff9f5a");
addEvolutionStages("tazer", "Tazer", "tazerCoil", "#ffe66d");
addEvolutionStages("thunderGod", "Thunder God", "thunderGodBase", "#fff06d");
addEvolutionStages("juggernaut", "Juggernaut", "defaultJuggernaut", "#f0d37a");
addEvolutionStages("airstrike", "Airstrike", "airstrikeBase", "#ffcf5f");
addEvolutionStages("helicopter", "Helicopter", "helicopterBase", "#f2ca52");
addEvolutionStages("infantry", "Puncher Infantry", "infantryBase", "#f2ca52");

const familyLabels = {
  default: "Cannon",
  flame: "Flame",
  gamma: "Gamma",
  triCannon: "Tri-Cannon",
  fanfire: "Fanfire",
  siege: "Siege",
  needle: "Needle",
  auto: "Auto",
  firework: "Firework",
  incendiary: "Incendiary",
  railgun: "Railgun",
  shotgun: "Shotgun",
  tazer: "Tazer",
  thunderGod: "Thunder God",
  juggernaut: "Juggernaut",
  airstrike: "Airstrike",
  helicopter: "Helicopter",
  infantry: "Infantry",
};

const branchFamilies = {
  defaultJuggernaut: "juggernaut",
  defaultTri: "triCannon",
  defaultFan: "fanfire",
  defaultSiege: "siege",
  defaultNeedle: "needle",
  defaultAuto: "auto",
  defaultFirework: "firework",
  defaultIncendiary: "incendiary",
  thunderGodBase: "thunderGod",
  defaultQuad: "triCannon",
  defaultScatter: "fanfire",
  defaultBreaker: "siege",
  defaultCyclone: "auto",
  defaultBulwark: "siege",
  triCannon2: "triCannon",
  fanfire2: "fanfire",
  siege2: "siege",
  needle2: "needle",
  auto2: "auto",
  firework2: "firework",
  incendiary2: "incendiary",
  juggernaut2: "juggernaut",
};

const choiceStyles = [
  ["Overdrive", "reload and pressure"],
  ["Titan", "heavy impact"],
  ["Vector", "speed and control"],
];

function ensureThreeChoicesPerStage(familyKey) {
  const pool = upgradePools[familyKey];
  const forms = familyStageForms[familyKey] || [];
  for (let stage = 2; stage <= MAX_EVOLUTION_STAGE; stage += 1) {
    let stageChoices = pool.filter(([, , effect]) => (variantStages[effect.variant] || 2) === stage);
    while (stageChoices.length < 3) {
      const choiceIndex = stageChoices.length;
      const source = stageChoices[0] || pool[0];
      const sourceEffect = source[2];
      const form = forms[choiceIndex % forms.length];
      const variant = `${familyKey}Stage${stage}${form?.key || `Choice${choiceIndex + 1}`}`;
      const [styleName, styleText] = choiceStyles[choiceIndex % choiceStyles.length];
      variantAliases[variant] = form?.base || variantAliases[sourceEffect.variant] || sourceEffect.variant;
      variantStages[variant] = stage;
      pool.push([
        `${stageTitles[stage] || `Mk ${stage}`} ${form?.title || styleName} ${familyLabels[familyKey]} Tank`,
        `A stage ${stage} ${familyLabels[familyKey].toLowerCase()} form focused on ${form?.focus || styleText}.`,
        {
          variant,
          color: form?.color || generatedStageColors[(stage + choiceIndex) % generatedStageColors.length],
          accent: form?.accent || sourceEffect.accent,
        },
      ]);
      stageChoices = pool.filter(([, , effect]) => (variantStages[effect.variant] || 2) === stage);
    }
  }
}

Object.keys(upgradePools).forEach(ensureThreeChoicesPerStage);

starters.push(
  {
    key: "startTri",
    familyKey: "triCannon",
    variant: "defaultTri",
    name: "Tri-Cannon Tank",
    color: "#d7ded7",
    accent: "#d9f26c",
    description: "A basic three-barrel starter that keeps a tight center lane.",
    stats: ["3 barrels", "Pierces 5 enemies", "Tight spread"],
  },
  {
    key: "startFan",
    familyKey: "fanfire",
    variant: "defaultFan",
    name: "Fanfire Tank",
    color: "#ccd7dc",
    accent: "#7fc7ff",
    description: "A basic fan-shot starter for clearing enemies across a wide angle.",
    stats: ["Wide spread", "Smaller shells", "Crowd control"],
  },
  {
    key: "startSiege",
    familyKey: "siege",
    variant: "defaultSiege",
    name: "Siege Cannon Tank",
    color: "#bbb7a8",
    accent: "#ff8d5a",
    description: "A basic heavy-cannon starter with slow, chunky shells.",
    stats: ["Heavy shells", "Slow reload", "Big impact"],
  },
  {
    key: "startNeedle",
    familyKey: "needle",
    variant: "defaultNeedle",
    name: "Needle Ranger Tank",
    color: "#d8dde3",
    accent: "#b7f7ff",
    description: "A basic long-range starter with fast, narrow shots.",
    stats: ["Long range", "Fast shells", "Precise"],
  },
  {
    key: "startAuto",
    familyKey: "auto",
    variant: "defaultAuto",
    name: "Auto Sponson Tank",
    color: "#cbd6c9",
    accent: "#a8f28b",
    description: "A basic rapid-fire starter with smaller shells and side pressure.",
    stats: ["Rapid fire", "Small shells", "Mobile"],
  },
  {
    key: "startFirework",
    familyKey: "firework",
    variant: "defaultFirework",
    name: "Firework Spread Tank",
    color: "#d8d6ee",
    accent: "#ffcf5f",
    description: "A basic firework tank whose single shell bursts into pellets on impact.",
    stats: ["One shell", "Impact burst", "Firework pellets"],
  },
  {
    key: "startIncendiary",
    familyKey: "incendiary",
    variant: "defaultIncendiary",
    name: "Incendiary Bomber Tank",
    color: "#5f4036",
    accent: "#ff7b38",
    description: "A slow bomber tank that lobs molotov bottles and can trigger a nuclear fire shield with Q.",
    stats: ["Molotov lob", "Q fire shield", "Afterburn"],
  },
  {
    key: "startVampire",
    familyKey: "default",
    name: "Vampire Tank",
    color: "#5f283a",
    accent: "#ff6f9f",
    description: "A basic cannon tank that heals from the damage it deals.",
    stats: ["Perk: Lifesteal", "15% damage heal", "Sustain"],
    perks: { lifeSteal: 0.15 },
  },
  {
    key: "thunderGod",
    familyKey: "thunderGod",
    variant: "thunderGodBase",
    name: "Thunder God",
    color: "#172a4d",
    accent: "#fff06d",
    description: "A divine lightning character with airstrike bolts, gamma chaining, huge health, and no regeneration.",
    stats: ["1000 HP", "50 damage", "Q/E thunder"],
    perks: { fixedMaxHp: 1000, noRegen: true, thunderGod: true },
  },
  {
    key: "startJuggernaut",
    familyKey: "juggernaut",
    variant: "defaultJuggernaut",
    name: "Juggernaut Tank",
    color: "#6d7068",
    accent: "#f0d37a",
    description: "A slow fortress tank that fires one Ultra-style nuke shell, then reloads for a long time.",
    stats: ["One nuke shell", "Long reload", "200 HP"],
    perks: { maxHpMult: 2, speedBonus: -18 },
  },
  {
    key: "startSprinter",
    familyKey: "default",
    name: "Sprinter Tank",
    color: "#d8e6e2",
    accent: "#55d6ff",
    description: "A basic cannon tank with a much faster engine.",
    stats: ["Perk: Fast move", "Kites well", "Light frame"],
    perks: { speedBonus: 55 },
  },
  {
    key: "startScholar",
    familyKey: "default",
    name: "Scholar Tank",
    color: "#d7d3ec",
    accent: "#c5ff6f",
    description: "A basic cannon tank that levels faster from every enemy destroyed.",
    stats: ["Perk: +50% XP", "Fast leveling", "Snowball"],
    perks: { xpMult: 1.5 },
  },
  {
    key: "startPiercer",
    familyKey: "default",
    name: "Piercer Tank",
    color: "#dfe4d6",
    accent: "#8cffb2",
    description: "A basic cannon tank whose shots cut through more enemies.",
    stats: ["Perk: +5 pierce", "Line clear", "Sharp shells"],
    perks: { extraPierce: 5 },
  },
  {
    key: "startBossHunter",
    familyKey: "default",
    name: "Boss Hunter Tank",
    color: "#e2d1c3",
    accent: "#ff5959",
    description: "A basic cannon tank that deals extra damage to bosses.",
    stats: ["Perk: Boss damage", "Anti-boss", "High stakes"],
    perks: { bossDamageMult: 2.5 },
  },
  {
    key: "startMedic",
    familyKey: "default",
    name: "Medic Tank",
    color: "#dceee1",
    accent: "#77ff9b",
    description: "A basic cannon tank with much stronger passive healing.",
    stats: ["Perk: Strong regen", "Safer fights", "Recovery"],
    perks: { regenMult: 2.5 },
  },
  {
    key: "startCommander",
    familyKey: "default",
    name: "Commander Tank",
    color: "#d7dbc5",
    accent: "#ffeb73",
    description: "A basic cannon tank that calls in allied tanks more often.",
    stats: ["Perk: More allies", "1% -> 8%", "Support"],
    perks: { allyChance: 0.08 },
  },
  {
    key: "startSharpshooter",
    familyKey: "default",
    name: "Sharpshooter Tank",
    color: "#e7e9ee",
    accent: "#9adfff",
    description: "A basic cannon tank with stronger shots.",
    stats: ["Perk: +35% damage", "Precise", "Punishing"],
    perks: { damageMult: 1.35 },
  },
  {
    key: "startShield",
    familyKey: "default",
    name: "Shield Tank",
    color: "#cad2df",
    accent: "#a7c7ff",
    description: "A basic cannon tank that takes less incoming damage.",
    stats: ["Perk: -30% damage", "Defensive", "Stable"],
    perks: { damageTakenMult: 0.7 },
  },
  {
    key: "startUltra",
    familyKey: "default",
    variant: "defaultUltra",
    name: "Ultra Tank",
    color: "#f7f3de",
    accent: "#ff4fd8",
    description: "An all-sides cannon tank with nuke shells, chain lightning, and 100000 HP.",
    stats: ["100000 HP", "Nuke shells", "No regen"],
  }
);

const enemyFamilies = {
  default: {
    baseName: "Default Tank",
    color: "#8b9186",
    accent: "#d4d0bc",
    variants: upgradePools.default,
  },
  triCannon: {
    baseName: "Tri-Cannon Tank",
    color: "#899386",
    accent: "#d9f26c",
    variants: upgradePools.triCannon,
  },
  fanfire: {
    baseName: "Fanfire Tank",
    color: "#81929b",
    accent: "#7fc7ff",
    variants: upgradePools.fanfire,
  },
  siege: {
    baseName: "Siege Cannon Tank",
    color: "#888274",
    accent: "#ff8d5a",
    variants: upgradePools.siege,
  },
  needle: {
    baseName: "Needle Ranger Tank",
    color: "#8c969d",
    accent: "#b7f7ff",
    variants: upgradePools.needle,
  },
  auto: {
    baseName: "Auto Sponson Tank",
    color: "#84927f",
    accent: "#a8f28b",
    variants: upgradePools.auto,
  },
  firework: {
    baseName: "Firework Tank",
    color: "#8a879e",
    accent: "#ffcf5f",
    variants: upgradePools.firework,
  },
  incendiary: {
    baseName: "Incendiary Bomber Tank",
    color: "#5f4036",
    accent: "#ff7b38",
    variants: upgradePools.incendiary,
  },
  flame: {
    baseName: "Flamethrower Tank",
    color: "#b95135",
    accent: "#ffb545",
    variants: upgradePools.flame,
  },
  gamma: {
    baseName: "Gamma Tank",
    color: "#4ba96c",
    accent: "#66e6ff",
    variants: upgradePools.gamma,
  },
  railgun: {
    baseName: "Railgun Tank",
    color: "#8e9aa4",
    accent: "#88f7ff",
    variants: upgradePools.railgun,
  },
  tazer: {
    baseName: "Tazer Tank",
    color: "#17283d",
    accent: "#ffe66d",
    variants: upgradePools.tazer,
  },
  shotgun: {
    baseName: "Shotgun Tank",
    color: "#927c66",
    accent: "#ff9f5a",
    variants: upgradePools.shotgun,
  },
  juggernaut: {
    baseName: "Juggernaut Tank",
    color: "#6d7068",
    accent: "#f0d37a",
    variants: upgradePools.juggernaut,
  },
  antiAir: {
    baseName: "Anti-Air Tank",
    color: "#59636a",
    accent: "#ff5959",
    variants: [["Anti-Air Tank", "Enemy-only missile tank built to hit air troops.", { variant: "antiAirBase", color: "#59636a", accent: "#ff5959" }]],
  },
};

function enemyStarterOptions() {
  const bannedEnemyStarters = new Set(["startScholar", "startBossHunter", "startCommander"]);
  return starters.filter(
    (starter) =>
      !bannedEnemyStarters.has(starter.key) &&
      starter.key !== "default" &&
      starter.key !== "flame" &&
      starter.key !== "gamma" &&
      starter.key !== "railgun" &&
      starter.key !== "tazer" &&
      starter.key !== "shotgun" &&
      starter.key !== "airstrike" &&
      starter.key !== "helicopter" &&
      starter.key !== "infantry" &&
      starter.key !== "thunderGod" &&
      starter.key !== "startUltra"
  );
}

function cannonFamily(tankKey) {
  return tankKey !== "flame" && tankKey !== "gamma" && tankKey !== "railgun" && tankKey !== "shotgun" && tankKey !== "tazer";
}

function scaledTankMaxHp(level) {
  return Math.round(100 * (1 + Math.max(0, level - 1) * 0.35));
}

function tankHpMultiplier(tankKey) {
  if (tankKey === "tazer") return 2;
  return tankKey === "railgun" ? 0.6 : 1;
}

function isBossLevel(level) {
  return level % BOSS_LEVEL_INTERVAL === 0 || level === VICTORY_BOSS_LEVEL;
}

function loadLeaderboard() {
  try {
    const parsed = JSON.parse(localStorage.getItem(LEADERBOARD_KEY) || "[]");
    return Array.isArray(parsed) ? parsed.filter((entry) => Number.isFinite(entry.level)).slice(0, LEADERBOARD_LIMIT) : [];
  } catch {
    return [];
  }
}

function saveLeaderboard(entries) {
  try {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(entries.slice(0, LEADERBOARD_LIMIT)));
  } catch {
    // Storage can fail in private modes; the game should keep running.
  }
}

function renderLeaderboard() {
  const entries = loadLeaderboard();
  [startLeaderboard, gameOverLeaderboard].forEach((list) => {
    if (!list) return;
    list.innerHTML = "";
    if (entries.length === 0) {
      const item = document.createElement("li");
      item.textContent = "No runs yet";
      list.appendChild(item);
      return;
    }
    entries.forEach((entry) => {
      const item = document.createElement("li");
      const label = document.createElement("span");
      const detail = document.createElement("small");
      label.textContent = `Lv ${entry.level}`;
      detail.textContent = `${entry.kills || 0} kills - ${entry.tank || "Tank"} - ${entry.mode || "Normal"}`;
      item.append(label, detail);
      list.appendChild(item);
    });
  });
}

function recordLeaderboardRun(reason = "defeat") {
  if (runLeaderboardRecorded || !player.level || gameState === "start") return;
  runLeaderboardRecorded = true;
  const entries = loadLeaderboard();
  entries.push({
    level: player.level,
    kills: player.kills,
    tank: player.buildName,
    mode: activeGameMode === "infantryArmy" ? "Army" : "Normal",
    reason,
    at: Date.now(),
  });
  entries.sort((a, b) => b.level - a.level || b.kills - a.kills || (b.at || 0) - (a.at || 0));
  saveLeaderboard(entries);
  renderLeaderboard();
}

function xpNextForLevel(level) {
  let xpNext = 100;
  for (let current = 1; current < level; current += 1) {
    xpNext = Math.ceil(xpNext * 1.5);
  }
  return xpNext;
}

function requestedWaveSkip() {
  const requestedWave = Math.floor(Number(waveSkipInput?.value || 1));
  const password = waveSkipPassword?.value.trim() || "";
  if (!Number.isFinite(requestedWave) || requestedWave <= 1) {
    if (waveSkipStatus) waveSkipStatus.textContent = "";
    return 1;
  }
  if (password !== WAVE_SKIP_PASSWORD) {
    if (waveSkipStatus) waveSkipStatus.textContent = "Wrong password. Starting at wave 1.";
    return 1;
  }
  const wave = clamp(requestedWave, 1, 100);
  if (waveSkipStatus) waveSkipStatus.textContent = `Starting at wave ${wave}.`;
  return wave;
}

function hasPasswordAccess() {
  return (waveSkipPassword?.value.trim() || "") === WAVE_SKIP_PASSWORD;
}

function starterNeedsPassword(tank) {
  return tank.key === "tazer" || tank.key === "dragonTamer" || tank.key === "startIncendiary" || tank.key === "startJuggernaut" || tank.key === "startUltra" || tank.familyKey === "juggernaut" || tank.variant === "defaultJuggernaut" || tank.variant === "defaultUltra";
}

function applyWaveSkip(wave) {
  if (wave <= 1) return;
  player.level = wave;
  player.xp = 0;
  player.xpNext = xpNextForLevel(wave);
  if (player.perks.fixedMaxHp) {
    player.maxHp = player.perks.fixedMaxHp;
    player.hp = Math.min(player.hp || player.maxHp, player.maxHp);
  } else if (!player.lockedTank) {
    player.maxHp = Math.max(1, Math.round(scaledTankMaxHp(wave) * (player.perks.maxHpMult || 1) * (player.maxHpPenaltyMult || 1)));
    player.hp = player.maxHp;
  }
  if (!player.lockedTank && upgradePools[player.tankKey]) {
    pendingUpgradeTokens = Math.max(pendingUpgradeTokens, Math.max(0, wave - 1));
    upgradeChoices = [];
  }
}

function resetGame(tankKey = "default", mode = selectedGameMode) {
  const starter = starters.find((tank) => tank.key === tankKey);
  const skipWave = requestedWaveSkip();
  const starterLoadout = starter.variant ? createVariantLoadout(starter.variant, 1) : null;
  const starterPerks = starter.perks || {};
  const baseMaxHp = starter.variant === "defaultUltra" ? 100000 : starterPerks.fixedMaxHp || Math.round(100 * (starterPerks.maxHpMult || 1));
  activeGameMode = mode;
  generateWarMap();
  Object.assign(player, {
    x: world.w / 2,
    y: world.h / 2,
    r: starter.key === "infantry" ? 13 : starter.key === "helicopter" ? 24 : 23,
    hp: baseMaxHp,
    maxHp: baseMaxHp,
    speed: (starterLoadout ? starterLoadout.speed : 190) + (starterPerks.speedBonus || 0),
    angle: 0,
    level: 1,
    xp: 0,
    xpNext: 100,
    kills: 0,
    tankKey: starter.familyKey || starter.key,
    tankStage: starter.variant === "defaultUltra" ? 6 : 1,
    lockedTank: starter.variant === "defaultUltra" || starter.key === "trooper" || starter.key === "dragonTamer",
    perks: { ...starterPerks },
    maxHpPenaltyMult: 1,
    buildName: starter.name,
    cooldown: 0,
    trooperHeliCooldown: 0,
    dragonCooldown: 0,
    adultDragonCooldown: 0,
    blackDragonCooldown: 0,
    gammaStormCooldown: 0,
    thunderBuffCooldown: 0,
    thunderBuffActive: 0,
    thunderFocusCooldown: 0,
    thunderRevivesUsed: 0,
    thunderReviveReady: Boolean(starterPerks.thunderGod),
    thunderReviveTrial: 0,
    thunderReviveTargetLevel: 0,
    fireShieldCooldown: 0,
    fireShieldActive: 0,
    juggernautDomainCooldown: 0,
    juggernautDomain: null,
    juggernautJudgmentCooldown: 0,
    juggernautJudgmentArmed: false,
    juggernautResolveCooldown: 0,
    juggernautResolveActive: 0,
    juggernautResolveHpBonus: 0,
    tazerCooldown: 0,
    tazerBeamCooldown: 0,
    tazerBeamActive: 0,
    tazerMiniCooldown: 0,
    tazerCannonCooldown: 0,
    tazerGuardCooldown: 0,
    tazerGuardActive: 0,
    tazerGuardHpBonus: 0,
    tazerFocusCooldown: 0,
    tazerEnergy: 1,
    railEnergy: 1,
    railGiantCooldown: 0,
    railGiantArmed: false,
    railGiantActive: false,
    invuln: 0,
    color: starter.color,
    accent: starter.accent,
    mods: starterLoadout
      ? starterLoadout.mods
      : {
          fireRate: 1,
          bulletSpeed: 1,
          bulletCount: 1,
          bulletSpread: 0,
          shellDamage: 1,
          shellSize: 1,
          fireworkFragments: 0,
          nukeExplosion: false,
          omniFire: false,
          range: 1,
          flameWidth: 1,
          burnTime: 1,
          gammaArcs: 1,
          gammaReach: 1,
          gammaLightningDamage: 1,
          gammaLightningChain: 0,
          gammaLightningRadius: 1,
          gammaLightningBurst: 1,
          gammaLightningStun: 1,
          beamWidth: 1,
          beamCount: 1,
          pelletCount: 1,
        },
  });
  if (starter.key === "startIncendiary") player.mods.fireShieldAbility = true;
  bullets.length = 0;
  enemyBullets.length = 0;
  flames.length = 0;
  enemies.length = 0;
  pendingUpgradeTokens = 0;
  upgradeChoices = [];
  applyWaveSkip(skipWave);
  sparks.length = 0;
  lightning.length = 0;
  nukes.length = 0;
  gammaStorms.length = 0;
  tazerEndStorms.length = 0;
  tazerCannonTraps.length = 0;
  tazerCannonWaves.length = 0;
  tazerFocusStorms.length = 0;
  thunderFocusStorms.length = 0;
  spawnCarry = 0;
  nextEnemyId = 1;
  infantryArmySpawned = 0;
  bossSpawnedLevels.clear();
  runLeaderboardRecorded = false;
  gameState = "playing";
  showOnly();
  renderPendingUpgrades();
  if (activeGameMode === "infantryArmy") {
    spawnInfantryArmyArrow();
  }
  if (activeGameMode !== "infantryArmy" && (player.lockedTank || isBossLevel(player.level))) {
    bossSpawnedLevels.add(player.level);
    spawnBoss(player.level);
  }
  refreshEntityCounts();
}

function spawnInfantryArmyArrow() {
  const anchorX = world.w / 2;
  const anchorY = 155;
  const rowGap = 34;
  const colGap = 30;
  const rows = [
    { type: "shielder", count: 1 },
    { type: "shielder", count: 3 },
    { type: "shielder", count: 5 },
    { type: "ak", count: 7 },
    { type: "ak", count: 9 },
    { type: "ak", count: 11 },
    { type: "bomber", count: 13 },
    { type: "bomber", count: 15 },
    { type: "medic", count: 17 },
    { type: "medic", count: 19 },
    { type: "ak", count: 21 },
    { type: "bomber", count: 19 },
  ];
  rows.forEach((row, rowIndex) => {
    for (let col = 0; col < row.count; col += 1) {
      if (infantryArmySpawned >= INFANTRY_ARMY_CAP) return;
      const x = anchorX + (col - (row.count - 1) / 2) * colGap;
      const y = anchorY + rowIndex * rowGap;
      spawnInfantryArmySoldier({ type: row.type, x, y, slot: col - (row.count - 1) / 2, depth: rowIndex });
    }
  });
  addSpark(anchorX, anchorY + 120, "#f2ca52", 30);
}

function showOnly(name) {
  Object.entries(screens).forEach(([screenName, element]) => {
    element.classList.toggle("hidden", screenName !== name);
  });
  renderPendingUpgrades();
}

function screenToWorld(x, y) {
  return {
    x: (x - canvas.width / 2) / camera.scale + camera.x,
    y: (y - canvas.height / 2) / camera.scale + camera.y,
  };
}

function awayFromCenter(x, y, padding = 240) {
  return Math.hypot(x - world.w / 2, y - world.h / 2) > padding;
}

function randomMapPoint(margin = 120, padding = 240) {
  for (let tries = 0; tries < 60; tries += 1) {
    const x = margin + Math.random() * (world.w - margin * 2);
    const y = margin + Math.random() * (world.h - margin * 2);
    if (awayFromCenter(x, y, padding)) return { x, y };
  }
  return { x: margin, y: margin };
}

function generateWarMap() {
  const themes = [
    { name: "Mud Trench Front", bg: "#181d17", trench: "#4f4938", crater: "#26231d", cover: "#6e6655" },
    { name: "Burned City Front", bg: "#1b1b1a", trench: "#3c3a36", crater: "#24211f", cover: "#77736b" },
    { name: "Dust Bowl Front", bg: "#211f18", trench: "#5b4d35", crater: "#302a20", cover: "#837153" },
    { name: "Winter War Front", bg: "#1a2020", trench: "#56615d", crater: "#273032", cover: "#8d9994" },
  ];
  const theme = themes[Math.floor(Math.random() * themes.length)];
  warMap.name = theme.name;
  warMap.theme = theme.bg;
  warMap.trenches = [];
  warMap.craters = [];
  warMap.barriers = [];

  for (let i = 0; i < 9; i += 1) {
    const p = randomMapPoint(130, 330);
    warMap.trenches.push({
      x: p.x,
      y: p.y,
      len: 190 + Math.random() * 260,
      width: 22 + Math.random() * 16,
      angle: Math.random() * TAU,
      color: theme.trench,
    });
  }
  for (let i = 0; i < 34; i += 1) {
    const p = randomMapPoint(80, 180);
    warMap.craters.push({
      x: p.x,
      y: p.y,
      r: 16 + Math.random() * 38,
      squash: 0.68 + Math.random() * 0.35,
      angle: Math.random() * TAU,
      color: theme.crater,
    });
  }
  for (let i = 0; i < 13; i += 1) {
    const p = randomMapPoint(170, 360);
    const long = Math.random() < 0.55;
    warMap.barriers.push({
      x: p.x,
      y: p.y,
      w: long ? 120 + Math.random() * 120 : 42 + Math.random() * 48,
      h: long ? 34 + Math.random() * 28 : 92 + Math.random() * 90,
      color: theme.cover,
    });
  }
}

function resize() {
  const mobile = window.innerWidth <= 820 || navigator.maxTouchPoints > 0;
  const dpr = Math.min(devicePixelRatio || 1, mobile ? 1.25 : 1.75);
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.floor(rect.width * dpr);
  canvas.height = Math.floor(rect.height * dpr);
  camera.scale = dpr;
}

function setMouseFromEvent(event) {
  const rect = canvas.getBoundingClientRect();
  mouse.x = (event.clientX - rect.left) * (canvas.width / rect.width);
  mouse.y = (event.clientY - rect.top) * (canvas.height / rect.height);
}

function chooseTankCard(tank) {
  const button = document.createElement("button");
  const locked = starterNeedsPassword(tank);
  button.className = `tank-card${locked ? " password-locked" : ""}`;
  button.innerHTML = `
    ${starterPortrait(tank)}
    <h3>${tank.name}</h3>
    <p>${tank.description}</p>
    <div class="stats">${tank.stats.map((stat) => `<span class="stat">${stat}</span>`).join("")}${locked ? `<span class="stat password-stat">Password</span>` : ""}</div>
  `;
  button.addEventListener("click", () => {
    if (starterNeedsPassword(tank) && !hasPasswordAccess()) {
      if (waveSkipStatus) waveSkipStatus.textContent = "Password needed for Tazer, Dragon Tamer, Incendiary, Juggernaut, and Ultra.";
      return;
    }
    resetGame(tank.key, selectedGameMode);
  });
  return button;
}

function starterPortrait(tank) {
  const loadout = tank.variant ? createVariantLoadout(tank.variant, 1) : null;
  const mods = loadout?.mods || {
    bulletCount: 1,
    bulletSpread: 0,
    fireworkFragments: 0,
    omniFire: false,
    gammaArcs: 1,
    gammaLightningDamage: 1,
    gammaLightningChain: 0,
    gammaLightningRadius: 1,
    gammaLightningBurst: 1,
    gammaLightningStun: 1,
  };
  const name = tank.name;
  const family = tank.familyKey || tank.key;
  const body = tank.color;
  const accent = tank.accent;
  if (family === "helicopter") {
    return `
      <svg class="tank-portrait" viewBox="0 0 260 112" role="img" aria-label="${name}">
        <rect x="16" y="16" width="228" height="82" rx="8" fill="rgba(255,255,255,0.035)"/>
        <g transform="translate(122 56)">
          <ellipse cx="4" cy="20" rx="54" ry="12" fill="rgba(0,0,0,0.24)"/>
          <path d="M-58 0 H58 M0 -39 V39" stroke="rgba(234,255,255,0.88)" stroke-width="6" stroke-linecap="round"/>
          <ellipse cx="0" cy="0" rx="36" ry="19" fill="${body}"/>
          <ellipse cx="15" cy="0" rx="18" ry="12" fill="${accent}"/>
          <path d="M-28 0 H-78" stroke="${body}" stroke-width="10" stroke-linecap="round"/>
          <path d="M-92 -13 L-75 0 L-92 13 Z" fill="${accent}"/>
          <path d="M-96 0 H-78 M-87 -9 V9" stroke="rgba(234,255,255,0.78)" stroke-width="4" stroke-linecap="round"/>
          <rect x="18" y="-5" width="58" height="10" rx="5" fill="${accent}"/>
          <circle cx="80" cy="0" r="5" fill="#ffef8f"/>
        </g>
      </svg>
    `;
  }
  if (family === "infantry") {
    return `
      <svg class="tank-portrait" viewBox="0 0 260 112" role="img" aria-label="${name}">
        <rect x="16" y="16" width="228" height="82" rx="8" fill="rgba(255,255,255,0.035)"/>
        <g transform="translate(120 56)">
          <ellipse cx="0" cy="24" rx="32" ry="10" fill="rgba(0,0,0,0.25)"/>
          <circle cx="0" cy="0" r="22" fill="${body}"/>
          <circle cx="7" cy="0" r="13" fill="${accent}"/>
          <path d="M12 -8 L44 -20 M12 8 L44 20" stroke="${accent}" stroke-width="9" stroke-linecap="round"/>
          <circle cx="50" cy="-23" r="10" fill="#f2ca52"/>
          <circle cx="50" cy="23" r="10" fill="#f2ca52"/>
          <path d="M-12 18 L-26 35 M12 18 L28 35" stroke="rgba(0,0,0,0.35)" stroke-width="5" stroke-linecap="round"/>
        </g>
      </svg>
    `;
  }
  const weapon = starterWeaponSvg(name, family, mods, accent);
  const skin = starterSkinSvg(name, accent);

  return `
    <svg class="tank-portrait" viewBox="0 0 260 112" role="img" aria-label="${name}">
      <rect x="16" y="16" width="228" height="82" rx="8" fill="rgba(255,255,255,0.035)"/>
      <g transform="translate(112 56)">
        <rect x="-48" y="26" width="96" height="14" rx="7" fill="rgba(0,0,0,0.32)"/>
        <rect x="-48" y="-40" width="96" height="14" rx="7" fill="rgba(0,0,0,0.32)"/>
        <rect x="-42" y="-27" width="84" height="54" rx="11" fill="${body}"/>
        <rect x="-17" y="-18" width="34" height="36" rx="8" fill="${accent}"/>
        ${skin}
        ${weapon}
      </g>
    </svg>
  `;
}

function starterWeaponSvg(name, family, mods, accent) {
  if (mods.omniFire) {
    const barrels = Array.from({ length: 16 }, (_, i) => {
      const angle = (i / 16) * 360;
      return `<rect x="15" y="-3" width="34" height="6" rx="3" fill="${accent}" transform="rotate(${angle})"/>`;
    }).join("");
    return `${barrels}<circle cx="0" cy="0" r="34" fill="none" stroke="#ff4fd8" stroke-width="3"/>`;
  }
  if (family === "flame") {
    return `<rect x="15" y="-8" width="64" height="16" rx="8" fill="${accent}"/><circle cx="82" cy="0" r="8" fill="${name.includes("Blue") ? "#56cfff" : "#ff8e33"}"/>`;
  }
  if (family === "gamma") {
    return `<rect x="15" y="-5" width="48" height="10" rx="5" fill="${accent}"/><path d="M30 -18 A24 24 0 0 1 30 18" fill="none" stroke="${GAMMA_BLUE}" stroke-width="3"/><path d="M40 -27 A36 36 0 0 1 40 27" fill="none" stroke="${GAMMA_BLUE}" stroke-width="3"/>`;
  }
  if (family === "railgun") {
    return `<rect x="10" y="-7" width="82" height="14" rx="4" fill="${accent}"/><rect x="20" y="-2" width="70" height="4" fill="#eaffff"/><circle cx="94" cy="0" r="6" fill="#88f7ff"/>`;
  }
  if (family === "shotgun") {
    return [-18, -9, 0, 9, 18].map((angle) => `<rect x="12" y="-5" width="54" height="10" rx="5" fill="${accent}" transform="rotate(${angle})"/>`).join("");
  }
  if (name.includes("Thunder God")) {
    return `<rect x="12" y="-6" width="58" height="12" rx="6" fill="${accent}"/><path d="M72 -22 L58 0 H78 L62 26" fill="none" stroke="#eaffff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`;
  }
  if (name.includes("Incendiary") || mods.afterburnDps) {
    return `<rect x="8" y="-15" width="60" height="30" rx="11" fill="${accent}"/><circle cx="76" cy="0" r="12" fill="#ff3d1f"/><path d="M84 -13 C104 -2 102 10 86 18 C92 6 78 3 84 -13 Z" fill="#ffd36d"/>`;
  }
  if (mods.fireworkFragments) {
    return `<rect x="14" y="-12" width="58" height="24" rx="9" fill="${accent}"/><circle cx="78" cy="0" r="9" fill="#ffcf5f"/>`;
  }
  if (name.includes("Fan") || name.includes("Scatter")) {
    return [-24, -12, 0, 12, 24].map((angle) => `<rect x="14" y="-3" width="48" height="6" rx="3" fill="${accent}" transform="rotate(${angle})"/>`).join("");
  }
  if (name.includes("Siege") || name.includes("Breaker") || name.includes("Bulwark")) {
    return `<rect x="12" y="-12" width="70" height="24" rx="7" fill="${accent}"/><rect x="62" y="-8" width="16" height="16" fill="rgba(0,0,0,0.22)"/>`;
  }
  if (name.includes("Needle") || name.includes("Longshot")) {
    return `<rect x="12" y="-4" width="82" height="8" rx="4" fill="${accent}"/><rect x="72" y="-2" width="18" height="4" fill="rgba(255,255,255,0.55)"/>`;
  }
  const barrels = Math.min(6, mods.bulletCount || 1);
  return Array.from({ length: barrels }, (_, i) => {
    const offset = (i - (barrels - 1) / 2) * 8;
    const length = name.includes("Auto") || name.includes("Cyclone") ? 38 : 52;
    return `<rect x="14" y="${offset - 3}" width="${length}" height="6" rx="3" fill="${accent}"/>`;
  }).join("");
}

function starterSkinSvg(name, accent) {
  if (name === "Enemy Tank") return `<rect x="-42" y="-27" width="84" height="54" rx="11" fill="#8b4141"/><path d="M-28 -18 H28 M-28 18 H28" stroke="#ece6cc" stroke-width="5"/><circle cx="0" cy="0" r="10" fill="#ff7665"/>`;
  if (name.includes("Rail") || name.includes("Volt")) return `<rect x="-34" y="-30" width="68" height="8" rx="4" fill="#88f7ff"/><rect x="-34" y="22" width="68" height="8" rx="4" fill="#88f7ff"/><circle cx="0" cy="0" r="13" fill="none" stroke="#eaffff" stroke-width="4"/><path d="M-28 -14 H28 M-28 14 H28" stroke="${accent}" stroke-width="4"/>`;
  if (name.includes("Shotgun") || name.includes("Buckshot") || name.includes("Slugstorm") || name.includes("Sweeper")) return `<path d="M-32 -20 H26 L38 0 L26 20 H-32 Z" fill="rgba(255,159,90,0.38)"/><circle cx="-10" cy="0" r="7" fill="#ff9f5a"/><circle cx="10" cy="-8" r="5" fill="#ffd36d"/><circle cx="12" cy="10" r="5" fill="#ffd36d"/>`;
  if (name.includes("Vampire")) return `<circle cx="-10" cy="0" r="6" fill="#ff6f9f"/><circle cx="10" cy="0" r="6" fill="#ff6f9f"/><path d="M-6 14 L0 22 L6 14" fill="none" stroke="#5f001c" stroke-width="3"/>`;
  if (name.includes("Thunder God")) return `<path d="M-6 -36 L-24 0 H-6 L-18 36 L22 -8 H4 L18 -36 Z" fill="#fff06d"/><circle cx="0" cy="0" r="18" fill="none" stroke="#8df5ff" stroke-width="4"/>`;
  if (name.includes("Juggernaut")) return `<rect x="-48" y="-22" width="7" height="44" fill="#f0d37a"/><rect x="41" y="-22" width="7" height="44" fill="#f0d37a"/><rect x="-22" y="-34" width="44" height="7" fill="#f0d37a"/>`;
  if (name.includes("Incendiary")) return `<path d="M-34 -20 H24 L38 0 L24 20 H-34 Z" fill="rgba(255,123,56,0.4)"/><circle cx="-16" cy="-8" r="5" fill="#ffcf5f"/><circle cx="4" cy="10" r="6" fill="#ff7b38"/><path d="M18 -22 C32 -10 30 8 14 18 C21 4 10 -2 18 -22 Z" fill="#ff3d1f"/>`;
  if (name.includes("Sprinter")) return `<path d="M-42 -25 L-70 -40 L-36 -6 Z M-42 25 L-70 40 L-36 6 Z" fill="#55d6ff"/>`;
  if (name.includes("Scholar")) return `<rect x="-18" y="-24" width="36" height="7" fill="#c5ff6f"/><rect x="-18" y="17" width="36" height="7" fill="#c5ff6f"/><rect x="-12" y="-14" width="24" height="28" fill="#d7d3ec"/>`;
  if (name.includes("Piercer")) return `<path d="M-28 -22 L28 22 M-28 22 L28 -22" stroke="#8cffb2" stroke-width="4"/>`;
  if (name.includes("Boss Hunter") || name.includes("Sharpshooter")) return `<circle cx="0" cy="0" r="20" fill="none" stroke="${name.includes("Boss") ? "#ff5959" : "#9adfff"}" stroke-width="3"/><path d="M-28 0 H28 M0 -28 V28" stroke="${name.includes("Boss") ? "#ff5959" : "#9adfff"}" stroke-width="3"/>`;
  if (name.includes("Medic")) return `<rect x="-6" y="-24" width="12" height="48" fill="#77ff9b"/><rect x="-24" y="-6" width="48" height="12" fill="#77ff9b"/>`;
  if (name.includes("Commander")) return `<path d="M-4 -18 L-22 -42 M4 -18 L22 -42" stroke="#ffeb73" stroke-width="4"/><circle cx="-22" cy="-42" r="5" fill="#ffeb73"/><circle cx="22" cy="-42" r="5" fill="#ffeb73"/>`;
  if (name.includes("Shield")) return `<path d="M-32 -16 A36 36 0 0 0 -32 16" fill="none" stroke="#a7c7ff" stroke-width="5"/>`;
  if (name.includes("Firework")) return `<circle cx="-14" cy="-14" r="4" fill="#ffcf5f"/><circle cx="0" cy="18" r="4" fill="#ffcf5f"/><circle cx="16" cy="-10" r="4" fill="#ffcf5f"/>`;
  return "";
}

function buildStart() {
  modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedGameMode = button.dataset.mode || "evolution";
      modeButtons.forEach((item) => item.classList.toggle("active", item === button));
      renderTankGrid();
    });
  });
  renderTankGrid();
}

function renderTankGrid() {
  tankGrid.innerHTML = "";
  starters
    .filter((tank) => !tank.modeOnly || tank.modeOnly === selectedGameMode)
    .forEach((tank) => tankGrid.appendChild(chooseTankCard(tank)));
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function distanceSq(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return dx * dx + dy * dy;
}

function refreshEntityCounts() {
  entityCounts.hostiles = 0;
  entityCounts.infantry = 0;
  entityCounts.armyThreats = 0;
  entityCounts.allies = 0;
  enemies.forEach((tank) => {
    if (tank.team === "ally") {
      entityCounts.allies += 1;
      return;
    }
    if (tank.infantry) entityCounts.infantry += 1;
    else entityCounts.hostiles += 1;
    if (!tank.shielderTrooper) entityCounts.armyThreats += 1;
  });
}

function hostileCount() {
  return entityCounts.hostiles;
}

function hostileInfantryCount() {
  return entityCounts.infantry;
}

function hostileArmyThreatCount() {
  return entityCounts.armyThreats;
}

function allyCount() {
  return entityCounts.allies;
}

function allyMaxHp() {
  return Math.max(1, Math.round(player.maxHp * ALLY_POWER_MULTIPLIER));
}

function lowRegenTank(tank) {
  return tank.tankKey === "railgun" || tank.tankKey === "juggernaut" || tank.tankKey === "gamma";
}

function regenDisabledLevel() {
  return player.level === FINAL_BOSS_LEVEL || player.level === VICTORY_BOSS_LEVEL;
}

function regenAmount(tank, dt) {
  if (regenDisabledLevel()) return 0;
  if (tank === player && player.perks.noRegen) return 0;
  if (tank.tankKey === "trooper") return 0;
  if (tank.miniTazer) return 0;
  if (tank.tankKey === "infantry") return tank.maxHp * 0.01 * dt;
  const baseRegen = tank.tankKey === "tazer" ? TAZER_REGEN_PERCENT_PER_SECOND : lowRegenTank(tank) ? LOW_REGEN_PERCENT_PER_SECOND : REGEN_PERCENT_PER_SECOND;
  if (tank.mods?.nukeExplosion && tank.tankKey !== "airstrike" && !lowRegenTank(tank)) return 0;
  const airstrikeRegen = tank.tankKey === "airstrike" ? 1.25 : 1;
  const mult = (tank === player ? player.perks.regenMult || 1 : 1) * airstrikeRegen;
  return tank.maxHp * baseRegen * mult * dt;
}

function isThunderGod() {
  return Boolean(player.perks.thunderGod);
}

function thunderGodBuffActive() {
  return isThunderGod() && (player.thunderBuffActive || 0) > 0;
}

function thunderGodStatMult() {
  const reviveMult = Math.pow(THUNDER_GOD_REVIVE_STAT_MULT, player.thunderRevivesUsed || 0);
  return (thunderGodBuffActive() ? THUNDER_GOD_STAT_MULT : 1) * reviveMult;
}

function thunderGodReviveHpMult() {
  return isThunderGod() ? Math.pow(THUNDER_GOD_REVIVE_STAT_MULT, player.thunderRevivesUsed || 0) : 1;
}

function thunderGodBaseMaxHp() {
  return Math.max(1, Math.round((player.perks.fixedMaxHp || player.maxHp || 1) * thunderGodReviveHpMult()));
}

function tryThunderGodRevive() {
  if (!isThunderGod() || !player.thunderReviveReady || (player.thunderRevivesUsed || 0) >= THUNDER_GOD_REVIVE_MAX) return false;
  player.thunderRevivesUsed += 1;
  player.thunderReviveReady = false;
  player.thunderReviveTrial = THUNDER_GOD_REVIVE_WINDOW;
  player.thunderReviveTargetLevel = player.level + 1;
  player.maxHp = thunderGodBaseMaxHp();
  player.hp = Math.max(1, Math.round(player.maxHp * 0.55));
  player.invuln = Math.max(player.invuln || 0, 2.5);
  player.stun = 0;
  player.cooldown = 0;
  addSpark(player.x, player.y, "#fff06d", 44);
  addSpark(player.x, player.y, "#8df5ff", 28);
  lightning.push({
    x1: player.x,
    y1: Math.max(0, player.y - 680),
    x2: player.x,
    y2: player.y,
    life: 0.34,
    max: 0.34,
    color: "#fff06d",
    glowColor: "rgba(255,240,109,0.55)",
    glowFade: "rgba(255,240,109,0)",
    large: true,
    skyStrike: true,
    width: 14,
    burst: 90,
  });
  if (lightning.length > MAX_LIGHTNING) lightning.splice(0, lightning.length - MAX_LIGHTNING);
  camera.shake = Math.max(camera.shake, 16);
  return true;
}

function checkPlayerDeath() {
  if (player.hp > 0) return false;
  if (tryThunderGodRevive()) return true;
  endGame();
  return true;
}

function playerDamage(amount, target = null) {
  const bossMult = target?.boss ? player.perks.bossDamageMult || 1 : 1;
  const resolveDamage = juggernautResolveActive() ? JUGGERNAUT_RESOLVE_DAMAGE_BUFF : 1;
  return amount * (player.perks.damageMult || 1) * bossMult * resolveDamage * thunderGodStatMult();
}

function enemyAttackDamage(enemy, amount) {
  const domainMult = inJuggernautDomain(enemy) ? JUGGERNAUT_DOMAIN_ENEMY_MULT : 1;
  const resolveNerf = juggernautResolveActive() && enemy?.team === "enemy" ? JUGGERNAUT_RESOLVE_ENEMY_DAMAGE_MULT : 1;
  const judgmentRisk = (enemy?.juggernautJudgment || 0) > 0 ? JUGGERNAUT_JUDGMENT_DAMAGE_MULT : 1;
  return amount * (enemy?.damageMult || 1) * domainMult * resolveNerf * judgmentRisk;
}

function tazerStormPenaltyActive() {
  return player.tankKey === "tazer" && tazerEndStorms.length > 0;
}

function tazerCannonWavePenaltyActive() {
  return player.tankKey === "tazer" && tazerCannonWaves.length > 0;
}

function playerIncomingDamage(amount) {
  const stormPenalty = tazerStormPenaltyActive() ? 3 : 1;
  const cannonWavePenalty = tazerCannonWavePenaltyActive() ? 5 : 1;
  const guardPenalty = player.tankKey === "tazer" && (player.tazerGuardActive || 0) > 0 ? TAZER_GUARD_DAMAGE_MULTIPLIER : 1;
  const dominanceDefense = juggernautPlayerBuffActive() ? 1 / JUGGERNAUT_DOMAIN_PLAYER_BUFF : 1;
  const resolveDefense = juggernautResolveActive() ? JUGGERNAUT_RESOLVE_DAMAGE_TAKEN_MULT : 1;
  const fireShieldDefense = fireShieldActive() ? FIRE_SHIELD_DAMAGE_TAKEN_MULT : 1;
  const thunderDefense = thunderGodBuffActive() ? 1 / THUNDER_GOD_STAT_MULT : 1;
  return amount * (player.perks.damageTakenMult || 1) * stormPenalty * cannonWavePenalty * guardPenalty * dominanceDefense * resolveDefense * fireShieldDefense * thunderDefense;
}

function fireShieldActive() {
  return player.tankKey === "incendiary" && player.mods?.fireShieldAbility && (player.fireShieldActive || 0) > 0;
}

function startFireShield() {
  player.fireShieldCooldown = FIRE_SHIELD_COOLDOWN;
  player.fireShieldActive = FIRE_SHIELD_DURATION;
  addSpark(player.x, player.y, "#ffef88", 24);
  camera.shake = Math.max(camera.shake, 5);
}

function dragonBurnDamage() {
  return 5 + player.level * 0.18;
}

function activeJuggernautDomain() {
  return player.tankKey === "juggernaut" && player.juggernautDomain && player.juggernautDomain.life > 0 ? player.juggernautDomain : null;
}

function inJuggernautDomain(entity) {
  const domain = activeJuggernautDomain();
  return Boolean(domain && Math.hypot(entity.x - domain.x, entity.y - domain.y) <= domain.r);
}

function clampToJuggernautDomain(enemy) {
  const domain = activeJuggernautDomain();
  if (!domain || enemy.team === "ally" || enemy.babyDragon || enemy.adultDragon || enemy.blackDragon) return;
  if (enemy.domainPrisoner === undefined) {
    enemy.domainPrisoner = Math.hypot(enemy.x - domain.x, enemy.y - domain.y) <= domain.r;
  }
  const dx = enemy.x - domain.x;
  const dy = enemy.y - domain.y;
  const dist = Math.hypot(dx, dy) || 1;
  const boundary = Math.max(20, domain.r - enemy.r - 2);
  if (enemy.domainPrisoner && dist > boundary) {
    enemy.x = domain.x + (dx / dist) * boundary;
    enemy.y = domain.y + (dy / dist) * boundary;
  } else if (!enemy.domainPrisoner && dist < domain.r + enemy.r + 2) {
    const outside = domain.r + enemy.r + 3;
    enemy.x = domain.x + (dx / dist) * outside;
    enemy.y = domain.y + (dy / dist) * outside;
  }
}

function juggernautPlayerBuffActive() {
  return Boolean(activeJuggernautDomain());
}

function juggernautResolveActive() {
  return player.tankKey === "juggernaut" && (player.juggernautResolveActive || 0) > 0;
}

function applyJuggernautJudgment(enemy) {
  if (!enemy || enemy.team === "ally") return;
  enemy.juggernautJudgment = Math.max(enemy.juggernautJudgment || 0, JUGGERNAUT_JUDGMENT_DURATION);
  enemy.juggernautJudgmentPulse = 0.35;
  addSpark(enemy.x, enemy.y, "#f0d37a", 8);
}

function startJuggernautResolve() {
  player.juggernautResolveCooldown = JUGGERNAUT_RESOLVE_COOLDOWN;
  player.juggernautResolveActive = JUGGERNAUT_RESOLVE_DURATION;
  const baseMaxHp = Math.max(1, player.maxHp - (player.juggernautResolveHpBonus || 0));
  player.juggernautResolveHpBonus = Math.max(1, Math.round(baseMaxHp * (JUGGERNAUT_RESOLVE_HP_MULT - 1)));
  player.maxHp = baseMaxHp + player.juggernautResolveHpBonus;
  player.hp = Math.min(player.maxHp, player.hp + player.juggernautResolveHpBonus);
  addSpark(player.x, player.y, "#ffe58a", 22);
  camera.shake = Math.max(camera.shake, 5);
}

function endJuggernautResolve() {
  const bonus = player.juggernautResolveHpBonus || 0;
  if (bonus > 0) {
    player.maxHp = Math.max(1, player.maxHp - bonus);
    player.hp = Math.min(player.hp, player.maxHp);
    player.juggernautResolveHpBonus = 0;
  }
}

function startJuggernautDomain() {
  const viewRadius = Math.max(canvas.width, canvas.height) / (2 * camera.scale);
  player.juggernautDomain = {
    x: player.x,
    y: player.y,
    r: Math.max(JUGGERNAUT_DOMAIN_RADIUS, viewRadius * 0.82),
    life: JUGGERNAUT_DOMAIN_DURATION,
    max: JUGGERNAUT_DOMAIN_DURATION,
  };
  player.juggernautDomainCooldown = JUGGERNAUT_DOMAIN_COOLDOWN;
  enemies.forEach((enemy) => {
    enemy.domainPrisoner = Math.hypot(enemy.x - player.juggernautDomain.x, enemy.y - player.juggernautDomain.y) <= player.juggernautDomain.r;
  });
  addSpark(player.x, player.y, "#f0d37a", 24);
  camera.shake = Math.max(camera.shake, 7);
}

function updateJuggernautDomain(dt) {
  player.juggernautDomainCooldown = Math.max(0, (player.juggernautDomainCooldown || 0) - dt);
  player.juggernautJudgmentCooldown = Math.max(0, (player.juggernautJudgmentCooldown || 0) - dt);
  player.juggernautResolveCooldown = Math.max(0, (player.juggernautResolveCooldown || 0) - dt);
  if (player.tankKey !== "juggernaut" && (player.juggernautResolveHpBonus || 0) > 0) {
    endJuggernautResolve();
  }
  const resolveWasActive = (player.juggernautResolveActive || 0) > 0;
  player.juggernautResolveActive = Math.max(0, (player.juggernautResolveActive || 0) - dt);
  if (resolveWasActive && player.juggernautResolveActive <= 0) endJuggernautResolve();
  const domain = player.juggernautDomain;
  if (!domain) return;
  domain.life -= dt;
  if (domain.life <= 0 || player.tankKey !== "juggernaut") {
    player.juggernautDomain = null;
    enemies.forEach((enemy) => {
      delete enemy.domainPrisoner;
    });
  }
}

function enemyIncomingDamage(enemy, amount) {
  let finalAmount = inJuggernautDomain(enemy) ? amount * JUGGERNAUT_DOMAIN_PLAYER_BUFF : amount;
  if (juggernautResolveActive() && enemy?.team === "enemy") finalAmount *= 1 / JUGGERNAUT_RESOLVE_ENEMY_HP_MULT;
  if (!enemy?.shielderTrooper) {
    applyPlayerLifesteal(enemy, finalAmount);
    return finalAmount;
  }
  triggerShielderThorns(enemy, finalAmount);
  const shieldedDamage = finalAmount * 0.2;
  applyPlayerLifesteal(enemy, shieldedDamage);
  return shieldedDamage;
}

function applyPlayerLifesteal(enemy, damage) {
  const lifeSteal = player.perks.lifeSteal || 0;
  if (!lifeSteal || enemy?.team === "ally" || damage <= 0 || player.hp <= 0) return;
  const actualDamage = Math.max(0, Math.min(enemy?.hp ?? damage, damage));
  if (actualDamage <= 0) return;
  player.hp = Math.min(player.maxHp, player.hp + actualDamage * lifeSteal);
}

function shielderDamage(target, amount) {
  if (!target?.shielderTrooper) return amount;
  triggerShielderThorns(target, amount);
  return amount * 0.2;
}

function triggerShielderThorns(shielder, incomingAmount) {
  if ((shielder.thornsCooldown || 0) > 0) return;
  shielder.thornsCooldown = 0.22;
  const damage = Math.max(1.5, incomingAmount * 0.22);
  if (shielder.team === "ally") {
    let target = null;
    let best = 150 * 150;
    enemies.forEach((enemy) => {
      if (enemy.team === "ally") return;
      const d = distanceSq(shielder, enemy);
      if (d < best) {
        best = d;
        target = enemy;
      }
    });
    if (!target) return;
    target.hp -= enemyIncomingDamage(target, damage);
    markHit(target, damage * 0.5, shielder);
    lightning.push({ x1: shielder.x, y1: shielder.y, x2: target.x, y2: target.y, life: 0.12, max: 0.12, color: "#a7c7ff" });
  } else {
    if (distance(shielder, player) > 210 || player.invuln > 0) return;
    const hit = playerIncomingDamage(damage);
    player.hp -= hit;
    player.invuln = 0.06;
    markHit(player, hit, shielder);
    lightning.push({ x1: shielder.x, y1: shielder.y, x2: player.x, y2: player.y, life: 0.12, max: 0.12, color: "#a7c7ff" });
    if (player.hp <= 0) checkPlayerDeath();
  }
  if (lightning.length > MAX_LIGHTNING) lightning.splice(0, lightning.length - MAX_LIGHTNING);
}

function playerPierce() {
  return PLAYER_WEAPON_PIERCE + (player.perks.extraPierce || 0);
}

function currentAllyChance() {
  return player.perks.allyChance ?? ALLY_SPAWN_CHANCE;
}

function setupMultiplayer() {
  if (!multiplayer.enabled || !("WebSocket" in window)) return;
  const protocol = location.protocol === "https:" ? "wss" : "ws";
  const socket = new WebSocket(`${protocol}://${location.host}/ws`);
  multiplayer.socket = socket;
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.type === "role") {
      multiplayer.id = message.id;
      multiplayer.role = message.role;
      if (message.role === "host") return;
      gameState = "remote";
      showOnly();
    } else if (message.type === "enemyInput" && multiplayer.role === "host") {
      multiplayer.remoteInputs.set(message.id, message.input);
    } else if (message.type === "leave" && multiplayer.role === "host") {
      multiplayer.remoteInputs.delete(message.id);
      const remote = enemies.find((enemy) => enemy.remoteId === message.id);
      if (remote) remote.hp = 0;
    } else if (message.type === "snapshot" && multiplayer.role === "enemy") {
      multiplayer.remoteSnapshot = message.state;
    }
  });
  socket.addEventListener("close", () => {
    multiplayer.role = "offline";
    multiplayer.socket = null;
  });
}

function sendMultiplayer(message) {
  if (!multiplayer.socket || multiplayer.socket.readyState !== WebSocket.OPEN) return;
  multiplayer.socket.send(JSON.stringify(message));
}

function applyRemotePlayers(dt) {
  if (multiplayer.role !== "host") return;
  multiplayer.remoteInputs.forEach((input, id) => {
    let remote = enemies.find((enemy) => enemy.remoteId === id);
    if (!remote) {
      const remoteMaxHp = Math.max(1, Math.round(scaledTankMaxHp(Math.max(1, player.level - 1)) * SPECIAL_ENEMY_HP_SCALE));
      remote = {
        id: nextEnemyId,
        remoteId: id,
        controlled: true,
        team: "enemy",
        tankKey: "default",
        buildName: "FFA Player Tank",
        color: "#8e4141",
        accent: "#ffcf5f",
        mods: createVariantLoadout("defaultTwin", Math.max(1, player.level - 1)).mods,
        level: Math.max(1, player.level - 1),
        x: clamp(player.x + 520 * (Math.random() - 0.5), 60, world.w - 60),
        y: clamp(player.y + 520 * (Math.random() - 0.5), 60, world.h - 60),
        r: 23,
        hp: remoteMaxHp,
        maxHp: remoteMaxHp,
        speed: 205,
        angle: 0,
        cooldown: 0,
        burn: 0,
        burnDps: 0,
      };
      enemies.push(remote);
      nextEnemyId += 1;
    }
    const len = Math.hypot(input.dx || 0, input.dy || 0) || 1;
    remote.x = clamp(remote.x + ((input.dx || 0) / len) * remote.speed * dt, 32, world.w - 32);
    remote.y = clamp(remote.y + ((input.dy || 0) / len) * remote.speed * dt, 32, world.h - 32);
    remote.angle = input.angle || 0;
    remote.cooldown -= dt;
    if (input.fire && remote.cooldown <= 0) {
      enemyFire(remote, { x: remote.x + Math.cos(remote.angle) * 400, y: remote.y + Math.sin(remote.angle) * 400, r: 0 });
      remote.cooldown = 0.42;
    }
  });
}

function multiplayerSnapshot() {
  const packTank = (tank) => ({
    remoteId: tank.remoteId,
    controlled: !!tank.controlled,
    x: tank.x,
    y: tank.y,
    r: tank.r,
    hp: tank.hp,
    maxHp: tank.maxHp,
    angle: tank.angle,
    tankKey: tank.tankKey,
    buildName: tank.buildName,
    color: tank.color,
    accent: tank.accent,
    team: tank.team,
    mods: tank.mods,
  });
  return {
    player: packTank(player),
    enemies: enemies.map(packTank),
  };
}

function updateMultiplayer(dt) {
  if (multiplayer.role === "host") {
    multiplayer.stateTimer += dt;
    if (multiplayer.stateTimer >= 0.05) {
      multiplayer.stateTimer = 0;
      sendMultiplayer({ type: "snapshot", state: multiplayerSnapshot() });
    }
  } else if (multiplayer.role === "enemy") {
    multiplayer.sendTimer += dt;
    if (multiplayer.sendTimer >= 0.033) {
      multiplayer.sendTimer = 0;
      let dx = 0;
      let dy = 0;
      if (keys.has("w") || keys.has("arrowup")) dy -= 1;
      if (keys.has("s") || keys.has("arrowdown")) dy += 1;
      if (keys.has("a") || keys.has("arrowleft")) dx -= 1;
      if (keys.has("d") || keys.has("arrowright")) dx += 1;
      dx += touchMove.dx;
      dy += touchMove.dy;
      const angle = Math.atan2(mouse.y - canvas.height / 2, mouse.x - canvas.width / 2);
      sendMultiplayer({ type: "input", input: { dx, dy, angle, fire: mouse.down || keys.has(" ") } });
    }
  }
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function angleTo(from, to) {
  return Math.atan2(to.y - from.y, to.x - from.x);
}

function isInCone(origin, target, angle, reach, width) {
  const d = distance(origin, target);
  const diff = Math.atan2(Math.sin(angleTo(origin, target) - angle), Math.cos(angleTo(origin, target) - angle));
  return d < reach + (target.r || 0) && Math.abs(diff) < width;
}

function findNearestTank(source, team) {
  let nearest = null;
  let nearestDistSq = Infinity;
  enemies.forEach((tank) => {
    if (tank === source || tank.team !== team) return;
    const d = distanceSq(source, tank);
    if (d < nearestDistSq) {
      nearest = tank;
      nearestDistSq = d;
    }
  });
  return nearest;
}

function findPriorityAllyTarget(source) {
  let nearestDragon = null;
  let nearestDragonDistSq = Infinity;
  let nearestAlly = null;
  let nearestAllyDistSq = Infinity;
  enemies.forEach((tank) => {
    if (tank === source || tank.team !== "ally") return;
    const d = distanceSq(source, tank);
    if ((tank.babyDragon || tank.adultDragon || tank.blackDragon) && d < nearestDragonDistSq) {
      nearestDragon = tank;
      nearestDragonDistSq = d;
    }
    if (d < nearestAllyDistSq) {
      nearestAlly = tank;
      nearestAllyDistSq = d;
    }
  });
  return nearestDragon || nearestAlly;
}

function findDragonTarget(source) {
  let nearest = null;
  let nearestDistSq = Infinity;
  enemies.forEach((tank) => {
    if (tank.team !== "ally" || (!tank.babyDragon && !tank.adultDragon && !tank.blackDragon)) return;
    const d = distanceSq(source, tank);
    if (d < nearestDistSq) {
      nearest = tank;
      nearestDistSq = d;
    }
  });
  return nearest;
}

function findBlackDragonTarget(source) {
  let bestTarget = null;
  let bestScore = Infinity;
  enemies.forEach((enemy) => {
    if (enemy.team === "ally") return;
    let score = distanceSq(source, enemy);
    if (enemy.boss) score *= 0.18;
    else if (!enemy.infantry) score *= 0.45;
    else if (enemy.shielderTrooper) score *= 1.35;
    if (score < bestScore) {
      bestScore = score;
      bestTarget = enemy;
    }
  });
  return bestTarget;
}

function findTrooperShielderTarget(source) {
  if (activeGameMode !== "infantryArmy" || player.tankKey !== "trooper") return null;
  if (source.trooperTargetsPlayer === undefined) source.trooperTargetsPlayer = Math.random() < 0.2;
  if (source.trooperTargetsPlayer) return null;
  let nearest = null;
  let nearestDistSq = Infinity;
  enemies.forEach((tank) => {
    if (tank.team !== "ally" || !tank.deployedShielder) return;
    const d = distanceSq(source, tank);
    if (d < nearestDistSq) {
      nearest = tank;
      nearestDistSq = d;
    }
  });
  return nearest;
}

function findNearestHostileToPlayer() {
  let nearest = null;
  let nearestDistSq = Infinity;
  enemies.forEach((enemy) => {
    if (enemy.team === "ally") return;
    const d = distanceSq(player, enemy);
    if (d < nearestDistSq) {
      nearest = enemy;
      nearestDistSq = d;
    }
  });
  return nearest;
}

function chooseSpawnLoadout(level) {
  if (Math.random() < 0.45) {
    const starter = enemyStarterOptions()[Math.floor(Math.random() * enemyStarterOptions().length)];
    if (starter.key === "dragonTamer") {
      return {
        tankKey: "dragonTamer",
        buildName: "Enemy Dragon Tamer",
        color: starter.color,
        accent: starter.accent,
        mods: { fireRate: 1, bulletSpeed: 1, bulletCount: 1, bulletSpread: 0, shellDamage: 1, shellSize: 1, range: 1.45 },
        speed: 168 + level * 2,
      };
    }
    const loadout = createVariantLoadout(starter.variant || "defaultBase", level);
    return {
      tankKey: starter.familyKey || "default",
      buildName: starter.name,
      color: starter.color,
      accent: starter.accent,
      ...loadout,
    };
  }

  const familyKeys = Object.keys(enemyFamilies).filter((key) => key !== "antiAir");
  const tankKey = player.tankKey === "helicopter" && Math.random() < 0.3 ? "antiAir" : familyKeys[Math.floor(Math.random() * familyKeys.length)];
  const family = enemyFamilies[tankKey];
  if (level <= 1) {
    const baseVariant =
      tankKey === "default" || tankKey === "flame" || tankKey === "gamma" || tankKey === "railgun" || tankKey === "shotgun"
        ? `${tankKey}Base`
        : tankKey === "juggernaut"
          ? "defaultJuggernaut"
          : tankKey === "antiAir"
            ? "antiAirBase"
          : family.variants[0][2].variant;
    const earlyPool = [
      {
        tankKey,
        buildName: family.baseName,
        color: family.color,
        accent: family.accent,
        ...createVariantLoadout(baseVariant, level),
      },
      ...family.variants
        .filter(([, , effect]) => (variantStages[effect.variant] || 2) === 2)
        .map(([buildName, , effect]) => ({
          tankKey,
          buildName,
          color: effect.color,
          accent: effect.accent,
          ...createVariantLoadout(effect.variant, level),
        })),
    ];
    return earlyPool[Math.floor(Math.random() * earlyPool.length)];
  }
  const enemyStage = Math.min(MAX_EVOLUTION_STAGE, Math.max(2, Math.floor(level / 2) + 1));
  let stagedVariants = family.variants.filter(([, , effect]) => (variantStages[effect.variant] || 2) === enemyStage);
  if (stagedVariants.length === 0) {
    stagedVariants = family.variants.filter(([, , effect]) => (variantStages[effect.variant] || 2) <= enemyStage);
  }
  const [buildName, , effect] = stagedVariants[Math.floor(Math.random() * stagedVariants.length)];
  return {
    tankKey,
    buildName,
    color: effect.color,
    accent: effect.accent,
    ...createVariantLoadout(effect.variant, level),
  };
}

function addSpark(x, y, color, count = 6) {
  if (sparks.length > MAX_SPARKS) sparks.splice(0, sparks.length - MAX_SPARKS);
  count = Math.ceil(count * 0.45);
  count = Math.min(count, Math.max(0, MAX_SPARKS - sparks.length));
  for (let i = 0; i < count; i += 1) {
    const a = Math.random() * TAU;
    const speed = 45 + Math.random() * 120;
    sparks.push({ x, y, vx: Math.cos(a) * speed, vy: Math.sin(a) * speed, life: 0.35, max: 0.35, color });
  }
}

function markHit(tank, damage = 1, source = null) {
  tank.hitFlash = 0.18;
  tank.hitPulse = 0.18;
  if ((source?.kind === "beam" || source?.kind === "allyBeam" || source?.kind === "enemyBeam") && !source.noStun) {
    tank.stun = Math.max(tank.stun || 0, 0.28);
    tank.knockVx = 0;
    tank.knockVy = 0;
  } else if (source?.noKnockback) {
    tank.knockVx = 0;
    tank.knockVy = 0;
  } else if (source) {
    const a = angleTo(source, tank);
    const strength = Math.min(1.6, 0.55 + damage * 0.08);
    tank.knockVx = (tank.knockVx || 0) + Math.cos(a) * HIT_KNOCKBACK_SPEED * strength;
    tank.knockVy = (tank.knockVy || 0) + Math.sin(a) * HIT_KNOCKBACK_SPEED * strength;
  }
  if (tank === player) camera.shake = Math.max(camera.shake, 9);
}

function distanceToBeam(beam, target) {
  const endX = beam.x + Math.cos(beam.angle) * beam.range;
  const endY = beam.y + Math.sin(beam.angle) * beam.range;
  const dx = endX - beam.x;
  const dy = endY - beam.y;
  const lenSq = dx * dx + dy * dy || 1;
  const t = clamp(((target.x - beam.x) * dx + (target.y - beam.y) * dy) / lenSq, 0, 1);
  const closestX = beam.x + dx * t;
  const closestY = beam.y + dy * t;
  return Math.hypot(target.x - closestX, target.y - closestY);
}

function distanceAlongBeam(beam, target) {
  const dx = Math.cos(beam.angle);
  const dy = Math.sin(beam.angle);
  return (target.x - beam.x) * dx + (target.y - beam.y) * dy;
}

function barrierBounds(barrier, pad = 0) {
  return {
    left: barrier.x - barrier.w / 2 - pad,
    right: barrier.x + barrier.w / 2 + pad,
    top: barrier.y - barrier.h / 2 - pad,
    bottom: barrier.y + barrier.h / 2 + pad,
  };
}

function segmentRectHitT(x1, y1, x2, y2, rect) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  let tMin = 0;
  let tMax = 1;

  if (Math.abs(dx) < 0.0001) {
    if (x1 < rect.left || x1 > rect.right) return null;
  } else {
    const tx1 = (rect.left - x1) / dx;
    const tx2 = (rect.right - x1) / dx;
    tMin = Math.max(tMin, Math.min(tx1, tx2));
    tMax = Math.min(tMax, Math.max(tx1, tx2));
  }

  if (Math.abs(dy) < 0.0001) {
    if (y1 < rect.top || y1 > rect.bottom) return null;
  } else {
    const ty1 = (rect.top - y1) / dy;
    const ty2 = (rect.bottom - y1) / dy;
    tMin = Math.max(tMin, Math.min(ty1, ty2));
    tMax = Math.min(tMax, Math.max(ty1, ty2));
  }

  return tMax >= tMin ? tMin : null;
}

function wallHitOnSegment(x1, y1, x2, y2, radius = 0) {
  let best = null;
  warMap.barriers.forEach((barrier) => {
    const t = segmentRectHitT(x1, y1, x2, y2, barrierBounds(barrier, radius));
    if (t === null || t < 0 || t > 1 || (best && t >= best.t)) return;
    best = {
      t,
      x: x1 + (x2 - x1) * t,
      y: y1 + (y2 - y1) * t,
    };
  });
  return best;
}

function clipBeamToWalls(beam) {
  if (!beam || beam.range <= 0 || warMap.barriers.length === 0) return;
  const endX = beam.x + Math.cos(beam.angle) * beam.range;
  const endY = beam.y + Math.sin(beam.angle) * beam.range;
  const hit = wallHitOnSegment(beam.x, beam.y, endX, endY, beam.r || 0);
  if (!hit) return;
  const hitDistance = Math.hypot(hit.x - beam.x, hit.y - beam.y);
  beam.range = Math.max(0, hitDistance - 2);
  beam.wallBlocked = true;
  if (!beam.wallSparked) {
    addSpark(hit.x, hit.y, beam.color || "#f1f1dc", 5);
    beam.wallSparked = true;
  }
}

function railBlockChance(bullet) {
  const heavy = bullet.nukeExplosion || bullet.fireworkFragments || bullet.r > 7;
  const hpBonus = clamp((bullet.hp || bullet.damage || 1) / 40, 0, 0.24);
  return (heavy ? 0.52 : 0.28) + hpBonus;
}

function detonateGammaLightning(bullet, ownerTeam = "player") {
  const color = bullet.color || GAMMA_BLUE;
  const hitTargets = new Set();
  let current = bullet;
  const chainBonus = Math.max(0, Math.round(bullet.gammaLightningChain || 0));
  const chainCount = GAMMA_LIGHTNING_CHAIN_COUNT + chainBonus;
  const radius = GAMMA_LIGHTNING_RADIUS * (bullet.gammaLightningRadius || 1);
  const burstScale = bullet.gammaLightningBurst || 1;
  const stunSeconds = GAMMA_LIGHTNING_STUN_SECONDS * (bullet.gammaLightningStun || 1);
  let currentDamage = (bullet.damage || GAMMA_DAMAGE) * GAMMA_LIGHTNING_MULTIPLIER * (bullet.gammaLightningDamage || 1);

  for (let jump = 0; jump <= chainCount; jump += 1) {
    let target = null;
    let best = radius * radius;
    if (ownerTeam === "enemy" && player.tankKey !== "helicopter" && !hitTargets.has("player")) {
      const d = distanceSq(current, player);
      if (d < best) {
        best = d;
        target = player;
      }
    }
    enemies.forEach((enemy) => {
      if (hitTargets.has(enemy.id)) return;
      if (ownerTeam === "enemy") {
        if (enemy.team !== "ally") return;
      } else if (enemy.team === "ally") {
        return;
      }
      const d = distanceSq(current, enemy);
      if (d < best) {
        best = d;
        target = enemy;
      }
    });

    const strikeX = target ? target.x : bullet.x + Math.cos((bullet.angle || 0) + Math.PI / 2) * 34;
    const strikeY = target ? target.y : bullet.y + Math.sin((bullet.angle || 0) + Math.PI / 2) * 34;
    if (jump === 0) {
      lightning.push({
        x1: strikeX + (Math.random() - 0.5) * 36,
        y1: Math.max(0, strikeY - 520),
        x2: strikeX,
        y2: strikeY,
        life: 0.38,
        max: 0.38,
        color,
        large: true,
        skyStrike: true,
        width: 16 * burstScale,
        burst: 88 * burstScale,
      });
    }
    lightning.push({
      x1: current.x,
      y1: current.y,
      x2: strikeX,
      y2: strikeY,
      life: jump === 0 ? 0.3 : 0.22,
      max: jump === 0 ? 0.3 : 0.22,
      color,
      large: true,
      width: (jump === 0 ? 12 : 8) * burstScale,
      burst: (jump === 0 ? 62 : 42) * burstScale,
    });
    if (lightning.length > MAX_LIGHTNING) lightning.splice(0, lightning.length - MAX_LIGHTNING);
    addSpark(current.x, current.y, color, jump === 0 ? 8 : 4);
    addSpark(strikeX, strikeY, GAMMA_BLUE_WHITE, jump === 0 ? 7 : 4);

    if (!target) break;
    if (target === player) {
      hitTargets.add("player");
      if (player.invuln <= 0) {
        player.hp -= playerIncomingDamage(currentDamage);
        player.invuln = 0.05;
        markHit(player, currentDamage, { ...bullet, noKnockback: true });
        player.stun = Math.max(player.stun || 0, stunSeconds);
        if (player.hp <= 0) checkPlayerDeath();
      }
    } else {
      hitTargets.add(target.id);
      const hitDamage = ownerTeam === "enemy" ? shielderDamage(target, currentDamage) : enemyIncomingDamage(target, playerDamage(currentDamage, target));
      target.hp -= hitDamage;
      markHit(target, hitDamage, { ...bullet, noKnockback: true });
      target.stun = Math.max(target.stun || 0, stunSeconds);
    }

    current = target;
    currentDamage *= GAMMA_LIGHTNING_CHAIN_FALLOFF;
  }
}

function callGammaLightningStorm() {
  if (!enemies.some((enemy) => enemy.team !== "ally")) {
    addSpark(player.x + Math.cos(player.angle) * 80, player.y + Math.sin(player.angle) * 80, GAMMA_BLUE, 10);
    return;
  }
  gammaStorms.push({
    x: player.x,
    y: player.y,
    strikesLeft: GAMMA_STORM_STRIKES,
    timer: 0,
  });
  camera.shake = Math.max(camera.shake, 5);
}

function strikeGammaStormOnce(storm) {
  const target = enemies
    .filter((enemy) => enemy.team !== "ally")
    .map((enemy) => ({ enemy, d: distanceSq(storm, enemy) + Math.random() * 16000 }))
    .sort((a, b) => a.d - b.d)[0]?.enemy;
  if (!target) return false;

  const offsetX = (Math.random() - 0.5) * 95;
  const topY = Math.max(0, target.y - 680 - Math.random() * 110);
  lightning.push({
    x1: target.x + offsetX,
    y1: topY,
    x2: target.x,
    y2: target.y,
    life: 0.4,
    max: 0.4,
    color: GAMMA_BLUE,
    large: true,
    skyStrike: true,
    width: 18,
    burst: 96,
  });
  if (lightning.length > MAX_LIGHTNING) lightning.splice(0, lightning.length - MAX_LIGHTNING);
  const damage = enemyIncomingDamage(target, playerDamage(GAMMA_STORM_DAMAGE, target));
  target.hp -= damage;
  markHit(target, damage, { x: target.x, y: topY, kind: "gammaStorm", noKnockback: true });
  addSpark(target.x, target.y, GAMMA_BLUE_WHITE, 7);
  camera.shake = Math.max(camera.shake, 5);
  return true;
}

function tazerChainAttack() {
  const muzzle = {
    x: player.x + Math.cos(player.angle) * 42,
    y: player.y + Math.sin(player.angle) * 42,
  };
  const reach = TAZER_CHAIN_RANGE;
  const zap = {
    x: muzzle.x,
    y: muzzle.y,
    x1: muzzle.x,
    y1: muzzle.y,
    x2: muzzle.x + Math.cos(player.angle) * reach,
    y2: muzzle.y + Math.sin(player.angle) * reach,
    angle: player.angle,
    range: reach,
    r: 18,
    life: 0.16,
    max: 0.16,
    color: "#ffe66d",
    large: true,
    width: 14,
    burst: 36,
  };
  lightning.push(zap);
  if (lightning.length > MAX_LIGHTNING) lightning.splice(0, lightning.length - MAX_LIGHTNING);

  let firstTarget = null;
  let firstAlong = Infinity;
  enemies.forEach((enemy) => {
    if (enemy.team === "ally" || enemy.hp <= 0) return;
    const along = distanceAlongBeam(zap, enemy);
    if (along < 0 || along > reach || along >= firstAlong) return;
    if (distanceToBeam(zap, enemy) > enemy.r + zap.r) return;
    firstTarget = enemy;
    firstAlong = along;
  });

  let hits = 0;
  let current = firstTarget;
  let previous = muzzle;
  let damage = TAZER_CHAIN_DAMAGE * player.mods.shellDamage;
  const hit = new Set();
  while (current && hits < TAZER_CHAIN_JUMPS) {
    hit.add(current.id);
    const hitDamage = enemyIncomingDamage(current, playerDamage(damage, current));
    current.hp -= hitDamage;
    current.stun = Math.max(current.stun || 0, 0.35);
    markHit(current, hitDamage, { x: previous.x, y: previous.y, kind: "tazer", noKnockback: true });
    lightning.push({
      x1: previous.x,
      y1: previous.y,
      x2: current.x,
      y2: current.y,
      life: 0.1,
      max: 0.1,
      color: "#ffe66d",
      width: hits === 0 ? 5 : 3,
    });
    if (hits < 5) addSpark(current.x, current.y, "#ffe66d", 2);
    hits += 1;
    previous = current;
    damage *= 0.78;
    let nextTarget = null;
    let best = TAZER_CHAIN_JUMP_RANGE * TAZER_CHAIN_JUMP_RANGE;
    enemies.forEach((enemy) => {
      if (enemy.team === "ally" || enemy.hp <= 0 || hit.has(enemy.id)) return;
      const d = distanceSq(current, enemy);
      if (d < best) {
        best = d;
        nextTarget = enemy;
      }
    });
    current = nextTarget;
  }
  if (lightning.length > MAX_LIGHTNING) lightning.splice(0, lightning.length - MAX_LIGHTNING);
  addSpark(muzzle.x, muzzle.y, "#ffe66d", 3);
  if (hits > 0) camera.shake = Math.max(camera.shake, 2.4);
}

function tazerScreenStun() {
  let stunned = 0;
  enemies.forEach((enemy) => {
    if (enemy.team === "ally" || !onScreen(enemy, 120)) return;
    enemy.stun = Math.max(enemy.stun || 0, TAZER_SCREEN_STUN_SECONDS);
    enemy.hitFlash = 0.18;
    enemy.hitPulse = 0.18;
    lightning.push({
      x1: enemy.x + (Math.random() - 0.5) * 28,
      y1: Math.max(0, enemy.y - 300 - Math.random() * 80),
      x2: enemy.x,
      y2: enemy.y,
      life: 0.24,
      max: 0.24,
      color: "#ffe66d",
      large: true,
      skyStrike: true,
      width: 8,
      burst: 42,
    });
    addSpark(enemy.x, enemy.y, "#ffe66d", 3);
    stunned += 1;
  });
  if (lightning.length > MAX_LIGHTNING) lightning.splice(0, lightning.length - MAX_LIGHTNING);
  camera.shake = Math.max(camera.shake, stunned > 0 ? 7 : 2);
}

function spawnTazerCannonTrap() {
  const target = findNearestHostileToPlayer();
  if (!target) {
    addSpark(player.x + Math.cos(player.angle) * 42, player.y + Math.sin(player.angle) * 42, "#fff06d", 4);
    return false;
  }
  tazerCannonTraps.push({
    targetId: target.id,
    x: target.x,
    y: target.y,
    life: TAZER_CANNON_DURATION,
    max: TAZER_CANNON_DURATION,
    visualTimer: 0,
    spin: Math.random() * TAU,
  });
  target.stun = Math.max(target.stun || 0, TAZER_CANNON_DURATION);
  target.knockVx = 0;
  target.knockVy = 0;
  addSpark(target.x, target.y, "#fff06d", 12);
  camera.shake = Math.max(camera.shake, 5);
  return true;
}

function triggerTazerCannonWave(trap) {
  const wave = {
    x: trap.x,
    y: trap.y,
    age: 0,
    life: TAZER_CANNON_WAVE_DURATION,
    max: TAZER_CANNON_WAVE_DURATION,
    radius: 0,
    hitIds: new Set(),
    layerIndex: 0,
    rings: [],
  };
  tazerCannonWaves.push(wave);
  lightning.push({
    x1: wave.x + (Math.random() - 0.5) * 48,
    y1: Math.max(0, wave.y - 560),
    x2: wave.x,
    y2: wave.y,
    life: 0.38,
    max: 0.38,
    color: "#fff06d",
    glowColor: "rgba(255,240,109,0.38)",
    glowFade: "rgba(255,240,109,0)",
    large: true,
    skyStrike: true,
    width: 16,
    burst: 92,
  });
  emitTazerCannonWaveLayer(wave, TAZER_CANNON_WAVE_RADIUS / TAZER_CANNON_WAVE_LAYERS);
  wave.layerIndex = 1;
  if (lightning.length > MAX_LIGHTNING) lightning.splice(0, lightning.length - MAX_LIGHTNING);
  addSpark(wave.x, wave.y, "#fff06d", 16);
  camera.shake = Math.max(camera.shake, 9);
}

function emitTazerCannonWaveLayer(wave, radius) {
  const layerGap = TAZER_CANNON_WAVE_RADIUS / TAZER_CANNON_WAVE_LAYERS;
  const innerRadius = Math.max(0, radius - layerGap * 0.8);
  wave.rings.push({ radius, life: 0.3, max: 0.3 });
  for (let i = 0; i < TAZER_CANNON_WAVE_STRIKES; i += 1) {
    const angle = (i / TAZER_CANNON_WAVE_STRIKES) * TAU + (wave.layerIndex || 0) * 0.27;
    const innerX = wave.x + Math.cos(angle) * innerRadius;
    const innerY = wave.y + Math.sin(angle) * innerRadius;
    lightning.push({
      x1: innerX,
      y1: innerY,
      x2: wave.x + Math.cos(angle) * radius,
      y2: wave.y + Math.sin(angle) * radius,
      life: 0.24,
      max: 0.24,
      color: "#fff06d",
      glowColor: "rgba(255,240,109,0.34)",
      glowFade: "rgba(255,240,109,0)",
      large: true,
      width: 9,
      burst: 58,
    });
  }
  if (lightning.length > MAX_LIGHTNING) lightning.splice(0, lightning.length - MAX_LIGHTNING);
  addSpark(wave.x, wave.y, "#fff06d", 4);
}

function startTazerFocusStorm() {
  if (tazerFocusStorms.length > 0) return false;
  const target = findNearestHostileToPlayer();
  if (!target) {
    addSpark(player.x + Math.cos(player.angle) * 42, player.y + Math.sin(player.angle) * 42, "#fff06d", 5);
    return false;
  }
  player.maxHpPenaltyMult = (player.maxHpPenaltyMult || 1) * TAZER_FOCUS_MAX_HP_MULTIPLIER;
  player.maxHp = Math.max(1, Math.round(player.maxHp * TAZER_FOCUS_MAX_HP_MULTIPLIER));
  player.hp = Math.min(player.hp, player.maxHp);
  tazerFocusStorms.push({
    targetId: target.id,
    x: target.x,
    y: target.y,
    timer: 0,
    strikesLeft: TAZER_FOCUS_STRIKES,
    released: false,
  });
  addSpark(target.x, target.y, "#fff06d", 18);
  camera.shake = Math.max(camera.shake, 12);
  return true;
}

function startThunderGodBuff() {
  player.thunderBuffCooldown = THUNDER_GOD_BUFF_COOLDOWN;
  player.thunderBuffActive = THUNDER_GOD_BUFF_DURATION;
  addSpark(player.x, player.y, "#fff06d", 28);
  camera.shake = Math.max(camera.shake, 7);
}

function startThunderFocusStorm() {
  if (thunderFocusStorms.length > 0) return false;
  const target = findNearestHostileToPlayer();
  if (!target) {
    addSpark(player.x + Math.cos(player.angle) * 52, player.y + Math.sin(player.angle) * 52, "#fff06d", 8);
    return false;
  }
  thunderFocusStorms.push({
    targetId: target.id,
    x: target.x,
    y: target.y,
    timer: 0,
    strikesLeft: THUNDER_GOD_FOCUS_STRIKES,
  });
  addSpark(target.x, target.y, "#fff06d", 18);
  camera.shake = Math.max(camera.shake, 10);
  return true;
}

function strikeThunderFocusStorm(storm) {
  const target = enemies.find((enemy) => enemy.id === storm.targetId && enemy.team !== "ally");
  if (!target || target.hp <= 0) return false;
  storm.x = target.x;
  storm.y = target.y;
  lightning.push({
    x1: target.x + (Math.random() - 0.5) * 130,
    y1: Math.max(0, target.y - 620 - Math.random() * 160),
    x2: target.x + (Math.random() - 0.5) * 16,
    y2: target.y + (Math.random() - 0.5) * 16,
    life: 0.16,
    max: 0.16,
    color: "#fff06d",
    glowColor: "rgba(255,240,109,0.4)",
    glowFade: "rgba(255,240,109,0)",
    large: true,
    skyStrike: true,
    width: 9,
    burst: 58,
  });
  if (lightning.length > MAX_LIGHTNING) lightning.splice(0, lightning.length - MAX_LIGHTNING);
  const currentShotDamage = DEFAULT_BULLET_DAMAGE * player.mods.shellDamage;
  const damage = enemyIncomingDamage(target, playerDamage(currentShotDamage * THUNDER_GOD_FOCUS_DAMAGE_MULT, target));
  target.hp -= damage;
  target.stun = Math.max(target.stun || 0, 0.12);
  markHit(target, damage, { x: target.x, y: target.y - 560, kind: "thunderFocus", noKnockback: true });
  if (storm.strikesLeft % 8 === 0) addSpark(target.x, target.y, "#fff06d", 4);
  storm.strikesLeft -= 1;
  return true;
}

function strikeTazerFocusStorm(storm) {
  const target = enemies.find((enemy) => enemy.id === storm.targetId && enemy.team !== "ally");
  if (!target || target.hp <= 0) return false;
  storm.x = target.x;
  storm.y = target.y;
  const showBolt = storm.strikesLeft % 4 === 0 || storm.strikesLeft <= 8;
  if (showBolt) {
    const spread = 120 + Math.random() * 90;
    lightning.push({
      x1: target.x + (Math.random() - 0.5) * spread,
      y1: Math.max(0, target.y - 560 - Math.random() * 180),
      x2: target.x + (Math.random() - 0.5) * 18,
      y2: target.y + (Math.random() - 0.5) * 18,
      life: 0.18,
      max: 0.18,
      color: "#fff06d",
      glowColor: "rgba(255,240,109,0.38)",
      glowFade: "rgba(255,240,109,0)",
      large: true,
      skyStrike: true,
      width: 10,
      burst: 62,
    });
    if (lightning.length > MAX_LIGHTNING) lightning.splice(0, lightning.length - MAX_LIGHTNING);
  }
  const damage = enemyIncomingDamage(target, playerDamage(TAZER_FOCUS_DAMAGE, target));
  target.hp -= damage;
  target.stun = Math.max(target.stun || 0, 0.2);
  markHit(target, damage, { x: target.x, y: target.y - 560, kind: "tazerFocus", noKnockback: true });
  if (storm.strikesLeft % 12 === 0) addSpark(target.x, target.y, "#fff06d", 4);
  storm.strikesLeft -= 1;
  return true;
}

function releaseTazerFocusWave(storm) {
  if (storm.released) return;
  storm.released = true;
  triggerTazerCannonWave({ x: storm.x, y: storm.y });
}

function updateTazerCannonTraps(dt) {
  for (let i = tazerCannonTraps.length - 1; i >= 0; i -= 1) {
    const trap = tazerCannonTraps[i];
    trap.life -= dt;
    const target = enemies.find((enemy) => enemy.id === trap.targetId && enemy.team !== "ally");
    if (!target || target.hp <= 0 || trap.life <= 0) {
      triggerTazerCannonWave(trap);
      tazerCannonTraps.splice(i, 1);
      continue;
    }
    trap.x = target.x;
    trap.y = target.y;
    trap.spin += dt * 0.9;
    target.stun = Math.max(target.stun || 0, 0.14);
    target.knockVx = 0;
    target.knockVy = 0;
    const cageDps = (TAZER_CHAIN_DAMAGE * player.mods.shellDamage * TAZER_CANNON_DAMAGE_MULTIPLIER) / TAZER_CANNON_DURATION;
    const damage = enemyIncomingDamage(target, playerDamage(cageDps * dt, target));
    target.hp -= damage;
    markHit(target, damage, { x: trap.x, y: trap.y, kind: "tazerCannon", noKnockback: true });

    trap.visualTimer -= dt;
    if (trap.visualTimer <= 0) {
      trap.visualTimer = 0.08;
      for (let cannon = 0; cannon < TAZER_CANNON_COUNT; cannon += 1) {
        const angle = trap.spin + (cannon / TAZER_CANNON_COUNT) * TAU;
        const cx = target.x + Math.cos(angle) * TAZER_CANNON_RADIUS;
        const cy = target.y + Math.sin(angle) * TAZER_CANNON_RADIUS;
        lightning.push({
          x1: cx,
          y1: cy,
          x2: target.x,
          y2: target.y,
          life: 0.09,
          max: 0.09,
          color: "#fff06d",
          width: 3,
        });
      }
      if (lightning.length > MAX_LIGHTNING) lightning.splice(0, lightning.length - MAX_LIGHTNING);
      addSpark(target.x, target.y, "#fff06d", 2);
    }
  }
}

function updateTazerCannonWaves(dt) {
  for (let i = tazerCannonWaves.length - 1; i >= 0; i -= 1) {
    const wave = tazerCannonWaves[i];
    const previousRadius = wave.radius || 0;
    wave.age += dt;
    wave.life -= dt;
    const progress = clamp(wave.age / wave.max, 0, 1);
    wave.radius = TAZER_CANNON_WAVE_RADIUS * (1 - (1 - progress) * (1 - progress));
    const layerGap = TAZER_CANNON_WAVE_RADIUS / TAZER_CANNON_WAVE_LAYERS;
    while (wave.layerIndex < TAZER_CANNON_WAVE_LAYERS && wave.radius >= (wave.layerIndex + 1) * layerGap) {
      emitTazerCannonWaveLayer(wave, (wave.layerIndex + 1) * layerGap);
      wave.layerIndex += 1;
    }
    for (let ring = wave.rings.length - 1; ring >= 0; ring -= 1) {
      wave.rings[ring].life -= dt;
      if (wave.rings[ring].life <= 0) wave.rings.splice(ring, 1);
    }
    enemies.forEach((enemy) => {
      if (enemy.team === "ally" || enemy.hp <= 0 || wave.hitIds.has(enemy.id)) return;
      const d = Math.hypot(enemy.x - wave.x, enemy.y - wave.y);
      const frontReached = d - enemy.r <= wave.radius + TAZER_CANNON_WAVE_WIDTH * 0.5;
      const notBehind = d + enemy.r >= previousRadius - TAZER_CANNON_WAVE_WIDTH;
      if (!frontReached || !notBehind) return;
      const damage = enemyIncomingDamage(enemy, playerDamage(TAZER_CANNON_WAVE_DAMAGE, enemy));
      enemy.hp -= damage;
      enemy.stun = Math.max(enemy.stun || 0, 0.35);
      markHit(enemy, damage, { x: wave.x, y: wave.y, kind: "tazerCannonWave", noKnockback: true });
      wave.hitIds.add(enemy.id);
      addSpark(enemy.x, enemy.y, "#fff06d", 3);
    });
    if (wave.life <= 0) tazerCannonWaves.splice(i, 1);
  }
}

function updateTazerFocusStorms(dt) {
  for (let i = tazerFocusStorms.length - 1; i >= 0; i -= 1) {
    const storm = tazerFocusStorms[i];
    storm.timer -= dt;
    while (storm.timer <= 0 && storm.strikesLeft > 0) {
      if (!strikeTazerFocusStorm(storm)) {
        releaseTazerFocusWave(storm);
        tazerFocusStorms.splice(i, 1);
        break;
      }
      storm.timer += TAZER_FOCUS_INTERVAL;
    }
    if (storm.strikesLeft <= 0) {
      releaseTazerFocusWave(storm);
      tazerFocusStorms.splice(i, 1);
    }
  }
}

function updateThunderFocusStorms(dt) {
  for (let i = thunderFocusStorms.length - 1; i >= 0; i -= 1) {
    const storm = thunderFocusStorms[i];
    storm.timer -= dt;
    if (storm.timer <= 0 && storm.strikesLeft > 0) {
      if (!strikeThunderFocusStorm(storm)) {
        thunderFocusStorms.splice(i, 1);
        continue;
      }
      storm.timer += THUNDER_GOD_FOCUS_INTERVAL;
    }
    if (storm.strikesLeft <= 0) thunderFocusStorms.splice(i, 1);
  }
}

function startTazerGuard() {
  player.tazerGuardCooldown = TAZER_GUARD_COOLDOWN;
  player.tazerGuardActive = TAZER_GUARD_DURATION;
  const baseMaxHp = Math.max(1, player.maxHp - (player.tazerGuardHpBonus || 0));
  player.tazerGuardHpBonus = Math.max(0, Math.round(baseMaxHp * (TAZER_GUARD_TEMP_HP_MULTIPLIER - 1)));
  player.maxHp = baseMaxHp + player.tazerGuardHpBonus;
  player.hp = Math.min(player.maxHp, player.hp + player.tazerGuardHpBonus);
  addSpark(player.x, player.y, "#d7fbff", 18);
  camera.shake = Math.max(camera.shake, 4);
}

function updateTazerGuard(dt) {
  player.tazerGuardCooldown = Math.max(0, (player.tazerGuardCooldown || 0) - dt);
  const wasActive = (player.tazerGuardActive || 0) > 0;
  player.tazerGuardActive = Math.max(0, (player.tazerGuardActive || 0) - dt);
  if (player.tankKey === "tazer" && player.tazerGuardActive > 0 && !regenDisabledLevel()) {
    player.hp = Math.min(player.maxHp, player.hp + TAZER_GUARD_REGEN_PER_SECOND * dt);
  }
  if (player.tankKey !== "tazer" || !wasActive || player.tazerGuardActive > 0) return;
  const guardBonus = player.tazerGuardHpBonus || 0;
  if (guardBonus > 0) {
    player.maxHp = Math.max(1, player.maxHp - guardBonus);
    player.hp = Math.min(player.hp, player.maxHp);
    player.tazerGuardHpBonus = 0;
  }
  player.maxHpPenaltyMult = (player.maxHpPenaltyMult || 1) * TAZER_GUARD_MAX_HP_MULTIPLIER;
  player.maxHp = Math.max(1, Math.round(player.maxHp * TAZER_GUARD_MAX_HP_MULTIPLIER));
  player.hp = Math.min(player.hp, player.maxHp);
  addSpark(player.x, player.y, "#ff7665", 16);
  camera.shake = Math.max(camera.shake, 7);
}

function tazerGiantBeam(dt = 1) {
  const reach = 720;
  const beamRadius = 58;
  const muzzle = {
    x: player.x + Math.cos(player.angle) * 46,
    y: player.y + Math.sin(player.angle) * 46,
  };
  const beam = {
    x: muzzle.x,
    y: muzzle.y,
    x1: muzzle.x,
    y1: muzzle.y,
    x2: muzzle.x + Math.cos(player.angle) * reach,
    y2: muzzle.y + Math.sin(player.angle) * reach,
    angle: player.angle,
    range: reach,
    r: beamRadius,
    life: 0.09,
    max: 0.09,
    color: "#fff06d",
    large: true,
    width: 32,
    burst: 110,
  };
  lightning.push(beam);
  if (lightning.length > MAX_LIGHTNING) lightning.splice(0, lightning.length - MAX_LIGHTNING);

  let hits = 0;
  enemies.forEach((enemy) => {
    if (enemy.team === "ally" || enemy.hp <= 0) return;
    const along = distanceAlongBeam(beam, enemy);
    if (along < 0 || along > reach) return;
    if (distanceToBeam(beam, enemy) > enemy.r + beam.r) return;
    const damage = enemyIncomingDamage(enemy, playerDamage(TAZER_BEAM_DAMAGE * player.mods.shellDamage * dt, enemy));
    enemy.hp -= damage;
    enemy.stun = Math.max(enemy.stun || 0, 0.18);
    markHit(enemy, damage, { x: muzzle.x, y: muzzle.y, kind: "tazerBeam", noKnockback: true });
    if (hits < 5) addSpark(enemy.x, enemy.y, "#fff06d", 2);
    hits += 1;
  });
  addSpark(muzzle.x, muzzle.y, "#fff06d", 2);
  camera.shake = Math.max(camera.shake, hits > 0 ? 4 : 2);
}

function startTazerEndStorm() {
  tazerEndStorms.push({
    strikesLeft: TAZER_END_STORM_STRIKES,
    timer: 0,
  });
  camera.shake = Math.max(camera.shake, 7);
}

function strikeTazerEndStormOnce(storm) {
  const halfW = canvas.width / (2 * camera.scale);
  const halfH = canvas.height / (2 * camera.scale);
  const x = clamp(camera.x + (Math.random() * 2 - 1) * halfW, 20, world.w - 20);
  const y = clamp(camera.y + (Math.random() * 2 - 1) * halfH, 20, world.h - 20);
  const topY = Math.max(0, y - 620 - Math.random() * 120);
  lightning.push({
    x1: x + (Math.random() - 0.5) * 110,
    y1: topY,
    x2: x,
    y2: y,
    life: 0.28,
    max: 0.28,
    color: "#fff06d",
    large: true,
    skyStrike: true,
    width: 14,
    burst: 84,
  });
  if (lightning.length > MAX_LIGHTNING) lightning.splice(0, lightning.length - MAX_LIGHTNING);

  let hits = 0;
  enemies.forEach((enemy) => {
    if (enemy.team === "ally" || enemy.hp <= 0) return;
    if (Math.hypot(enemy.x - x, enemy.y - y) > TAZER_END_STORM_RADIUS + enemy.r) return;
    const damage = enemyIncomingDamage(enemy, playerDamage(TAZER_END_STORM_DAMAGE * player.mods.shellDamage, enemy));
    enemy.hp -= damage;
    enemy.stun = Math.max(enemy.stun || 0, TAZER_END_STORM_STUN);
    markHit(enemy, damage, { x, y: topY, kind: "tazerStorm", noKnockback: true });
    addSpark(enemy.x, enemy.y, "#fff06d", 4);
    hits += 1;
  });
  addSpark(x, y, "#fff06d", hits > 0 ? 8 : 3);
  if (hits > 0) camera.shake = Math.max(camera.shake, 4);
  storm.strikesLeft -= 1;
}

function summonMiniTasers() {
  const baseAngle = player.angle;
  const sideX = Math.cos(baseAngle + Math.PI / 2);
  const sideY = Math.sin(baseAngle + Math.PI / 2);
  const levelPower = Math.max(0, player.level - 1);
  const miniMaxHp = Math.round(10 + levelPower * 3.5);
  const miniDamage = TAZER_MINI_DAMAGE * (1 + levelPower * 0.08);
  for (let i = 0; i < TAZER_MINI_COUNT; i += 1) {
    const offset = (i - 1) * 34;
    const x = clamp(player.x - Math.cos(baseAngle) * 36 + sideX * offset, 24, world.w - 24);
    const y = clamp(player.y - Math.sin(baseAngle) * 36 + sideY * offset, 24, world.h - 24);
    enemies.push({
      id: nextEnemyId,
      team: "ally",
      tankKey: "tazer",
      miniTazer: true,
      buildName: "Mini Taser",
      color: "#1b263b",
      accent: "#fff06d",
      mods: { range: 1, shellDamage: 1, fireRate: 1, beamWidth: 1 },
      level: player.level,
      x,
      y,
      r: 12,
      hp: miniMaxHp,
      maxHp: miniMaxHp,
      speed: Math.min(245, 165 + levelPower * 3),
      miniDamage,
      angle: baseAngle,
      strategy: "support",
      cooldown: 0.35 + i * 0.12,
      burn: 0,
      burnDps: 0,
    });
    nextEnemyId += 1;
    addSpark(x, y, "#fff06d", 8);
  }
  camera.shake = Math.max(camera.shake, 3);
}

function updateMiniTazer(mini, dt) {
  mini.cooldown -= dt;
  const target = findNearestTank(mini, "enemy");
  if (!target) return;
  mini.angle = angleTo(mini, target);
  const targetDistance = distance(mini, target);
  const desiredDistance = 265;
  if (targetDistance > desiredDistance) {
    const avoid = barrierAvoidanceVector(mini, Math.cos(mini.angle), Math.sin(mini.angle));
    let vx = Math.cos(mini.angle) + avoid.x * 1.2;
    let vy = Math.sin(mini.angle) + avoid.y * 1.2;
    const len = Math.hypot(vx, vy) || 1;
    mini.x = clamp(mini.x + (vx / len) * mini.speed * dt, 24, world.w - 24);
    mini.y = clamp(mini.y + (vy / len) * mini.speed * dt, 24, world.h - 24);
    resolveMapCollision(mini);
  } else if (targetDistance < 160) {
    mini.x = clamp(mini.x - Math.cos(mini.angle) * mini.speed * 0.7 * dt, 24, world.w - 24);
    mini.y = clamp(mini.y - Math.sin(mini.angle) * mini.speed * 0.7 * dt, 24, world.h - 24);
    resolveMapCollision(mini);
  }
  if (mini.cooldown > 0 || targetDistance > 560) return;
  miniTazerBeam(mini);
  mini.cooldown = Math.max(0.9, 2.2 - mini.level * 0.035);
}

function miniTazerBeam(mini) {
  const reach = 540;
  bullets.push({
    kind: "allyBeam",
    x: mini.x + Math.cos(mini.angle) * 22,
    y: mini.y + Math.sin(mini.angle) * 22,
    vx: Math.cos(mini.angle),
    vy: Math.sin(mini.angle),
    angle: mini.angle,
    age: 0,
    life: 0.14,
    range: reach,
    damage: mini.miniDamage || TAZER_MINI_DAMAGE,
    hp: 9999,
    pierceLeft: 999,
    hitEnemies: new Set(),
    r: 16,
    color: "#fff06d",
    noStun: true,
  });
  if (bullets.length > MAX_PLAYER_BULLETS) bullets.splice(0, bullets.length - MAX_PLAYER_BULLETS);
  addSpark(mini.x + Math.cos(mini.angle) * 24, mini.y + Math.sin(mini.angle) * 24, "#fff06d", 2);
}

function enemyTazerChainAttack(enemy, target) {
  const reach = 330 * Math.min(1.45, enemy.mods.range || 1);
  const zap = {
    x: enemy.x + Math.cos(enemy.angle) * 30,
    y: enemy.y + Math.sin(enemy.angle) * 30,
    angle: enemy.angle,
    range: reach,
    r: 16,
  };
  lightning.push({
    x1: zap.x,
    y1: zap.y,
    x2: zap.x + Math.cos(enemy.angle) * reach,
    y2: zap.y + Math.sin(enemy.angle) * reach,
    life: 0.1,
    max: 0.1,
    color: "#ffe66d",
    width: 4,
  });

  let current = null;
  let firstAlong = Infinity;
  const candidates = [player, ...enemies.filter((unit) => unit.team === "ally")];
  candidates.forEach((unit) => {
    if (unit.hp <= 0) return;
    const along = distanceAlongBeam(zap, unit);
    if (along < 0 || along > reach || along >= firstAlong) return;
    if (distanceToBeam(zap, unit) > unit.r + zap.r) return;
    current = unit;
    firstAlong = along;
  });

  let previous = zap;
  let damage = enemyAttackDamage(enemy, Math.max(2, TAZER_CHAIN_DAMAGE * 0.34 * enemy.mods.shellDamage));
  const hit = new Set();
  for (let jump = 0; current && jump < TAZER_CHAIN_JUMPS; jump += 1) {
    const hitKey = current === player ? "player" : current.id;
    hit.add(hitKey);
    const dealt = current === player ? playerIncomingDamage(damage) : shielderDamage(current, damage);
    current.hp -= dealt;
    current.stun = Math.max(current.stun || 0, 0.28);
    if (current === player) player.invuln = Math.max(player.invuln || 0, 0.04);
    markHit(current, dealt, { x: previous.x, y: previous.y, kind: "enemyTazer", noKnockback: true });
    lightning.push({
      x1: previous.x,
      y1: previous.y,
      x2: current.x,
      y2: current.y,
      life: 0.1,
      max: 0.1,
      color: "#ffe66d",
      width: jump === 0 ? 4 : 2.5,
    });
    addSpark(current.x, current.y, "#ffe66d", 2);
    if (current === player && player.hp <= 0) checkPlayerDeath();

    previous = current;
    damage *= 0.74;
    let nextTarget = null;
    let best = TAZER_CHAIN_JUMP_RANGE * TAZER_CHAIN_JUMP_RANGE;
    candidates.forEach((unit) => {
      if (unit.hp <= 0) return;
      const key = unit === player ? "player" : unit.id;
      if (hit.has(key)) return;
      const d = distanceSq(current, unit);
      if (d < best) {
        best = d;
        nextTarget = unit;
      }
    });
    current = nextTarget;
  }
  if (lightning.length > MAX_LIGHTNING) lightning.splice(0, lightning.length - MAX_LIGHTNING);
}

function enemyStrategyFor(loadout, boss = false) {
  if (boss) return "boss";
  if (loadout.tankKey === "dragonTamer") return "artillery";
  if (loadout.tankKey === "antiAir") return "artillery";
  if (loadout.tankKey === "flame") return Math.random() < 0.65 ? "ambush" : "rush";
  if (loadout.tankKey === "gamma") return Math.random() < 0.55 ? "orbit" : "kite";
  if (loadout.tankKey === "tazer") return Math.random() < 0.55 ? "ambush" : "orbit";
  if (loadout.tankKey === "shotgun") return Math.random() < 0.55 ? "flank" : "rush";
  if (loadout.mods.fireworkFragments || loadout.buildName.includes("Siege") || loadout.buildName.includes("Mortar")) return "artillery";
  if (loadout.mods.bulletSpread > 0.55) return "flank";
  if (loadout.mods.range > 1.35 || loadout.buildName.includes("Needle") || loadout.buildName.includes("Longshot")) return "kite";
  return ["advance", "flank", "orbit"][Math.floor(Math.random() * 3)];
}

function strategyRange(enemy) {
  if (enemy.team === "ally") return 220;
  if (activeGameMode === "infantryArmy" && enemy.tankKey === "infantry") {
    if (enemy.shielderTrooper) return 95;
    if (enemy.akTrooper) return 185;
    if (enemy.bomberTrooper) return 285;
    if (enemy.medicTrooper) return 390;
  }
  if (enemy.tankKey === "infantry") return enemy.puncher ? 62 : 300;
  if (enemy.strategy === "formation") return 235;
  if (enemy.strategy === "rush" || enemy.strategy === "ambush") return enemy.tankKey === "flame" ? 92 : 135;
  if (enemy.tankKey === "tazer") return 210;
  if (enemy.tankKey === "shotgun") return 165;
  if (enemy.tankKey === "antiAir") return 520;
  if (enemy.strategy === "artillery") return 430;
  if (enemy.strategy === "kite") return 340;
  if (enemy.strategy === "orbit") return 260;
  if (enemy.strategy === "flank") return 245;
  if (enemy.strategy === "boss") return 210;
  return 190;
}

function formationPoint(enemy, target, desired) {
  const group = enemy.formationGroup || 0;
  const slot = enemy.formationSlot || 0;
  const wave = Math.sin(performance.now() * 0.00042 + group) * 0.28;
  const groupAngle = group * 1.61803398875 + wave;
  const side = slot - 1;
  const rank = Math.floor(slot / 3);
  const radius = desired + rank * 42 + ((group % 3) - 1) * 16;
  const tangent = groupAngle + Math.PI / 2;
  return {
    x: target.x + Math.cos(groupAngle) * radius + Math.cos(tangent) * side * 74,
    y: target.y + Math.sin(groupAngle) * radius + Math.sin(tangent) * side * 74,
  };
}

function infantryArmyFormationPoint(enemy, target, desired) {
  const hostiles = enemies.filter((unit) => unit.team !== "ally" && unit.infantry);
  const center =
    hostiles.length > 0
      ? {
          x: hostiles.reduce((sum, unit) => sum + unit.x, 0) / hostiles.length,
          y: hostiles.reduce((sum, unit) => sum + unit.y, 0) / hostiles.length,
        }
      : target;
  const advance = angleTo(center, target);
  const behind = advance + Math.PI;
  const tangent = advance + Math.PI / 2;
  const lane = enemy.formationSlot ?? ((enemy.id ?? 0) % 11) - 5;
  const depth = enemy.formationDepth ?? Math.max(0, Math.round((desired - 95) / 30));
  const rowDistance = 95 + depth * 31;
  return {
    x: target.x + Math.cos(behind) * rowDistance + Math.cos(tangent) * lane * 18,
    y: target.y + Math.sin(behind) * rowDistance + Math.sin(tangent) * lane * 18,
  };
}

function barrierAvoidanceVector(tank, vx, vy) {
  if (tank.tankKey === "helicopter" || warMap.barriers.length === 0) return { x: 0, y: 0 };
  const len = Math.hypot(vx, vy);
  if (len < 0.02) return { x: 0, y: 0 };
  const dirX = vx / len;
  const dirY = vy / len;
  const aheadX = tank.x + dirX * 64;
  const aheadY = tank.y + dirY * 64;
  let ax = 0;
  let ay = 0;

  warMap.barriers.forEach((barrier) => {
    const pad = tank.r + 30;
    const left = barrier.x - barrier.w / 2 - pad;
    const right = barrier.x + barrier.w / 2 + pad;
    const top = barrier.y - barrier.h / 2 - pad;
    const bottom = barrier.y + barrier.h / 2 + pad;
    if (aheadX < left || aheadX > right || aheadY < top || aheadY > bottom) return;

    const closestX = clamp(tank.x, left, right);
    const closestY = clamp(tank.y, top, bottom);
    let awayX = tank.x - closestX;
    let awayY = tank.y - closestY;
    let awayLen = Math.hypot(awayX, awayY);
    if (awayLen < 1) {
      awayX = tank.x - barrier.x;
      awayY = tank.y - barrier.y;
      awayLen = Math.hypot(awayX, awayY) || 1;
    }

    const nx = awayX / awayLen;
    const ny = awayY / awayLen;
    const targetSide = Math.sign((player.x - tank.x) * -ny + (player.y - tank.y) * nx) || 1;
    ax += nx * 1.35 + -ny * targetSide * 0.75;
    ay += ny * 1.35 + nx * targetSide * 0.75;
  });

  return { x: ax, y: ay };
}

function nearbySpacingVector(enemy) {
  let vx = 0;
  let vy = 0;
  enemies.forEach((other) => {
    if (other === enemy || other.team !== enemy.team || other.controlled) return;
    const d = distance(enemy, other);
    const min = enemy.r + other.r + 82;
    if (d > 0 && d < min) {
      const force = (min - d) / min;
      vx += ((enemy.x - other.x) / d) * force * force;
      vy += ((enemy.y - other.y) / d) * force * force;
    }
  });
  return { x: vx, y: vy };
}

function moveStrategicEnemy(enemy, target, dt) {
  const d = distance(enemy, target);
  const desired = strategyRange(enemy);
  const toTarget = angleTo(enemy, target);
  const orbitSide = enemy.orbitSide || 1;
  const hpPct = enemy.hp / enemy.maxHp;
  const flankPulse = Math.sin(performance.now() * 0.0014 + enemy.id) * 0.45;
  const surroundAngle = enemy.surroundAngle ?? enemy.id * 2.399963229728653;
  const surroundDrift = Math.sin(performance.now() * 0.00035 + enemy.id) * 0.38;
  const ringRadius = desired + (enemy.boss ? 25 : 0) + ((enemy.id % 5) - 2) * 16;
  let ringX = target.x + Math.cos(surroundAngle + surroundDrift) * ringRadius;
  let ringY = target.y + Math.sin(surroundAngle + surroundDrift) * ringRadius;
  if (activeGameMode === "evolution" && enemy.team !== "ally" && !enemy.infantry && enemy.strategy === "formation") {
    const point = formationPoint(enemy, target, desired);
    ringX = point.x;
    ringY = point.y;
  } else if (activeGameMode === "infantryArmy" && enemy.team !== "ally" && enemy.infantry) {
    const point = infantryArmyFormationPoint(enemy, target, desired);
    ringX = point.x;
    ringY = point.y;
    const toPoint = Math.atan2(ringY - enemy.y, ringX - enemy.x);
    const pointDistance = Math.hypot(ringX - enemy.x, ringY - enemy.y);
    const spacing = nearbySpacingVector(enemy);
    let vx = Math.cos(toPoint) * Math.min(1, pointDistance / 70) + spacing.x * 2.6;
    let vy = Math.sin(toPoint) * Math.min(1, pointDistance / 70) + spacing.y * 2.6;
    const avoid = barrierAvoidanceVector(enemy, vx, vy);
    vx += avoid.x * 1.45;
    vy += avoid.y * 1.45;
    const len = Math.hypot(vx, vy);
    if (len > 0.02) {
      const domainSlow = inJuggernautDomain(enemy) ? JUGGERNAUT_DOMAIN_ENEMY_MULT : 1;
      const judgmentSlow = (enemy.juggernautJudgment || 0) > 0 ? JUGGERNAUT_JUDGMENT_SLOW : 1;
      enemy.x = clamp(enemy.x + (vx / len) * enemy.speed * domainSlow * judgmentSlow * dt, 32, world.w - 32);
      enemy.y = clamp(enemy.y + (vy / len) * enemy.speed * domainSlow * judgmentSlow * dt, 32, world.h - 32);
      clampToJuggernautDomain(enemy);
    }
    return;
  }
  const toRing = Math.atan2(ringY - enemy.y, ringX - enemy.x);
  const ringDistance = Math.hypot(ringX - enemy.x, ringY - enemy.y);
  let moveAngle = toTarget;
  let weight = 0;

  if (hpPct < 0.32 && enemy.strategy !== "rush" && enemy.strategy !== "boss") {
    moveAngle = toTarget + Math.PI;
    weight = 1.15;
  } else if (d > desired + 45) {
    moveAngle = enemy.strategy === "rush" || enemy.strategy === "ambush" ? toTarget : toRing;
    weight = 1;
  } else if (d < desired - 35) {
    moveAngle = toTarget + Math.PI;
    weight = enemy.strategy === "rush" ? 0.25 : 0.9;
  } else if (enemy.strategy === "formation") {
    moveAngle = ringDistance > 38 ? toRing : toTarget + orbitSide * Math.PI / 2;
    weight = 0.72;
  } else if (enemy.strategy === "orbit" || enemy.strategy === "flank" || enemy.strategy === "artillery") {
    moveAngle = ringDistance > 44 ? toRing : toTarget + orbitSide * (Math.PI / 2 + flankPulse * 0.18);
    weight = enemy.strategy === "artillery" ? 0.45 : 0.75;
  } else {
    moveAngle = ringDistance > 56 ? toRing : toTarget + orbitSide * Math.PI / 2;
    weight = enemy.strategy === "rush" ? 0.22 : 0.38;
  }

  const spacing = nearbySpacingVector(enemy);
  let vx = Math.cos(moveAngle) * weight + spacing.x * 3.4;
  let vy = Math.sin(moveAngle) * weight + spacing.y * 3.4;
  const len = Math.hypot(vx, vy);
  if (len > 0.02) {
    const speedMult = hpPct < 0.32 ? 1.12 : enemy.strategy === "flank" ? 1.08 : 1;
    const domainSlow = inJuggernautDomain(enemy) ? JUGGERNAUT_DOMAIN_ENEMY_MULT : 1;
    const judgmentSlow = (enemy.juggernautJudgment || 0) > 0 ? JUGGERNAUT_JUDGMENT_SLOW : 1;
    enemy.x = clamp(enemy.x + (vx / len) * enemy.speed * speedMult * domainSlow * judgmentSlow * dt, 32, world.w - 32);
    enemy.y = clamp(enemy.y + (vy / len) * enemy.speed * speedMult * domainSlow * judgmentSlow * dt, 32, world.h - 32);
    clampToJuggernautDomain(enemy);
  }
}

function helicopterGroundRoamTarget(enemy) {
  const angle = (enemy.surroundAngle ?? enemy.id * 2.399963229728653) + performance.now() * 0.00028;
  const radius = 310 + (enemy.id % 6) * 38;
  return {
    x: clamp(player.x + Math.cos(angle) * radius, 42, world.w - 42),
    y: clamp(player.y + Math.sin(angle) * radius, 42, world.h - 42),
    r: 20,
    isRoamTarget: true,
  };
}

function spawnEnemy() {
  if (activeGameMode === "infantryArmy") {
    spawnInfantryArmySoldier();
    return;
  }
  if (hostileCount() >= ENEMY_CAP) return;
  const enemyLevel = Math.max(1, player.level + 1);
  const isAlly = Math.random() < currentAllyChance();
  const loadout = chooseSpawnLoadout(enemyLevel);
  const maxHp = isAlly ? allyMaxHp() : Math.max(1, Math.round(scaledTankMaxHp(enemyLevel) * tankHpMultiplier(loadout.tankKey) * ENEMY_HP_MULTIPLIER));
  const side = Math.floor(Math.random() * 4);
  const margin = 90;
  let x = 0;
  let y = 0;
  if (side === 0) {
    x = Math.random() * world.w;
    y = -margin;
  } else if (side === 1) {
    x = world.w + margin;
    y = Math.random() * world.h;
  } else if (side === 2) {
    x = Math.random() * world.w;
    y = world.h + margin;
  } else {
    x = -margin;
    y = Math.random() * world.h;
  }
  const formationGroup = Math.floor(nextEnemyId / 3);
  const formationSlot = nextEnemyId % 3;
  const strategy = isAlly ? "support" : Math.random() < 0.58 ? "formation" : enemyStrategyFor(loadout);
  enemies.push({
    id: nextEnemyId,
    team: isAlly ? "ally" : "enemy",
    tankKey: loadout.tankKey,
    buildName: loadout.buildName,
    color: loadout.color,
    accent: loadout.accent,
    mods: loadout.mods,
    level: enemyLevel,
    x,
    y,
    r: 22,
    hp: maxHp,
    maxHp,
    speed: (isAlly ? 12 : -4) + loadout.speed * 0.55 + Math.min(48, enemyLevel * 4),
    angle: 0,
    strategy,
    formationGroup,
    formationSlot,
    orbitSide: Math.random() < 0.5 ? -1 : 1,
    surroundAngle: nextEnemyId * 2.399963229728653 + Math.random() * 0.3,
    cooldown: Math.max(0.62, 1.25 - enemyLevel * 0.05) + Math.random() * 0.45,
    burn: 0,
    burnDps: 0,
  });
  nextEnemyId += 1;
}

function spawnInfantryArmySoldier(options = {}) {
  if (infantryArmySpawned >= INFANTRY_ARMY_CAP) return;
  if (hostileInfantryCount() >= INFANTRY_ARMY_CAP) return;
  const level = Math.max(1, player.level + 1);
  const roll = Math.random();
  const soldierType = options.type || (roll < 0.1 ? "medic" : roll < 0.24 ? "bomber" : roll < 0.4 ? "shielder" : "ak");
  const side = Math.floor(Math.random() * 4);
  const margin = 90;
  const x = options.x ?? (side === 1 ? world.w + margin : side === 3 ? -margin : Math.random() * world.w);
  const y = options.y ?? (side === 0 ? -margin : side === 2 ? world.h + margin : Math.random() * world.h);
  const baseMaxHp = (soldierType === "medic" ? 34 : soldierType === "bomber" ? 30 : soldierType === "shielder" ? 42 : 24) + Math.max(0, level - 1) * 20;
  const maxHp = Math.max(1, Math.round(baseMaxHp * SPECIAL_ENEMY_HP_SCALE));
  enemies.push({
    id: nextEnemyId,
    team: "enemy",
    infantry: true,
    akTrooper: soldierType === "ak",
    medicTrooper: soldierType === "medic",
    bomberTrooper: soldierType === "bomber",
    shielderTrooper: soldierType === "shielder",
    puncher: false,
    tankKey: "infantry",
    buildName:
      soldierType === "medic" ? "Medic Infantry" : soldierType === "bomber" ? "Bomber Infantry" : soldierType === "shielder" ? "Shielder Infantry" : "AK Infantry",
    color: soldierType === "medic" ? "#587460" : soldierType === "bomber" ? "#765a42" : soldierType === "shielder" ? "#59636a" : "#6f705d",
    accent: soldierType === "medic" ? "#80ff9d" : soldierType === "bomber" ? "#ff8d5a" : soldierType === "shielder" ? "#a7c7ff" : "#f2ca52",
    mods: {
      fireRate: soldierType === "medic" ? 0.45 : soldierType === "bomber" ? 0.38 : soldierType === "shielder" ? 0.42 : 0.78 + level * 0.015,
      bulletSpeed: soldierType === "bomber" ? 0.72 : 1,
      bulletCount: 1,
      bulletSpread: soldierType === "bomber" ? 0.16 : 0.08,
      shellDamage: soldierType === "bomber" ? 1.25 : 1,
      shellSize: soldierType === "bomber" ? 0.88 : soldierType === "shielder" ? 0.62 : 0.5,
      fireworkFragments: soldierType === "bomber" ? 7 : 0,
      nukeExplosion: false,
      omniFire: false,
      range: soldierType === "bomber" ? 1.35 : soldierType === "medic" ? 0.85 : soldierType === "shielder" ? 0.82 : 1,
      flameWidth: 1,
      burnTime: 1,
      gammaArcs: 1,
      gammaReach: 1,
      gammaLightningDamage: 1,
      gammaLightningChain: 0,
      gammaLightningRadius: 1,
      gammaLightningBurst: 1,
      gammaLightningStun: 1,
      beamWidth: 1,
      beamCount: 1,
      pelletCount: 1,
    },
    level,
    x,
    y,
    r: soldierType === "shielder" ? 14 : soldierType === "medic" ? 12 : 11,
    hp: maxHp,
    maxHp,
    speed: (soldierType === "medic" ? 126 : soldierType === "bomber" ? 112 : soldierType === "shielder" ? 96 : 132) + Math.min(55, level * 3),
    angle: 0,
    strategy: soldierType === "bomber" ? "artillery" : soldierType === "medic" ? "support" : soldierType === "shielder" ? "advance" : Math.random() < 0.65 ? "kite" : "flank",
    formationSlot: options.slot ?? infantryArmySpawned % 11,
    formationDepth: options.depth ?? 0,
    orbitSide: Math.random() < 0.5 ? -1 : 1,
    surroundAngle: nextEnemyId * 2.399963229728653 + Math.random() * 0.3,
    cooldown: soldierType === "medic" ? 0.25 + Math.random() * 0.4 : 0.35 + Math.random() * 0.35,
    healPulse: 0.7 + Math.random() * 0.8,
    burn: 0,
    burnDps: 0,
  });
  nextEnemyId += 1;
  infantryArmySpawned += 1;
}

function spawnBoss(level) {
  const isFinalBoss = level === FINAL_BOSS_LEVEL;
  const isVictoryBoss = level === VICTORY_BOSS_LEVEL;
  const isUltraBoss = isFinalBoss || isVictoryBoss;
  const loadout = isUltraBoss
    ? {
        tankKey: "default",
        buildName: isVictoryBoss ? "Victory Ultra Tank" : "Final Ultra Tank",
        color: "#5b2d2d",
        accent: "#ffef88",
        ...createVariantLoadout("defaultUltra", level),
      }
    : chooseSpawnLoadout(level);
  const isLevelTenBoss = level === BOSS_LEVEL_INTERVAL;
  const rawBossHp = isLevelTenBoss
    ? Math.max(1, Math.round(player.maxHp * LEVEL_TEN_BOSS_HP_MULTIPLIER))
    : Math.max(1, Math.round(100 * (4 + level * 0.28) * SPECIAL_ENEMY_HP_SCALE));
  const bossHp = Math.max(1, Math.round(rawBossHp * BOSS_WEAKNESS_MULTIPLIER));
  const side = Math.floor(Math.random() * 4);
  const x = side === 1 ? world.w - 120 : side === 3 ? 120 : Math.random() * world.w;
  const y = side === 0 ? 120 : side === 2 ? world.h - 120 : Math.random() * world.h;
  const bossMods = { ...loadout.mods };
  enemies.push({
    id: nextEnemyId,
    team: "enemy",
    boss: true,
    finalBoss: isFinalBoss,
    victoryBoss: isVictoryBoss,
    tankKey: loadout.tankKey,
    buildName: isVictoryBoss ? "Wave 21 Victory Boss Ultra Tank" : isFinalBoss ? "Wave 20 Final Boss Ultra Tank" : isLevelTenBoss ? `Level 10 Boss ${loadout.buildName}` : `Boss ${loadout.buildName}`,
    color: "#5b2d2d",
    accent: loadout.accent,
    mods: bossMods,
    level,
    damageMult: (isUltraBoss ? FINAL_BOSS_DAMAGE_MULTIPLIER : isLevelTenBoss ? LEVEL_TEN_BOSS_DAMAGE_MULTIPLIER : 1) * BOSS_WEAKNESS_MULTIPLIER,
    x,
    y,
    r: 38,
    hp: bossHp,
    maxHp: bossHp,
    speed: loadout.speed * 0.36 + level * 1.5,
    angle: 0,
    strategy: enemyStrategyFor(loadout, true),
    orbitSide: Math.random() < 0.5 ? -1 : 1,
    surroundAngle: nextEnemyId * 2.399963229728653 + Math.random() * 0.3,
    fixedReload: isUltraBoss ? FINAL_BOSS_RELOAD : null,
    cooldown: 0.45,
    burn: 0,
    burnDps: 0,
  });
  nextEnemyId += 1;
  camera.shake = Math.max(camera.shake, 14);
}

function spawnInfantryPack(source) {
  if (source.infantry || source.team === "ally") return;
  for (let i = 0; i < 5; i += 1) {
    const a = (i / 5) * TAU + Math.random() * 0.4;
    const spread = 24 + Math.random() * 20;
    const isPuncher = Math.random() < 0.1;
    const maxHp = Math.max(1, Math.round(((isPuncher ? 28 : 18) + source.level * 2) * SPECIAL_ENEMY_HP_SCALE));
    enemies.push({
      id: nextEnemyId,
      team: "enemy",
      infantry: true,
      puncher: isPuncher,
      tankKey: "infantry",
      buildName: isPuncher ? "Puncher Infantry" : "Infantry RPG",
      color: isPuncher ? "#806f55" : "#7b735e",
      accent: isPuncher ? "#f2ca52" : "#ffcf5f",
      mods: {
        fireRate: isPuncher ? 1.05 : 0.55,
        bulletSpeed: 0.82,
        bulletCount: 1,
        bulletSpread: 0,
        shellDamage: isPuncher ? 1 : 1,
        shellSize: 0.72,
        fireworkFragments: 0,
        nukeExplosion: false,
        omniFire: false,
        range: isPuncher ? 0.92 : 1.1,
        flameWidth: 1,
        burnTime: 1,
        gammaArcs: 1,
        gammaReach: 1,
        gammaLightningDamage: 1,
        gammaLightningChain: 0,
        gammaLightningRadius: 1,
        gammaLightningBurst: 1,
        gammaLightningStun: 1,
        beamWidth: 1,
        beamCount: 1,
        pelletCount: 1,
      },
      level: source.level,
      x: clamp(source.x + Math.cos(a) * spread, 32, world.w - 32),
      y: clamp(source.y + Math.sin(a) * spread, 32, world.h - 32),
      r: isPuncher ? 13 : 11,
      hp: maxHp,
      maxHp,
      speed: (isPuncher ? 142 : 118) + source.level * 2,
      angle: 0,
      strategy: isPuncher ? "rush" : "kite",
      orbitSide: Math.random() < 0.5 ? -1 : 1,
      surroundAngle: nextEnemyId * 2.399963229728653 + Math.random() * 0.3,
      cooldown: 0.7 + Math.random() * 0.8,
      burn: 0,
      burnDps: 0,
    });
    nextEnemyId += 1;
  }
}

function punchAttack(source) {
  const reach = 58 * source.mods.range;
  const width = 0.72;
  const damage = 30 * source.mods.shellDamage;
  let hits = 0;
  source.punchAnim = 0.18;
  source.punchSide = (source.punchSide || 1) * -1;
  const fistX = source.x + Math.cos(source.angle) * (source.r + reach * 0.45);
  const fistY = source.y + Math.sin(source.angle) * (source.r + reach * 0.45);
  addSpark(fistX, fistY, "#f2ca52", 7);
  enemies
    .filter((enemy) => enemy.team !== "ally")
    .map((enemy) => ({
      enemy,
      d: distance(source, enemy),
      diff: Math.atan2(Math.sin(angleTo(source, enemy) - source.angle), Math.cos(angleTo(source, enemy) - source.angle)),
    }))
    .filter(({ enemy, d, diff }) => d < reach + source.r + enemy.r && Math.abs(diff) < width)
    .sort((a, b) => a.d - b.d)
    .slice(0, PLAYER_WEAPON_PIERCE)
    .forEach(({ enemy }) => {
      const hitDamage = enemyIncomingDamage(enemy, playerDamage(damage, enemy));
      enemy.hp -= hitDamage;
      markHit(enemy, hitDamage, source);
      addSpark(enemy.x, enemy.y, "#f2ca52", 8);
      hits += 1;
    });
  if (hits > 0) camera.shake = Math.max(camera.shake, 2.5);
}

function swordSlash() {
  const reach = 92 * player.mods.range;
  const width = 0.92;
  const damage = playerDamage(13 * player.mods.shellDamage);
  let hits = 0;
  player.punchAnim = 0.2;
  player.punchSide = (player.punchSide || 1) * -1;
  const slashX = player.x + Math.cos(player.angle) * (player.r + reach * 0.42);
  const slashY = player.y + Math.sin(player.angle) * (player.r + reach * 0.42);
  addSpark(slashX, slashY, "#ff8d45", 9);
  enemies
    .filter((enemy) => enemy.team !== "ally")
    .map((enemy) => ({
      enemy,
      d: distance(player, enemy),
      diff: Math.atan2(Math.sin(angleTo(player, enemy) - player.angle), Math.cos(angleTo(player, enemy) - player.angle)),
    }))
    .filter(({ enemy, d, diff }) => d < reach + enemy.r && Math.abs(diff) < width)
    .sort((a, b) => a.d - b.d)
    .slice(0, PLAYER_WEAPON_PIERCE)
    .forEach(({ enemy }) => {
      const hitDamage = enemyIncomingDamage(enemy, damage);
      enemy.hp -= hitDamage;
      enemy.burn = Math.max(enemy.burn || 0, 1.3);
      enemy.burnDps = Math.max(enemy.burnDps || 0, dragonBurnDamage());
      markHit(enemy, hitDamage, player);
      addSpark(enemy.x, enemy.y, "#ff8d45", 8);
      hits += 1;
    });
  if (hits > 0) camera.shake = Math.max(camera.shake, 2.2);
}

function enemyPunchAttack(enemy, target) {
  if (!target || target.isRoamTarget) return;
  const reach = 48 * enemy.mods.range;
  const width = 0.76;
  if (!isInCone(enemy, target, enemy.angle, reach + enemy.r + target.r, width)) return;
  const damage = enemyAttackDamage(enemy, 6 + enemy.level * 0.7);
  enemy.punchAnim = 0.18;
  enemy.punchSide = (enemy.punchSide || 1) * -1;
  if (target === player) {
    player.hp -= playerIncomingDamage(damage);
    player.invuln = 0.08;
    markHit(player, damage, enemy);
    if (player.hp <= 0) checkPlayerDeath();
  } else {
    target.hp -= damage;
    markHit(target, damage, enemy);
  }
  addSpark(target.x, target.y, "#f2ca52", 6);
}

function updateDragonAlly(dragon, dt) {
  dragon.life -= dt;
  dragon.cooldown -= dt;
  dragon.retargetTimer = (dragon.retargetTimer || 0) - dt;
  if (dragon.retargetTimer <= 0 || !dragon.targetId) {
    const nearest = dragon.team === "ally" ? (dragon.blackDragon ? findBlackDragonTarget(dragon) : findNearestTank(dragon, "enemy")) : player;
    dragon.targetId = nearest?.id || null;
    dragon.retargetTimer = dragon.blackDragon ? 0.38 : dragon.adultDragon ? 0.32 : 0.24;
  }
  let target = dragon.team === "ally" ? enemies.find((enemy) => enemy.id === dragon.targetId && enemy.team !== "ally") : player;
  if (!target) {
    target = dragon.team === "ally" ? (dragon.blackDragon ? findBlackDragonTarget(dragon) : findNearestTank(dragon, "enemy")) : player;
    dragon.targetId = target?.id || null;
    dragon.retargetTimer = dragon.blackDragon ? 0.38 : 0.24;
  }
  if (target) {
    dragon.angle = angleTo(dragon, target);
    const targetDistance = distance(dragon, target);
    const attackRange = dragon.blackDragon ? 330 : dragon.adultDragon ? 145 : 28;
    if (dragon.blackDragon) {
      const desired = 315;
      const tooClose = 205 + target.r;
      const tooFar = 390 + target.r;
      const side = dragon.orbitSide || 1;
      const towardX = Math.cos(dragon.angle);
      const towardY = Math.sin(dragon.angle);
      const tangentX = Math.cos(dragon.angle + side * Math.PI / 2);
      const tangentY = Math.sin(dragon.angle + side * Math.PI / 2);
      let vx = tangentX * 0.82;
      let vy = tangentY * 0.82;
      if (targetDistance > tooFar) {
        vx += towardX * 1.15;
        vy += towardY * 1.15;
      } else if (targetDistance < tooClose) {
        vx -= towardX * 1.45;
        vy -= towardY * 1.45;
      } else {
        const rangePull = clamp((targetDistance - desired) / desired, -0.5, 0.5);
        vx += towardX * rangePull;
        vy += towardY * rangePull;
      }
      if (dragon.x < 140) vx += 0.8;
      if (dragon.x > world.w - 140) vx -= 0.8;
      if (dragon.y < 140) vy += 0.8;
      if (dragon.y > world.h - 140) vy -= 0.8;
      const len = Math.hypot(vx, vy) || 1;
      dragon.x = clamp(dragon.x + (vx / len) * dragon.speed * 0.78 * dt, 24, world.w - 24);
      dragon.y = clamp(dragon.y + (vy / len) * dragon.speed * 0.78 * dt, 24, world.h - 24);
    } else if (targetDistance > attackRange + target.r) {
      dragon.x = clamp(dragon.x + Math.cos(dragon.angle) * dragon.speed * dt, 24, world.w - 24);
      dragon.y = clamp(dragon.y + Math.sin(dragon.angle) * dragon.speed * dt, 24, world.h - 24);
    }
    if (dragon.adultDragon && !dragon.blackDragon) {
      const reach = 158;
      const width = 0.48;
      dragon.flameVisualTimer = (dragon.flameVisualTimer || 0) - dt;
      if (dragon.flameVisualTimer <= 0) {
        flames.push({
          x: dragon.x,
          y: dragon.y,
          angle: dragon.angle,
          reach,
          width,
          life: 0.12,
          color: "#ff6f35",
        });
        dragon.flameVisualTimer = 0.08;
      }
      let hits = 0;
      if (dragon.team !== "ally") {
        if (player.tankKey !== "helicopter" && isInCone(dragon, player, dragon.angle, reach, width) && player.invuln <= 0) {
          const damage = playerIncomingDamage(FLAME_DPS * 1.25 * dt);
          player.hp -= damage;
          player.invuln = 0.04;
          markHit(player, damage, dragon);
          if (Math.random() < 8 * dt) addSpark(player.x, player.y, "#ff6f35", 1);
          if (player.hp <= 0) checkPlayerDeath();
        }
      } else {
        for (let i = 0; i < enemies.length && hits < PLAYER_WEAPON_PIERCE; i += 1) {
          const enemy = enemies[i];
          if (enemy.team !== "ally" && isInCone(dragon, enemy, dragon.angle, reach, width)) {
          const damage = enemyIncomingDamage(enemy, FLAME_DPS * 2 * dt);
          enemy.hp -= damage;
          enemy.burn = Math.max(enemy.burn || 0, 2.2);
          enemy.burnDps = Math.max(enemy.burnDps || 0, FLAME_DPS * 1.35);
          if (!enemy.hitFlash) markHit(enemy, 0.35, dragon);
          if (Math.random() < 8 * dt) addSpark(enemy.x, enemy.y, "#ff6f35", 1);
            hits += 1;
          }
        }
      }
    } else if (dragon.blackDragon) {
      dragon.beamCycleTime = Math.max(0, (dragon.beamCycleTime ?? 3) - dt);
      if (dragon.beamCycleTime <= 0) {
        dragon.beamFiring = !dragon.beamFiring;
        dragon.beamCycleTime = dragon.beamFiring ? 3 : 5;
      }
      if (dragon.beamFiring) dragon.beamVisualTimer = (dragon.beamVisualTimer || 0) - dt;
      if (dragon.beamFiring && dragon.beamVisualTimer <= 0) {
        bullets.push({
          kind: "allyBeam",
          x: dragon.x + Math.cos(dragon.angle) * 38,
          y: dragon.y + Math.sin(dragon.angle) * 38,
          vx: Math.cos(dragon.angle),
          vy: Math.sin(dragon.angle),
          angle: dragon.angle,
          age: 0,
          life: 0.08,
          range: 430,
          damage: 90 * dt,
          hp: 9999,
          pierceLeft: 999,
          hitEnemies: new Set(),
          r: 18,
          color: "#7d4dff",
          afterburnDps: 15,
          afterburnTime: 3.2,
          endDamageMult: 2.6,
          endDamageZone: 95,
          noStun: true,
        });
        if (bullets.length > MAX_PLAYER_BULLETS) bullets.splice(0, bullets.length - MAX_PLAYER_BULLETS);
        if (Math.random() < 10 * dt) addSpark(dragon.x + Math.cos(dragon.angle) * 42, dragon.y + Math.sin(dragon.angle) * 42, "#7d4dff", 1);
        dragon.beamVisualTimer = 0.035;
      }
    } else if (targetDistance <= attackRange + target.r && dragon.cooldown <= 0) {
      const damage = enemyIncomingDamage(target, 9);
      target.hp -= damage;
      target.burn = Math.max(target.burn || 0, 2);
      target.burnDps = Math.max(target.burnDps || 0, dragonBurnDamage());
      markHit(target, damage, dragon);
      addSpark(target.x, target.y, "#ff8d45", 5);
      dragon.punchAnim = 0.16;
      dragon.cooldown = 0.52;
    }
  } else {
    dragon.x = clamp(dragon.x + Math.cos(dragon.angle) * dragon.speed * 0.35 * dt, 24, world.w - 24);
    dragon.y = clamp(dragon.y + Math.sin(dragon.angle) * dragon.speed * 0.35 * dt, 24, world.h - 24);
  }
}

function medicInfantryPulse(medic, dt) {
  medic.healPulse = (medic.healPulse || 0) - dt;
  if (medic.healPulse > 0) return;
  medic.healPulse = 1.15;
  let healed = 0;
  enemies.forEach((ally) => {
    if (ally.team !== medic.team || !ally.infantry || ally.hp >= ally.maxHp || distance(medic, ally) > 185) return;
    const amount = Math.max(3, ally.maxHp * 0.08);
    ally.hp = Math.min(ally.maxHp, ally.hp + amount);
    healed += 1;
  });
  if (healed > 0) {
    addSpark(medic.x, medic.y, "#80ff9d", Math.min(12, healed * 2));
    medic.healRing = 0.35;
  }
}

function firePlayer(dt, target) {
  player.cooldown -= dt;
  player.trooperHeliCooldown = Math.max(0, (player.trooperHeliCooldown || 0) - dt);
  player.dragonCooldown = Math.max(0, (player.dragonCooldown || 0) - dt);
  player.adultDragonCooldown = Math.max(0, (player.adultDragonCooldown || 0) - dt);
  player.blackDragonCooldown = Math.max(0, (player.blackDragonCooldown || 0) - dt);
  player.gammaStormCooldown = Math.max(0, (player.gammaStormCooldown || 0) - dt);
  player.thunderBuffCooldown = Math.max(0, (player.thunderBuffCooldown || 0) - dt);
  player.thunderBuffActive = Math.max(0, (player.thunderBuffActive || 0) - dt);
  player.thunderFocusCooldown = Math.max(0, (player.thunderFocusCooldown || 0) - dt);
  player.fireShieldCooldown = Math.max(0, (player.fireShieldCooldown || 0) - dt);
  player.fireShieldActive = Math.max(0, (player.fireShieldActive || 0) - dt);
  player.tazerCooldown = Math.max(0, (player.tazerCooldown || 0) - dt);
  player.tazerBeamCooldown = Math.max(0, (player.tazerBeamCooldown || 0) - dt);
  const tazerBeamWasActive = (player.tazerBeamActive || 0) > 0;
  player.tazerBeamActive = Math.max(0, (player.tazerBeamActive || 0) - dt);
  if (player.tankKey === "tazer" && tazerBeamWasActive && player.tazerBeamActive <= 0) {
    startTazerEndStorm();
  }
  player.tazerMiniCooldown = Math.max(0, (player.tazerMiniCooldown || 0) - dt);
  player.tazerCannonCooldown = Math.max(0, (player.tazerCannonCooldown || 0) - dt);
  player.tazerFocusCooldown = Math.max(0, (player.tazerFocusCooldown || 0) - dt);
  player.railGiantCooldown = Math.max(0, (player.railGiantCooldown || 0) - dt);
  if (player.tankKey === "tazer" && player.tazerBeamActive > 0) {
    tazerGiantBeam(dt);
  }
  if (player.tankKey === "trooper" && keys.has("e") && player.trooperHeliCooldown <= 0) {
    player.trooperHeliCooldown = TROOPER_HELI_COOLDOWN;
    sendTrooperHelicopter();
  }
  if (player.tankKey === "gamma" && keys.has("e") && player.gammaStormCooldown <= 0) {
    player.gammaStormCooldown = GAMMA_STORM_COOLDOWN;
    callGammaLightningStorm();
  }
  if (isThunderGod() && keys.has("q") && player.thunderBuffCooldown <= 0 && !thunderGodBuffActive()) {
    startThunderGodBuff();
  }
  if (isThunderGod() && keys.has("e") && player.thunderFocusCooldown <= 0) {
    if (startThunderFocusStorm()) player.thunderFocusCooldown = THUNDER_GOD_FOCUS_COOLDOWN;
  }
  if (player.tankKey === "incendiary" && player.mods?.fireShieldAbility && keys.has("q") && player.fireShieldCooldown <= 0 && !fireShieldActive()) {
    startFireShield();
  }
  if (player.tankKey === "juggernaut" && keys.has("e") && player.juggernautDomainCooldown <= 0 && !activeJuggernautDomain()) {
    startJuggernautDomain();
  }
  if (player.tankKey === "juggernaut" && keys.has("q") && player.juggernautJudgmentCooldown <= 0 && !player.juggernautJudgmentArmed) {
    player.juggernautJudgmentArmed = true;
    player.juggernautJudgmentCooldown = JUGGERNAUT_JUDGMENT_COOLDOWN;
    addSpark(player.x + Math.cos(player.angle) * 42, player.y + Math.sin(player.angle) * 42, "#f0d37a", 8);
  }
  if (player.tankKey === "juggernaut" && keys.has("x") && player.juggernautResolveCooldown <= 0 && !juggernautResolveActive()) {
    startJuggernautResolve();
  }
  if (player.tankKey === "railgun" && keys.has("e") && player.railGiantCooldown <= 0 && !player.railGiantArmed) {
    player.railGiantArmed = true;
    player.railGiantCooldown = RAILGUN_GIANT_COOLDOWN;
    addSpark(player.x + Math.cos(player.angle) * 42, player.y + Math.sin(player.angle) * 42, "#88f7ff", 3);
  }
  if (player.tankKey === "tazer" && keys.has("e") && player.tazerCooldown <= 0) {
    player.tazerCooldown = TAZER_STUN_COOLDOWN;
    tazerScreenStun();
  }
  if (player.tankKey === "tazer" && keys.has("q") && player.tazerBeamCooldown <= 0) {
    player.tazerBeamCooldown = TAZER_BEAM_COOLDOWN;
    player.tazerBeamActive = TAZER_BEAM_DURATION;
    tazerGiantBeam(dt);
  }
  if (player.tankKey === "tazer" && keys.has("z") && player.tazerMiniCooldown <= 0) {
    player.tazerMiniCooldown = TAZER_MINI_COOLDOWN;
    summonMiniTasers();
  }
  if (player.tankKey === "tazer" && keys.has("r") && player.tazerCannonCooldown <= 0 && spawnTazerCannonTrap()) {
    player.tazerCannonCooldown = TAZER_CANNON_COOLDOWN;
  }
  if (player.tankKey === "tazer" && keys.has("x") && player.tazerGuardCooldown <= 0 && player.tazerGuardActive <= 0) {
    startTazerGuard();
  }
  if (player.tankKey === "tazer" && keys.has("b")) {
    if (player.tazerFocusCooldown <= 0 && startTazerFocusStorm()) {
      player.tazerFocusCooldown = TAZER_FOCUS_COOLDOWN;
    }
    keys.delete("b");
  }
  if (player.tankKey === "dragonTamer" && keys.has("e") && player.dragonCooldown <= 0) {
    player.dragonCooldown = DRAGON_HORDE_COOLDOWN;
    summonBabyDragonHorde();
  }
  if (player.tankKey === "dragonTamer" && keys.has("q") && player.adultDragonCooldown <= 0) {
    player.adultDragonCooldown = ADULT_DRAGON_COOLDOWN;
    summonAdultDragon();
  }
  if (player.tankKey === "dragonTamer" && keys.has("r") && player.blackDragonCooldown <= 0) {
    player.blackDragonCooldown = BLACK_DRAGON_COOLDOWN;
    summonBlackDragon();
  }
  if (player.tankKey === "flame") {
    if (mouse.down || keys.has(" ")) {
      const reach = 145 * player.mods.range;
      const width = 0.45 * player.mods.flameWidth;
      flames.push({
        x: player.x,
        y: player.y,
        angle: player.angle,
        reach,
        width,
        life: 0.09,
        color: player.buildName.includes("Blue Flame") ? "#56cfff" : "#ff8e33",
      });
      enemies
        .filter((enemy) => enemy.team !== "ally")
        .map((enemy) => ({
          enemy,
          d: distance(player, enemy),
          diff: Math.atan2(Math.sin(angleTo(player, enemy) - player.angle), Math.cos(angleTo(player, enemy) - player.angle)),
        }))
        .filter(({ enemy, d, diff }) => d < reach + enemy.r && Math.abs(diff) < width)
        .sort((a, b) => a.d - b.d)
        .slice(0, PLAYER_WEAPON_PIERCE)
        .forEach(({ enemy }) => {
          enemy.hp -= enemyIncomingDamage(enemy, FLAME_DPS * dt);
          if (!enemy.hitFlash) markHit(enemy, 0.4, player);
          enemy.burn = Math.max(enemy.burn, 2.4 * player.mods.burnTime);
          enemy.burnDps = FLAME_DPS;
          addSpark(enemy.x, enemy.y, "#ff7b38", 1);
        });
      burnEnemyBulletsInFlame(reach, width, dt);
    }
    return;
  }

  const firing = mouse.down || keys.has(" ");
  if (player.tankKey === "railgun") {
    fireRailgunBeam(dt, firing);
    return;
  }
  if (player.tankKey === "airstrike") {
    if (!firing || player.cooldown > 0) return;
    player.cooldown = AIRSTRIKE_COOLDOWN / player.mods.fireRate;
    callAirstrike(target);
    return;
  }
  if (isThunderGod()) {
    if (!firing || player.cooldown > 0) return;
    player.cooldown = 0.82 / (player.mods.fireRate * thunderGodStatMult());
    callThunderAirstrike(target);
    return;
  }
  if (player.tankKey === "trooper") {
    if (!firing || player.cooldown > 0) return;
    player.cooldown = 7;
    deployTrooperShielder();
    return;
  }
  if (player.tankKey === "helicopter") {
    if (!firing || player.cooldown > 0) return;
    player.cooldown = 0.18 / player.mods.fireRate;
    const count = Math.max(1, Math.min(6, Math.round(player.mods.bulletCount || 2)));
    for (let i = 0; i < count; i += 1) {
      const offset = (i - (count - 1) / 2) * 0.045;
      const jitter = (Math.random() - 0.5) * 0.025;
      const a = player.angle + offset + jitter;
      bullets.push({
        kind: "minigun",
        x: player.x + Math.cos(a) * 34,
        y: player.y + Math.sin(a) * 34,
        vx: Math.cos(a) * 440 * player.mods.bulletSpeed,
        vy: Math.sin(a) * 440 * player.mods.bulletSpeed,
        age: 0,
        life: 0.9 * player.mods.range,
        damage: DEFAULT_BULLET_DAMAGE * player.mods.shellDamage,
        hp: DEFAULT_BULLET_DAMAGE * player.mods.shellDamage,
        pierceLeft: 1,
        hitEnemies: new Set(),
        r: 2.8 * player.mods.shellSize,
        color: "#f2ca52",
      });
    }
    if (bullets.length > MAX_PLAYER_BULLETS) bullets.splice(0, bullets.length - MAX_PLAYER_BULLETS);
    return;
  }
  if (player.tankKey === "infantry") {
    if (!firing || player.cooldown > 0) return;
    player.cooldown = 0.34 / player.mods.fireRate;
    punchAttack(player);
    return;
  }
  if (player.tankKey === "dragonTamer") {
    if (!firing || player.cooldown > 0) return;
    player.cooldown = 0.46 / player.mods.fireRate;
    swordSlash();
    return;
  }
  if (player.tankKey === "tazer") {
    if (!firing) {
      player.tazerEnergy = clamp((player.tazerEnergy || 0) + (TAZER_ENERGY_REGEN + player.mods.fireRate * 0.025) * dt, 0, 1);
      return;
    }
    if ((player.tazerEnergy || 0) <= 0) return;
    if (player.cooldown > 0) return;
    player.tazerEnergy = clamp((player.tazerEnergy || 0) - TAZER_ENERGY_DRAIN * 0.42, 0, 1);
    player.cooldown = Math.max(0.22, 0.2 / Math.max(1, player.mods.fireRate));
    tazerChainAttack();
    return;
  }
  const interval =
    player.tankKey === "gamma" ? (0.62 * 1.5) / (player.mods.fireRate * GAMMA_FIRE_RATE_MULTIPLIER) + 2 : 0.38 / player.mods.fireRate;
  if (!firing || player.cooldown > 0) return;
  player.cooldown = player.tankKey === "juggernaut" && juggernautPlayerBuffActive() ? interval / JUGGERNAUT_DOMAIN_PLAYER_BUFF : interval;

  if (player.tankKey === "gamma") {
    const arcs = Math.min(GAMMA_MAX_PELLETS, (2 + player.mods.gammaArcs) * 3);
    for (let i = 0; i < arcs; i += 1) {
      const t = arcs === 1 ? 0 : i / (arcs - 1);
      const offset = (t - 0.5) * (1.05 + player.mods.bulletSpread);
      const a = player.angle + offset;
      bullets.push({
        kind: "gamma",
        x: player.x + Math.cos(a) * 30,
        y: player.y + Math.sin(a) * 30,
        vx: Math.cos(a) * 185 * player.mods.bulletSpeed,
        vy: Math.sin(a) * 185 * player.mods.bulletSpeed,
        age: 0,
        turnTime: GAMMA_SHORT_LIFE,
        life: GAMMA_SHORT_LIFE,
        angle: a,
        returning: false,
        noKnockback: true,
        gammaSide: offset === 0 ? (i % 2 === 0 ? 1 : -1) : Math.sign(offset),
        gammaLightningDamage: player.mods.gammaLightningDamage || 1,
        gammaLightningChain: player.mods.gammaLightningChain || 0,
        gammaLightningRadius: player.mods.gammaLightningRadius || 1,
        gammaLightningBurst: player.mods.gammaLightningBurst || 1,
        gammaLightningStun: player.mods.gammaLightningStun || 1,
        returnSpeed: 420 * player.mods.bulletSpeed,
        damage: GAMMA_DAMAGE,
        hp: GAMMA_DAMAGE,
        pierceLeft: 1,
        hitEnemies: new Set(),
        r: 5,
        color: GAMMA_BLUE,
      });
    }
    if (bullets.length > MAX_PLAYER_BULLETS) bullets.splice(0, bullets.length - MAX_PLAYER_BULLETS);
    return;
  }

  if (player.tankKey === "shotgun") {
    const count = Math.max(1, player.mods.pelletCount || 12);
    const forwardSpread = Math.min(player.mods.bulletSpread, 0.58);
    for (let i = 0; i < count; i += 1) {
      const t = count === 1 ? 0.5 : i / (count - 1);
      const jitter = (Math.random() - 0.5) * 0.035;
      const a = player.angle + (t - 0.5) * forwardSpread + jitter;
      bullets.push({
        kind: "shell",
        x: player.x + Math.cos(a) * 32,
        y: player.y + Math.sin(a) * 32,
        vx: Math.cos(a) * 330 * player.mods.bulletSpeed,
        vy: Math.sin(a) * 330 * player.mods.bulletSpeed,
        age: 0,
        life: 0.82 * player.mods.range,
        damage: SHOTGUN_DAMAGE * player.mods.shellDamage,
        hp: SHOTGUN_DAMAGE * player.mods.shellDamage,
        pierceLeft: playerPierce(),
        hitEnemies: new Set(),
        r: 4.5 * player.mods.shellSize,
        color: "#ffbd7a",
      });
    }
    if (bullets.length > MAX_PLAYER_BULLETS) bullets.splice(0, bullets.length - MAX_PLAYER_BULLETS);
    return;
  }

  const count = player.mods.bulletCount;
  for (let i = 0; i < count; i += 1) {
    const t = count === 1 ? 0.5 : i / (count - 1);
    const spread = player.mods.omniFire ? TAU : (t - 0.5) * (0.18 + player.mods.bulletSpread);
    const a = player.mods.omniFire ? (i / count) * TAU : angleTo(player, target) + spread;
    bullets.push({
      kind: "shell",
      x: player.x + Math.cos(a) * 34,
      y: player.y + Math.sin(a) * 34,
      vx: Math.cos(a) * 360 * player.mods.bulletSpeed,
      vy: Math.sin(a) * 360 * player.mods.bulletSpeed,
      age: 0,
      life: 1.6 * player.mods.range,
      damage: DEFAULT_BULLET_DAMAGE * player.mods.shellDamage,
      hp: DEFAULT_BULLET_DAMAGE * player.mods.shellDamage,
      pierceLeft: playerPierce(),
      hitEnemies: new Set(),
      fireworkFragments: player.mods.fireworkFragments || 0,
      nukeExplosion: player.mods.nukeExplosion || fireShieldActive(),
      afterburnDps: player.mods.afterburnDps || 0,
      afterburnTime: player.mods.afterburnTime || 0,
      juggernautJudgment: player.tankKey === "juggernaut" && player.juggernautJudgmentArmed,
      r: 5 * player.mods.shellSize,
      color: player.mods.afterburnDps ? "#ff8d45" : "#f7e58b",
    });
  }
  if (player.tankKey === "juggernaut" && player.juggernautJudgmentArmed) player.juggernautJudgmentArmed = false;
  if (bullets.length > MAX_PLAYER_BULLETS) bullets.splice(0, bullets.length - MAX_PLAYER_BULLETS);
}

function burnEnemyBulletsInFlame(reach, width, dt) {
  for (let i = enemyBullets.length - 1; i >= 0; i -= 1) {
    const bullet = enemyBullets[i];
    if (isInCone(player, bullet, player.angle, reach, width)) {
      bullet.flameBurn = (bullet.flameBurn || 0) + dt;
      addSpark(bullet.x, bullet.y, "#ffb545", 1);
      if (bullet.flameBurn >= FLAME_BULLET_BURN_SECONDS) {
        addSpark(bullet.x, bullet.y, "#ff7b38", 4);
        enemyBullets.splice(i, 1);
      }
    }
  }
}

function burnEnemyBulletsInRailBeam(beam, dt) {
  for (let i = enemyBullets.length - 1; i >= 0; i -= 1) {
    const bullet = enemyBullets[i];
    if (bullet.kind === "enemyBeam") continue;
    if (distanceToBeam(beam, bullet) <= bullet.r + beam.r) {
      const blockAt = distanceAlongBeam(beam, bullet);
      if (blockAt > 24 && blockAt < beam.range && Math.random() < railBlockChance(bullet)) {
        beam.range = Math.max(24, Math.min(beam.range, blockAt - bullet.r));
        addSpark(bullet.x, bullet.y, "#88f7ff", 9);
        enemyBullets.splice(i, 1);
        continue;
      }
      bullet.railBurn = (bullet.railBurn || 0) + dt;
      addSpark(bullet.x, bullet.y, "#88f7ff", 1);
      if (bullet.railBurn >= RAILGUN_BULLET_BURN_SECONDS) {
        addSpark(bullet.x, bullet.y, "#88f7ff", 5);
        enemyBullets.splice(i, 1);
      }
    }
  }
}

function blockEnemyRailBeamWithPlayerBullets(beam) {
  for (let i = bullets.length - 1; i >= 0; i -= 1) {
    const bullet = bullets[i];
    if (!bullet || bullet.kind === "beam" || bullet.kind === "allyBeam") continue;
    if (distanceToBeam(beam, bullet) > bullet.r + beam.r) continue;
    const blockAt = distanceAlongBeam(beam, bullet);
    if (blockAt <= 24 || blockAt >= beam.range || Math.random() >= railBlockChance(bullet)) continue;
    beam.range = Math.max(24, Math.min(beam.range, blockAt - bullet.r));
    addSpark(bullet.x, bullet.y, "#88f7ff", 9);
    bullets.splice(i, 1);
  }
}

function fireRailgunBeam(dt, firing) {
  const recharge = (RAILGUN_ENERGY_REGEN + player.mods.fireRate * 0.04) * dt;
  if (!firing) {
    player.railGiantActive = false;
    player.railEnergy = clamp(player.railEnergy + recharge, 0, 1);
    return;
  }
  if (player.railEnergy <= 0) {
    player.railGiantActive = false;
    return;
  }
  if (player.railGiantArmed) {
    player.railGiantActive = true;
    player.railGiantArmed = false;
  }

  const drain = RAILGUN_ENERGY_DRAIN * dt;
  player.railEnergy = clamp(player.railEnergy - drain, 0, 1);
  const a = player.angle;
  const giantBeam = Boolean(player.railGiantActive);
  if (player.railEnergy <= 0) player.railGiantActive = false;
  const count = giantBeam ? 1 : Math.max(1, Math.round(player.mods.beamCount || 1));
  const sideX = Math.cos(a + Math.PI / 2);
  const sideY = Math.sin(a + Math.PI / 2);
  for (let i = 0; i < count; i += 1) {
    const offset = (i - (count - 1) / 2) * 9;
    const beamWidth = giantBeam ? RAILGUN_GIANT_E_WIDTH : player.mods.beamWidth;
    bullets.push({
      kind: "beam",
      x: player.x + Math.cos(a) * 32 + sideX * offset,
      y: player.y + Math.sin(a) * 32 + sideY * offset,
      vx: Math.cos(a),
      vy: Math.sin(a),
      angle: a,
      age: 0,
      life: giantBeam ? 0.12 : 0.065,
      range: 760 * player.mods.range * (giantBeam ? 1.12 : 1),
      damage: ((RAILGUN_DPS * PLAYER_RAILGUN_DAMAGE_MULTIPLIER * player.mods.shellDamage * dt) / Math.sqrt(count)) * (giantBeam ? 1.35 : 1),
      hp: 9999,
      pierceLeft: 999,
      hitEnemies: new Set(),
      r: 8 * beamWidth,
      color: giantBeam ? "#eaffff" : "#88f7ff",
      giantRail: giantBeam,
      chainDamage: (RAILGUN_DPS * PLAYER_RAILGUN_DAMAGE_MULTIPLIER * player.mods.shellDamage * dt * 0.48) / Math.sqrt(count),
    });
  }
  if (bullets.length > MAX_PLAYER_BULLETS) bullets.splice(0, bullets.length - MAX_PLAYER_BULLETS);
  camera.shake = Math.max(camera.shake, giantBeam ? 7 : 2.4);
}

function callAirstrike(target) {
  const x = clamp(target.x, 60, world.w - 60);
  const y = clamp(target.y, 60, world.h - 60);
  const damage = DEFAULT_BULLET_DAMAGE * player.mods.shellDamage;
  bullets.push({
    kind: "airstrike",
    x,
    y: y - 560,
    targetX: x,
    targetY: y,
    vx: 0,
    vy: 760,
    age: 0,
    life: 1.1,
    damage,
    hp: damage,
    pierceLeft: 1,
    hitEnemies: new Set(),
    r: 6 * player.mods.shellSize,
    fireworkFragments: player.mods.fireworkFragments || 18,
    nukeExplosion: true,
    color: "#ffcf5f",
  });
  addSpark(x, y, "#ffcf5f", 8);
  if (bullets.length > MAX_PLAYER_BULLETS) bullets.splice(0, bullets.length - MAX_PLAYER_BULLETS);
}

function callThunderAirstrike(target) {
  const x = clamp(target.x, 60, world.w - 60);
  const y = clamp(target.y, 60, world.h - 60);
  const damage = DEFAULT_BULLET_DAMAGE * player.mods.shellDamage;
  bullets.push({
    kind: "airstrike",
    thunderStrike: true,
    x,
    y: y - 560,
    targetX: x,
    targetY: y,
    vx: 0,
    vy: 860 * Math.min(2.4, player.mods.bulletSpeed * thunderGodStatMult()),
    age: 0,
    life: 1.05,
    damage,
    hp: damage,
    pierceLeft: 1,
    hitEnemies: new Set(),
    r: 8 * player.mods.shellSize * Math.min(1.6, thunderGodStatMult()),
    gammaLightningDamage: (player.mods.gammaLightningDamage || 1) * Math.sqrt(thunderGodStatMult()),
    gammaLightningChain: player.mods.gammaLightningChain || 0,
    gammaLightningRadius: (player.mods.gammaLightningRadius || 1) * Math.min(1.35, thunderGodStatMult()),
    gammaLightningBurst: (player.mods.gammaLightningBurst || 1) * Math.min(1.35, thunderGodStatMult()),
    gammaLightningStun: player.mods.gammaLightningStun || 1,
    color: "#fff06d",
  });
  lightning.push({
    x1: x,
    y1: Math.max(0, y - 560),
    x2: x,
    y2: y,
    life: 0.18,
    max: 0.18,
    color: "#fff06d",
    large: true,
    skyStrike: true,
    width: 8,
    burst: 48,
  });
  addSpark(x, y, "#fff06d", 8);
  if (lightning.length > MAX_LIGHTNING) lightning.splice(0, lightning.length - MAX_LIGHTNING);
  if (bullets.length > MAX_PLAYER_BULLETS) bullets.splice(0, bullets.length - MAX_PLAYER_BULLETS);
}

function deployTrooperShielder() {
  const forwardX = Math.cos(player.angle);
  const forwardY = Math.sin(player.angle);
  const sideX = Math.cos(player.angle + Math.PI / 2);
  const sideY = Math.sin(player.angle + Math.PI / 2);
  const maxHp = Math.round(player.maxHp * 0.24);
  for (let i = 0; i < 5; i += 1) {
    const offset = (i - 2) * 29;
    const depth = 66;
    const x = clamp(player.x + forwardX * depth + sideX * offset, 36, world.w - 36);
    const y = clamp(player.y + forwardY * depth + sideY * offset, 36, world.h - 36);
    enemies.push({
      id: nextEnemyId,
      team: "ally",
      infantry: true,
      shielderTrooper: true,
      deployedShielder: true,
      tankKey: "infantry",
      buildName: "Deployed Shielder",
      color: "#59636a",
      accent: "#a7c7ff",
      mods: {
        fireRate: 0.4,
        bulletSpeed: 1,
        bulletCount: 1,
        bulletSpread: 0,
        shellDamage: 1,
        shellSize: 0.62,
        fireworkFragments: 0,
        nukeExplosion: false,
        omniFire: false,
        range: 0.8,
        flameWidth: 1,
        burnTime: 1,
        gammaArcs: 1,
        gammaReach: 1,
        gammaLightningDamage: 1,
        gammaLightningChain: 0,
        gammaLightningRadius: 1,
        gammaLightningBurst: 1,
        gammaLightningStun: 1,
        beamWidth: 1,
        beamCount: 1,
        pelletCount: 1,
      },
      level: player.level,
      x,
      y,
      r: 15,
      hp: maxHp,
      maxHp,
      speed: 112,
      angle: player.angle,
      strategy: "guard",
      chargeTime: 0.62,
      chargeVx: forwardX,
      chargeVy: forwardY,
      chargeSpeed: 420,
      cooldown: 0,
      burn: 0,
      burnDps: 0,
    });
    nextEnemyId += 1;
    addSpark(x, y, "#a7c7ff", 3);
  }
  camera.shake = Math.max(camera.shake, 4);
}

function sendTrooperHelicopter() {
  const loadout = createVariantLoadout("helicopterBase", player.level);
  const forwardX = Math.cos(player.angle);
  const forwardY = Math.sin(player.angle);
  const x = clamp(player.x + forwardX * 92, 42, world.w - 42);
  const y = clamp(player.y + forwardY * 92, 42, world.h - 42);
  const maxHp = allyMaxHp();
  enemies.push({
    id: nextEnemyId,
    team: "ally",
    tankKey: "helicopter",
    buildName: "Trooper Helicopter",
    color: "#9fb7c4",
    accent: "#f2ca52",
    mods: loadout.mods,
    level: player.level,
    x,
    y,
    r: 24,
    hp: maxHp,
    maxHp,
    speed: loadout.speed * 0.7,
    angle: player.angle,
    strategy: "support",
    formationGroup: nextEnemyId,
    formationSlot: 1,
    orbitSide: Math.random() < 0.5 ? -1 : 1,
    surroundAngle: nextEnemyId * 2.399963229728653,
    cooldown: 0.12,
    burn: 0,
    burnDps: 0,
  });
  nextEnemyId += 1;
  addSpark(x, y, "#f2ca52", 18);
  camera.shake = Math.max(camera.shake, 3);
}

function summonBabyDragonHorde() {
  const target = findNearestHostileToPlayer();
  const baseAngle = target ? angleTo(player, target) : player.angle;
  const existing = enemies.filter((enemy) => enemy.babyDragon).length;
  const count = Math.min(BABY_DRAGON_COUNT, Math.max(0, MAX_BABY_DRAGONS - existing));
  for (let i = 0; i < count; i += 1) {
    const t = count === 1 ? 0 : i / (count - 1);
    const spread = (t - 0.5) * 1.35;
    const angle = baseAngle + spread;
    const side = (i - (count - 1) / 2) * 9;
    const sideX = Math.cos(baseAngle + Math.PI / 2);
    const sideY = Math.sin(baseAngle + Math.PI / 2);
    const x = clamp(player.x + Math.cos(angle) * 42 + sideX * side, 24, world.w - 24);
    const y = clamp(player.y + Math.sin(angle) * 42 + sideY * side, 24, world.h - 24);
    enemies.push({
      id: nextEnemyId,
      team: "ally",
      tankKey: "dragon",
      babyDragon: true,
      buildName: "Baby Dragon",
      color: "#5e7750",
      accent: "#ff8d45",
      mods: { range: 1, shellDamage: 1, fireRate: 1, burnTime: 1 },
      level: player.level,
      x,
      y,
      r: 9,
      hp: 28,
      maxHp: 28,
      speed: 280,
      angle,
      strategy: "dragon",
      cooldown: 0.12 + i * 0.025,
      life: 12,
      burn: 0,
      burnDps: 0,
    });
    nextEnemyId += 1;
  }
  addSpark(player.x + Math.cos(baseAngle) * 52, player.y + Math.sin(baseAngle) * 52, "#ff8d45", 24);
  camera.shake = Math.max(camera.shake, 3);
}

function summonAdultDragon() {
  if (enemies.filter((enemy) => enemy.adultDragon).length >= MAX_ADULT_DRAGONS) return;
  const target = findNearestHostileToPlayer();
  const angle = target ? angleTo(player, target) : player.angle;
  const x = clamp(player.x + Math.cos(angle) * 72, 34, world.w - 34);
  const y = clamp(player.y + Math.sin(angle) * 72, 34, world.h - 34);
  enemies.push({
    id: nextEnemyId,
    team: "ally",
    tankKey: "dragon",
    adultDragon: true,
    buildName: "Grown Dragon",
    color: "#43614b",
    accent: "#ff6f35",
    mods: { range: 1.1, shellDamage: 1, fireRate: 1, burnTime: 1.4 },
    level: player.level,
    x,
    y,
    r: 24,
    hp: 85,
    maxHp: 85,
    speed: 205,
    angle,
    strategy: "dragon",
    cooldown: 0.2,
    life: 18,
    burn: 0,
    burnDps: 0,
  });
  nextEnemyId += 1;
  addSpark(x, y, "#ff6f35", 28);
  camera.shake = Math.max(camera.shake, 4);
}

function summonEnemyAdultDragon(tamer) {
  if (enemies.some((enemy) => enemy.enemyDragon && enemy.ownerId === tamer.id)) return;
  const angle = angleTo(tamer, player);
  const x = clamp(tamer.x + Math.cos(angle) * 58, 34, world.w - 34);
  const y = clamp(tamer.y + Math.sin(angle) * 58, 34, world.h - 34);
  const maxHp = Math.max(1, Math.round((70 + tamer.level * 8) * SPECIAL_ENEMY_HP_SCALE));
  enemies.push({
    id: nextEnemyId,
    team: "enemy",
    tankKey: "dragon",
    adultDragon: true,
    enemyDragon: true,
    ownerId: tamer.id,
    buildName: "Enemy Fire Dragon",
    color: "#5d2d25",
    accent: "#ff6f35",
    mods: { range: 1.05, shellDamage: 1, fireRate: 1, burnTime: 1.2 },
    level: tamer.level,
    x,
    y,
    r: 22,
    hp: maxHp,
    maxHp,
    speed: 185,
    angle,
    strategy: "dragon",
    cooldown: 0.2,
    life: 18,
    burn: 0,
    burnDps: 0,
  });
  nextEnemyId += 1;
  addSpark(x, y, "#ff6f35", 10);
}

function summonBlackDragon() {
  if (enemies.some((enemy) => enemy.blackDragon)) return;
  const target = findNearestHostileToPlayer();
  const angle = target ? angleTo(player, target) : player.angle;
  const x = clamp(player.x + Math.cos(angle) * 86, 42, world.w - 42);
  const y = clamp(player.y + Math.sin(angle) * 86, 42, world.h - 42);
  enemies.push({
    id: nextEnemyId,
    team: "ally",
    tankKey: "dragon",
    blackDragon: true,
    buildName: "Black Dragon",
    color: "#17131f",
    accent: "#7d4dff",
    mods: { range: 1.35, shellDamage: 1, fireRate: 1, burnTime: 1.8 },
    level: player.level,
    x,
    y,
    r: 31,
    hp: 425,
    maxHp: 425,
    speed: 178,
    angle,
    strategy: "dragon",
    orbitSide: Math.random() < 0.5 ? -1 : 1,
    cooldown: 0.25,
    beamFiring: true,
    beamCycleTime: 3,
    life: 24,
    burn: 0,
    burnDps: 0,
  });
  nextEnemyId += 1;
  addSpark(x, y, "#7d4dff", 22);
  camera.shake = Math.max(camera.shake, 5);
}

function chainLightningFrom(source, damage, alreadyHit = new Set()) {
  let current = source;
  let currentDamage = damage;
  const hit = new Set(alreadyHit);
  hit.add(source.id);
  for (let jump = 0; jump < RAILGUN_CHAIN_COUNT; jump += 1) {
    let target = null;
    let best = RAILGUN_CHAIN_RANGE * RAILGUN_CHAIN_RANGE;
    enemies.forEach((enemy) => {
      if (enemy.team === "ally" || hit.has(enemy.id)) return;
      const d = distanceSq(current, enemy);
      if (d < best) {
        best = d;
        target = enemy;
      }
    });
    if (!target) break;
    target.hp -= enemyIncomingDamage(target, currentDamage);
    markHit(target, currentDamage * 0.04, { ...current, kind: "beam" });
    addSpark(target.x, target.y, "#88f7ff", 3);
    lightning.push({
      x1: current.x,
      y1: current.y,
      x2: target.x,
      y2: target.y,
      life: 0.09,
      max: 0.09,
      color: "#88f7ff",
    });
    if (lightning.length > MAX_LIGHTNING) lightning.splice(0, lightning.length - MAX_LIGHTNING);
    hit.add(target.id);
    current = target;
    currentDamage *= 0.62;
  }
}

function enemyFire(enemy, target = player) {
  const a = angleTo(enemy, target);
  if (enemy.tankKey === "dragonTamer") {
    summonEnemyAdultDragon(enemy);
    return;
  }
  if (enemy.tankKey === "infantry") {
    if (enemy.puncher) {
      enemyPunchAttack(enemy, target);
      return;
    }
    if (enemy.akTrooper) {
      const damage = 1.25 + enemy.level * 0.06;
      addTankShot(enemy, a + (Math.random() - 0.5) * enemy.mods.bulletSpread, {
        kind: "enemyAk",
        speed: 330 * enemy.mods.bulletSpeed,
        life: 1.15 * enemy.mods.range,
        damage,
        hp: damage,
        r: 2.6,
        color: "#f2ca52",
      });
      return;
    }
    if (enemy.bomberTrooper) {
      const damage = 5 + enemy.level * 0.45;
      addTankShot(enemy, a + (Math.random() - 0.5) * enemy.mods.bulletSpread, {
        kind: "enemyBomb",
        speed: 150 * enemy.mods.bulletSpeed,
        life: 2.2 * enemy.mods.range,
        damage,
        hp: damage * 1.4,
        r: 7 * enemy.mods.shellSize,
        fireworkFragments: enemy.mods.fireworkFragments,
        color: "#ff8d5a",
      });
      return;
    }
    if (enemy.shielderTrooper) {
      return;
    }
    if (enemy.medicTrooper) {
      const damage = 0.7 + enemy.level * 0.04;
      addTankShot(enemy, a + (Math.random() - 0.5) * 0.12, {
        kind: "enemyAk",
        speed: 250 * enemy.mods.bulletSpeed,
        life: 0.9 * enemy.mods.range,
        damage,
        hp: damage,
        r: 2.4,
        color: "#80ff9d",
      });
      return;
    }
    addTankShot(enemy, a + (Math.random() - 0.5) * 0.12, {
      kind: "enemyRpg",
      speed: 175 * enemy.mods.bulletSpeed,
      life: 2.4 * enemy.mods.range,
      damage: 8 + enemy.level * 0.8,
      hp: 8 + enemy.level * 0.8,
      r: 5,
      fireworkFragments: 4,
      color: "#ffcf5f",
    });
    return;
  }
  if (enemy.tankKey === "antiAir") {
    const damage = Math.max(4, DEFAULT_BULLET_DAMAGE * enemy.mods.shellDamage * 0.55);
    addTankShot(enemy, a, {
      kind: "enemyMissile",
      speed: 230 * enemy.mods.bulletSpeed,
      life: 3.2 * enemy.mods.range,
      damage,
      hp: damage * 2,
      r: 7 * enemy.mods.shellSize,
      color: "#ff5959",
    });
    return;
  }
  if (enemy.tankKey === "tazer") {
    enemyTazerChainAttack(enemy, target);
    return;
  }
  if (enemy.tankKey === "gamma") {
    const arcs = Math.min(GAMMA_MAX_PELLETS, Math.max(3, (2 + enemy.mods.gammaArcs) * 2));
    for (let i = 0; i < arcs; i += 1) {
      const t = arcs === 1 ? 0 : i / (arcs - 1);
      const shotAngle = a + (t - 0.5) * (0.9 + enemy.mods.bulletSpread);
      addTankShot(enemy, shotAngle, {
        kind: enemy.team === "ally" ? "allyGamma" : "enemyGamma",
        speed: 190 * enemy.mods.bulletSpeed,
        life: GAMMA_SHORT_LIFE,
        turnTime: GAMMA_SHORT_LIFE,
        returnSpeed: 420 * enemy.mods.bulletSpeed,
        returnTargetId: enemy.id,
        returnHomeX: enemy.x,
        returnHomeY: enemy.y,
        gammaSide: (t - 0.5) === 0 ? (i % 2 === 0 ? 1 : -1) : Math.sign(t - 0.5),
        gammaLightningDamage: enemy.mods.gammaLightningDamage || 1,
        gammaLightningChain: enemy.mods.gammaLightningChain || 0,
        gammaLightningRadius: enemy.mods.gammaLightningRadius || 1,
        gammaLightningBurst: enemy.mods.gammaLightningBurst || 1,
        gammaLightningStun: enemy.mods.gammaLightningStun || 1,
        returning: false,
        noKnockback: true,
        damage: GAMMA_DAMAGE * (enemy.team === "ally" ? ALLY_POWER_MULTIPLIER : 1),
        hp: GAMMA_DAMAGE * (enemy.team === "ally" ? ALLY_POWER_MULTIPLIER : 1),
        r: 5,
        color: enemy.team === "ally" ? GAMMA_BLUE_SOFT : GAMMA_BLUE,
      });
    }
    return;
  }

  if (enemy.tankKey === "shotgun") {
    const count = Math.max(1, enemy.mods.pelletCount || 12);
    const forwardSpread = Math.min(enemy.mods.bulletSpread, 0.58);
    for (let i = 0; i < count; i += 1) {
      const t = count === 1 ? 0.5 : i / (count - 1);
      const shotAngle = a + (t - 0.5) * forwardSpread + (Math.random() - 0.5) * 0.035;
      addTankShot(enemy, shotAngle, {
        kind: enemy.team === "ally" ? "allyShell" : "enemyShell",
        speed: 225 * enemy.mods.bulletSpeed + enemy.level * 7,
        life: 0.95 * enemy.mods.range,
        damage:
          enemy.team === "ally"
            ? SHOTGUN_DAMAGE * enemy.mods.shellDamage * ALLY_POWER_MULTIPLIER
            : Math.max(0.8, SHOTGUN_DAMAGE * 0.32 * enemy.mods.shellDamage),
        hp:
          enemy.team === "ally"
            ? SHOTGUN_DAMAGE * enemy.mods.shellDamage * ALLY_POWER_MULTIPLIER
            : Math.max(0.8, SHOTGUN_DAMAGE * 0.32 * enemy.mods.shellDamage),
        r: 4.5 * enemy.mods.shellSize,
        color: enemy.team === "ally" ? "#9df29e" : "#ffbd7a",
      });
    }
    return;
  }

  if (enemy.tankKey === "helicopter") {
    const count = Math.max(1, Math.min(6, Math.round(enemy.mods.bulletCount || 2)));
    for (let i = 0; i < count; i += 1) {
      const offset = (i - (count - 1) / 2) * 0.045;
      const shotAngle = a + offset + (Math.random() - 0.5) * 0.03;
      const damage =
        enemy.team === "ally"
          ? DEFAULT_BULLET_DAMAGE * enemy.mods.shellDamage
          : Math.max(0.8, DEFAULT_BULLET_DAMAGE * enemy.mods.shellDamage * 0.18);
      addTankShot(enemy, shotAngle, {
        kind: enemy.team === "ally" ? "allyShell" : "enemyAk",
        speed: 440 * enemy.mods.bulletSpeed,
        life: 0.9 * enemy.mods.range,
        damage,
        hp: damage,
        r: 2.8 * enemy.mods.shellSize,
        color: enemy.team === "ally" ? "#9df29e" : "#f2ca52",
      });
    }
    return;
  }

  if (enemy.tankKey === "railgun") {
    const count = Math.min(5, Math.max(1, Math.round(enemy.mods.beamCount || 1)));
    const sideX = Math.cos(a + Math.PI / 2);
    const sideY = Math.sin(a + Math.PI / 2);
    for (let i = 0; i < count; i += 1) {
      const offset = (i - (count - 1) / 2) * 8;
      enemyBullets.push({
        kind: "enemyBeam",
        x: enemy.x + Math.cos(a) * 32 + sideX * offset,
        y: enemy.y + Math.sin(a) * 32 + sideY * offset,
        vx: Math.cos(a),
        vy: Math.sin(a),
        angle: a,
        age: 0,
        life: 0.11,
        range: 620 * enemy.mods.range,
        damage:
          enemy.team === "ally"
            ? RAILGUN_DPS * enemy.mods.shellDamage * 0.08 * ALLY_POWER_MULTIPLIER
            : enemyAttackDamage(enemy, Math.max(2.5, RAILGUN_DPS * enemy.mods.shellDamage * 0.024)),
        hp: 9999,
        r: 7 * enemy.mods.beamWidth,
        color: enemy.team === "ally" ? "#9df29e" : "#88f7ff",
        hitAllies: new Set(),
      });
    }
    if (enemyBullets.length > MAX_ENEMY_BULLETS) enemyBullets.splice(0, enemyBullets.length - MAX_ENEMY_BULLETS);
    return;
  }

  if (enemy.tankKey === "juggernaut") {
    const damage =
      enemy.team === "ally"
        ? DEFAULT_BULLET_DAMAGE * enemy.mods.shellDamage * ALLY_POWER_MULTIPLIER
        : DEFAULT_BULLET_DAMAGE * enemy.mods.shellDamage * 0.5;
    addTankShot(enemy, a, {
      kind: enemy.team === "ally" ? "allyShell" : "enemyShell",
      speed: 190 * enemy.mods.bulletSpeed + enemy.level * 5,
      life: 2.2 * enemy.mods.range,
      damage,
      hp: damage,
      r: 5 * enemy.mods.shellSize,
      fireworkFragments: enemy.mods.fireworkFragments || 0,
      nukeExplosion: true,
      color: enemy.team === "ally" ? "#9df29e" : "#f0d37a",
    });
    return;
  }

  const count = cannonFamily(enemy.tankKey) ? Math.max(1, enemy.mods.bulletCount) : 1;
  for (let i = 0; i < count; i += 1) {
    const t = count === 1 ? 0.5 : i / (count - 1);
    const shotAngle = a + (t - 0.5) * (0.16 + enemy.mods.bulletSpread);
    addTankShot(enemy, shotAngle, {
      kind: enemy.team === "ally" ? "allyShell" : "enemyShell",
      speed: 230 * enemy.mods.bulletSpeed + enemy.level * 8,
      life: 2.2 * enemy.mods.range,
      damage:
        enemy.team === "ally"
          ? DEFAULT_BULLET_DAMAGE * enemy.mods.shellDamage * ALLY_POWER_MULTIPLIER
          : Math.max(1, enemy.mods.shellDamage),
      hp:
        enemy.team === "ally"
          ? DEFAULT_BULLET_DAMAGE * enemy.mods.shellDamage * ALLY_POWER_MULTIPLIER
          : Math.max(1, enemy.mods.shellDamage),
      r: 5 * enemy.mods.shellSize,
      fireworkFragments: enemy.mods.fireworkFragments || 0,
      afterburnDps: enemy.mods.afterburnDps || 0,
      afterburnTime: enemy.mods.afterburnTime || 0,
      color: enemy.mods.afterburnDps ? "#ff8d45" : enemy.team === "ally" ? "#9df29e" : "#ece6cc",
    });
  }
}

function addTankShot(tank, angle, shot) {
  const projectile = {
    x: tank.x + Math.cos(angle) * 31,
    y: tank.y + Math.sin(angle) * 31,
    vx: Math.cos(angle) * shot.speed,
    vy: Math.sin(angle) * shot.speed,
    age: 0,
    life: shot.life,
    damage: shot.damage,
    hp: shot.hp,
    r: shot.r,
    kind: shot.kind,
    color: shot.color,
    turnTime: shot.turnTime,
    returnSpeed: shot.returnSpeed,
    returnTargetId: shot.returnTargetId,
    returnHomeX: shot.returnHomeX,
    returnHomeY: shot.returnHomeY,
    returning: shot.returning,
    fireworkFragments: shot.fireworkFragments,
    nukeExplosion: shot.nukeExplosion,
    miniNuke: shot.miniNuke,
    afterburnDps: shot.afterburnDps,
    afterburnTime: shot.afterburnTime,
    range: shot.range,
    angle: shot.angle ?? angle,
    ownerRemoteId: tank.remoteId,
  };
  if (tank.team !== "ally") {
    const damageMult = tank.damageMult || 1;
    projectile.damage *= damageMult;
    projectile.hp *= damageMult;
  }
  if (tank.team === "ally") {
    bullets.push({
      ...projectile,
      pierceLeft: playerPierce(),
      hitEnemies: new Set(),
    });
    if (bullets.length > MAX_PLAYER_BULLETS) bullets.splice(0, bullets.length - MAX_PLAYER_BULLETS);
  } else {
    enemyBullets.push(projectile);
    if (enemyBullets.length > MAX_ENEMY_BULLETS) enemyBullets.splice(0, enemyBullets.length - MAX_ENEMY_BULLETS);
  }
}

function explodeFireworkBullet(b, ownerTeam = "player", ignoredEnemyId = null) {
  if (!b.fireworkFragments && !b.nukeExplosion) return;
  if (b.nukeExplosion) ultraNukeExplosion(b, ownerTeam);
  if (!b.fireworkFragments) return;
  const count = b.fireworkFragments;
  const damage = Math.max(0.5, b.damage * 0.28);
  addSpark(b.x, b.y, b.afterburnDps ? "#ff7b38" : "#ffcf5f", 12);
  for (let i = 0; i < count; i += 1) {
    const a = (i / count) * TAU + Math.random() * 0.14;
    const speed = 210 + Math.random() * 95;
    const pellet = {
      kind: ownerTeam === "enemy" ? "enemyShell" : "shell",
      x: b.x,
      y: b.y,
      vx: Math.cos(a) * speed,
      vy: Math.sin(a) * speed,
      age: 0,
      life: 0.55,
      damage,
      hp: damage,
      r: Math.max(2.5, b.r * 0.45),
      nukeExplosion: Boolean(b.nukeExplosion),
      miniNuke: Boolean(b.nukeExplosion),
      afterburnDps: b.afterburnDps ? b.afterburnDps * 0.45 : 0,
      afterburnTime: b.afterburnTime ? b.afterburnTime * 0.65 : 0,
      juggernautJudgment: Boolean(b.juggernautJudgment),
      color: b.afterburnDps ? "#ff8d45" : ownerTeam === "enemy" ? "#ffcf5f" : "#ffe58a",
    };
    if (ownerTeam === "enemy") {
      enemyBullets.push(pellet);
      if (enemyBullets.length > MAX_ENEMY_BULLETS) enemyBullets.splice(0, enemyBullets.length - MAX_ENEMY_BULLETS);
    } else {
      bullets.push({
        ...pellet,
        pierceLeft: 1,
        hitEnemies: new Set(ignoredEnemyId ? [ignoredEnemyId] : []),
      });
      if (bullets.length > MAX_PLAYER_BULLETS) bullets.splice(0, bullets.length - MAX_PLAYER_BULLETS);
    }
  }
}

function ultraNukeExplosion(b, ownerTeam = "player") {
  const mini = Boolean(b.miniNuke);
  const radius = mini ? 68 + b.r * 5 : 190 + b.r * 4;
  const damage = b.damage * (mini ? 1.2 : 3);
  const life = mini ? 0.34 : 0.78;
  nukes.push({ x: b.x, y: b.y, radius, life, max: life, spin: Math.random() * TAU, mini });
  if (nukes.length > 14) nukes.splice(0, nukes.length - 14);
  if (distance(player, b) < radius * 2.4) camera.shake = Math.max(camera.shake, mini ? 4 : 14);
  addSpark(b.x, b.y, "#ff4fd8", mini ? 7 : 34);
  addSpark(b.x, b.y, "#ffcf5f", mini ? 6 : 26);
  if (!mini) addSpark(b.x, b.y, "#ffffff", 16);
  if (ownerTeam !== "player") {
    const d = distance(b, player);
    if (d <= radius + player.r && player.invuln <= 0) {
      const falloff = 1 - Math.min(0.55, d / (radius * 1.8));
      const hitDamage = playerIncomingDamage(damage * falloff);
      player.hp -= hitDamage;
      player.invuln = mini ? 0.08 : 0.18;
      markHit(player, hitDamage * 0.08, b);
      addSpark(player.x, player.y, "#ffcf5f", mini ? 4 : 10);
      if (player.hp <= 0) checkPlayerDeath();
    }
    enemies.forEach((ally) => {
      if (ally.team !== "ally") return;
      const allyDistance = distance(b, ally);
      if (allyDistance > radius + ally.r) return;
      const falloff = 1 - Math.min(0.55, allyDistance / (radius * 1.8));
      const hitDamage = damage * falloff;
      ally.hp -= hitDamage;
      markHit(ally, hitDamage * 0.08, b);
      addSpark(ally.x, ally.y, "#ffcf5f", mini ? 3 : 8);
    });
    return;
  }
  const blastSource = { x: b.x, y: b.y, id: -1 };
  let chains = 0;
  enemies.forEach((enemy) => {
    if (enemy.team === "ally") return;
    const d = distance(b, enemy);
    if (d > radius + enemy.r) return;
    const falloff = 1 - Math.min(0.55, d / (radius * 1.8));
    const hitDamage = enemyIncomingDamage(enemy, damage * falloff);
    enemy.hp -= hitDamage;
    markHit(enemy, hitDamage * 0.08, b);
    lightning.push({
      x1: b.x,
      y1: b.y,
      x2: enemy.x,
      y2: enemy.y,
      life: 0.16,
      max: 0.16,
      color: "#ffcf5f",
    });
    if (!mini && chains < 5) {
      chainLightningFrom(enemy, hitDamage * 0.32, new Set([enemy.id, blastSource.id]));
      chains += 1;
    }
  });
  if (lightning.length > MAX_LIGHTNING) lightning.splice(0, lightning.length - MAX_LIGHTNING);
}

function tankFlameAttack(tank, target, dt) {
  const reach = 135 * tank.mods.range;
  const width = 0.42 * tank.mods.flameWidth;
  const flameColor = tank.buildName.includes("Blue Flame") ? "#56cfff" : tank.team === "ally" ? "#9df29e" : "#ff8e33";
  flames.push({
    x: tank.x,
    y: tank.y,
    angle: tank.angle,
    reach,
    width,
    life: 0.09,
    color: flameColor,
  });
  if (!target || !isInCone(tank, target, tank.angle, reach, width)) return;

  const damage = tank.team === "ally" ? FLAME_DPS * ALLY_POWER_MULTIPLIER : enemyAttackDamage(tank, FLAME_DPS);
  target.hp -= target === player ? playerIncomingDamage(damage * dt) : damage * dt;
  if (!target.hitFlash) markHit(target, 0.4, tank);
  if (target !== player) {
    target.burn = Math.max(target.burn, 2.4 * tank.mods.burnTime);
    target.burnDps = damage;
  }
  addSpark(target.x, target.y, flameColor, 1);
}

function gainXp(amount) {
  player.xp += amount * (player.perks.xpMult || 1);
  while (player.xp >= player.xpNext) {
    player.xp -= player.xpNext;
    player.level += 1;
    player.xpNext = Math.ceil(player.xpNext * 1.5);
    const oldMaxHp = player.maxHp;
    const penaltyMult = player.maxHpPenaltyMult || 1;
    const guardActive = player.tankKey === "tazer" && (player.tazerGuardActive || 0) > 0;
    const resolveActive = player.tankKey === "juggernaut" && (player.juggernautResolveActive || 0) > 0;
    const temporaryHpBonus = (player.tazerGuardHpBonus || 0) + (player.juggernautResolveHpBonus || 0);
    const newBaseMaxHp = player.perks.fixedMaxHp
      ? Math.max(1, Math.round(player.perks.fixedMaxHp * thunderGodReviveHpMult()))
      : player.lockedTank
        ? Math.max(1, player.maxHp - temporaryHpBonus)
        : Math.max(1, Math.round(scaledTankMaxHp(player.level) * (player.perks.maxHpMult || 1) * penaltyMult));
    player.tazerGuardHpBonus = guardActive ? Math.max(0, Math.round(newBaseMaxHp * (TAZER_GUARD_TEMP_HP_MULTIPLIER - 1))) : 0;
    player.juggernautResolveHpBonus = resolveActive ? Math.max(1, Math.round(newBaseMaxHp * (JUGGERNAUT_RESOLVE_HP_MULT - 1))) : 0;
    player.maxHp = newBaseMaxHp + player.tazerGuardHpBonus + player.juggernautResolveHpBonus;
    player.hp = Math.min(player.maxHp, player.hp + 20 + Math.max(0, player.maxHp - oldMaxHp));
    if (activeGameMode !== "infantryArmy" && (player.lockedTank || isBossLevel(player.level)) && !bossSpawnedLevels.has(player.level)) {
      bossSpawnedLevels.add(player.level);
      spawnBoss(player.level);
    }
    if (isThunderGod() && (player.thunderReviveTrial || 0) > 0 && player.level >= (player.thunderReviveTargetLevel || Infinity)) {
      player.thunderReviveTrial = 0;
      player.thunderReviveTargetLevel = 0;
      player.thunderReviveReady = (player.thunderRevivesUsed || 0) < THUNDER_GOD_REVIVE_MAX;
      addSpark(player.x, player.y, "#fff06d", 22);
      addSpark(player.x, player.y, "#8df5ff", 12);
    }
    if (!player.lockedTank && upgradePools[player.tankKey]) {
      pendingUpgradeTokens += 1;
      if (upgradeChoices.length === 0) prepareLevelChoices();
      else renderPendingUpgrades();
    }
  }
}

function xpRewardForEnemy(enemy) {
  const level = Math.max(1, enemy.level || 1);
  const base = 25 + (level - 1) * 10;
  const infantryMult = enemy.infantry || enemy.tankKey === "infantry" ? 0.3 : 1;
  return Math.max(1, Math.round(base * (enemy.boss ? 8 : 1) * infantryMult));
}

function createLevelChoices() {
  let pool = upgradePools[player.tankKey];
  if (!pool || pool.length === 0) return [];
  if (player.tankKey === "incendiary" && player.mods?.fireShieldAbility) {
    pool = pool.filter(([, , effect]) => effect.variant !== "incendiaryFireShield");
  }
  const nextStage = Math.min(MAX_EVOLUTION_STAGE, player.tankStage + 1);
  let candidates = pool.filter(([, , effect]) => (variantStages[effect.variant] || 2) === nextStage);
  if (candidates.length === 0) {
    const futureStages = pool
      .map(([, , effect]) => variantStages[effect.variant] || 2)
      .filter((stage) => stage > player.tankStage);
    const fallbackStage = Math.min(...futureStages);
    candidates = pool.filter(([, , effect]) => (variantStages[effect.variant] || 2) === fallbackStage);
  }
  if (candidates.length === 0) candidates = pool.filter(([, , effect]) => (variantStages[effect.variant] || 2) === player.tankStage);
  const shuffled = [...candidates].sort(() => Math.random() - 0.5);
  if (player.tankKey === "incendiary" && !player.mods?.fireShieldAbility) {
    const fireShield = pool.find(([, , effect]) => effect.variant === "incendiaryFireShield");
    return fireShield ? [fireShield, ...shuffled.filter((choice) => choice !== fireShield).slice(0, 2)] : shuffled.slice(0, 3);
  }
  if (player.tankKey === "railgun") {
    const multi = candidates.find(([, , effect]) => /Twin|Tri|Quad|Multi|multi/.test(effect.variant));
    return multi ? [multi, ...shuffled.filter((choice) => choice !== multi).slice(0, 2)] : shuffled.slice(0, 3);
  }
  return shuffled.slice(0, 3);
}

function prepareLevelChoices() {
  upgradeChoices = createLevelChoices();
  renderPendingUpgrades();
  return upgradeChoices;
}

function focusGameCanvas() {
  canvas.setAttribute("tabindex", "-1");
  canvas.focus({ preventScroll: true });
}

function renderUpgradeButton([name, description, effect], compact = false) {
  const card = document.createElement("button");
  card.type = "button";
  card.className = compact ? "side-upgrade-card" : "upgrade-card";
  card.innerHTML = `
    <h3>${name} Stage ${variantStages[effect.variant] || "?"}</h3>
    <p>${description}</p>
    <div class="stats">${effectText(effect).map((stat) => `<span class="stat">${stat}</span>`).join("")}</div>
  `;
  card.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (card.disabled) return;
    card.disabled = true;
    applyUpgrade(name, effect);
  });
  return card;
}

function renderPendingUpgrades() {
  if (!pendingUpgradePanel || !pendingUpgradeList || !pendingUpgradeCount) return;
  const shouldShow = gameState === "playing" && pendingUpgradeTokens > 0 && !hudHidden;
  pendingUpgradePanel.classList.toggle("hidden", !shouldShow);
  if (!shouldShow) return;
  if (upgradeChoices.length === 0) upgradeChoices = createLevelChoices();
  if (upgradeChoices.length === 0) {
    pendingUpgradeTokens = 0;
    pendingUpgradePanel.classList.add("hidden");
    return;
  }
  pendingUpgradeCount.textContent = String(pendingUpgradeTokens);
  pendingUpgradeList.innerHTML = "";
  upgradeGrid.innerHTML = "";
  upgradeChoices.forEach((choice) => {
    pendingUpgradeList.appendChild(renderUpgradeButton(choice, true));
    upgradeGrid.appendChild(renderUpgradeButton(choice));
  });
}

function effectText(effect) {
  const loadout = createVariantLoadout(effect.variant);
  const effectFamily = variantAliases[effect.variant] || effect.variant;
  if (effect.variant.toLowerCase().includes("juggernaut") || effectFamily === "defaultJuggernaut") {
    return [
      "1 nuke shell",
      `${(DEFAULT_BULLET_DAMAGE * loadout.mods.shellDamage).toFixed(1)} damage`,
      `${loadout.mods.fireworkFragments} mini-nukes`,
    ];
  }
  if (effect.variant.toLowerCase().includes("thundergod") || effectFamily === "thunderGodBase") {
    return [
      `${(DEFAULT_BULLET_DAMAGE * loadout.mods.shellDamage).toFixed(1)} thunder damage`,
      `${GAMMA_LIGHTNING_CHAIN_COUNT + Math.round(loadout.mods.gammaLightningChain || 0)} chain jumps`,
      `${loadout.mods.gammaLightningBurst.toFixed(1)}x strike size`,
    ];
  }
  if (effect.variant.toLowerCase().includes("airstrike") || effectFamily === "airstrikeBase") {
    return [
      `${(AIRSTRIKE_COOLDOWN / loadout.mods.fireRate).toFixed(1)} sec call`,
      `${(DEFAULT_BULLET_DAMAGE * loadout.mods.shellDamage).toFixed(1)} damage`,
      `${loadout.mods.fireworkFragments} mini-nukes`,
    ];
  }
  if (loadout.mods.fireShieldAbility) {
    return [
      "Q fire shield",
      "30 sec defense",
      "Nuclear while active",
    ];
  }
  if (loadout.mods.afterburnDps) {
    return [
      `${(DEFAULT_BULLET_DAMAGE * loadout.mods.shellDamage).toFixed(1)} bomb damage`,
      `${loadout.mods.fireworkFragments} fire burst`,
      `${loadout.mods.afterburnDps.toFixed(1)} burn DPS`,
    ];
  }
  if (effect.variant.toLowerCase().includes("helicopter") || effectFamily === "helicopterBase") {
    return [
      `${loadout.mods.bulletCount} miniguns`,
      `${(DEFAULT_BULLET_DAMAGE * loadout.mods.shellDamage).toFixed(1)} damage`,
      "Ignores ground shots",
    ];
  }
  if (effect.variant.toLowerCase().includes("infantry") || effectFamily === "infantryBase") {
    return [
      `${(30 * loadout.mods.shellDamage).toFixed(1)} punch damage`,
      `${loadout.mods.fireRate.toFixed(1)} punch speed`,
      "Juggernaut HP",
    ];
  }
  if (effectFamily.startsWith("default")) {
    const damage = DEFAULT_BULLET_DAMAGE * loadout.mods.shellDamage;
    return [
      loadout.mods.bulletCount === 1 ? "1 shell" : `${loadout.mods.bulletCount} barrels`,
      `${damage.toFixed(1)} damage`,
      loadout.mods.fireworkFragments ? `${loadout.mods.fireworkFragments} burst` : `Pierces ${PLAYER_WEAPON_PIERCE}`,
    ];
  }
  if (effectFamily.startsWith("flame")) {
    return [`${FLAME_DPS} DPS flame`, `Pierces ${PLAYER_WEAPON_PIERCE}`, `${Math.round(loadout.speed)} speed`];
  }
  if (effectFamily.startsWith("railgun")) {
    return [
      `${(RAILGUN_DPS * loadout.mods.shellDamage).toFixed(0)} DPS beam`,
      loadout.mods.beamCount > 1 ? `${loadout.mods.beamCount} cannons` : "All-piercing",
      `${RAILGUN_CHAIN_COUNT} chain jumps`,
    ];
  }
  if (effectFamily.startsWith("tazer")) {
    return [
      `${(TAZER_CHAIN_DAMAGE * loadout.mods.shellDamage).toFixed(1)} zap damage`,
      `${Math.round(TAZER_CHAIN_RANGE * loadout.mods.range)} range`,
      `${loadout.mods.fireRate.toFixed(1)} charge speed`,
    ];
  }
  if (effectFamily.startsWith("shotgun")) {
    return [
      `${loadout.mods.pelletCount} pellets`,
      `${(SHOTGUN_DAMAGE * loadout.mods.shellDamage).toFixed(1)} damage each`,
      `${loadout.mods.fireRate.toFixed(1)} reload speed`,
    ];
  }
  if (loadout.mods.gammaLightningDamage > 1.05 || loadout.mods.gammaLightningChain > 0 || loadout.mods.gammaLightningBurst > 1.1) {
    const strikeDamage = GAMMA_DAMAGE * GAMMA_LIGHTNING_MULTIPLIER * loadout.mods.gammaLightningDamage;
    const chains = GAMMA_LIGHTNING_CHAIN_COUNT + Math.round(loadout.mods.gammaLightningChain || 0);
    return [`${strikeDamage.toFixed(1)} lightning`, `${chains} chain jumps`, `${loadout.mods.gammaLightningBurst.toFixed(1)}x strike size`];
  }
  return [`${(2 + loadout.mods.gammaArcs) * 3} pellets`, `${GAMMA_DAMAGE.toFixed(2)} damage each`, `Lightning strike`];
}

function applyUpgrade(name, effect) {
  if (pendingUpgradeTokens <= 0 || !effect?.variant || !upgradeChoices.some(([, , choiceEffect]) => choiceEffect === effect)) {
    renderPendingUpgrades();
    focusGameCanvas();
    return;
  }
  const loadout = createVariantLoadout(effect.variant);
  if (!loadout?.mods) {
    upgradeChoices = [];
    renderPendingUpgrades();
    focusGameCanvas();
    return;
  }
  player.buildName = name;
  player.tankStage = Math.max(player.tankStage, variantStages[effect.variant] || player.tankStage + 1);
  player.tankKey = upgradeFamilyForVariant(effect.variant, player.tankKey);
  player.mods = stackUpgradeMods(player.mods, loadout.mods);
  if (player.tankKey === "tazer") {
    player.mods.fireRate = Math.min(player.mods.fireRate, 3);
    player.mods.range = Math.min(player.mods.range, 1.55);
    player.mods.beamWidth = Math.min(player.mods.beamWidth || 1, 1.4);
    player.mods.shellDamage = Math.min(player.mods.shellDamage, 12);
  }
  player.speed = Math.min(280, loadout.speed + Math.max(0, player.speed - 190) * 0.35);
  player.color = effect.color;
  player.accent = effect.accent;
  if (effect.variant === "defaultUltra") {
    player.maxHp = 100000;
    player.hp = 100000;
  }
  pendingUpgradeTokens = Math.max(0, pendingUpgradeTokens - 1);
  upgradeChoices = [];
  if (pendingUpgradeTokens > 0) prepareLevelChoices();
  else renderPendingUpgrades();
  focusGameCanvas();
}

function upgradeFamilyForVariant(variant, currentFamily) {
  if (currentFamily !== "default") return currentFamily;
  if (branchFamilies[variant]) return branchFamilies[variant];
  const alias = variantAliases[variant];
  if (branchFamilies[alias]) return branchFamilies[alias];
  return currentFamily;
}

function stackUpgradeMods(previous, next) {
  const base = {
    fireRate: 1,
    bulletSpeed: 1,
    bulletCount: 1,
    bulletSpread: 0,
    shellDamage: 1,
    shellSize: 1,
    fireworkFragments: 0,
    afterburnDps: 0,
    afterburnTime: 0,
    range: 1,
    flameWidth: 1,
    burnTime: 1,
    gammaArcs: 1,
    gammaReach: 1,
    beamWidth: 1,
    beamCount: 1,
    pelletCount: 1,
  };
  const caps = {
    fireRate: 8,
    bulletSpeed: 4,
    bulletCount: 48,
    bulletSpread: TAU,
    shellDamage: 24,
    shellSize: 4,
    fireworkFragments: 70,
    afterburnDps: 90,
    afterburnTime: 8,
    range: 5.5,
    flameWidth: 3.4,
    burnTime: 6,
    gammaArcs: 24,
    gammaReach: 4.5,
    gammaLightningDamage: 4,
    gammaLightningChain: 8,
    gammaLightningRadius: 2.8,
    gammaLightningBurst: 3.2,
    gammaLightningStun: 2.5,
    beamWidth: 3,
    beamCount: 14,
    pelletCount: 70,
  };
  const stacked = { ...next };
  Object.keys(base).forEach((key) => {
    const carry = Math.max(0, (previous[key] ?? base[key]) - base[key]);
    stacked[key] = clamp((next[key] ?? base[key]) + carry, 0, caps[key]);
  });
  stacked.nukeExplosion = Boolean(previous.nukeExplosion || next.nukeExplosion);
  stacked.omniFire = Boolean(previous.omniFire || next.omniFire);
  stacked.fireShieldAbility = Boolean(previous.fireShieldAbility || next.fireShieldAbility);
  return stacked;
}

function createVariantLoadout(variant, level = player.level) {
  const originalVariant = variant;
  variant = variantAliases[variant] || variant;
  const tier = Math.max(1, level - 1);
  const mods = {
    fireRate: 1,
    bulletSpeed: 1,
    bulletCount: 1,
    bulletSpread: 0,
    shellDamage: 1,
    shellSize: 1,
    fireworkFragments: 0,
    nukeExplosion: false,
    omniFire: false,
    range: 1,
    flameWidth: 1,
    burnTime: 1,
    gammaArcs: 1,
    gammaReach: 1,
    gammaLightningDamage: 1,
    gammaLightningChain: 0,
    gammaLightningRadius: 1,
    gammaLightningBurst: 1,
    gammaLightningStun: 1,
    beamWidth: 1,
    beamCount: 1,
    pelletCount: 1,
  };
  let speed = 190;

  if (variant === "defaultBase") {
    mods.fireRate = 0.85 + tier * 0.04;
    mods.bulletSpeed = 0.9 + tier * 0.03;
    mods.range = 0.95 + tier * 0.03;
  } else if (variant === "thunderGodBase") {
    mods.fireRate = 0.72 + tier * 0.025;
    mods.bulletSpeed = 1.12 + tier * 0.035;
    mods.range = 1.18 + tier * 0.025;
    mods.shellDamage = 50 / DEFAULT_BULLET_DAMAGE;
    mods.shellSize = 1.18;
    mods.gammaLightningDamage = 1.45;
    mods.gammaLightningChain = 3;
    mods.gammaLightningRadius = 1.55;
    mods.gammaLightningBurst = 1.55;
    mods.gammaLightningStun = 1.1;
    speed = 188 + tier;
  } else if (variant === "flameBase") {
    mods.flameWidth = 0.95 + tier * 0.04;
    mods.range = 0.9 + tier * 0.04;
    mods.burnTime = 0.9 + tier * 0.06;
    speed = 184 + tier * 2;
  } else if (variant === "gammaBase") {
    mods.gammaArcs = 1 + Math.floor(tier / 3);
    mods.bulletSpread = 0.02 + tier * 0.01;
    mods.gammaReach = 0.95 + tier * 0.04;
    mods.fireRate = 0.8 + tier * 0.05;
    mods.gammaLightningBurst = 1.05 + tier * 0.015;
  } else if (variant === "tazerBase") {
    mods.shellDamage = 1 + tier * 0.05;
    mods.range = 1 + tier * 0.04;
    mods.fireRate = 1 + tier * 0.05;
    mods.beamWidth = 1;
    speed = 194 + tier * 2;
  } else if (variant === "tazerCoil") {
    mods.shellDamage = 1.08 + tier * 0.055;
    mods.range = 1.2 + tier * 0.065;
    mods.fireRate = 1.05 + tier * 0.055;
    mods.beamWidth = 1.22;
    speed = 190 + tier * 2;
  } else if (variant === "tazerArc") {
    mods.shellDamage = 1.28 + tier * 0.09;
    mods.range = 1.08 + tier * 0.045;
    mods.fireRate = 1.22 + tier * 0.08;
    mods.beamWidth = 0.95;
    speed = 202 + tier * 3;
  } else if (variant === "tazerStorm") {
    mods.shellDamage = 1.18 + tier * 0.075;
    mods.range = 1.3 + tier * 0.07;
    mods.fireRate = 1.1 + tier * 0.06;
    mods.beamWidth = 1.45;
    speed = 188 + tier * 2;
  } else if (variant === "shotgunBase") {
    mods.pelletCount = 10 + Math.floor(tier / 2);
    mods.bulletSpread = 0.38 + tier * 0.015;
    mods.shellDamage = 1;
    mods.shellSize = 0.72;
    mods.fireRate = 1.1 + tier * 0.08;
    mods.bulletSpeed = 1.12 + tier * 0.04;
    mods.range = 0.72 + tier * 0.025;
    speed = 196 + tier * 3;
  } else if (variant === "shotgunBuck") {
    mods.pelletCount = 14 + Math.floor(tier / 2);
    mods.bulletSpread = 0.48 + tier * 0.018;
    mods.shellDamage = 1.05 + tier * 0.04;
    mods.shellSize = 0.72;
    mods.fireRate = 1.08 + tier * 0.09;
    mods.bulletSpeed = 1.08 + tier * 0.04;
    mods.range = 0.74 + tier * 0.025;
    speed = 196 + tier * 3;
  } else if (variant === "shotgunBurst") {
    mods.pelletCount = 16 + Math.floor(tier / 2);
    mods.bulletSpread = 0.42 + tier * 0.015;
    mods.shellDamage = 0.82 + tier * 0.035;
    mods.shellSize = 0.66;
    mods.fireRate = 1.45 + tier * 0.11;
    mods.bulletSpeed = 1.18 + tier * 0.05;
    mods.range = 0.68 + tier * 0.02;
    speed = 212 + tier * 4;
  } else if (variant === "shotgunSlug") {
    mods.pelletCount = 8 + Math.floor(tier / 3);
    mods.bulletSpread = 0.24 + tier * 0.012;
    mods.shellDamage = 1.65 + tier * 0.08;
    mods.shellSize = 0.95;
    mods.fireRate = 0.9 + tier * 0.07;
    mods.bulletSpeed = 1.25 + tier * 0.05;
    mods.range = 0.92 + tier * 0.03;
    speed = 186 + tier * 2;
  } else if (variant === "airstrikeBase") {
    mods.bulletCount = 1;
    mods.shellDamage = 8 + tier * 0.35;
    mods.shellSize = 2.25 + tier * 0.02;
    mods.fireworkFragments = 18 + Math.floor(tier / 2);
    mods.nukeExplosion = true;
    mods.fireRate = 1 + tier * 0.035;
    mods.range = 1.6 + tier * 0.08;
    speed = 178 + tier * 2;
  } else if (variant === "helicopterBase") {
    mods.bulletCount = 2 + Math.floor(tier / 4);
    mods.bulletSpread = 0.12 + tier * 0.005;
    mods.shellDamage = 0.42 + tier * 0.025;
    mods.shellSize = 0.52;
    mods.fireRate = 3.2 + tier * 0.18;
    mods.bulletSpeed = 1.45 + tier * 0.04;
    mods.range = 0.9 + tier * 0.035;
    speed = 235 + tier * 4;
  } else if (variant === "infantryBase") {
    mods.bulletCount = 1;
    mods.shellDamage = 1 + tier * 0.08;
    mods.shellSize = 1;
    mods.fireworkFragments = 0;
    mods.fireRate = 1.05 + tier * 0.055;
    mods.bulletSpeed = 1;
    mods.range = 0.85 + tier * 0.028;
    speed = 205 + tier * 3;
  } else if (variant === "trooperBase") {
    mods.bulletCount = 1;
    mods.shellDamage = 0.8 + tier * 0.04;
    mods.shellSize = 0.82;
    mods.fireRate = 0.75 + tier * 0.03;
    mods.bulletSpeed = 0.95 + tier * 0.02;
    mods.range = 1;
    speed = 178 + tier * 2;
  } else if (variant === "antiAirBase") {
    mods.bulletCount = 1;
    mods.shellDamage = 1.35 + tier * 0.08;
    mods.shellSize = 1;
    mods.fireRate = 0.65 + tier * 0.04;
    mods.bulletSpeed = 1.15 + tier * 0.03;
    mods.range = 1.55 + tier * 0.08;
    speed = 165 + tier * 2;
  } else if (variant === "railgunBase") {
    mods.shellDamage = 1 + tier * 0.08;
    mods.range = 1.05 + tier * 0.06;
    mods.fireRate = 0.72 + tier * 0.035;
    mods.beamWidth = 1;
    speed = 184 + tier * 2;
  } else if (variant === "railgunLance") {
    mods.shellDamage = 1.18 + tier * 0.1;
    mods.range = 1.35 + tier * 0.08;
    mods.fireRate = 0.66 + tier * 0.03;
    mods.beamWidth = 0.82;
    speed = 180 + tier * 2;
  } else if (variant === "railgunVolt") {
    mods.shellDamage = 0.88 + tier * 0.06;
    mods.range = 1.08 + tier * 0.06;
    mods.fireRate = 1.08 + tier * 0.07;
    mods.beamWidth = 0.9;
    speed = 204 + tier * 4;
  } else if (variant === "railgunSiege") {
    mods.shellDamage = 1.55 + tier * 0.13;
    mods.range = 1.18 + tier * 0.06;
    mods.fireRate = 0.48 + tier * 0.025;
    mods.beamWidth = 1.55;
    speed = 166 + tier;
  } else if (variant === "railgunTwin") {
    mods.shellDamage = 0.82 + tier * 0.06;
    mods.range = 1.12 + tier * 0.06;
    mods.fireRate = 0.68 + tier * 0.035;
    mods.beamWidth = 0.78;
    mods.beamCount = 2;
    speed = 182 + tier * 2;
  } else if (variant === "railgunTri") {
    mods.shellDamage = 0.72 + tier * 0.05;
    mods.range = 1.08 + tier * 0.05;
    mods.fireRate = 0.64 + tier * 0.03;
    mods.beamWidth = 0.68;
    mods.beamCount = 3;
    speed = 180 + tier * 2;
  } else if (variant === "railgunQuad") {
    mods.shellDamage = 0.64 + tier * 0.045;
    mods.range = 1.05 + tier * 0.05;
    mods.fireRate = 0.6 + tier * 0.03;
    mods.beamWidth = 0.62;
    mods.beamCount = 4;
    speed = 176 + tier * 2;
  } else if (variant === "railgunMulti5") {
    mods.shellDamage = 0.58 + tier * 0.04;
    mods.range = 1.02 + tier * 0.05;
    mods.fireRate = 0.58 + tier * 0.03;
    mods.beamWidth = 0.58;
    mods.beamCount = 5;
    speed = 174 + tier * 2;
  } else if (variant === "defaultTwin") {
    mods.bulletCount = 2 + Math.floor(tier / 2);
    mods.bulletSpread = 0.12 + tier * 0.02;
    mods.fireRate = 0.95 + tier * 0.08;
    mods.range = 1.05 + tier * 0.04;
  } else if (variant === "defaultLoader") {
    mods.fireRate = 1.45 + tier * 0.16;
    mods.bulletSpeed = 1.08 + tier * 0.04;
    mods.range = 0.95 + tier * 0.03;
    speed = 198 + tier * 3;
  } else if (variant === "defaultLongshot") {
    mods.bulletSpeed = 1.35 + tier * 0.12;
    mods.range = 1.45 + tier * 0.1;
    mods.fireRate = 0.82 + tier * 0.05;
    speed = 184 + tier * 2;
  } else if (variant === "defaultTri") {
    mods.bulletCount = 3 + Math.floor(tier / 3);
    mods.bulletSpread = 0.08 + tier * 0.01;
    mods.fireRate = 1.08 + tier * 0.08;
    mods.bulletSpeed = 1.05 + tier * 0.04;
    mods.range = 1.05 + tier * 0.04;
  } else if (variant === "defaultFan") {
    mods.bulletCount = 5 + Math.floor(tier / 2);
    mods.bulletSpread = 0.65 + tier * 0.06;
    mods.shellDamage = 0.62;
    mods.shellSize = 0.86;
    mods.fireRate = 1.02 + tier * 0.07;
    mods.range = 0.9 + tier * 0.04;
    speed = 192 + tier * 2;
  } else if (variant === "defaultSiege") {
    mods.shellDamage = 2.45 + tier * 0.18;
    mods.shellSize = 1.65;
    mods.bulletSpeed = 0.72 + tier * 0.03;
    mods.fireRate = 0.48 + tier * 0.025;
    mods.range = 1.22 + tier * 0.06;
    speed = 174 + tier;
  } else if (variant === "defaultNeedle") {
    mods.shellDamage = 1.25 + tier * 0.08;
    mods.shellSize = 0.72;
    mods.bulletSpeed = 1.8 + tier * 0.12;
    mods.fireRate = 1.05 + tier * 0.08;
    mods.range = 1.75 + tier * 0.14;
    speed = 190 + tier * 2;
  } else if (variant === "defaultAuto") {
    mods.bulletCount = 2 + Math.floor(tier / 3);
    mods.bulletSpread = 0.28 + tier * 0.02;
    mods.shellDamage = 0.55;
    mods.shellSize = 0.78;
    mods.fireRate = 2 + tier * 0.22;
    mods.bulletSpeed = 1.08 + tier * 0.04;
    mods.range = 0.9 + tier * 0.03;
    speed = 204 + tier * 4;
  } else if (variant === "defaultFirework") {
    mods.bulletCount = 1;
    mods.bulletSpread = 0;
    mods.shellDamage = 2.2 + tier * 0.14;
    mods.shellSize = 1.45;
    mods.fireworkFragments = 10 + Math.floor(tier / 2);
    mods.fireRate = 0.72 + tier * 0.05;
    mods.bulletSpeed = 0.95 + tier * 0.04;
    mods.range = 1.55 + tier * 0.08;
    speed = 192 + tier * 2;
  } else if (variant === "defaultIncendiary") {
    mods.bulletCount = 1;
    mods.bulletSpread = 0;
    mods.shellDamage = (1.25 + tier * 0.08) * 0.5;
    mods.shellSize = 1.38;
    mods.fireworkFragments = 13 + Math.floor(tier * 0.65);
    mods.afterburnDps = 25 + tier * 1.7;
    mods.afterburnTime = 4.2 + tier * 0.16;
    mods.fireRate = 0.62 + tier * 0.035;
    mods.bulletSpeed = 0.68 + tier * 0.03;
    mods.range = 1.6 + tier * 0.07;
    speed = 182 + tier;
    if (originalVariant === "incendiaryFireShield") {
      mods.fireShieldAbility = true;
      mods.shellDamage *= 1.18;
      mods.shellSize *= 1.15;
      mods.fireworkFragments = Math.max(mods.fireworkFragments, 18 + Math.floor(tier * 0.8));
      mods.afterburnDps *= 1.2;
      mods.fireRate *= 0.82;
      speed -= 8;
    }
  } else if (variant === "defaultQuad") {
    mods.bulletCount = 4 + Math.floor(tier / 3);
    mods.bulletSpread = 0.14 + tier * 0.015;
    mods.fireRate = 1.18 + tier * 0.1;
    mods.bulletSpeed = 1.1 + tier * 0.05;
    mods.range = 1.12 + tier * 0.05;
  } else if (variant === "defaultScatter") {
    mods.bulletCount = 7 + Math.floor(tier / 2);
    mods.bulletSpread = 0.9 + tier * 0.06;
    mods.shellDamage = 0.5;
    mods.shellSize = 0.76;
    mods.fireRate = 1.15 + tier * 0.09;
    mods.range = 0.84 + tier * 0.04;
    speed = 196 + tier * 3;
  } else if (variant === "defaultBreaker") {
    mods.shellDamage = 3.2 + tier * 0.25;
    mods.shellSize = 1.95;
    mods.bulletSpeed = 0.66 + tier * 0.035;
    mods.fireRate = 0.42 + tier * 0.025;
    mods.range = 1.35 + tier * 0.08;
    speed = 168 + tier;
  } else if (variant === "defaultCyclone") {
    mods.bulletCount = 5 + Math.floor(tier / 2);
    mods.bulletSpread = 0.38 + tier * 0.025;
    mods.shellDamage = 0.62;
    mods.shellSize = 0.82;
    mods.fireRate = 2.45 + tier * 0.24;
    mods.bulletSpeed = 1.12 + tier * 0.05;
    mods.range = 0.95 + tier * 0.04;
    speed = 212 + tier * 4;
  } else if (variant === "defaultBulwark") {
    mods.bulletCount = 2;
    mods.bulletSpread = 0.08;
    mods.shellDamage = 3.8 + tier * 0.28;
    mods.shellSize = 2.15;
    mods.bulletSpeed = 0.78 + tier * 0.04;
    mods.fireRate = 0.58 + tier * 0.03;
    mods.range = 1.45 + tier * 0.08;
    speed = 166 + tier;
  } else if (variant === "defaultJuggernaut") {
    const ultraDamage = 8 + tier * 0.35;
    mods.bulletCount = 1;
    mods.bulletSpread = 0;
    mods.shellDamage = ultraDamage / 3;
    mods.shellSize = 2.35;
    mods.fireworkFragments = 12 + Math.floor(tier / 3);
    mods.nukeExplosion = true;
    mods.fireRate = 0.24 + tier * 0.012;
    mods.bulletSpeed = 0.62 + tier * 0.025;
    mods.range = 1.55 + tier * 0.06;
    speed = 142 + tier;
  } else if (variant === "defaultUltra") {
    mods.bulletCount = 16;
    mods.bulletSpread = TAU;
    mods.shellDamage = 8 + tier * 0.35;
    mods.shellSize = 2.3;
    mods.fireworkFragments = 18 + Math.floor(tier / 2);
    mods.nukeExplosion = true;
    mods.omniFire = true;
    mods.fireRate = 1.35 + tier * 0.08;
    mods.bulletSpeed = 1.05 + tier * 0.04;
    mods.range = 1.55 + tier * 0.08;
    speed = 150;
  } else if (variant === "flameWide") {
    mods.flameWidth = 1.75 + tier * 0.16;
    mods.range = 1.2 + tier * 0.08;
    mods.burnTime = 1.08 + tier * 0.08;
    speed = 184 + tier * 2;
  } else if (variant === "flameCinder") {
    mods.flameWidth = 1.05 + tier * 0.04;
    mods.range = 0.95 + tier * 0.04;
    mods.burnTime = 1.8 + tier * 0.24;
    speed = 188 + tier * 2;
  } else if (variant === "flameTorch") {
    mods.flameWidth = 0.9 + tier * 0.03;
    mods.range = 1.18 + tier * 0.08;
    mods.burnTime = 1.15 + tier * 0.08;
    speed = 210 + tier * 7;
  } else if (variant === "flameLancer") {
    mods.flameWidth = 0.62 + tier * 0.035;
    mods.range = 1.65 + tier * 0.1;
    mods.burnTime = 1.25 + tier * 0.1;
    speed = 198 + tier * 4;
  } else if (variant === "flameHalo") {
    mods.flameWidth = 2.15 + tier * 0.12;
    mods.range = 1.05 + tier * 0.06;
    mods.burnTime = 1.2 + tier * 0.12;
    speed = 186 + tier * 2;
  } else if (variant === "flameMeteor") {
    mods.flameWidth = 1.2 + tier * 0.08;
    mods.range = 1.35 + tier * 0.1;
    mods.burnTime = 2.35 + tier * 0.24;
    speed = 218 + tier * 6;
  } else if (variant === "flameInferno") {
    mods.flameWidth = 2.4 + tier * 0.14;
    mods.range = 1.55 + tier * 0.1;
    mods.burnTime = 2.65 + tier * 0.24;
    speed = 202 + tier * 4;
  } else if (variant === "gammaTri") {
    mods.gammaArcs = 2 + Math.floor(tier / 2);
    mods.bulletSpread = 0.08 + tier * 0.02;
    mods.gammaReach = 1.05 + tier * 0.06;
  } else if (variant === "gammaWide") {
    mods.gammaArcs = 1 + Math.floor(tier / 3);
    mods.bulletSpread = 0.3 + tier * 0.04;
    mods.gammaReach = 1.32 + tier * 0.1;
    mods.bulletSpeed = 0.95 + tier * 0.04;
  } else if (variant === "gammaSnap") {
    mods.fireRate = 1.45 + tier * 0.16;
    mods.bulletSpeed = 1.22 + tier * 0.08;
    mods.gammaReach = 0.95 + tier * 0.04;
    mods.gammaLightningDamage = 1.22 + tier * 0.06;
    mods.gammaLightningBurst = 1.22 + tier * 0.05;
    mods.gammaLightningStun = 1.15 + tier * 0.03;
    speed = 198 + tier * 3;
  } else if (variant === "gammaFork") {
    mods.gammaArcs = 3 + Math.floor(tier / 2);
    mods.bulletSpread = 0.18 + tier * 0.025;
    mods.gammaReach = 1.22 + tier * 0.08;
    mods.bulletSpeed = 1.05 + tier * 0.05;
  } else if (variant === "gammaOrbit") {
    mods.gammaArcs = 2 + Math.floor(tier / 3);
    mods.bulletSpread = 0.42 + tier * 0.04;
    mods.gammaReach = 1.65 + tier * 0.12;
    mods.fireRate = 1.08 + tier * 0.07;
    speed = 192 + tier * 3;
  } else if (variant === "gammaStorm") {
    mods.gammaArcs = 4 + Math.floor(tier / 2);
    mods.bulletSpread = 0.32 + tier * 0.035;
    mods.gammaReach = 1.35 + tier * 0.1;
    mods.fireRate = 1.35 + tier * 0.12;
    mods.bulletSpeed = 1.15 + tier * 0.06;
    mods.gammaLightningDamage = 1.28 + tier * 0.07;
    mods.gammaLightningChain = 1 + Math.floor(tier / 3);
    mods.gammaLightningRadius = 1.16 + tier * 0.04;
    mods.gammaLightningBurst = 1.35 + tier * 0.07;
  } else if (variant === "gammaNova") {
    mods.gammaArcs = 5 + Math.floor(tier / 2);
    mods.bulletSpread = 0.62 + tier * 0.05;
    mods.gammaReach = 1.8 + tier * 0.13;
    mods.fireRate = 1.22 + tier * 0.1;
    mods.bulletSpeed = 1.1 + tier * 0.05;
    mods.gammaLightningDamage = 1.45 + tier * 0.09;
    mods.gammaLightningChain = 2 + Math.floor(tier / 2);
    mods.gammaLightningRadius = 1.28 + tier * 0.05;
    mods.gammaLightningBurst = 1.55 + tier * 0.08;
    mods.gammaLightningStun = 1.2 + tier * 0.04;
    speed = 196 + tier * 3;
  }

  speed = applyEvolutionFormMods(originalVariant, mods, speed);
  return { mods, speed };
}

function evolutionStageFromVariant(variant) {
  return variantStages[variant] || 1;
}

function applyEvolutionFormMods(variant, mods, speed) {
  const stage = evolutionStageFromVariant(variant);
  if (stage < 2) return speed;
  const stagePower = 1 + (stage - 2) * 0.16;
  const has = (text) => variant.toLowerCase().includes(text);

  if (has("juggernaut")) {
    mods.bulletCount = 1;
    mods.bulletSpread = 0;
    mods.nukeExplosion = true;
    mods.omniFire = false;
    mods.shellDamage *= 1.08 + stagePower * 0.06;
    mods.fireworkFragments = Math.max(mods.fireworkFragments || 0, 10 + stage);
    mods.range *= 1.04 + stagePower * 0.03;
    if (has("quake")) {
      mods.fireworkFragments += 4 + Math.floor(stage / 2);
      mods.range *= 1.12;
      mods.shellSize *= 1.08;
      return speed - 4;
    }
    if (has("citadel")) {
      mods.shellDamage *= 1.28 + stagePower * 0.08;
      mods.shellSize *= 1.18;
      mods.fireRate *= 0.78;
      return speed - 12;
    }
    if (has("fortress")) {
      mods.shellDamage *= 1.16 + stagePower * 0.05;
      mods.shellSize *= 1.12;
      mods.fireRate *= 0.9;
      return speed - 6;
    }
    return speed - 5;
  }

  if (has("airstrike")) {
    mods.nukeExplosion = true;
    mods.fireworkFragments = Math.max(mods.fireworkFragments || 0, 16 + stage);
    if (has("marker")) {
      mods.fireRate *= 1.18 + stagePower * 0.05;
      mods.range *= 1.08;
      return speed + 8;
    }
    if (has("buster")) {
      mods.shellDamage *= 1.24 + stagePower * 0.08;
      mods.shellSize *= 1.14;
      mods.fireRate *= 0.86;
      return speed - 6;
    }
    if (has("storm")) {
      mods.fireworkFragments += 6 + Math.floor(stage / 2);
      mods.shellDamage *= 1.06 + stagePower * 0.04;
      return speed + 2;
    }
    return speed;
  }

  if (has("helicopter")) {
    if (has("twin")) {
      mods.bulletCount += 1 + Math.floor(stage / 5);
      mods.fireRate *= 1.12 + stagePower * 0.04;
      mods.shellDamage *= 0.92;
      return speed + 4;
    }
    if (has("strafe")) {
      mods.fireRate *= 1.08 + stagePower * 0.04;
      mods.bulletSpeed *= 1.12;
      return speed + 18;
    }
    if (has("gunship")) {
      mods.shellDamage *= 1.22 + stagePower * 0.08;
      mods.shellSize *= 1.08;
      return speed - 6;
    }
    return speed + 6;
  }

  if (has("tazer")) {
    mods.beamWidth = Math.max(mods.beamWidth || 1, 1);
    if (has("coil")) {
      mods.range *= 1.18 + stagePower * 0.06;
      mods.beamWidth *= 1.16;
      mods.fireRate *= 1.04;
      return speed + 2;
    }
    if (has("arc")) {
      mods.shellDamage *= 1.24 + stagePower * 0.08;
      mods.fireRate *= 1.12 + stagePower * 0.03;
      mods.range *= 1.04;
      return speed + 10;
    }
    if (has("storm")) {
      mods.shellDamage *= 1.14 + stagePower * 0.06;
      mods.range *= 1.12 + stagePower * 0.05;
      mods.beamWidth *= 1.24;
      mods.fireRate *= 0.98;
      return speed;
    }
    return speed + 4;
  }

  if (has("thundergod")) {
    mods.shellDamage *= 1.08 + stagePower * 0.08;
    mods.fireRate *= 1.04 + stagePower * 0.04;
    mods.bulletSpeed *= 1.04 + stagePower * 0.03;
    mods.range *= 1.06 + stagePower * 0.035;
    mods.gammaLightningDamage *= 1.16 + stagePower * 0.1;
    mods.gammaLightningChain += 1 + Math.floor(stage / 4);
    mods.gammaLightningRadius *= 1.08 + stagePower * 0.05;
    mods.gammaLightningBurst *= 1.1 + stagePower * 0.06;
    mods.gammaLightningStun *= 1.04 + stagePower * 0.02;
    if (has("stormlord")) {
      mods.fireRate *= 1.16 + stagePower * 0.04;
      mods.bulletSpeed *= 1.14;
      return speed + 10 + stage;
    }
    if (has("skybreaker")) {
      mods.gammaLightningRadius *= 1.24;
      mods.gammaLightningBurst *= 1.18;
      mods.gammaLightningChain += 1;
      return speed + 2;
    }
    if (has("judgment")) {
      mods.shellDamage *= 1.24 + stagePower * 0.08;
      mods.gammaLightningDamage *= 1.2;
      mods.fireRate *= 0.9;
      return speed - 4;
    }
    return speed + 4;
  }

  if (has("battery") || has("cyclone") || has("minigun")) {
    mods.bulletCount += Math.floor(stage / 3);
    mods.fireRate *= 1.18 + stagePower * 0.08;
    mods.shellDamage *= 0.82;
    mods.bulletSpread += 0.08;
    return speed + 8 + stage * 2;
  }
  if (has("bulwark") || has("earthshaker") || has("dreadnought")) {
    mods.shellDamage *= 1.35 + stagePower * 0.1;
    mods.shellSize *= 1.18 + stagePower * 0.05;
    mods.fireRate *= 0.78;
    mods.bulletSpeed *= 0.92;
    return speed - 10;
  }
  if (has("incendiary") || has("cinder") || has("napalm") || has("wildfire")) {
    mods.fireworkFragments = Math.max(mods.fireworkFragments || 0, 10 + stage * 2);
    mods.afterburnDps = Math.max(mods.afterburnDps || 0, 22 + stage * 2.4);
    mods.afterburnTime = Math.max(mods.afterburnTime || 0, 3.6 + stage * 0.18);
    mods.shellDamage *= 0.92 + stagePower * 0.06;
    mods.bulletSpeed *= 0.92;
    if (has("napalm")) {
      mods.afterburnTime *= 1.45;
      mods.range *= 1.08;
      return speed - 4;
    }
    if (has("wildfire")) {
      mods.fireworkFragments += 5 + Math.floor(stage / 2);
      mods.afterburnDps *= 1.18;
      mods.shellSize *= 1.08;
      return speed - 7;
    }
    if (has("cinder")) {
      mods.afterburnDps *= 1.28;
      mods.fireRate *= 1.08;
      return speed + 4;
    }
    return speed - 3;
  }
  if (has("fireburst") || has("mortar") || has("nova") || has("cracker") || has("cometfan")) {
    mods.fireworkFragments = Math.max(mods.fireworkFragments || 0, 8 + stage * 2);
    mods.shellDamage *= has("cracker") ? 0.72 : 1.18 + stagePower * 0.08;
    mods.shellSize *= has("cracker") ? 0.85 : 1.08;
    mods.range *= 1.12;
    return speed - (has("mortar") ? 8 : 0);
  }
  if (has("railgun")) {
    if (has("multi") || has("twin") || has("tri") || has("quad")) {
      if (has("twin")) mods.beamCount = Math.max(mods.beamCount, 2);
      else if (has("tri")) mods.beamCount = Math.max(mods.beamCount, 3);
      else if (has("quad")) mods.beamCount = Math.max(mods.beamCount, 4);
      else mods.beamCount = Math.min(12, Math.max(5, stage));
      mods.shellDamage *= 0.62 + stagePower * 0.035;
      mods.beamWidth *= 0.58;
      mods.range *= 1.06;
      mods.fireRate *= 0.86;
      return speed - 4;
    }
    if (has("volt")) {
      mods.fireRate *= 1.2 + stagePower * 0.06;
      mods.shellDamage *= 0.82;
      mods.beamWidth *= 0.9;
      return speed + 14;
    }
    if (has("siege")) {
      mods.shellDamage *= 1.35 + stagePower * 0.12;
      mods.beamWidth *= 1.35 + stagePower * 0.05;
      mods.fireRate *= 0.78;
      return speed - 10;
    }
    mods.shellDamage *= 1.12 + stagePower * 0.08;
    mods.range *= 1.24 + stagePower * 0.06;
    mods.beamWidth *= 0.86;
    return speed + 4;
  }
  if (has("shotgun")) {
    if (has("burst")) {
      mods.pelletCount += 3 + Math.floor(stage / 2);
      mods.fireRate *= 1.08 + stagePower * 0.035;
      mods.shellDamage *= 0.9;
      return speed + 12;
    }
    if (has("slug")) {
      mods.shellDamage *= 1.35 + stagePower * 0.1;
      mods.bulletSpread *= 0.58;
      mods.pelletCount += Math.floor(stage / 4);
      return speed - 4;
    }
    mods.pelletCount += 2 + Math.floor(stage / 2);
    mods.bulletSpread += 0.04 + stagePower * 0.012;
    mods.shellDamage *= 1.08 + stagePower * 0.04;
    mods.fireRate *= 0.92;
    return speed + 4;
  }
  if (has("lancer") || has("rail") || has("longbow") || has("needle")) {
    mods.bulletSpeed *= 1.24 + stagePower * 0.08;
    mods.range *= 1.22 + stagePower * 0.06;
    mods.shellSize *= 0.82;
    if (mods.flameWidth) mods.flameWidth *= 0.7;
    if (mods.flameWidth) mods.burnTime *= 1.1;
    return speed + 6;
  }
  if (has("halo") || has("starfan") || has("hurricane")) {
    mods.bulletCount += Math.floor(stage / 2);
    mods.bulletSpread += 0.25 + stagePower * 0.06;
    mods.flameWidth *= 1.3 + stagePower * 0.05;
    mods.fireRate *= 1.08;
    mods.shellDamage *= 0.72;
    return speed + (has("hurricane") ? 16 : 2);
  }
  if (has("cinder")) {
    mods.burnTime *= 1.55 + stagePower * 0.1;
    mods.range *= 1.08;
    return speed + 4;
  }
  if (has("fork")) {
    mods.gammaArcs += 2 + Math.floor(stage / 3);
    mods.bulletSpread += 0.16;
    mods.gammaReach *= 1.08;
    return speed;
  }
  if (has("orbit")) {
    mods.gammaReach *= 1.35 + stagePower * 0.06;
    mods.bulletSpread += 0.28;
    mods.fireRate *= 0.92;
    return speed + 4;
  }
  if (has("storm")) {
    mods.gammaArcs += 3 + Math.floor(stage / 2);
    mods.fireRate *= 1.18;
    mods.gammaReach *= 1.12;
    mods.gammaLightningDamage *= 1.16 + stagePower * 0.07;
    mods.gammaLightningChain += 1 + Math.floor(stage / 5);
    mods.gammaLightningRadius *= 1.12 + stagePower * 0.04;
    mods.gammaLightningBurst *= 1.18 + stagePower * 0.06;
    return speed + 8;
  }
  if (has("snap") || has("thunder")) {
    mods.fireRate *= 1.08;
    mods.gammaLightningDamage *= 1.22 + stagePower * 0.06;
    mods.gammaLightningBurst *= 1.28 + stagePower * 0.08;
    mods.gammaLightningStun *= 1.08;
    return speed + 6;
  }
  if (has("array") || has("sponson") || has("splinter")) {
    mods.bulletCount += 1 + Math.floor(stage / 4);
    mods.bulletSpread += has("splinter") ? 0.03 : 0.1;
    mods.fireRate *= 1.08;
    return speed + 5;
  }
  if (has("prism")) {
    mods.shellDamage *= 1.12 + stagePower * 0.06;
    mods.bulletSpeed *= 1.1;
    mods.bulletSpread *= 0.75;
  }
  return speed;
}

function updateThunderGodReviveTrial(dt) {
  if (!isThunderGod() || (player.thunderReviveTrial || 0) <= 0) return;
  player.thunderReviveTrial = Math.max(0, player.thunderReviveTrial - dt);
  if (player.thunderReviveTrial <= 0 && player.level < (player.thunderReviveTargetLevel || Infinity)) {
    player.hp = 0;
    addSpark(player.x, player.y, "#fff06d", 18);
    endGame();
  }
}

function update(dt) {
  let target = screenToWorld(mouse.x, mouse.y);
  if (touchFire.active && player.tankKey !== "airstrike") {
    target = findNearestHostileToPlayer() || target;
  }
  player.angle = angleTo(player, target);
  player.invuln = Math.max(0, player.invuln - dt);
  updateThunderGodReviveTrial(dt);
  if (gameState !== "playing") return;
  updateJuggernautDomain(dt);
  updateTazerGuard(dt);
  player.hp = Math.min(player.maxHp, player.hp + regenAmount(player, dt));
  refreshEntityCounts();

  let dx = 0;
  let dy = 0;
  if (keys.has("w") || keys.has("arrowup")) dy -= 1;
  if (keys.has("s") || keys.has("arrowdown")) dy += 1;
  if (keys.has("a") || keys.has("arrowleft")) dx -= 1;
  if (keys.has("d") || keys.has("arrowright")) dx += 1;
  dx += touchMove.dx;
  dy += touchMove.dy;
  const len = Math.hypot(dx, dy) || 1;
  if ((player.stun || 0) <= 0) {
    const stormSpeedMult = tazerStormPenaltyActive() ? 0.5 : 1;
    const juggernautSpeedMult = juggernautPlayerBuffActive() ? JUGGERNAUT_DOMAIN_PLAYER_BUFF : 1;
    const thunderSpeedMult = (thunderGodBuffActive() ? THUNDER_GOD_SPEED_MULT : 1) * thunderGodReviveHpMult();
    player.x = clamp(player.x + (dx / len) * player.speed * stormSpeedMult * juggernautSpeedMult * thunderSpeedMult * dt, 32, world.w - 32);
    player.y = clamp(player.y + (dy / len) * player.speed * stormSpeedMult * juggernautSpeedMult * thunderSpeedMult * dt, 32, world.h - 32);
  }

  if (activeGameMode === "infantryArmy") {
    spawnCarry = 0;
  } else {
    if (hostileCount() < ENEMY_CAP) spawnCarry += player.level * dt;
    while (spawnCarry >= 1 && hostileCount() < ENEMY_CAP) {
      spawnEnemy();
      refreshEntityCounts();
      spawnCarry -= 1;
    }
    if (hostileCount() >= ENEMY_CAP) spawnCarry = Math.min(spawnCarry, 1);
  }

  if ((player.stun || 0) <= 0) firePlayer(dt, target);
  applyRemotePlayers(dt);
  updateBullets(dt);
  updateEnemies(dt);
  refreshEntityCounts();
  if (activeGameMode === "infantryArmy" && infantryArmySpawned >= INFANTRY_ARMY_CAP && hostileArmyThreatCount() === 0) {
    winGame("army");
    return;
  }
  resolveBodyCollisions();
  updateHitAnimations(dt);
  updateParticles(dt);
  camera.x += (player.x - camera.x) * Math.min(1, dt * 7);
  camera.y += (player.y - camera.y) * Math.min(1, dt * 7);
  camera.shake = Math.max(0, camera.shake - 34 * dt);
}

function updateHitAnimations(dt) {
  [player, ...enemies].forEach((tank) => {
    tank.hitFlash = Math.max(0, (tank.hitFlash || 0) - dt);
    tank.hitPulse = Math.max(0, (tank.hitPulse || 0) - dt);
    tank.punchAnim = Math.max(0, (tank.punchAnim || 0) - dt);
    tank.thornsCooldown = Math.max(0, (tank.thornsCooldown || 0) - dt);
    tank.stun = Math.max(0, (tank.stun || 0) - dt);
    tank.juggernautJudgment = Math.max(0, (tank.juggernautJudgment || 0) - dt);
    tank.juggernautJudgmentPulse = Math.max(0, (tank.juggernautJudgmentPulse || 0) - dt);
    if (tank.knockVx || tank.knockVy) {
      tank.x = clamp(tank.x + (tank.knockVx || 0) * dt, 32, world.w - 32);
      tank.y = clamp(tank.y + (tank.knockVy || 0) * dt, 32, world.h - 32);
      const decay = Math.max(0, 1 - 10 * dt);
      tank.knockVx *= decay;
      tank.knockVy *= decay;
      if (Math.hypot(tank.knockVx, tank.knockVy) < 4) {
        tank.knockVx = 0;
        tank.knockVy = 0;
      }
    }
  });
}

function updateBullets(dt) {
  for (let i = bullets.length - 1; i >= 0; i -= 1) {
    const b = bullets[i];
    b.age += dt;
    if (b.kind === "airstrike") {
      b.y += b.vy * dt;
      b.x += (b.targetX - b.x) * Math.min(1, dt * 8);
      if (b.y >= b.targetY || b.age > b.life) {
        b.x = b.targetX;
        b.y = b.targetY;
        if (b.thunderStrike) {
          detonateGammaLightning(b, "player");
          addSpark(b.x, b.y, "#fff06d", 20);
        } else {
          explodeFireworkBullet(b, "player");
          addSpark(b.x, b.y, "#ffcf5f", 18);
        }
        bullets.splice(i, 1);
      }
      continue;
    }
    if (b.kind === "beam" || b.kind === "allyBeam") {
      if (b.age > b.life) {
        bullets.splice(i, 1);
        continue;
      }
      clipBeamToWalls(b);
      if (b.range <= 0) {
        bullets.splice(i, 1);
        continue;
      }
      burnEnemyBulletsInRailBeam(b, dt);
      for (let j = enemies.length - 1; j >= 0; j -= 1) {
        const enemy = enemies[j];
        if (enemy.team === "ally" || b.hitEnemies.has(enemy.id)) continue;
        if (distanceToBeam(b, enemy) <= enemy.r + b.r) {
          const along = distanceAlongBeam(b, enemy);
          const endBoost = b.endDamageMult && along > b.range - (b.endDamageZone || 0) ? b.endDamageMult : 1;
          const damage = enemyIncomingDamage(enemy, playerDamage(b.damage * endBoost, enemy));
          enemy.hp -= damage;
          if (b.afterburnDps) {
            enemy.burn = Math.max(enemy.burn || 0, b.afterburnTime || 2);
            enemy.burnDps = Math.max(enemy.burnDps || 0, b.afterburnDps);
          }
          b.hitEnemies.add(enemy.id);
          markHit(enemy, damage * 0.03, b);
          addSpark(enemy.x, enemy.y, b.color, 6);
          if (b.chainDamage) chainLightningFrom(enemy, b.chainDamage, b.hitEnemies);
        }
      }
      continue;
    }
    if (b.kind === "gamma" || b.kind === "allyGamma") {
      if (!b.returning && b.age > b.turnTime) {
        b.returning = true;
        addSpark(b.x, b.y, GAMMA_BLUE, 2);
        detonateGammaLightning(b, "player");
        bullets.splice(i, 1);
        continue;
      }
    }
    const prevX = b.x;
    const prevY = b.y;
    b.x += b.vx * dt;
    b.y += b.vy * dt;
    const wallHit = wallHitOnSegment(prevX, prevY, b.x, b.y, b.r || 0);
    if (wallHit) {
      b.x = wallHit.x;
      b.y = wallHit.y;
      if (b.kind === "gamma" || b.kind === "allyGamma") detonateGammaLightning(b, "player");
      else explodeFireworkBullet(b, "player");
      addSpark(b.x, b.y, b.color || "#f1f1dc", 5);
      bullets.splice(i, 1);
      continue;
    }
    const expired =
      b.hp <= 0 ||
      b.age > b.life ||
      b.x < -120 ||
      b.y < -120 ||
      b.x > world.w + 120 ||
      b.y > world.h + 120;
    if (expired) {
      if (b.kind === "gamma" || b.kind === "allyGamma") detonateGammaLightning(b, "player");
      else explodeFireworkBullet(b, "player");
      bullets.splice(i, 1);
      continue;
    }
    for (let j = enemies.length - 1; j >= 0; j -= 1) {
      const enemy = enemies[j];
      if (enemy.team === "ally") continue;
      if (!b.hitEnemies.has(enemy.id) && Math.hypot(b.x - enemy.x, b.y - enemy.y) < b.r + enemy.r) {
        if (b.kind === "gamma" || b.kind === "allyGamma") {
          detonateGammaLightning(b, "player");
          addSpark(b.x, b.y, b.color, 5);
          bullets.splice(i, 1);
          break;
        }
        if (b.juggernautJudgment) applyJuggernautJudgment(enemy);
        const damage = enemyIncomingDamage(enemy, playerDamage(b.damage, enemy));
        enemy.hp -= damage;
        if (b.afterburnDps) {
          enemy.burn = Math.max(enemy.burn || 0, b.afterburnTime || 2);
          enemy.burnDps = Math.max(enemy.burnDps || 0, b.afterburnDps);
        }
        markHit(enemy, damage, b);
        explodeFireworkBullet(b, "player", enemy.id);
        b.pierceLeft -= 1;
        b.hitEnemies.add(enemy.id);
        addSpark(b.x, b.y, b.color, 3);
        if (b.fireworkFragments) b.pierceLeft = 0;
        if (b.pierceLeft <= 0) bullets.splice(i, 1);
        break;
      }
    }
  }

  resolveBulletCollisions();

  for (let i = enemyBullets.length - 1; i >= 0; i -= 1) {
    const b = enemyBullets[i];
    b.age += dt;
    if (b.kind === "enemyBeam") {
      if (b.age > b.life) {
        enemyBullets.splice(i, 1);
        continue;
      }
      clipBeamToWalls(b);
      if (b.range <= 0) {
        enemyBullets.splice(i, 1);
        continue;
      }
      blockEnemyRailBeamWithPlayerBullets(b);
      if (player.tankKey !== "helicopter" && !b.hitPlayer && player.invuln <= 0 && distanceToBeam(b, player) <= player.r + b.r) {
        const damage = playerIncomingDamage(b.damage);
        player.hp -= damage;
        player.invuln = 0.08;
        b.hitPlayer = true;
        markHit(player, damage, b);
        addSpark(player.x, player.y, b.color, 7);
        if (player.hp <= 0) checkPlayerDeath();
      }
      for (let j = enemies.length - 1; j >= 0; j -= 1) {
        const ally = enemies[j];
        if (ally.team !== "ally") continue;
        b.hitAllies ||= new Set();
        if (b.hitAllies.has(ally.id)) continue;
        if (distanceToBeam(b, ally) <= ally.r + b.r) {
          const damage = shielderDamage(ally, b.damage);
          ally.hp -= damage;
          b.hitAllies.add(ally.id);
          markHit(ally, damage, b);
          addSpark(ally.x, ally.y, b.color, 5);
        }
      }
      continue;
    }
    if (b.kind === "enemyGamma") {
      if (!b.returning && b.age > b.turnTime) {
        b.returning = true;
        addSpark(b.x, b.y, GAMMA_BLUE, 2);
        detonateGammaLightning(b, "enemy");
        enemyBullets.splice(i, 1);
        continue;
      }
    }
    if (b.kind === "enemyMissile" && player.tankKey === "helicopter") {
      const turn = angleTo(b, player);
      const speed = Math.hypot(b.vx, b.vy) || 240;
      const desiredVx = Math.cos(turn) * speed;
      const desiredVy = Math.sin(turn) * speed;
      b.vx += (desiredVx - b.vx) * Math.min(1, dt * 4.5);
      b.vy += (desiredVy - b.vy) * Math.min(1, dt * 4.5);
      b.angle = Math.atan2(b.vy, b.vx);
    }
    const prevX = b.x;
    const prevY = b.y;
    b.x += b.vx * dt;
    b.y += b.vy * dt;
    const wallHit = wallHitOnSegment(prevX, prevY, b.x, b.y, b.r || 0);
    if (wallHit) {
      b.x = wallHit.x;
      b.y = wallHit.y;
      if (b.kind === "enemyGamma") detonateGammaLightning(b, "enemy");
      else explodeFireworkBullet(b, "enemy");
      addSpark(b.x, b.y, b.color || "#f1f1dc", 5);
      enemyBullets.splice(i, 1);
      continue;
    }
    const expired = b.hp <= 0 || b.age > b.life;
    if (expired) {
      if (b.kind === "enemyGamma") detonateGammaLightning(b, "enemy");
      else explodeFireworkBullet(b, "enemy");
      enemyBullets.splice(i, 1);
      continue;
    }
    const canHitPlayer = player.tankKey !== "helicopter" || b.kind === "enemyMissile" || b.kind === "enemyRpg" || b.kind === "enemyAk" || b.kind === "enemyGamma";
    if (canHitPlayer && Math.hypot(b.x - player.x, b.y - player.y) < b.r + player.r && player.invuln <= 0) {
      if (b.kind === "enemyGamma") {
        detonateGammaLightning(b, "enemy");
        enemyBullets.splice(i, 1);
        continue;
      }
      const damage = playerIncomingDamage(b.damage);
      player.hp -= damage;
      player.invuln = 0.04;
      markHit(player, damage, b);
      explodeFireworkBullet(b, "enemy");
      addSpark(player.x, player.y, "#f1f1dc", 4);
      enemyBullets.splice(i, 1);
      if (player.hp <= 0) checkPlayerDeath();
      continue;
    }
    if (b.ownerRemoteId) {
      let hitRemote = false;
      for (let j = enemies.length - 1; j >= 0; j -= 1) {
        const remote = enemies[j];
        if (!remote.controlled || remote.remoteId === b.ownerRemoteId) continue;
        if (Math.hypot(b.x - remote.x, b.y - remote.y) < b.r + remote.r) {
          remote.hp -= b.damage;
          markHit(remote, b.damage, b);
          explodeFireworkBullet(b, "enemy");
          addSpark(remote.x, remote.y, "#ffcf5f", 4);
          enemyBullets.splice(i, 1);
          hitRemote = true;
          break;
        }
      }
      if (hitRemote) continue;
    }
    for (let j = enemies.length - 1; j >= 0; j -= 1) {
      const ally = enemies[j];
      if (ally.team !== "ally") continue;
      if (Math.hypot(b.x - ally.x, b.y - ally.y) < b.r + ally.r) {
        if (b.kind === "enemyGamma") {
          detonateGammaLightning(b, "enemy");
          enemyBullets.splice(i, 1);
          break;
        }
        const damage = shielderDamage(ally, b.damage);
        ally.hp -= damage;
        markHit(ally, damage, b);
        explodeFireworkBullet(b, "enemy");
        addSpark(ally.x, ally.y, "#9df29e", 3);
        enemyBullets.splice(i, 1);
        break;
      }
    }
  }
}

function resolveBulletCollisions() {
  for (let i = bullets.length - 1; i >= 0; i -= 1) {
    const playerBullet = bullets[i];
    if (!playerBullet || playerBullet.hp <= 0) continue;
    if (playerBullet.kind === "beam" || playerBullet.kind === "allyBeam") continue;
    for (let j = enemyBullets.length - 1; j >= 0; j -= 1) {
      const enemyBullet = enemyBullets[j];
      if (!enemyBullet || enemyBullet.hp <= 0) continue;
      if (enemyBullet.kind === "enemyBeam") continue;
      if (Math.hypot(playerBullet.x - enemyBullet.x, playerBullet.y - enemyBullet.y) > playerBullet.r + enemyBullet.r) continue;

      playerBullet.hp -= enemyBullet.damage;
      enemyBullet.hp -= playerBullet.damage;
      addSpark((playerBullet.x + enemyBullet.x) / 2, (playerBullet.y + enemyBullet.y) / 2, playerBullet.color, 5);

      if (enemyBullet.hp <= 0) enemyBullets.splice(j, 1);
      if (playerBullet.hp <= 0) {
        bullets.splice(i, 1);
        break;
      }
    }
  }
}

function updateEnemies(dt) {
  for (let i = enemies.length - 1; i >= 0; i -= 1) {
    const enemy = enemies[i];
    if (enemy.controlled) {
      enemy.hp = Math.min(enemy.maxHp, enemy.hp + regenAmount(enemy, dt));
      if (enemy.hp <= 0) {
        addSpark(enemy.x, enemy.y, "#f2ca52", 16);
        enemies.splice(i, 1);
        player.kills += 1;
        gainXp(xpRewardForEnemy(enemy));
      }
      continue;
    }
    if (enemy.babyDragon || enemy.adultDragon || enemy.blackDragon) {
      updateDragonAlly(enemy, dt);
      if (enemy.hp <= 0 || enemy.life <= 0) {
        addSpark(enemy.x, enemy.y, enemy.blackDragon ? "#7d4dff" : enemy.adultDragon ? "#ff6f35" : "#ff8d45", enemy.blackDragon ? 18 : enemy.adultDragon ? 14 : 7);
        enemies.splice(i, 1);
      }
      continue;
    }
    if (enemy.miniTazer) {
      updateMiniTazer(enemy, dt);
      if (enemy.hp <= 0) {
        addSpark(enemy.x, enemy.y, "#fff06d", 9);
        enemies.splice(i, 1);
      }
      continue;
    }
    if (enemy.team === "ally" && !enemy.deployedShielder) {
      const newMaxHp = allyMaxHp();
      if (newMaxHp !== enemy.maxHp) {
        enemy.hp = Math.min(newMaxHp, enemy.hp + Math.max(0, newMaxHp - enemy.maxHp));
        enemy.maxHp = newMaxHp;
      }
    }
    enemy.hp = Math.min(enemy.maxHp, enemy.hp + regenAmount(enemy, dt));
    if (enemy.deployedShielder) {
      enemy.cooldown -= dt;
      if (enemy.chargeTime > 0) {
        enemy.chargeTime = Math.max(0, enemy.chargeTime - dt);
        enemy.x = clamp(enemy.x + (enemy.chargeVx || 0) * (enemy.chargeSpeed || 0) * dt, 32, world.w - 32);
        enemy.y = clamp(enemy.y + (enemy.chargeVy || 0) * (enemy.chargeSpeed || 0) * dt, 32, world.h - 32);
        resolveMapCollision(enemy);
        enemy.angle = Math.atan2(enemy.chargeVy || 0, enemy.chargeVx || 1);
      } else {
        const target = findNearestTank(enemy, "enemy");
        if (target) {
          enemy.angle = angleTo(enemy, target);
          const targetDistance = distance(enemy, target);
          if (targetDistance > enemy.r + target.r + 42) {
            const avoid = barrierAvoidanceVector(enemy, Math.cos(enemy.angle), Math.sin(enemy.angle));
            let vx = Math.cos(enemy.angle) + avoid.x * 1.15;
            let vy = Math.sin(enemy.angle) + avoid.y * 1.15;
            const len = Math.hypot(vx, vy) || 1;
            enemy.x = clamp(enemy.x + (vx / len) * enemy.speed * dt, 32, world.w - 32);
            enemy.y = clamp(enemy.y + (vy / len) * enemy.speed * dt, 32, world.h - 32);
            resolveMapCollision(enemy);
          } else if (enemy.cooldown <= 0) {
            enemyPunchAttack(enemy, target);
            enemy.cooldown = 0.72;
          }
        }
      }
      if (enemy.hp <= 0) {
        addSpark(enemy.x, enemy.y, "#a7c7ff", 12);
        enemies.splice(i, 1);
      }
      continue;
    }
    if (enemy.medicTrooper) medicInfantryPulse(enemy, dt);
    enemy.healRing = Math.max(0, (enemy.healRing || 0) - dt);
    const allyTarget = enemy.team === "ally" ? findNearestTank(enemy, "enemy") : null;
    const canTargetHelicopter = enemy.tankKey === "antiAir" || (enemy.tankKey === "infantry" && (!enemy.puncher || enemy.akTrooper));
    const dragonTarget = enemy.team === "ally" || enemy.infantry ? null : findDragonTarget(enemy);
    const groundTarget =
      dragonTarget ||
      (player.tankKey === "helicopter" && !canTargetHelicopter
        ? findPriorityAllyTarget(enemy) || helicopterGroundRoamTarget(enemy)
        : findTrooperShielderTarget(enemy) || player);
    const enemyTarget = enemy.team === "ally" ? allyTarget : groundTarget;
    if (enemy.stun > 0) {
      enemy.cooldown -= dt;
    } else if (enemyTarget) {
      enemy.angle = angleTo(enemy, enemyTarget);
      moveStrategicEnemy(enemy, enemyTarget, dt);
      clampToJuggernautDomain(enemy);
      if (activeGameMode === "infantryArmy" && enemy.team !== "ally" && enemy.infantry) enemy.angle = angleTo(enemy, player);
      enemy.cooldown -= dt;
    } else {
      enemy.cooldown -= dt;
    }
    const targetDistance = enemyTarget ? distance(enemy, enemyTarget) : Infinity;
    const canShoot =
      enemy.stun <= 0 &&
      enemyTarget &&
      !enemyTarget.isRoamTarget &&
      (enemy.strategy === "rush" || enemy.strategy === "ambush" || targetDistance <= strategyRange(enemy) + 130 * enemy.mods.range);
    if (enemy.stun <= 0 && enemy.tankKey === "flame" && player.tankKey !== "helicopter" && enemyTarget && targetDistance < 155 * enemy.mods.range) {
      tankFlameAttack(enemy, enemyTarget, dt);
    } else if (enemy.tankKey !== "flame" && enemy.cooldown <= 0 && canShoot) {
      enemyFire(enemy, enemyTarget);
      enemy.cooldown =
        enemy.fixedReload
          ? enemy.fixedReload
          : enemy.tankKey === "juggernaut"
          ? Math.max(1.75, 3.7 - enemy.level * 0.04) + Math.random() * 0.8
          : enemy.tankKey === "dragonTamer"
            ? Math.max(5.5, 9.5 - enemy.level * 0.08) + Math.random() * 1.4
          : enemy.tankKey === "tazer"
            ? Math.max(0.75, 1.55 - enemy.level * 0.025) + Math.random() * 0.35
          : enemy.tankKey === "antiAir"
            ? Math.max(0.85, 1.65 - enemy.level * 0.035) + Math.random() * 0.45
          : enemy.tankKey === "helicopter"
            ? 0.18 / enemy.mods.fireRate
          : enemy.puncher
            ? Math.max(0.28, 0.78 - enemy.level * 0.015) + Math.random() * 0.18
          : enemy.akTrooper
            ? Math.max(0.28, 0.62 - enemy.level * 0.006) + Math.random() * 0.16
          : enemy.bomberTrooper
            ? Math.max(1.05, 1.75 - enemy.level * 0.02) + Math.random() * 0.35
          : enemy.medicTrooper || enemy.shielderTrooper
            ? Math.max(0.65, 1.15 - enemy.level * 0.012) + Math.random() * 0.3
          : Math.max(0.62, 1.25 - enemy.level * 0.05) + Math.random() * 0.55;
    }
    if (enemy.burn > 0) {
      enemy.burn -= dt;
      enemy.hp -= enemyIncomingDamage(enemy, enemy.burnDps * dt);
      if (!enemy.hitFlash) markHit(enemy, 0.25);
      if (Math.random() < 8 * dt) addSpark(enemy.x, enemy.y, "#ff8e33", 1);
    }
    if (player.tankKey !== "helicopter" && enemy.team !== "ally" && distance(enemy, player) < enemy.r + player.r && player.invuln <= 0) {
      const touchDamage = enemyAttackDamage(enemy, 2);
      player.hp -= playerIncomingDamage(touchDamage);
      player.invuln = 0.35;
      markHit(player, touchDamage, enemy);
      addSpark(player.x, player.y, "#e65735", 8);
      if (player.hp <= 0) checkPlayerDeath();
    }
    if (enemy.hp <= 0) {
      const defeatedVictoryBoss = enemy.victoryBoss && enemy.team !== "ally";
      addSpark(enemy.x, enemy.y, "#f2ca52", 16);
      if (enemy.team !== "ally" && !enemy.infantry && enemy.tankKey !== "dragon") spawnInfantryPack(enemy);
      enemies.splice(i, 1);
      if (enemy.team !== "ally") {
        player.kills += enemy.boss ? 10 : 1;
        if (defeatedVictoryBoss) addSpark(player.x, player.y, "#ffef88", 28);
        gainXp(xpRewardForEnemy(enemy));
      }
    }
  }
}

function resolveBodyCollisions() {
  const crowded = enemies.length > 70;
  const bodies = [
    player,
    ...enemies.filter(
      (enemy) =>
        !crowded ||
        enemy.team === "ally" ||
        !enemy.infantry ||
        enemy.boss ||
        enemy.babyDragon ||
        enemy.adultDragon ||
        enemy.blackDragon ||
        distanceSq(enemy, player) < 520 * 520
    ),
  ];
  for (let i = 0; i < bodies.length; i += 1) {
    for (let j = i + 1; j < bodies.length; j += 1) {
      const a = bodies[i];
      const b = bodies[j];
      const minDist = a.r + b.r + 2;
      let dx = b.x - a.x;
      let dy = b.y - a.y;
      if (Math.abs(dx) > minDist || Math.abs(dy) > minDist) continue;
      let d = Math.hypot(dx, dy);
      if (d >= minDist) continue;
      if (d === 0) {
        dx = Math.random() - 0.5;
        dy = Math.random() - 0.5;
        d = Math.hypot(dx, dy) || 1;
      }
      const push = (minDist - d) / 2;
      const nx = dx / d;
      const ny = dy / d;
      const aIsPlayer = a === player;
      const bIsPlayer = b === player;
      const sameNpcTeam = a !== player && b !== player && a.team === b.team && !a.controlled && !b.controlled;
      const aPush = bIsPlayer ? push * 1.6 : sameNpcTeam ? push * 1.35 : push;
      const bPush = aIsPlayer ? push * 1.6 : sameNpcTeam ? push * 1.35 : push;
      a.x = clamp(a.x - nx * aPush, 32, world.w - 32);
      a.y = clamp(a.y - ny * aPush, 32, world.h - 32);
      b.x = clamp(b.x + nx * bPush, 32, world.w - 32);
      b.y = clamp(b.y + ny * bPush, 32, world.h - 32);
    }
  }
  bodies.forEach(resolveMapCollision);
}

function resolveMapCollision(tank) {
  if (tank.tankKey === "helicopter" || tank.tankKey === "dragon") return;
  warMap.barriers.forEach((barrier) => {
    const left = barrier.x - barrier.w / 2;
    const right = barrier.x + barrier.w / 2;
    const top = barrier.y - barrier.h / 2;
    const bottom = barrier.y + barrier.h / 2;
    const closestX = clamp(tank.x, left, right);
    const closestY = clamp(tank.y, top, bottom);
    let dx = tank.x - closestX;
    let dy = tank.y - closestY;
    let d = Math.hypot(dx, dy);
    if (d >= tank.r) return;
    if (d === 0) {
      const toLeft = Math.abs(tank.x - left);
      const toRight = Math.abs(right - tank.x);
      const toTop = Math.abs(tank.y - top);
      const toBottom = Math.abs(bottom - tank.y);
      const min = Math.min(toLeft, toRight, toTop, toBottom);
      if (min === toLeft) dx = -1;
      else if (min === toRight) dx = 1;
      else if (min === toTop) dy = -1;
      else dy = 1;
      d = 1;
    }
    const push = tank.r - d + 0.5;
    tank.x = clamp(tank.x + (dx / d) * push, 32, world.w - 32);
    tank.y = clamp(tank.y + (dy / d) * push, 32, world.h - 32);
  });
}

function updateParticles(dt) {
  for (let i = gammaStorms.length - 1; i >= 0; i -= 1) {
    const storm = gammaStorms[i];
    storm.timer -= dt;
    while (storm.timer <= 0 && storm.strikesLeft > 0) {
      if (!strikeGammaStormOnce(storm)) {
        gammaStorms.splice(i, 1);
        break;
      }
      storm.strikesLeft -= 1;
      storm.timer += GAMMA_STORM_INTERVAL;
    }
    if (storm.strikesLeft <= 0) gammaStorms.splice(i, 1);
  }
  for (let i = tazerEndStorms.length - 1; i >= 0; i -= 1) {
    const storm = tazerEndStorms[i];
    storm.timer -= dt;
    while (storm.timer <= 0 && storm.strikesLeft > 0) {
      strikeTazerEndStormOnce(storm);
      storm.timer += TAZER_END_STORM_INTERVAL;
    }
    if (storm.strikesLeft <= 0) tazerEndStorms.splice(i, 1);
  }
  updateTazerCannonTraps(dt);
  updateTazerCannonWaves(dt);
  updateTazerFocusStorms(dt);
  updateThunderFocusStorms(dt);
  if (flames.length > MAX_FLAMES) flames.splice(0, flames.length - MAX_FLAMES);
  for (let i = flames.length - 1; i >= 0; i -= 1) {
    flames[i].life -= dt;
    if (flames[i].life <= 0) flames.splice(i, 1);
  }
  for (let i = sparks.length - 1; i >= 0; i -= 1) {
    const s = sparks[i];
    s.life -= dt;
    s.x += s.vx * dt;
    s.y += s.vy * dt;
    s.vx *= 0.93;
    s.vy *= 0.93;
    if (s.life <= 0) sparks.splice(i, 1);
  }
  for (let i = lightning.length - 1; i >= 0; i -= 1) {
    lightning[i].life -= dt;
    if (lightning[i].life <= 0) lightning.splice(i, 1);
  }
  for (let i = nukes.length - 1; i >= 0; i -= 1) {
    nukes[i].life -= dt;
    if (nukes[i].life <= 0) nukes.splice(i, 1);
  }
}

function endGame() {
  recordLeaderboardRun("defeat");
  gameState = "gameOver";
  finalStats.textContent = `Level ${player.level} - ${player.kills} enemies destroyed - ${player.buildName}`;
  showOnly("gameOver");
}

function endGameFromPause() {
  recordLeaderboardRun("ended");
  gameState = "gameOver";
  finalStats.textContent = `Ended run - Level ${player.level} - ${player.kills} enemies destroyed - ${player.buildName}`;
  showOnly("gameOver");
}

function winGame(reason = "level21Boss") {
  recordLeaderboardRun(reason);
  gameState = "gameOver";
  finalStats.textContent =
    reason === "army"
      ? `Victory - Level ${player.level} - ${player.kills} enemies destroyed - only shielders remain`
      : `Victory - Level ${player.level} boss defeated - ${player.kills} enemies destroyed - ${player.buildName}`;
  showOnly("gameOver");
}

function draw() {
  if (multiplayer.role === "enemy") {
    drawRemoteMultiplayer();
    return;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(camera.scale, camera.scale);
  if (camera.shake > 0) {
    ctx.translate((Math.random() - 0.5) * camera.shake, (Math.random() - 0.5) * camera.shake);
  }
  ctx.translate(-camera.x, -camera.y);
  drawWorld();
  if (activeJuggernautDomain()) drawJuggernautDomain();
  flames.forEach((flame) => {
    if (onScreen(flame, flame.reach + 80)) drawFlame(flame);
  });
  bullets.forEach((bullet) => {
    if (onScreen(bullet, 180)) drawBullet(bullet);
  });
  enemyBullets.forEach((bullet) => {
    if (onScreen(bullet, 180)) drawEnemyBullet(bullet);
  });
  nukes.forEach((nuke) => {
    if (onScreen(nuke, (nuke.radius || 220) + 120)) drawNuke(nuke);
  });
  tazerCannonTraps.forEach((trap) => {
    if (onScreen(trap, TAZER_CANNON_RADIUS + 160)) drawTazerCannonTrap(trap);
  });
  tazerCannonWaves.forEach((wave) => {
    if (onScreen(wave, TAZER_CANNON_WAVE_RADIUS + 120)) drawTazerCannonWave(wave);
  });
  lightning.forEach((bolt) => {
    if (lightningOnScreen(bolt)) drawLightning(bolt);
  });
  enemies.forEach((enemy) => {
    if (onScreen(enemy, 170)) drawEnemy(enemy);
  });
  drawTank(player, player.color, player.accent, true);
  if (thunderGodBuffActive()) drawThunderGodBuff();
  if (fireShieldActive()) drawFireShield();
  if (juggernautResolveActive()) drawJuggernautResolve();
  if (player.tankKey === "tazer" && (player.tazerGuardActive || 0) > 0) drawTazerGuard();
  sparks.forEach((spark) => {
    if (onScreen(spark, 80)) drawSpark(spark);
  });
  ctx.restore();
  if (!hudHidden) drawHud();
}

function drawRemoteMultiplayer() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.scale(camera.scale, camera.scale);
  const state = multiplayer.remoteSnapshot;
  if (!state) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = "#f5f4eb";
    ctx.font = "20px system-ui, sans-serif";
    ctx.fillText("Joining as an enemy tank...", 32, 48);
    ctx.restore();
    return;
  }
  const ownTank = state.enemies.find((tank) => tank.remoteId === multiplayer.id) || state.player;
  camera.x += (ownTank.x - camera.x) * 0.12;
  camera.y += (ownTank.y - camera.y) * 0.12;
  ctx.translate(-camera.x, -camera.y);
  drawWorld();
  state.enemies.forEach((tank) => drawTank(tank, tank.color, tank.accent, false));
  drawTank(state.player, state.player.color, state.player.accent, true);
  ctx.restore();
  drawRemoteHud(state);
}

function drawRemoteHud(state) {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  const pad = 20 * camera.scale;
  ctx.fillStyle = "rgba(11,15,12,0.72)";
  roundRect(pad, pad, 390 * camera.scale, 88 * camera.scale, 8 * camera.scale);
  ctx.fill();
  ctx.fillStyle = "#f5f4eb";
  ctx.font = `${18 * camera.scale}px system-ui, sans-serif`;
  ctx.fillText("FFA Enemy Player", pad + 16 * camera.scale, pad + 30 * camera.scale);
  ctx.fillStyle = "#aeb5ad";
  ctx.font = `${13 * camera.scale}px system-ui, sans-serif`;
  ctx.fillText("WASD moves. Aim with mouse. Click or Space fires.", pad + 16 * camera.scale, pad + 58 * camera.scale);
  ctx.fillText(`Host HP ${Math.ceil(state.player.hp)}/${state.player.maxHp}`, pad + 16 * camera.scale, pad + 78 * camera.scale);
  ctx.restore();
}

function drawWorld() {
  ctx.fillStyle = warMap.theme || "#182019";
  ctx.fillRect(0, 0, world.w, world.h);
  ctx.strokeStyle = "rgba(255,255,255,0.045)";
  ctx.lineWidth = 1;
  for (let x = 0; x < world.w; x += 80) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, world.h);
    ctx.stroke();
  }
  for (let y = 0; y < world.h; y += 80) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(world.w, y);
    ctx.stroke();
  }
  warMap.craters.forEach((crater) => {
    ctx.save();
    ctx.translate(crater.x, crater.y);
    ctx.rotate(crater.angle);
    ctx.fillStyle = crater.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, crater.r, crater.r * crater.squash, 0, 0, TAU);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.05)";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();
  });
  warMap.trenches.forEach((trench) => {
    ctx.save();
    ctx.translate(trench.x, trench.y);
    ctx.rotate(trench.angle);
    ctx.strokeStyle = "rgba(0,0,0,0.32)";
    ctx.lineWidth = trench.width + 10;
    ctx.beginPath();
    ctx.moveTo(-trench.len / 2, 0);
    ctx.lineTo(trench.len / 2, 0);
    ctx.stroke();
    ctx.strokeStyle = trench.color;
    ctx.lineWidth = trench.width;
    ctx.stroke();
    ctx.strokeStyle = "rgba(242,202,82,0.16)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-trench.len / 2, -trench.width * 0.55);
    ctx.lineTo(trench.len / 2, -trench.width * 0.55);
    ctx.moveTo(-trench.len / 2, trench.width * 0.55);
    ctx.lineTo(trench.len / 2, trench.width * 0.55);
    ctx.stroke();
    ctx.restore();
  });
  warMap.barriers.forEach((barrier) => {
    ctx.fillStyle = "rgba(0,0,0,0.22)";
    roundRect(barrier.x - barrier.w / 2 + 5, barrier.y - barrier.h / 2 + 6, barrier.w, barrier.h, 6);
    ctx.fill();
    ctx.fillStyle = barrier.color;
    roundRect(barrier.x - barrier.w / 2, barrier.y - barrier.h / 2, barrier.w, barrier.h, 6);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    ctx.lineWidth = 2;
    ctx.stroke();
  });
  ctx.strokeStyle = "rgba(242,202,82,0.28)";
  ctx.lineWidth = 8;
  ctx.strokeRect(0, 0, world.w, world.h);
}

function drawTank(tank, body, turret, isPlayer = false) {
  const pulse = tank.hitPulse ? 1 + (tank.hitPulse / 0.18) * 0.12 : 1;
  const flash = clamp((tank.hitFlash || 0) / 0.18, 0, 1);
  const paintBody = flash > 0 ? "#fff5d6" : body;
  const paintTurret = flash > 0 ? "#ff6b4a" : turret;
  ctx.save();
  ctx.translate(tank.x, tank.y);
  ctx.rotate(tank.angle);
  ctx.scale(pulse, pulse);
  if (tank.tankKey === "dragonTamer") {
    const slashT = clamp((tank.punchAnim || 0) / 0.2, 0, 1);
    const slashEase = Math.sin(slashT * Math.PI);
    const side = tank.punchSide || 1;
    ctx.fillStyle = "rgba(0,0,0,0.28)";
    ctx.beginPath();
    ctx.ellipse(0, 12, 22, 8, 0, 0, TAU);
    ctx.fill();
    ctx.fillStyle = paintBody;
    ctx.beginPath();
    ctx.arc(0, 0, 18, 0, TAU);
    ctx.fill();
    ctx.fillStyle = paintTurret;
    ctx.beginPath();
    ctx.arc(4, 0, 10, 0, TAU);
    ctx.fill();
    ctx.strokeStyle = "#f5f4eb";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(11, side * 8);
    ctx.lineTo(43 + slashEase * 18, side * (18 - slashEase * 28));
    ctx.stroke();
    ctx.strokeStyle = `rgba(255,141,69,${0.25 + slashEase * 0.55})`;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(34 + slashEase * 14, 0, 22 + slashEase * 16, -0.7, 0.7);
    ctx.stroke();
    ctx.fillStyle = "#ff8d45";
    ctx.beginPath();
    ctx.moveTo(-13, -15);
    ctx.lineTo(-27, -5);
    ctx.lineTo(-13, 1);
    ctx.moveTo(-13, 15);
    ctx.lineTo(-27, 5);
    ctx.lineTo(-13, -1);
    ctx.fill();
    ctx.restore();
    return;
  }
  if (tank.tankKey === "infantry") {
    const punchT = clamp((tank.punchAnim || 0) / 0.18, 0, 1);
    const punchEase = Math.sin(punchT * Math.PI);
    const punchSide = tank.punchSide || 1;
    const leadX = 32 + punchEase * 26;
    const leadY = punchSide * (20 - punchEase * 13);
    const guardX = 27 - punchEase * 4;
    const guardY = -punchSide * 20;
    ctx.fillStyle = "rgba(0,0,0,0.26)";
    ctx.beginPath();
    ctx.ellipse(0, 10, 18, 7, 0, 0, TAU);
    ctx.fill();
    ctx.fillStyle = paintBody;
    ctx.beginPath();
    ctx.arc(0, 0, 13, 0, TAU);
    ctx.fill();
    ctx.fillStyle = paintTurret;
    ctx.beginPath();
    ctx.arc(3, 0, 8, 0, TAU);
    ctx.fill();
    ctx.strokeStyle = paintTurret;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(7, -5);
    ctx.lineTo(punchSide < 0 ? leadX - 3 : guardX - 3, punchSide < 0 ? leadY : guardY);
    ctx.moveTo(7, 5);
    ctx.lineTo(punchSide > 0 ? leadX - 3 : guardX - 3, punchSide > 0 ? leadY : guardY);
    ctx.stroke();
    if (punchEase > 0.08) {
      ctx.strokeStyle = `rgba(242, 202, 82, ${0.55 * punchEase})`;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(33 + punchEase * 16, punchSide * 3, 18 + punchEase * 14, -0.7, 0.7);
      ctx.stroke();
    }
    ctx.fillStyle = "#f2ca52";
    ctx.beginPath();
    ctx.arc(punchSide < 0 ? leadX : guardX, punchSide < 0 ? leadY : guardY, 7 + punchEase * (punchSide < 0 ? 2 : 0), 0, TAU);
    ctx.arc(punchSide > 0 ? leadX : guardX, punchSide > 0 ? leadY : guardY, 7 + punchEase * (punchSide > 0 ? 2 : 0), 0, TAU);
    ctx.fill();
    ctx.strokeStyle = "rgba(0,0,0,0.35)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-8, 11);
    ctx.lineTo(-16, 20);
    ctx.moveTo(8, 11);
    ctx.lineTo(16, 20);
    ctx.stroke();
    ctx.restore();

    if (flash > 0) {
      ctx.strokeStyle = `rgba(255, 245, 214, ${flash * 0.75})`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(tank.x, tank.y, tank.r + 8 + (1 - flash) * 10, 0, TAU);
      ctx.stroke();
    }

    const pct = tank.hp / tank.maxHp;
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(tank.x - 27, tank.y - 42, 54, 6);
    ctx.fillStyle = isPlayer || tank.team === "ally" ? "#9df29e" : "#ff7665";
    ctx.fillRect(tank.x - 27, tank.y - 42, 54 * clamp(pct, 0, 1), 6);
    return;
  }
  if (tank.tankKey === "helicopter") {
    const rotorSpin = performance.now() * 0.018;
    ctx.fillStyle = "rgba(0,0,0,0.24)";
    ctx.beginPath();
    ctx.ellipse(2, 18, 42, 10, 0, 0, TAU);
    ctx.fill();
    ctx.strokeStyle = "rgba(234,255,255,0.9)";
    ctx.lineWidth = 5;
    ctx.save();
    ctx.rotate(rotorSpin);
    ctx.beginPath();
    ctx.moveTo(-48, 0);
    ctx.lineTo(48, 0);
    ctx.moveTo(0, -36);
    ctx.lineTo(0, 36);
    ctx.stroke();
    ctx.restore();
    ctx.fillStyle = paintBody;
    ctx.beginPath();
    ctx.ellipse(0, 0, 27, 15, 0, 0, TAU);
    ctx.fill();
    ctx.fillStyle = paintTurret;
    ctx.beginPath();
    ctx.ellipse(10, 0, 14, 10, 0, 0, TAU);
    ctx.fill();
    ctx.strokeStyle = paintBody;
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(-22, 0);
    ctx.lineTo(-58, 0);
    ctx.stroke();
    ctx.fillStyle = paintTurret;
    ctx.beginPath();
    ctx.moveTo(-68, -10);
    ctx.lineTo(-55, 0);
    ctx.lineTo(-68, 10);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "rgba(234,255,255,0.75)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-71, 0);
    ctx.lineTo(-57, 0);
    ctx.moveTo(-64, -7);
    ctx.lineTo(-64, 7);
    ctx.stroke();
    ctx.fillStyle = "#f2ca52";
    roundRect(13, -4, 45, 8, 4);
    ctx.fill();
    ctx.fillStyle = "#ffef8f";
    ctx.beginPath();
    ctx.arc(61, 0, 4, 0, TAU);
    ctx.fill();
    ctx.strokeStyle = "rgba(0,0,0,0.34)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-16, 15);
    ctx.lineTo(14, 15);
    ctx.moveTo(-16, -15);
    ctx.lineTo(14, -15);
    ctx.stroke();
    ctx.restore();

    if (flash > 0) {
      ctx.strokeStyle = `rgba(255, 245, 214, ${flash * 0.75})`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(tank.x, tank.y, tank.r + 8 + (1 - flash) * 10, 0, TAU);
      ctx.stroke();
    }

    const pct = tank.hp / tank.maxHp;
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(tank.x - 27, tank.y - 42, 54, 6);
    ctx.fillStyle = isPlayer || tank.team === "ally" ? "#9df29e" : "#ff7665";
    ctx.fillRect(tank.x - 27, tank.y - 42, 54 * clamp(pct, 0, 1), 6);
    return;
  }
  ctx.fillStyle = "rgba(0,0,0,0.32)";
  ctx.fillRect(-22, 15, 44, 12);
  ctx.fillRect(-22, -27, 44, 12);
  ctx.fillStyle = paintBody;
  roundRect(-24, -20, 48, 40, 8);
  ctx.fill();
  ctx.fillStyle = paintTurret;
  roundRect(-8, -13, 24, 26, 6);
  ctx.fill();
  drawTankSkin(tank, paintTurret);
  drawTankWeapon(tank, paintTurret, isPlayer);
  ctx.restore();

  if (flash > 0) {
    ctx.strokeStyle = `rgba(255, 245, 214, ${flash * 0.75})`;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(tank.x, tank.y, tank.r + 8 + (1 - flash) * 10, 0, TAU);
    ctx.stroke();
  }

  const pct = tank.hp / tank.maxHp;
  ctx.fillStyle = "rgba(0,0,0,0.5)";
  ctx.fillRect(tank.x - 27, tank.y - 42, 54, 6);
  ctx.fillStyle = isPlayer || tank.team === "ally" ? "#9df29e" : "#ff7665";
  ctx.fillRect(tank.x - 27, tank.y - 42, 54 * clamp(pct, 0, 1), 6);
}

function drawTankSkin(tank, accentColor) {
  const name = tank.buildName || "";
  const perks = tank.perks || {};

  if (name === "Enemy Tank") {
    ctx.strokeStyle = "#ece6cc";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-18, -12);
    ctx.lineTo(18, -12);
    ctx.moveTo(-18, 12);
    ctx.lineTo(18, 12);
    ctx.stroke();
    ctx.fillStyle = "#ff7665";
    ctx.beginPath();
    ctx.arc(0, 0, 7, 0, TAU);
    ctx.fill();
  } else if (name.includes("Thunder God")) {
    ctx.strokeStyle = "rgba(255,240,109,0.88)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-7, -23);
    ctx.lineTo(-20, 1);
    ctx.lineTo(-5, 1);
    ctx.lineTo(-17, 25);
    ctx.lineTo(20, -8);
    ctx.lineTo(5, -8);
    ctx.lineTo(17, -25);
    ctx.stroke();
    ctx.strokeStyle = "rgba(141,245,255,0.55)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, 24, 0, TAU);
    ctx.stroke();
  } else if (tank.tankKey === "helicopter") {
    ctx.strokeStyle = "rgba(234,255,255,0.8)";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(-38, 0);
    ctx.lineTo(38, 0);
    ctx.moveTo(0, -28);
    ctx.lineTo(0, 28);
    ctx.stroke();
    ctx.fillStyle = "#f2ca52";
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, TAU);
    ctx.fill();
  } else if (tank.tankKey === "airstrike") {
    ctx.strokeStyle = "#ffcf5f";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, 18, 0, TAU);
    ctx.moveTo(-24, 0);
    ctx.lineTo(24, 0);
    ctx.moveTo(0, -24);
    ctx.lineTo(0, 24);
    ctx.stroke();
  } else if (tank.tankKey === "antiAir") {
    ctx.fillStyle = "#ff5959";
    ctx.fillRect(-14, -17, 28, 5);
    ctx.fillRect(-14, 12, 28, 5);
  } else if (tank.tankKey === "tazer") {
    ctx.strokeStyle = "rgba(255,230,109,0.35)";
    ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.arc(0, 0, 25, 0, TAU);
    ctx.stroke();
    ctx.strokeStyle = "#ffe66d";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-22, -15);
    ctx.lineTo(-7, -4);
    ctx.lineTo(-18, 2);
    ctx.lineTo(-4, 14);
    ctx.moveTo(5, -18);
    ctx.lineTo(20, -5);
    ctx.lineTo(9, 0);
    ctx.lineTo(24, 13);
    ctx.stroke();
    ctx.strokeStyle = "rgba(230,247,255,0.75)";
    ctx.lineWidth = 2;
    for (let i = 0; i < 3; i += 1) {
      ctx.beginPath();
      ctx.arc(0, 0, 12 + i * 8, -1.1, 1.1);
      ctx.stroke();
    }
    ctx.fillStyle = "#ffe66d";
    ctx.beginPath();
    ctx.arc(0, 0, 7, 0, TAU);
    ctx.fill();
    ctx.fillStyle = "#eaffff";
    ctx.beginPath();
    ctx.arc(0, 0, 3, 0, TAU);
    ctx.fill();
  } else if (tank.tankKey === "gamma") {
    ctx.strokeStyle = GAMMA_BLUE;
    ctx.lineWidth = 3;
    for (let i = 0; i < 3; i += 1) {
      ctx.beginPath();
      ctx.arc(-7, 0, 12 + i * 8, -0.72, 0.72);
      ctx.stroke();
    }
    ctx.fillStyle = GAMMA_BLUE_WHITE;
    ctx.beginPath();
    ctx.arc(-7, 0, 4, 0, TAU);
    ctx.fill();
    ctx.strokeStyle = "rgba(230,247,255,0.7)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(-7, 0, 33, -0.72, 0.72);
    ctx.stroke();
  } else if (tank.tankKey === "railgun" || name.includes("Rail") || name.includes("Volt")) {
    ctx.fillStyle = "#88f7ff";
    roundRect(-22, -23, 44, 5, 3);
    ctx.fill();
    roundRect(-22, 18, 44, 5, 3);
    ctx.fill();
    ctx.strokeStyle = "rgba(234, 255, 255, 0.85)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, 12, 0, TAU);
    ctx.stroke();
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 2;
    for (let x = -14; x <= 14; x += 7) {
      ctx.beginPath();
      ctx.moveTo(x, -15);
      ctx.lineTo(x + 6, 15);
      ctx.stroke();
    }
  } else if (tank.tankKey === "shotgun" || name.includes("Shotgun") || name.includes("Buckshot") || name.includes("Slugstorm") || name.includes("Sweeper")) {
    ctx.fillStyle = "rgba(255, 159, 90, 0.52)";
    ctx.beginPath();
    ctx.moveTo(-22, -16);
    ctx.lineTo(18, -16);
    ctx.lineTo(28, 0);
    ctx.lineTo(18, 16);
    ctx.lineTo(-22, 16);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#ffd36d";
    ctx.beginPath();
    ctx.arc(-8, 0, 5, 0, TAU);
    ctx.arc(8, -8, 4, 0, TAU);
    ctx.arc(10, 9, 4, 0, TAU);
    ctx.fill();
  } else if (name.includes("Vampire")) {
    ctx.fillStyle = "#ff6f9f";
    ctx.beginPath();
    ctx.arc(-8, 0, 5, 0, TAU);
    ctx.arc(8, 0, 5, 0, TAU);
    ctx.fill();
    ctx.strokeStyle = "#5f001c";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-5, 11);
    ctx.lineTo(0, 17);
    ctx.lineTo(5, 11);
    ctx.stroke();
  } else if (name.includes("Juggernaut")) {
    ctx.fillStyle = "rgba(240, 211, 122, 0.75)";
    ctx.fillRect(-27, -16, 5, 32);
    ctx.fillRect(22, -16, 5, 32);
    ctx.fillRect(-16, -25, 32, 5);
    ctx.fillRect(-16, 20, 32, 5);
  } else if (name.includes("Sprinter")) {
    ctx.fillStyle = "#55d6ff";
    ctx.beginPath();
    ctx.moveTo(-24, -18);
    ctx.lineTo(-40, -28);
    ctx.lineTo(-18, -6);
    ctx.closePath();
    ctx.moveTo(-24, 18);
    ctx.lineTo(-40, 28);
    ctx.lineTo(-18, 6);
    ctx.closePath();
    ctx.fill();
  } else if (name.includes("Scholar")) {
    ctx.fillStyle = "#c5ff6f";
    ctx.fillRect(-14, -18, 28, 5);
    ctx.fillRect(-14, 13, 28, 5);
    ctx.fillStyle = "#d7d3ec";
    ctx.fillRect(-10, -12, 20, 24);
  } else if (name.includes("Piercer")) {
    ctx.strokeStyle = "#8cffb2";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-20, -18);
    ctx.lineTo(20, 18);
    ctx.moveTo(-20, 18);
    ctx.lineTo(20, -18);
    ctx.stroke();
  } else if (name.includes("Boss Hunter")) {
    ctx.strokeStyle = "#ff5959";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, 17, 0, TAU);
    ctx.moveTo(-22, 0);
    ctx.lineTo(22, 0);
    ctx.moveTo(0, -22);
    ctx.lineTo(0, 22);
    ctx.stroke();
  } else if (name.includes("Medic")) {
    ctx.fillStyle = "#77ff9b";
    ctx.fillRect(-5, -17, 10, 34);
    ctx.fillRect(-17, -5, 34, 10);
  } else if (name.includes("Commander")) {
    ctx.strokeStyle = "#ffeb73";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-2, -16);
    ctx.lineTo(-14, -34);
    ctx.moveTo(2, -16);
    ctx.lineTo(14, -34);
    ctx.stroke();
    ctx.fillStyle = "#ffeb73";
    ctx.beginPath();
    ctx.arc(-14, -34, 4, 0, TAU);
    ctx.arc(14, -34, 4, 0, TAU);
    ctx.fill();
  } else if (name.includes("Sharpshooter")) {
    ctx.strokeStyle = "#9adfff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 14, 0, TAU);
    ctx.moveTo(-18, 0);
    ctx.lineTo(18, 0);
    ctx.moveTo(0, -18);
    ctx.lineTo(0, 18);
    ctx.stroke();
  } else if (name.includes("Shield")) {
    ctx.strokeStyle = "#a7c7ff";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(0, 0, 27, -Math.PI * 0.85, Math.PI * 0.85);
    ctx.stroke();
  }

  if (name.includes("Twin") || name.includes("Tri-Cannon") || name.includes("Quad") || name.includes("Cyclone")) {
    ctx.fillStyle = accentColor;
    const stripes = name.includes("Cyclone") ? 4 : name.includes("Quad") ? 4 : name.includes("Tri") ? 3 : 2;
    for (let i = 0; i < stripes; i += 1) {
      const x = -15 + i * 10;
      ctx.fillRect(x, -22, 5, 44);
    }
  } else if (name.includes("Rail")) {
    ctx.strokeStyle = "#8ed2ff";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-18, -12);
    ctx.lineTo(18, -12);
    ctx.moveTo(-18, 12);
    ctx.lineTo(18, 12);
    ctx.stroke();
    ctx.fillStyle = "#8ed2ff";
    ctx.fillRect(-4, -4, 8, 8);
  } else if (name.includes("Fan") || name.includes("Scatter")) {
    ctx.fillStyle = "#7fc7ff";
    ctx.beginPath();
    ctx.moveTo(0, -19);
    ctx.lineTo(22, -6);
    ctx.lineTo(0, 0);
    ctx.lineTo(22, 6);
    ctx.lineTo(0, 19);
    ctx.closePath();
    ctx.fill();
  } else if (name.includes("Siege") || name.includes("Breaker") || name.includes("Bulwark")) {
    ctx.fillStyle = "rgba(255, 211, 109, 0.7)";
    ctx.fillRect(-24, -20, 48, 6);
    ctx.fillRect(-24, 14, 48, 6);
    ctx.fillRect(-24, -20, 6, 40);
    ctx.fillRect(18, -20, 6, 40);
  } else if (name.includes("Firework")) {
    ctx.fillStyle = "#ffcf5f";
    for (let i = 0; i < 6; i += 1) {
      const a = (i / 6) * TAU;
      ctx.beginPath();
      ctx.arc(Math.cos(a) * 14, Math.sin(a) * 14, 3, 0, TAU);
      ctx.fill();
    }
  } else if (name.includes("Blue Flame") || name.includes("Halo")) {
    ctx.strokeStyle = "#56cfff";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, 20, -0.95, 0.95);
    ctx.stroke();
  } else if (name.includes("Cinder") || name.includes("Meteor") || name.includes("Inferno")) {
    ctx.fillStyle = "#ff7b38";
    ctx.beginPath();
    ctx.moveTo(-12, 16);
    ctx.lineTo(-4, -16);
    ctx.lineTo(4, 10);
    ctx.lineTo(12, -14);
    ctx.lineTo(16, 16);
    ctx.closePath();
    ctx.fill();
  } else if (name.includes("Torch") || name.includes("Lancer")) {
    ctx.fillStyle = "#ffd15c";
    ctx.fillRect(-4, -22, 8, 44);
  } else if (name.includes("Gamma") || name.includes("Wideband") || name.includes("Snapback") || name.includes("Signal") || name.includes("Nova") || name.includes("Thunder")) {
    ctx.strokeStyle = GAMMA_BLUE;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 17, -0.8, 0.8);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, 24, -0.8, 0.8);
    ctx.stroke();
    ctx.fillStyle = GAMMA_BLUE;
    ctx.beginPath();
    ctx.arc(0, 0, 4, 0, TAU);
    ctx.fill();
  }

  if (perks.xpMult && !name.includes("Scholar")) {
    ctx.fillStyle = accentColor;
    ctx.fillRect(-4, -4, 8, 8);
  }
}

function drawTankWeapon(tank, color, isPlayer = false) {
  const mods = tank.mods || {};
  const name = tank.buildName || "";
  const tankKey = tank.tankKey || (isPlayer ? player.tankKey : "default");
  ctx.fillStyle = color;

  if (tankKey === "airstrike") {
    roundRect(2, -8, 42, 16, 6);
    ctx.fill();
    ctx.fillStyle = "#ffcf5f";
    ctx.beginPath();
    ctx.arc(48, 0, 7, 0, TAU);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,207,95,0.75)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 34, -0.9, 0.9);
    ctx.stroke();
    return;
  }

  if (tankKey === "helicopter") {
    ctx.fillStyle = "rgba(242,202,82,0.82)";
    roundRect(8, -4, 52, 8, 4);
    ctx.fill();
    ctx.fillStyle = "#f2ca52";
    ctx.beginPath();
    ctx.arc(63, 0, 4, 0, TAU);
    ctx.fill();
    return;
  }

  if (tankKey === "antiAir") {
    ctx.fillStyle = "#ff5959";
    roundRect(6, -13, 48, 9, 4);
    roundRect(6, 4, 48, 9, 4);
    ctx.fill();
    return;
  }

  if (mods.omniFire) {
    for (let i = 0; i < 16; i += 1) {
      ctx.save();
      ctx.rotate((i / 16) * TAU);
      roundRect(12, -3, 28, 6, 3);
      ctx.fill();
      ctx.restore();
    }
    ctx.strokeStyle = "rgba(255, 79, 216, 0.75)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, 31, 0, TAU);
    ctx.stroke();
    return;
  }

  if (tankKey === "flame") {
    const length = name.includes("Lancer") ? 62 : name.includes("Halo") || name.includes("Inferno") || name.includes("Blue") ? 48 : 42;
    const width = name.includes("Halo") || name.includes("Inferno") || name.includes("Blue") ? 18 : 12;
    roundRect(8, -width / 2, length, width, 6);
    ctx.fill();
    ctx.fillStyle = name.includes("Blue") || name.includes("Halo") ? "#56cfff" : "#ff8e33";
    ctx.beginPath();
    ctx.arc(12 + length, 0, width * 0.42, 0, TAU);
    ctx.fill();
    return;
  }

  if (tankKey === "gamma") {
    roundRect(8, -5, 32, 10, 5);
    ctx.fill();
    ctx.fillStyle = GAMMA_BLUE_WHITE;
    ctx.beginPath();
    ctx.arc(44, 0, 4, 0, TAU);
    ctx.fill();
    ctx.strokeStyle = GAMMA_BLUE;
    ctx.lineWidth = 3;
    const arcs = Math.min(5, 2 + (mods.gammaArcs || 1));
    for (let i = 0; i < arcs; i += 1) {
      ctx.beginPath();
      ctx.arc(44, 0, 14 + i * 7, -0.78, 0.78);
      ctx.stroke();
    }
    ctx.strokeStyle = "rgba(230,247,255,0.45)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(44, 0, 50, -0.78, 0.78);
    ctx.stroke();
    return;
  }

  if (tankKey === "tazer") {
    ctx.fillStyle = "#182235";
    roundRect(6, -9, 42, 18, 5);
    ctx.fill();
    ctx.fillStyle = color;
    roundRect(10, -5, 34, 10, 4);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,230,109,0.35)";
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(38, -12);
    ctx.lineTo(66, -24);
    ctx.moveTo(38, 12);
    ctx.lineTo(66, 24);
    ctx.stroke();
    ctx.strokeStyle = "#ffe66d";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(40, -10);
    ctx.lineTo(66, -22);
    ctx.lineTo(74, -16);
    ctx.moveTo(40, 10);
    ctx.lineTo(66, 22);
    ctx.lineTo(74, 16);
    ctx.stroke();
    ctx.strokeStyle = "#eaffff";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(47, -3);
    ctx.lineTo(62, 0);
    ctx.lineTo(47, 3);
    ctx.stroke();
    ctx.fillStyle = "#ffe66d";
    ctx.beginPath();
    ctx.arc(75, -16, 4, 0, TAU);
    ctx.arc(75, 16, 4, 0, TAU);
    ctx.fill();
    return;
  }

  if (tankKey === "railgun") {
    const beams = Math.min(8, Math.max(1, Math.round(mods.beamCount || 1)));
    for (let i = 0; i < beams; i += 1) {
      const offset = (i - (beams - 1) / 2) * 6;
      roundRect(6, offset - 4, 62, 8, 4);
      ctx.fill();
      ctx.fillStyle = "rgba(234, 255, 255, 0.75)";
      ctx.fillRect(17, offset - 1, 46, 2);
      ctx.fillStyle = color;
    }
    ctx.fillStyle = "#88f7ff";
    ctx.beginPath();
    ctx.arc(70, 0, 5, 0, TAU);
    ctx.fill();
    return;
  }

  if (tankKey === "shotgun") {
    const barrels = Math.min(7, mods.pelletCount || 7);
    for (let i = 0; i < barrels; i += 1) {
      const t = barrels === 1 ? 0.5 : i / (barrels - 1);
      ctx.save();
      ctx.rotate((t - 0.5) * 0.72);
      roundRect(8, -5, 42, 10, 5);
      ctx.fill();
      ctx.restore();
    }
    ctx.fillStyle = "#ffbd7a";
    ctx.beginPath();
    ctx.arc(49, 0, 5, 0, TAU);
    ctx.fill();
    return;
  }

  if (mods.fireworkFragments) {
    roundRect(8, -9, 44, 18, 8);
    ctx.fill();
    ctx.fillStyle = "#ffcf5f";
    ctx.beginPath();
    ctx.arc(54, 0, 7, 0, TAU);
    ctx.fill();
    return;
  }

  if (name.includes("Siege") || name.includes("Breaker") || name.includes("Bulwark")) {
    roundRect(8, -10, 54, 20, 6);
    ctx.fill();
    ctx.fillStyle = "rgba(0, 0, 0, 0.22)";
    ctx.fillRect(44, -7, 12, 14);
    return;
  }

  if (name.includes("Fan") || name.includes("Scatter")) {
    const barrels = Math.min(7, mods.bulletCount || 5);
    for (let i = 0; i < barrels; i += 1) {
      const t = barrels === 1 ? 0.5 : i / (barrels - 1);
      ctx.save();
      ctx.rotate((t - 0.5) * 0.9);
      roundRect(9, -3, 36, 6, 3);
      ctx.fill();
      ctx.restore();
    }
    return;
  }

  if (name.includes("Needle") || name.includes("Longshot")) {
    roundRect(8, -4, 64, 8, 4);
    ctx.fill();
    ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
    ctx.fillRect(52, -2, 15, 4);
    return;
  }

  const barrels = Math.min(6, mods.bulletCount || 1);
  for (let i = 0; i < barrels; i += 1) {
    const offset = (i - (barrels - 1) / 2) * 7;
    roundRect(10, offset - 3, name.includes("Auto") || name.includes("Cyclone") ? 32 : 40, 6, 3);
    ctx.fill();
  }
}

function drawEnemy(enemy) {
  const isAlly = enemy.team === "ally";
  const labels = enemies.length < 55;
  if (enemy.babyDragon || enemy.adultDragon || enemy.blackDragon) {
    ctx.save();
    ctx.translate(enemy.x, enemy.y);
    ctx.rotate(enemy.angle);
    const flap = Math.sin(performance.now() * (enemy.babyDragon ? 0.018 : 0.012) + enemy.id) * 0.35;
    const scale = enemy.babyDragon ? 0.68 : enemy.blackDragon ? 1.35 : 1;
    const body = enemy.r * 0.9;
    const wing = enemy.r * (enemy.babyDragon ? 1.25 : 1.55);
    ctx.fillStyle = "rgba(0,0,0,0.22)";
    ctx.beginPath();
    ctx.ellipse(0, enemy.r * 0.52, enemy.r + 8, enemy.r * 0.22, 0, 0, TAU);
    ctx.fill();
    ctx.fillStyle = enemy.blackDragon ? "rgba(125,77,255,0.62)" : "rgba(255,141,69,0.72)";
    ctx.beginPath();
    ctx.moveTo(-body * 0.15, -body * 0.35);
    ctx.lineTo(-wing * 0.85, -wing * (0.95 + flap));
    ctx.lineTo(-wing * 0.25, -body * 0.1);
    ctx.lineTo(-wing * 0.55, body * 0.16);
    ctx.lineTo(-body * 0.05, body * 0.28);
    ctx.moveTo(-body * 0.15, body * 0.35);
    ctx.lineTo(-wing * 0.85, wing * (0.95 + flap));
    ctx.lineTo(-wing * 0.25, body * 0.1);
    ctx.lineTo(-wing * 0.55, -body * 0.16);
    ctx.lineTo(-body * 0.05, -body * 0.28);
    ctx.fill();
    ctx.fillStyle = enemy.blackDragon ? "#17131f" : enemy.adultDragon ? "#43614b" : "#5e7750";
    ctx.beginPath();
    ctx.ellipse(0, 0, body * 1.08, body * 0.62, 0, 0, TAU);
    ctx.fill();
    ctx.strokeStyle = enemy.blackDragon ? "#17131f" : enemy.adultDragon ? "#43614b" : "#5e7750";
    ctx.lineWidth = Math.max(4, enemy.r * 0.22 * scale);
    ctx.beginPath();
    ctx.moveTo(-body * 0.95, 0);
    ctx.quadraticCurveTo(-body * 1.7, -body * 0.18, -body * 2.15, body * 0.1);
    ctx.stroke();
    ctx.fillStyle = enemy.blackDragon ? "#17131f" : enemy.adultDragon ? "#43614b" : "#5e7750";
    ctx.beginPath();
    ctx.ellipse(body * 0.98, 0, body * 0.55, body * 0.3, 0, 0, TAU);
    ctx.fill();
    ctx.fillStyle = enemy.blackDragon ? "#7d4dff" : enemy.adultDragon ? "#ff6f35" : "#ff8d45";
    ctx.beginPath();
    ctx.moveTo(body * 1.42, 0);
    ctx.lineTo(body * 1.95, -body * 0.22);
    ctx.lineTo(body * 1.95, body * 0.22);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = enemy.blackDragon ? "#a98dff" : "#ffd0a1";
    ctx.lineWidth = Math.max(2, enemy.r * 0.08);
    ctx.beginPath();
    ctx.moveTo(body * 0.94, -body * 0.25);
    ctx.lineTo(body * 0.78, -body * 0.62);
    ctx.moveTo(body * 1.14, -body * 0.22);
    ctx.lineTo(body * 1.05, -body * 0.58);
    ctx.moveTo(-body * 0.2, body * 0.5);
    ctx.lineTo(-body * 0.42, body * 0.86);
    ctx.moveTo(body * 0.34, body * 0.48);
    ctx.lineTo(body * 0.18, body * 0.84);
    ctx.stroke();
    if (enemy.blackDragon) {
      ctx.strokeStyle = "rgba(125,77,255,0.8)";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(body * 1.9, 0);
      ctx.lineTo(body * 2.9, 0);
      ctx.stroke();
    }
    ctx.restore();
    if (labels) {
      ctx.fillStyle = "#f5f4eb";
      ctx.font = `${enemy.babyDragon ? 10 : 12}px system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText(enemy.blackDragon ? "Black Dragon" : enemy.adultDragon ? "Dragon" : "Baby", enemy.x, enemy.y - enemy.r - 12);
      ctx.textAlign = "start";
    }
    return;
  }
  if (enemy.infantry) {
    if (enemy.puncher) {
      drawTank(enemy, enemy.color, enemy.accent);
      if (labels) {
        ctx.fillStyle = "#f5f4eb";
        ctx.font = "11px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(`Punch Lv ${enemy.level}`, enemy.x, enemy.y - 24);
        ctx.textAlign = "start";
      }
      return;
    }
    if (enemy.medicTrooper || enemy.bomberTrooper || enemy.shielderTrooper) {
      ctx.save();
      ctx.translate(enemy.x, enemy.y);
      ctx.rotate(enemy.angle);
      ctx.fillStyle = "rgba(0,0,0,0.24)";
      ctx.beginPath();
      ctx.ellipse(0, 9, enemy.r + 5, 5, 0, 0, TAU);
      ctx.fill();
      ctx.fillStyle = enemy.color;
      ctx.beginPath();
      ctx.arc(0, 0, enemy.r, 0, TAU);
      ctx.fill();
      ctx.fillStyle = enemy.accent;
      ctx.beginPath();
      ctx.arc(4, 0, enemy.r * 0.58, 0, TAU);
      ctx.fill();
      if (enemy.medicTrooper) {
        ctx.fillStyle = "#eaffd8";
        ctx.fillRect(16, -3, 18, 6);
        ctx.fillRect(22, -9, 6, 18);
        if (enemy.healRing > 0) {
          ctx.strokeStyle = `rgba(128,255,157,${enemy.healRing / 0.35})`;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(0, 0, 28 + (1 - enemy.healRing / 0.35) * 18, 0, TAU);
          ctx.stroke();
        }
      } else if (enemy.bomberTrooper) {
        ctx.fillStyle = "#2b241d";
        ctx.beginPath();
        ctx.arc(22, 0, 8, 0, TAU);
        ctx.fill();
        ctx.strokeStyle = "#ffcf5f";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(27, -7, 5, Math.PI, TAU);
        ctx.stroke();
      } else {
        ctx.fillStyle = "rgba(167,199,255,0.86)";
        ctx.beginPath();
        ctx.moveTo(14, -15);
        ctx.lineTo(34, -9);
        ctx.lineTo(34, 9);
        ctx.lineTo(14, 15);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
      if (labels) {
        ctx.fillStyle = "#f5f4eb";
        ctx.font = "11px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(`${enemy.medicTrooper ? "Medic" : enemy.bomberTrooper ? "Bomb" : "Shield"} Lv ${enemy.level}`, enemy.x, enemy.y - 22);
        ctx.textAlign = "start";
      }
      return;
    }
    if (enemy.akTrooper) {
      ctx.save();
      ctx.translate(enemy.x, enemy.y);
      ctx.rotate(enemy.angle);
      ctx.fillStyle = "rgba(0,0,0,0.24)";
      ctx.beginPath();
      ctx.ellipse(0, 9, enemy.r + 5, 5, 0, 0, TAU);
      ctx.fill();
      ctx.fillStyle = enemy.color;
      ctx.beginPath();
      ctx.arc(0, 0, enemy.r, 0, TAU);
      ctx.fill();
      ctx.fillStyle = enemy.accent;
      ctx.beginPath();
      ctx.arc(4, 0, enemy.r * 0.58, 0, TAU);
      ctx.fill();
      ctx.fillStyle = "#d8c06c";
      roundRect(3, -3, 30, 6, 3);
      ctx.fill();
      ctx.fillStyle = "#1e211c";
      ctx.fillRect(15, 3, 8, 5);
      ctx.restore();
      if (labels) {
        ctx.fillStyle = "#f5f4eb";
        ctx.font = "11px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(`AK Lv ${enemy.level}`, enemy.x, enemy.y - 22);
        ctx.textAlign = "start";
      }
      return;
    }
    ctx.save();
    ctx.translate(enemy.x, enemy.y);
    ctx.rotate(enemy.angle);
    ctx.fillStyle = "#524c3e";
    ctx.beginPath();
    ctx.arc(0, 0, enemy.r, 0, TAU);
    ctx.fill();
    ctx.fillStyle = "#7b735e";
    ctx.beginPath();
    ctx.arc(-2, 0, enemy.r * 0.72, 0, TAU);
    ctx.fill();
    ctx.fillStyle = "#ffcf5f";
    roundRect(2, -3, 24, 6, 3);
    ctx.fill();
    ctx.fillStyle = "#2c2b28";
    ctx.beginPath();
    ctx.arc(13, 0, 3, 0, TAU);
    ctx.fill();
    ctx.restore();
    if (labels) {
      ctx.fillStyle = "#f5f4eb";
      ctx.font = "11px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`RPG Lv ${enemy.level}`, enemy.x, enemy.y - 22);
      ctx.textAlign = "start";
    }
    return;
  }
  drawTank(enemy, isAlly ? "#4ba96c" : enemy.color, isAlly ? "#9df29e" : enemy.accent);
  if (labels || enemy.boss) {
    ctx.fillStyle = "#f5f4eb";
    ctx.font = "12px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`${enemy.boss ? "BOSS " : isAlly ? "Ally " : ""}Lv ${enemy.level}`, enemy.x, enemy.y - 50);
    ctx.textAlign = "start";
  }
  if (enemy.burn > 0) {
    ctx.strokeStyle = "rgba(255,125,45,0.7)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(enemy.x, enemy.y, enemy.r + 5 + Math.sin(performance.now() * 0.012) * 2, 0, TAU);
    ctx.stroke();
  }
  if ((enemy.juggernautJudgment || 0) > 0) {
    ctx.strokeStyle = "rgba(240,211,122,0.82)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(enemy.x, enemy.y, enemy.r + 10 + Math.sin(performance.now() * 0.014) * 2, 0, TAU);
    ctx.stroke();
  }
}

function drawBullet(b) {
  if (b.kind === "beam" || b.kind === "allyBeam") {
    drawBeam(b);
    return;
  }
  if (b.kind === "airstrike") {
    ctx.save();
    ctx.fillStyle = "rgba(255,207,95,0.18)";
    ctx.beginPath();
    ctx.arc(b.targetX, b.targetY, 26 + Math.sin(performance.now() * 0.012) * 4, 0, TAU);
    ctx.fill();
    ctx.strokeStyle = "#ffcf5f";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(b.targetX - 34, b.targetY);
    ctx.lineTo(b.targetX + 34, b.targetY);
    ctx.moveTo(b.targetX, b.targetY - 34);
    ctx.lineTo(b.targetX, b.targetY + 34);
    ctx.stroke();
    ctx.translate(b.x, b.y);
    ctx.rotate(Math.PI / 2);
    ctx.fillStyle = b.color;
    roundRect(-14, -6, 28, 12, 6);
    ctx.fill();
    ctx.restore();
    return;
  }
  ctx.fillStyle = b.color;
  ctx.beginPath();
  ctx.arc(b.x, b.y, b.r, 0, TAU);
  ctx.fill();
  if (b.kind === "gamma" || b.kind === "allyGamma") {
    ctx.strokeStyle = "rgba(77,184,255,0.38)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r + 7, -Math.PI * 0.8, Math.PI * 0.8);
    ctx.stroke();
  }
}

function drawEnemyBullet(b) {
  if (b.kind === "enemyBeam") {
    drawBeam(b);
    return;
  }
  if (b.kind === "enemyMissile") {
    ctx.save();
    ctx.translate(b.x, b.y);
    ctx.rotate(b.angle || Math.atan2(b.vy, b.vx));
    ctx.fillStyle = b.color || "#ff5959";
    roundRect(-9, -4, 20, 8, 4);
    ctx.fill();
    ctx.fillStyle = "#ffcf5f";
    ctx.beginPath();
    ctx.moveTo(-11, 0);
    ctx.lineTo(-18, -5);
    ctx.lineTo(-18, 5);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    return;
  }
  ctx.fillStyle = b.color || "#ece6cc";
  ctx.beginPath();
  ctx.arc(b.x, b.y, b.r, 0, TAU);
  ctx.fill();
  if (b.kind === "enemyGamma") {
    ctx.strokeStyle = "rgba(77,184,255,0.38)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r + 7, -Math.PI * 0.8, Math.PI * 0.8);
    ctx.stroke();
  }
}

function drawBeam(b) {
  const alpha = clamp(1 - b.age / b.life, 0, 1);
  const endX = b.x + Math.cos(b.angle) * b.range;
  const endY = b.y + Math.sin(b.angle) * b.range;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = "rgba(136, 247, 255, 0.22)";
  ctx.lineWidth = b.r * 3.2;
  ctx.beginPath();
  ctx.moveTo(b.x, b.y);
  ctx.lineTo(endX, endY);
  ctx.stroke();
  ctx.strokeStyle = b.color || "#88f7ff";
  ctx.lineWidth = b.r;
  ctx.beginPath();
  ctx.moveTo(b.x, b.y);
  ctx.lineTo(endX, endY);
  ctx.stroke();
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = Math.max(2, b.r * 0.28);
  ctx.beginPath();
  ctx.moveTo(b.x, b.y);
  ctx.lineTo(endX, endY);
  ctx.stroke();
  ctx.restore();
}

function drawLightning(bolt) {
  const alpha = clamp(bolt.life / bolt.max, 0, 1);
  const large = Boolean(bolt.large);
  const segments = large ? 9 : 5;
  const jitter = large ? 42 : 18;
  const color = bolt.color || "#88f7ff";
  const glowColor = bolt.glowColor || "rgba(77,184,255,0.34)";
  const glowFade = bolt.glowFade || "rgba(77,184,255,0)";
  const width = bolt.width || (large ? 10 : 3);
  const strikeRadius = (bolt.burst || 38) * (1 - alpha * 0.15);
  ctx.save();
  ctx.globalAlpha = alpha;
  if (large) {
    const grad = ctx.createRadialGradient(bolt.x2, bolt.y2, 0, bolt.x2, bolt.y2, strikeRadius * 1.9);
    grad.addColorStop(0, "rgba(255,255,255,0.72)");
    grad.addColorStop(0.28, glowColor);
    grad.addColorStop(1, glowFade);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(bolt.x2, bolt.y2, strikeRadius * 1.9, 0, TAU);
    ctx.fill();

    ctx.strokeStyle = `rgba(234,255,255,${0.45 * alpha})`;
    ctx.lineWidth = width + 10;
    ctx.beginPath();
    ctx.moveTo(bolt.x1, bolt.y1);
    for (let i = 1; i < segments; i += 1) {
      const t = i / segments;
      const x = bolt.x1 + (bolt.x2 - bolt.x1) * t + (Math.random() - 0.5) * jitter;
      const y = bolt.y1 + (bolt.y2 - bolt.y1) * t + (Math.random() - 0.5) * jitter;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(bolt.x2, bolt.y2);
    ctx.stroke();
  }

  ctx.strokeStyle = large ? color : "rgba(136, 247, 255, 0.9)";
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(bolt.x1, bolt.y1);
  for (let i = 1; i < segments; i += 1) {
    const t = i / segments;
    const x = bolt.x1 + (bolt.x2 - bolt.x1) * t + (Math.random() - 0.5) * jitter;
    const y = bolt.y1 + (bolt.y2 - bolt.y1) * t + (Math.random() - 0.5) * jitter;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(bolt.x2, bolt.y2);
  ctx.stroke();
  if (large) {
    for (let fork = 0; fork < 3; fork += 1) {
      const forkAngle = Math.atan2(bolt.y2 - bolt.y1, bolt.x2 - bolt.x1) + (fork - 1) * 0.7 + (Math.random() - 0.5) * 0.35;
      const forkLength = strikeRadius * (0.75 + Math.random() * 0.45);
      ctx.strokeStyle = `rgba(234,255,255,${0.7 * alpha})`;
      ctx.lineWidth = Math.max(2, width * 0.32);
      ctx.beginPath();
      ctx.moveTo(bolt.x2, bolt.y2);
      ctx.lineTo(bolt.x2 - Math.cos(forkAngle) * forkLength, bolt.y2 - Math.sin(forkAngle) * forkLength);
      ctx.stroke();
    }
    ctx.strokeStyle = `rgba(255,255,255,${0.85 * alpha})`;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(bolt.x2, bolt.y2, strikeRadius, 0, TAU);
    ctx.stroke();
  }
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = large ? 3 : 1;
  ctx.stroke();
  ctx.restore();
}

function lightningOnScreen(bolt) {
  const pad = (bolt.burst || 40) + (bolt.width || 8) + 90;
  return onScreen({ x: bolt.x1, y: bolt.y1 }, pad) || onScreen({ x: bolt.x2, y: bolt.y2 }, pad);
}

function drawNuke(nuke) {
  const t = 1 - nuke.life / nuke.max;
  const alpha = clamp(nuke.life / nuke.max, 0, 1);
  const eased = 1 - (1 - t) * (1 - t);
  const radius = nuke.radius * (0.16 + eased * 1.08);
  const core = nuke.radius * (0.1 + Math.sin(t * Math.PI) * 0.28);
  ctx.save();
  ctx.globalAlpha = alpha;
  const grad = ctx.createRadialGradient(nuke.x, nuke.y, 0, nuke.x, nuke.y, radius);
  grad.addColorStop(0, "rgba(255,255,245,1)");
  grad.addColorStop(0.12, "rgba(255,239,150,0.86)");
  grad.addColorStop(0.36, "rgba(255,97,86,0.55)");
  grad.addColorStop(0.62, "rgba(255,79,216,0.28)");
  grad.addColorStop(1, "rgba(255,79,216,0)");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(nuke.x, nuke.y, radius, 0, TAU);
  ctx.fill();

  ctx.globalAlpha = 0.85 * alpha;
  ctx.strokeStyle = "#fff7d6";
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(nuke.x, nuke.y, radius, 0, TAU);
  ctx.stroke();

  ctx.strokeStyle = `rgba(255,79,216,${0.75 * alpha})`;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(nuke.x, nuke.y, radius * 0.73, 0, TAU);
  ctx.stroke();

  ctx.strokeStyle = `rgba(255,207,95,${0.7 * alpha})`;
  ctx.lineWidth = 3;
  for (let i = 0; i < 16; i += 1) {
    const angle = nuke.spin + (i / 16) * TAU + t * 0.7;
    const inner = radius * (0.2 + (i % 2) * 0.08);
    const outer = radius * (0.78 + (i % 3) * 0.08);
    ctx.beginPath();
    ctx.moveTo(nuke.x + Math.cos(angle) * inner, nuke.y + Math.sin(angle) * inner);
    ctx.lineTo(nuke.x + Math.cos(angle) * outer, nuke.y + Math.sin(angle) * outer);
    ctx.stroke();
  }

  ctx.strokeStyle = `rgba(255,245,214,${0.9 * alpha})`;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(nuke.x, nuke.y, radius * (0.42 + t * 0.52), 0, TAU);
  ctx.stroke();

  ctx.globalAlpha = Math.sin(t * Math.PI) * 0.95;
  ctx.fillStyle = "rgba(255,255,245,0.85)";
  ctx.beginPath();
  ctx.arc(nuke.x, nuke.y, core * 1.25, 0, TAU);
  ctx.fill();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = `rgba(255,255,245,${0.75 * alpha})`;
  ctx.beginPath();
  ctx.arc(nuke.x, nuke.y, core, 0, TAU);
  ctx.fill();
  ctx.restore();
}

function drawFlame(f) {
  const alpha = clamp(f.life / 0.09, 0, 1);
  const start = f.angle - f.width;
  const end = f.angle + f.width;
  const grad = ctx.createRadialGradient(f.x, f.y, 12, f.x, f.y, f.reach);
  if (f.color === "#56cfff") {
    grad.addColorStop(0, `rgba(220,250,255,${0.78 * alpha})`);
    grad.addColorStop(0.45, `rgba(86,207,255,${0.56 * alpha})`);
    grad.addColorStop(1, "rgba(30,90,255,0)");
  } else if (f.color === "#9df29e") {
    grad.addColorStop(0, `rgba(230,255,210,${0.66 * alpha})`);
    grad.addColorStop(0.45, `rgba(80,230,120,${0.42 * alpha})`);
    grad.addColorStop(1, "rgba(80,230,120,0)");
  } else {
    grad.addColorStop(0, `rgba(255,245,140,${0.72 * alpha})`);
    grad.addColorStop(0.45, `rgba(255,125,45,${0.48 * alpha})`);
    grad.addColorStop(1, "rgba(255,55,20,0)");
  }
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(f.x, f.y);
  ctx.arc(f.x, f.y, f.reach, start, end);
  ctx.closePath();
  ctx.fill();
}

function drawSpark(s) {
  ctx.globalAlpha = clamp(s.life / s.max, 0, 1);
  ctx.fillStyle = s.color;
  ctx.beginPath();
  ctx.arc(s.x, s.y, 3, 0, TAU);
  ctx.fill();
  ctx.globalAlpha = 1;
}

function drawTazerCannonTrap(trap) {
  const target = enemies.find((enemy) => enemy.id === trap.targetId) || trap;
  const pct = clamp(trap.life / trap.max, 0, 1);
  const pulse = 1 + Math.sin(performance.now() * 0.012) * 0.08;
  ctx.save();
  ctx.globalAlpha = 0.22 + pct * 0.28;
  ctx.strokeStyle = "#fff06d";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(target.x, target.y, TAZER_CANNON_RADIUS * pulse, 0, TAU);
  ctx.stroke();
  ctx.globalAlpha = 1;

  for (let i = 0; i < TAZER_CANNON_COUNT; i += 1) {
    const angle = trap.spin + (i / TAZER_CANNON_COUNT) * TAU;
    const cx = target.x + Math.cos(angle) * TAZER_CANNON_RADIUS;
    const cy = target.y + Math.sin(angle) * TAZER_CANNON_RADIUS;
    const aim = angleTo({ x: cx, y: cy }, target);
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(aim);
    ctx.fillStyle = "rgba(255,240,109,0.25)";
    ctx.beginPath();
    ctx.arc(0, 0, 18, 0, TAU);
    ctx.fill();
    ctx.fillStyle = "#172132";
    ctx.strokeStyle = "#fff06d";
    ctx.lineWidth = 2;
    roundRect(-13, -9, 26, 18, 5);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#fff06d";
    roundRect(7, -4, 21, 8, 4);
    ctx.fill();
    ctx.fillStyle = "#eaffff";
    ctx.beginPath();
    ctx.arc(-4, 0, 4, 0, TAU);
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();
}

function drawTazerCannonWave(wave) {
  const alpha = clamp(wave.life / wave.max, 0, 1);
  const radius = wave.radius || 0;
  ctx.save();
  (wave.rings || []).forEach((ring) => {
    const ringAlpha = clamp(ring.life / ring.max, 0, 1) * alpha;
    ctx.globalAlpha = ringAlpha;
    ctx.strokeStyle = "rgba(255,240,109,0.72)";
    ctx.lineWidth = 4 + ringAlpha * 8;
    ctx.beginPath();
    ctx.arc(wave.x, wave.y, ring.radius, 0, TAU);
    ctx.stroke();
    ctx.strokeStyle = "rgba(255,255,255,0.52)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(wave.x, wave.y, ring.radius + 7, 0, TAU);
    ctx.stroke();
  });
  ctx.globalAlpha = alpha;
  const grad = ctx.createRadialGradient(wave.x, wave.y, Math.max(1, radius - TAZER_CANNON_WAVE_WIDTH), wave.x, wave.y, radius + TAZER_CANNON_WAVE_WIDTH);
  grad.addColorStop(0, "rgba(255,240,109,0)");
  grad.addColorStop(0.45, "rgba(255,240,109,0.12)");
  grad.addColorStop(0.62, "rgba(234,255,255,0.78)");
  grad.addColorStop(1, "rgba(255,240,109,0)");
  ctx.strokeStyle = grad;
  ctx.lineWidth = TAZER_CANNON_WAVE_WIDTH;
  ctx.beginPath();
  ctx.arc(wave.x, wave.y, radius, 0, TAU);
  ctx.stroke();

  ctx.strokeStyle = `rgba(255,255,255,${0.85 * alpha})`;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(wave.x, wave.y, radius, 0, TAU);
  ctx.stroke();
  ctx.restore();
}

function drawJuggernautDomain() {
  const domain = activeJuggernautDomain();
  if (!domain) return;
  const activePct = clamp(domain.life / domain.max, 0, 1);
  const pulse = 1 + Math.sin(performance.now() * 0.006) * 0.025;
  ctx.save();
  const grad = ctx.createRadialGradient(domain.x, domain.y, 40, domain.x, domain.y, domain.r * pulse);
  grad.addColorStop(0, `rgba(240,211,122,${0.08 * activePct})`);
  grad.addColorStop(0.72, `rgba(255,159,95,${0.06 * activePct})`);
  grad.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(domain.x, domain.y, domain.r * pulse, 0, TAU);
  ctx.fill();
  ctx.strokeStyle = `rgba(240,211,122,${0.52 + activePct * 0.35})`;
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(domain.x, domain.y, domain.r * pulse, 0, TAU);
  ctx.stroke();
  ctx.strokeStyle = `rgba(255,255,255,${0.18 + activePct * 0.18})`;
  ctx.lineWidth = 2;
  for (let i = 0; i < 24; i += 1) {
    const angle = (i / 24) * TAU + performance.now() * 0.0003;
    const inner = domain.r * 0.82;
    const outer = domain.r * pulse;
    ctx.beginPath();
    ctx.moveTo(domain.x + Math.cos(angle) * inner, domain.y + Math.sin(angle) * inner);
    ctx.lineTo(domain.x + Math.cos(angle) * outer, domain.y + Math.sin(angle) * outer);
    ctx.stroke();
  }
  ctx.restore();
}

function drawJuggernautResolve() {
  const activePct = clamp((player.juggernautResolveActive || 0) / JUGGERNAUT_RESOLVE_DURATION, 0, 1);
  const pulse = 1 + Math.sin(performance.now() * 0.011) * 0.06;
  ctx.save();
  ctx.globalAlpha = 0.35 + activePct * 0.35;
  const radius = player.r + 36 * pulse;
  const grad = ctx.createRadialGradient(player.x, player.y, player.r, player.x, player.y, radius);
  grad.addColorStop(0, "rgba(255,229,138,0.08)");
  grad.addColorStop(0.6, "rgba(240,211,122,0.22)");
  grad.addColorStop(1, "rgba(255,159,95,0)");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(player.x, player.y, radius, 0, TAU);
  ctx.fill();
  ctx.strokeStyle = "#ffe58a";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.r + 20 * pulse, 0, TAU);
  ctx.stroke();
  ctx.restore();
}

function drawThunderGodBuff() {
  const activePct = clamp((player.thunderBuffActive || 0) / THUNDER_GOD_BUFF_DURATION, 0, 1);
  const pulse = 1 + Math.sin(performance.now() * 0.016) * 0.1;
  const radius = player.r + 34 * pulse;
  ctx.save();
  ctx.globalAlpha = 0.34 + activePct * 0.42;
  const grad = ctx.createRadialGradient(player.x, player.y, player.r, player.x, player.y, radius + 24);
  grad.addColorStop(0, "rgba(255,240,109,0.1)");
  grad.addColorStop(0.55, "rgba(141,245,255,0.24)");
  grad.addColorStop(1, "rgba(255,240,109,0)");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(player.x, player.y, radius + 24, 0, TAU);
  ctx.fill();
  ctx.strokeStyle = "#fff06d";
  ctx.lineWidth = 4;
  ctx.setLineDash([10, 8]);
  ctx.lineDashOffset = -performance.now() * 0.04;
  ctx.beginPath();
  ctx.arc(player.x, player.y, radius, 0, TAU);
  ctx.stroke();
  ctx.restore();
}

function drawFireShield() {
  const t = performance.now() * 0.006;
  const pulse = 1 + Math.sin(t * 1.7) * 0.08;
  const radius = player.r + 28 * pulse;
  ctx.save();
  const grad = ctx.createRadialGradient(player.x, player.y, player.r * 0.7, player.x, player.y, radius + 20);
  grad.addColorStop(0, "rgba(255,239,136,0.04)");
  grad.addColorStop(0.55, "rgba(255,123,56,0.22)");
  grad.addColorStop(1, "rgba(255,50,28,0)");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(player.x, player.y, radius + 20, 0, TAU);
  ctx.fill();
  ctx.strokeStyle = "#ffef88";
  ctx.lineWidth = 3;
  ctx.globalAlpha = 0.78;
  ctx.beginPath();
  ctx.arc(player.x, player.y, radius, 0, TAU);
  ctx.stroke();
  ctx.strokeStyle = "rgba(255,107,74,0.72)";
  ctx.lineWidth = 5;
  ctx.setLineDash([9, 8]);
  ctx.lineDashOffset = -t * 10;
  ctx.beginPath();
  ctx.arc(player.x, player.y, radius + 9, 0, TAU);
  ctx.stroke();
  ctx.restore();
}

function drawTazerGuard() {
  const activePct = clamp((player.tazerGuardActive || 0) / TAZER_GUARD_DURATION, 0, 1);
  const pulse = 1 + Math.sin(performance.now() * 0.014) * 0.08;
  ctx.save();
  ctx.globalAlpha = 0.3 + activePct * 0.35;
  const grad = ctx.createRadialGradient(player.x, player.y, player.r, player.x, player.y, player.r + 42 * pulse);
  grad.addColorStop(0, "rgba(215,251,255,0.05)");
  grad.addColorStop(0.58, "rgba(215,251,255,0.16)");
  grad.addColorStop(1, "rgba(255,240,109,0)");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.r + 42 * pulse, 0, TAU);
  ctx.fill();
  ctx.strokeStyle = "#d7fbff";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.r + 23 * pulse, 0, TAU);
  ctx.stroke();
  ctx.restore();
}

function onScreen(entity, pad = 140) {
  pad = Number.isFinite(pad) ? pad : 140;
  const halfW = canvas.width / (2 * camera.scale) + pad;
  const halfH = canvas.height / (2 * camera.scale) + pad;
  return entity.x > camera.x - halfW && entity.x < camera.x + halfW && entity.y > camera.y - halfH && entity.y < camera.y + halfH;
}

function drawHud() {
  const pad = 20 * camera.scale;
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = "rgba(11,15,12,0.72)";
  const panelHeight =
    player.tankKey === "railgun"
      ? 196
      : player.tankKey === "dragonTamer"
        ? 226
        : player.tankKey === "tazer"
          ? 346
          : isThunderGod()
          ? 226
          : player.tankKey === "juggernaut"
            ? 226
            : player.tankKey === "incendiary" && player.mods?.fireShieldAbility
            ? 166
            : player.tankKey === "gamma"
            ? 166
            : 136;
  roundRect(pad, pad, 360 * camera.scale, panelHeight * camera.scale, 8 * camera.scale);
  ctx.fill();
  ctx.fillStyle = "#f5f4eb";
  ctx.font = `${18 * camera.scale}px system-ui, sans-serif`;
  ctx.fillText(`${player.buildName}  Lv ${player.level}`, pad + 16 * camera.scale, pad + 30 * camera.scale);
  bar(pad + 16 * camera.scale, pad + 48 * camera.scale, 310 * camera.scale, 12 * camera.scale, player.hp / player.maxHp, "#9df29e", `HP ${Math.ceil(player.hp)}/${player.maxHp}`);
  bar(pad + 16 * camera.scale, pad + 78 * camera.scale, 310 * camera.scale, 12 * camera.scale, player.xp / player.xpNext, "#f2ca52", `XP ${Math.floor(player.xp)}/${player.xpNext}`);
  let infoY = 112;
  if (player.tankKey === "railgun") {
    bar(pad + 16 * camera.scale, pad + 108 * camera.scale, 310 * camera.scale, 12 * camera.scale, player.railEnergy, "#88f7ff", `Beam charge ${Math.round(player.railEnergy * 100)}%`);
    bar(
      pad + 16 * camera.scale,
      pad + 138 * camera.scale,
      310 * camera.scale,
      12 * camera.scale,
      1 - (player.railGiantCooldown || 0) / RAILGUN_GIANT_COOLDOWN,
      "#d7fbff",
      `E giant cooldown ${Math.ceil(player.railGiantCooldown || 0)}s`
    );
    ctx.fillStyle = player.railGiantArmed || player.railGiantActive ? "#eaffff" : "#aeb5ad";
    ctx.font = `${12 * camera.scale}px system-ui, sans-serif`;
    const railAbilityText = player.railGiantActive ? "E giant beam active" : player.railGiantArmed ? "E giant beam armed" : "Press E: arm giant beam";
    ctx.fillText(railAbilityText, pad + 16 * camera.scale, pad + 167 * camera.scale);
    infoY = 172;
  } else if (isThunderGod()) {
    bar(
      pad + 16 * camera.scale,
      pad + 108 * camera.scale,
      310 * camera.scale,
      12 * camera.scale,
      thunderGodBuffActive() ? (player.thunderBuffActive || 0) / THUNDER_GOD_BUFF_DURATION : 1 - (player.thunderBuffCooldown || 0) / THUNDER_GOD_BUFF_COOLDOWN,
      "#fff06d",
      thunderGodBuffActive() ? `Q god mode ${player.thunderBuffActive.toFixed(1)}s` : `Q god mode ${Math.ceil(player.thunderBuffCooldown || 0)}s`
    );
    const thunderStorm = thunderFocusStorms[0];
    bar(
      pad + 16 * camera.scale,
      pad + 138 * camera.scale,
      310 * camera.scale,
      12 * camera.scale,
      thunderStorm ? 1 - thunderStorm.strikesLeft / THUNDER_GOD_FOCUS_STRIKES : 1 - (player.thunderFocusCooldown || 0) / THUNDER_GOD_FOCUS_COOLDOWN,
      "#8df5ff",
      thunderStorm ? `E judgment ${thunderStorm.strikesLeft} bolts` : `E judgment ${Math.ceil(player.thunderFocusCooldown || 0)}s`
    );
    const reviveLabel = (player.thunderReviveTrial || 0) > 0
      ? `Revive trial: level ${player.thunderReviveTargetLevel} in ${Math.ceil(player.thunderReviveTrial)}s`
      : player.thunderReviveReady
        ? `Revive ready ${player.thunderRevivesUsed || 0}/${THUNDER_GOD_REVIVE_MAX}`
        : `Revives used ${player.thunderRevivesUsed || 0}/${THUNDER_GOD_REVIVE_MAX}`;
    bar(
      pad + 16 * camera.scale,
      pad + 168 * camera.scale,
      310 * camera.scale,
      12 * camera.scale,
      (player.thunderReviveTrial || 0) > 0 ? (player.thunderReviveTrial || 0) / THUNDER_GOD_REVIVE_WINDOW : 1 - (player.thunderRevivesUsed || 0) / THUNDER_GOD_REVIVE_MAX,
      (player.thunderReviveTrial || 0) > 0 ? "#ffef88" : "#fff06d",
      reviveLabel
    );
    ctx.fillStyle = "#aeb5ad";
    ctx.font = `${12 * camera.scale}px system-ui, sans-serif`;
    ctx.fillText(`Click: targeted thunder airstrike  |  ${thunderGodStatMult().toFixed(2)}x stats`, pad + 16 * camera.scale, pad + 198 * camera.scale);
    infoY = 202;
  } else if (player.tankKey === "gamma") {
    bar(
      pad + 16 * camera.scale,
      pad + 108 * camera.scale,
      310 * camera.scale,
      12 * camera.scale,
      1 - (player.gammaStormCooldown || 0) / GAMMA_STORM_COOLDOWN,
      GAMMA_BLUE,
      `E lightning storm ${Math.ceil(player.gammaStormCooldown || 0)}s`
    );
    infoY = 142;
  } else if (player.tankKey === "incendiary" && player.mods?.fireShieldAbility) {
    bar(
      pad + 16 * camera.scale,
      pad + 108 * camera.scale,
      310 * camera.scale,
      12 * camera.scale,
      fireShieldActive() ? (player.fireShieldActive || 0) / FIRE_SHIELD_DURATION : 1 - (player.fireShieldCooldown || 0) / FIRE_SHIELD_COOLDOWN,
      "#ffef88",
      fireShieldActive() ? `Q fire shield ${player.fireShieldActive.toFixed(1)}s` : `Q fire shield ${Math.ceil(player.fireShieldCooldown || 0)}s`
    );
    infoY = 142;
  } else if (player.tankKey === "juggernaut") {
    const domain = activeJuggernautDomain();
    bar(
      pad + 16 * camera.scale,
      pad + 108 * camera.scale,
      310 * camera.scale,
      12 * camera.scale,
      domain ? domain.life / domain.max : 1 - (player.juggernautDomainCooldown || 0) / JUGGERNAUT_DOMAIN_COOLDOWN,
      "#f0d37a",
      domain ? `E dominance active ${domain.life.toFixed(1)}s` : `E dominance ${Math.ceil(player.juggernautDomainCooldown || 0)}s`
    );
    bar(
      pad + 16 * camera.scale,
      pad + 138 * camera.scale,
      310 * camera.scale,
      12 * camera.scale,
      player.juggernautJudgmentArmed ? 1 : 1 - (player.juggernautJudgmentCooldown || 0) / JUGGERNAUT_JUDGMENT_COOLDOWN,
      "#ffe58a",
      player.juggernautJudgmentArmed ? "Q judgment armed" : `Q judgment ${Math.ceil(player.juggernautJudgmentCooldown || 0)}s`
    );
    bar(
      pad + 16 * camera.scale,
      pad + 168 * camera.scale,
      310 * camera.scale,
      12 * camera.scale,
      juggernautResolveActive() ? (player.juggernautResolveActive || 0) / JUGGERNAUT_RESOLVE_DURATION : 1 - (player.juggernautResolveCooldown || 0) / JUGGERNAUT_RESOLVE_COOLDOWN,
      "#ffe58a",
      juggernautResolveActive() ? `X resolve active ${player.juggernautResolveActive.toFixed(1)}s` : `X resolve ${Math.ceil(player.juggernautResolveCooldown || 0)}s`
    );
    infoY = 202;
  } else if (player.tankKey === "tazer") {
    bar(
      pad + 16 * camera.scale,
      pad + 108 * camera.scale,
      310 * camera.scale,
      12 * camera.scale,
      player.tazerEnergy || 0,
      "#ffe66d",
      `Zap charge ${Math.round((player.tazerEnergy || 0) * 100)}%`
    );
    bar(
      pad + 16 * camera.scale,
      pad + 138 * camera.scale,
      310 * camera.scale,
      12 * camera.scale,
      1 - (player.tazerCooldown || 0) / TAZER_STUN_COOLDOWN,
      "#ffe66d",
      `E screen stun ${Math.ceil(player.tazerCooldown || 0)}s`
    );
    bar(
      pad + 16 * camera.scale,
      pad + 168 * camera.scale,
      310 * camera.scale,
      12 * camera.scale,
      1 - (player.tazerBeamCooldown || 0) / TAZER_BEAM_COOLDOWN,
      "#fff06d",
      player.tazerBeamActive > 0 ? `Q beam active ${player.tazerBeamActive.toFixed(1)}s` : `Q giant beam ${Math.ceil(player.tazerBeamCooldown || 0)}s`
    );
    bar(
      pad + 16 * camera.scale,
      pad + 198 * camera.scale,
      310 * camera.scale,
      12 * camera.scale,
      1 - (player.tazerMiniCooldown || 0) / TAZER_MINI_COOLDOWN,
      "#d7fbff",
      `Z mini tasers ${Math.ceil(player.tazerMiniCooldown || 0)}s`
    );
    bar(
      pad + 16 * camera.scale,
      pad + 228 * camera.scale,
      310 * camera.scale,
      12 * camera.scale,
      1 - (player.tazerCannonCooldown || 0) / TAZER_CANNON_COOLDOWN,
      "#fff06d",
      `R cannon cage ${Math.ceil(player.tazerCannonCooldown || 0)}s`
    );
    bar(
      pad + 16 * camera.scale,
      pad + 258 * camera.scale,
      310 * camera.scale,
      12 * camera.scale,
      player.tazerGuardActive > 0 ? (player.tazerGuardActive || 0) / TAZER_GUARD_DURATION : 1 - (player.tazerGuardCooldown || 0) / TAZER_GUARD_COOLDOWN,
      "#d7fbff",
      player.tazerGuardActive > 0 ? `X guard active ${player.tazerGuardActive.toFixed(1)}s` : `X guard ${Math.ceil(player.tazerGuardCooldown || 0)}s`
    );
    const focusStorm = tazerFocusStorms[0];
    bar(
      pad + 16 * camera.scale,
      pad + 288 * camera.scale,
      310 * camera.scale,
      12 * camera.scale,
      focusStorm ? 1 - focusStorm.strikesLeft / TAZER_FOCUS_STRIKES : 1 - (player.tazerFocusCooldown || 0) / TAZER_FOCUS_COOLDOWN,
      "#fff06d",
      focusStorm ? `B focus ${focusStorm.strikesLeft} bolts` : player.tazerFocusCooldown > 0 ? `B focus ${Math.ceil(player.tazerFocusCooldown)}s` : "B focus ready - 95% max HP"
    );
    infoY = 322;
  } else if (player.tankKey === "dragonTamer") {
    bar(
      pad + 16 * camera.scale,
      pad + 108 * camera.scale,
      310 * camera.scale,
      12 * camera.scale,
      1 - (player.dragonCooldown || 0) / DRAGON_HORDE_COOLDOWN,
      "#ff8d45",
      `E baby horde ${Math.ceil(player.dragonCooldown || 0)}s`
    );
    bar(
      pad + 16 * camera.scale,
      pad + 138 * camera.scale,
      310 * camera.scale,
      12 * camera.scale,
      1 - (player.adultDragonCooldown || 0) / ADULT_DRAGON_COOLDOWN,
      "#ff6f35",
      `Q grown dragon ${Math.ceil(player.adultDragonCooldown || 0)}s`
    );
    bar(
      pad + 16 * camera.scale,
      pad + 168 * camera.scale,
      310 * camera.scale,
      12 * camera.scale,
      1 - (player.blackDragonCooldown || 0) / BLACK_DRAGON_COOLDOWN,
      "#7d4dff",
      `R black dragon ${Math.ceil(player.blackDragonCooldown || 0)}s`
    );
    infoY = 202;
  }
  ctx.fillStyle = "#aeb5ad";
  ctx.font = `${13 * camera.scale}px system-ui, sans-serif`;
  ctx.fillText(
    `Kills ${player.kills}   Tanks ${hostileCount()}/${ENEMY_CAP}   Infantry ${hostileInfantryCount()}   Allies ${allyCount()}`,
    pad + 16 * camera.scale,
    pad + infoY * camera.scale
  );
  ctx.fillText(`Map ${warMap.name}`, pad + 16 * camera.scale, pad + (infoY + 18) * camera.scale);
  ctx.restore();
}

function bar(x, y, w, h, pct, color, label) {
  ctx.fillStyle = "rgba(255,255,255,0.14)";
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w * clamp(pct, 0, 1), h);
  ctx.fillStyle = "#f5f4eb";
  ctx.font = `${11 * camera.scale}px system-ui, sans-serif`;
  ctx.fillText(label, x, y + 25 * camera.scale);
}

function roundRect(x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function loop(now) {
  const dt = Math.min(0.033, (now - lastTime) / 1000);
  lastTime = now;
  if (gameState === "playing") update(dt);
  updateMultiplayer(dt);
  draw();
  requestAnimationFrame(loop);
}

window.addEventListener("resize", resize);
window.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if (key === "tab") {
    event.preventDefault();
    hudHidden = !hudHidden;
    renderPendingUpgrades();
    return;
  }
  keys.add(key);
  if ([" ", "arrowup", "arrowdown", "arrowleft", "arrowright"].includes(key)) event.preventDefault();
  if (key === "escape") {
    if (gameState === "playing") {
      gameState = "pause";
      showOnly("pause");
    } else if (gameState === "pause") {
      gameState = "playing";
      showOnly();
    }
  }
});
window.addEventListener("keyup", (event) => keys.delete(event.key.toLowerCase()));
canvas.addEventListener("pointermove", (event) => {
  if (event.pointerId !== touchMove.id) setMouseFromEvent(event);
});
canvas.addEventListener("pointerdown", (event) => {
  if (event.pointerType !== "mouse" && event.clientX < window.innerWidth * 0.42) return;
  setMouseFromEvent(event);
  mouse.down = true;
  canvas.setPointerCapture?.(event.pointerId);
  event.preventDefault();
});
window.addEventListener("pointerup", (event) => {
  if (event.pointerId !== touchMove.id) mouse.down = false;
});
window.addEventListener("pointercancel", (event) => {
  if (event.pointerId !== touchMove.id) mouse.down = false;
});
canvas.addEventListener("mouseleave", () => {
  mouse.down = false;
});
canvas.addEventListener("contextmenu", (event) => event.preventDefault());

if (moveStick && moveStickKnob) {
  const resetStick = () => {
    touchMove.dx = 0;
    touchMove.dy = 0;
    touchMove.id = null;
    moveStickKnob.style.transform = "translate(0px, 0px)";
  };
  const updateStick = (event) => {
    const rect = moveStick.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rawX = event.clientX - cx;
    const rawY = event.clientY - cy;
    const limit = rect.width * 0.32;
    const len = Math.hypot(rawX, rawY) || 1;
    const mag = Math.min(limit, len);
    const x = (rawX / len) * mag;
    const y = (rawY / len) * mag;
    touchMove.dx = x / limit;
    touchMove.dy = y / limit;
    moveStickKnob.style.transform = `translate(${x}px, ${y}px)`;
  };
  moveStick.addEventListener("pointerdown", (event) => {
    touchMove.id = event.pointerId;
    moveStick.setPointerCapture?.(event.pointerId);
    updateStick(event);
    event.preventDefault();
  });
  moveStick.addEventListener("pointermove", (event) => {
    if (event.pointerId === touchMove.id) updateStick(event);
  });
  moveStick.addEventListener("pointerup", resetStick);
  moveStick.addEventListener("pointercancel", resetStick);
}

if (fireTouch) {
  fireTouch.addEventListener("pointerdown", (event) => {
    mouse.down = true;
    touchFire.active = true;
    setMouseFromEvent({ clientX: window.innerWidth * 0.82, clientY: window.innerHeight * 0.45 });
    fireTouch.setPointerCapture?.(event.pointerId);
    event.preventDefault();
  });
  fireTouch.addEventListener("pointerup", () => {
    mouse.down = false;
    touchFire.active = false;
  });
  fireTouch.addEventListener("pointercancel", () => {
    mouse.down = false;
    touchFire.active = false;
  });
}

resumeButton.addEventListener("click", () => {
  gameState = "playing";
  showOnly();
});
endGameButton.addEventListener("click", endGameFromPause);
restartButton.addEventListener("click", () => {
  gameState = "start";
  showOnly("start");
});

buildStart();
setupMultiplayer();
resize();
renderLeaderboard();
showOnly("start");
requestAnimationFrame(loop);
