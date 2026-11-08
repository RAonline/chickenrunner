// ============================================
// CROSSY CHICKEN ADVENTURE
// ASSET MANAGER
// ============================================

const Assets = {

    loaded: 0,
    total: 3,

    chickenSheet: new Image(),
    enemySheet: new Image(),
    worldSheet: new Image(),

    isReady() {

        return this.loaded >= this.total;

    }

};

// ============================================
// LOAD SPRITESHEETS
// ============================================

// Rename your uploaded files exactly to these:

Assets.chickenSheet.src =
"sprites/chicken_sheet.png";

Assets.enemySheet.src =
"sprites/enemy_sheet.png";

Assets.worldSheet.src =
"sprites/environment_sheet.png";

function assetLoaded() {

    Assets.loaded++;

    console.log(
        "Loaded Asset",
        Assets.loaded,
        "/",
        Assets.total
    );

}

Assets.chickenSheet.onload = assetLoaded;
Assets.enemySheet.onload = assetLoaded;
Assets.worldSheet.onload = assetLoaded;

// ============================================
// CHICKEN ANIMATION DATA
// ============================================

// IMPORTANT:
//
// This is based on the chicken sheet
// you uploaded.
//
// You may need to tweak a few values
// depending on exact sprite spacing.
//

const ChickenAnimations = {

    idle: [

        {x:90,y:80,w:64,h:64},
        {x:170,y:80,w:64,h:64},
        {x:250,y:80,w:64,h:64}

    ],

    walk: [

        {x:90,y:180,w:64,h:64},
        {x:170,y:180,w:64,h:64},
        {x:250,y:180,w:64,h:64},
        {x:330,y:180,w:64,h:64},
        {x:410,y:180,w:64,h:64},
        {x:490,y:180,w:64,h:64}

    ],

    jump: [

        {x:90,y:300,w:64,h:64},
        {x:170,y:300,w:64,h:64},
        {x:250,y:300,w:64,h:64}

    ],

    peck: [

        {x:90,y:650,w:64,h:64},
        {x:170,y:650,w:64,h:64},
        {x:250,y:650,w:64,h:64}

    ],

    hurt: [

        {x:90,y:760,w:64,h:64},
        {x:170,y:760,w:64,h:64}

    ],

    death: [

        {x:90,y:870,w:64,h:64},
        {x:170,y:870,w:64,h:64},
        {x:250,y:870,w:64,h:64},
        {x:330,y:870,w:64,h:64}

    ]

};

// ============================================
// ENEMY SHEET DATA
// ============================================

const EnemySprites = {

    slime: {

        idle: [

            {x:18,y:72,w:48,h:48},
            {x:82,y:72,w:48,h:48}

        ],

        walk: [

            {x:250,y:72,w:48,h:48},
            {x:320,y:72,w:48,h:48}

        ]

    },

    goblin: {

        idle: [

            {x:25,y:210,w:64,h:64},
            {x:90,y:210,w:64,h:64}

        ],

        walk: [

            {x:250,y:210,w:64,h:64},
            {x:320,y:210,w:64,h:64},
            {x:390,y:210,w:64,h:64}

        ]

    },

    skeleton: {

        idle: [

            {x:25,y:350,w:64,h:64},
            {x:90,y:350,w:64,h:64}

        ]

    },

    bat: {

        idle: [

            {x:30,y:510,w:64,h:64},
            {x:100,y:510,w:64,h:64}

        ]

    }

};

// ============================================
// WORLD TILES
// ============================================

const WorldSprites = {

    grass: {
        x:0,
        y:0,
        w:64,
        h:64
    },

    dirt: {
        x:0,
        y:64,
        w:64,
        h:64
    },

    stone: {
        x:128,
        y:0,
        w:64,
        h:64
    },

    hayBale: {
        x:1180,
        y:300,
        w:120,
        h:120
    },

    barrel: {
        x:1060,
        y:430,
        w:100,
        h:120
    },

    crate: {
        x:930,
        y:420,
        w:120,
        h:120
    },

    log: {
        x:920,
        y:170,
        w:130,
        h:70
    },

    rock: {
        x:820,
        y:120,
        w:120,
        h:80
    },

    spike: {
        x:760,
        y:660,
        w:100,
        h:100
    },

    mushroom: {
        x:1020,
        y:650,
        w:90,
        h:90
    }

};

// ============================================
// COIN DATA
// ============================================

const CoinSprite = {

    x:0,
    y:0,
    w:32,
    h:32

};

// ============================================
// SOUND MANAGER
// ============================================

const Sounds = {

    jump: new Audio(
        "audio/jump.wav"
    ),

    coin: new Audio(
        "audio/coin.wav"
    ),

    hurt: new Audio(
        "audio/hurt.wav"
    ),

    enemyDie: new Audio(
        "audio/enemydie.wav"
    ),

    win: new Audio(
        "audio/win.wav"
    )

};

// ============================================
// PLAYER STATS
// ============================================

const GameData = {

    maxHealth: 5,

    startingHealth: 5,

    startingEggs: 0,

    startingScore: 0,

    playerSpeed: 5,

    jumpPower: 16,

    gravity: 0.7

};

// ============================================
// DEBUG
// ============================================

console.log(
    "Assets.js Loaded Successfully"
);
