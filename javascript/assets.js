// =====================================
// CHICKEN RUNNER
// ASSETS.JS
// =====================================

const Assets = {};

// =====================================
// IMAGE LOADING
// =====================================

Assets.chickenSheet = new Image();
Assets.enemySheet = new Image();
Assets.worldSheet = new Image();

// REAL FILENAMES

Assets.chickenSheet.src =
"sprites/chicken_sheet.png.png";

Assets.enemySheet.src =
"sprites/enemy_sheet.png.png";

Assets.worldSheet.src =
"sprites/environment_sheet.png.png";

// =====================================
// LOAD TRACKING
// =====================================

Assets.loaded = 0;
Assets.total = 3;

function assetLoaded(){

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

// =====================================
// ASSET ERRORS
// =====================================

Assets.chickenSheet.onerror =
() => {

    console.error(
        "Chicken sheet failed to load"
    );

};

Assets.enemySheet.onerror =
() => {

    console.error(
        "Enemy sheet failed to load"
    );

};

Assets.worldSheet.onerror =
() => {

    console.error(
        "Environment sheet failed to load"
    );

};

// =====================================
// READY CHECK
// =====================================

Assets.ready = function(){

    return (
        Assets.loaded >= Assets.total
    );

};

// =====================================
// GAME SETTINGS
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
        width:64,
        height:64,
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
// WORLD SETTINGS
// =====================================

const LevelSettings = {

    worldWidth:8000,

    groundHeight:620,

    goalX:7600,

    checkpointX:4000

};

// =====================================
// COLLECTABLES
// =====================================

const Collectables = {

    coinValue:50,

    eggValue:100

};

// =====================================
// TEMP SOUND SYSTEM
// =====================================

const Sounds = {

    jump:null,
    coin:null,
    hurt:null,
    win:null,
    peck:null

};

// =====================================
// DEBUG
// =====================================

console.log(
    "Chicken Runner Assets Loaded"
);
