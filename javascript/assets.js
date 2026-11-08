// =====================================
// CROSSY CHICKEN ADVENTURE
// ASSET LOADER
// =====================================

const Assets = {};

// =====================================
// SPRITE SHEETS
// =====================================

Assets.chickenSheet = new Image();
Assets.enemySheet = new Image();
Assets.worldSheet = new Image();

Assets.chickenSheet.src =
"sprites/chicken_sheet.png";

Assets.enemySheet.src =
"sprites/enemy_sheet.png";

Assets.worldSheet.src =
"sprites/environment_sheet.png";

// =====================================
// ASSET LOADING
// =====================================

Assets.loaded = 0;
Assets.total = 3;

function assetLoaded() {

    Assets.loaded++;

    console.log(
        `Loaded ${Assets.loaded}/${Assets.total}`
    );

}

Assets.chickenSheet.onload =
assetLoaded;

Assets.enemySheet.onload =
assetLoaded;

Assets.worldSheet.onload =
assetLoaded;

Assets.ready = function() {

    return (
        Assets.loaded >= Assets.total
    );

};

// =====================================
// GAME DATA
// =====================================

const GameData = {

    gravity:0.8,

    playerSpeed:5,

    jumpPower:16,

    maxHealth:5,

    enemyDamage:1

};

// =====================================
// CHICKEN ANIMATIONS
// =====================================

const ChickenAnimations = {

    idle:{
        row:0,
        frames:6
    },

    walkRight:{
        row:1,
        frames:6
    },

    walkLeft:{
        row:2,
        frames:6
    },

    walkUp:{
        row:3,
        frames:6
    },

    walkDown:{
        row:4,
        frames:6
    },

    peck:{
        row:5,
        frames:6
    },

    hurt:{
        row:6,
        frames:6
    },

    death:{
        row:7,
        frames:6
    }

};

// =====================================
// ENEMIES
// =====================================

const EnemyTypes = {

    slime:{

        row:0,

        width:48,
        height:48,

        health:1,

        speed:1.5

    },

    goblin:{

        row:1,

        width:64,
        height:64,

        health:2,

        speed:2

    },

    skeleton:{

        row:2,

        width:64,
        height:64,

        health:3,

        speed:1.5

    },

    bat:{

        row:3,

        width:64,
        height:64,

        health:1,

        speed:3

    },

    spider:{

        row:4,

        width:64,
        height:64,

        health:2,

        speed:1.8

    },

    plant:{

        row:5,

        width:64,
        height:64,

        health:4,

        speed:0

    },

    ghost:{

        row:6,

        width:64,
        height:64,

        health:2,

        speed:2.5

    },

    bandit:{

        row:7,

        width:64,
        height:64,

        health:5,

        speed:3

    }

};

// =====================================
// WORLD OBJECTS
// =====================================

const WorldObjects = {

    grassTile:{
        x:0,
        y:0,
        w:64,
        h:64
    },

    dirtTile:{
        x:0,
        y:64,
        w:64,
        h:64
    },

    stoneTile:{
        x:0,
        y:128,
        w:64,
        h:64
    },

    tree:{
        x:340,
        y:20,
        w:180,
        h:220
    },

    pineTree:{
        x:780,
        y:20,
        w:180,
        h:260
    },

    bush:{
        x:1040,
        y:70,
        w:140,
        h:120
    },

    rock:{
        x:810,
        y:150,
        w:120,
        h:90
    },

    log:{
        x:980,
        y:150,
        w:150,
        h:80
    },

    stump:{
        x:1150,
        y:130,
        w:120,
        h:120
    },

    crate:{
        x:850,
        y:420,
        w:120,
        h:120
    },

    barrel:{
        x:980,
        y:420,
        w:100,
        h:120
    },

    fence:{
        x:1120,
        y:420,
        w:150,
        h:100
    },

    mushroom:{
        x:1010,
        y:670,
        w:80,
        h:80
    },

    spikes:{
        x:720,
        y:660,
        w:100,
        h:100
    },

    bee:{
        x:1150,
        y:650,
        w:80,
        h:80
    },

    snake:{
        x:1300,
        y:760,
        w:120,
        h:80
    }

};

// =====================================
// COLLECTABLES
// =====================================

const Collectables = {

    coinValue:50,

    eggValue:100

};

// =====================================
// LEVEL SETTINGS
// =====================================

const LevelSettings = {

    worldWidth:8000,

    groundHeight:620,

    goalX:7600,

    checkpointX:4000

};

// =====================================
// AUDIO
// =====================================

const Sounds = {

    jump:new Audio(
        "audio/jump.wav"
    ),

    coin:new Audio(
        "audio/coin.wav"
    ),

    hurt:new Audio(
        "audio/hurt.wav"
    ),

    win:new Audio(
        "audio/win.wav"
    ),

    peck:new Audio(
        "audio/peck.wav"
    )

};

// =====================================
// DEBUG
// =====================================

console.log(
    "Assets Loaded Successfully"
);
