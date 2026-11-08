// ======================================
// WORLD.JS
// ======================================

const WORLD = {

    width: LevelSettings.worldWidth,

    groundY: 620

};

// ======================================
// CAMERA
// ======================================

let cameraX = 0;

function updateCamera() {

    cameraX =
        player.x - 400;

    if(cameraX < 0)
        cameraX = 0;

    if(
        cameraX >
        WORLD.width - canvas.width
    ){

        cameraX =
        WORLD.width -
        canvas.width;

    }

}

// ======================================
// DECORATIONS
// ======================================

const decorations = [

    {type:"tree",x:500,y:340},
    {type:"tree",x:1200,y:340},

    {type:"pineTree",x:1800,y:310},
    {type:"pineTree",x:2400,y:310},

    {type:"bush",x:700,y:520},
    {type:"bush",x:2100,y:520},

    {type:"bush",x:2900,y:520},

    {type:"tree",x:4200,y:340},

    {type:"pineTree",x:4800,y:310},

    {type:"tree",x:6500,y:340},

    {type:"bush",x:7000,y:520}

];

// ======================================
// OBSTACLES
// ======================================

const obstacles = [

    {type:"rock",x:800,y:535,w:80,h:70},

    {type:"log",x:1300,y:560,w:120,h:50},

    {type:"barrel",x:2200,y:520,w:70,h:100},

    {type:"crate",x:2800,y:510,w:90,h:90},

    {type:"spikes",x:3500,y:580,w:70,h:40},

    {type:"mushroom",x:4000,y:550,w:60,h:60},

    {type:"barrel",x:4700,y:520,w:70,h:100},

    {type:"rock",x:5500,y:535,w:80,h:70},

    {type:"spikes",x:6000,y:580,w:70,h:40},

    {type:"crate",x:6800,y:510,w:90,h:90}

];

// ======================================
// COINS
// ======================================

const coins = [];

for(let i=0;i<50;i++){

    coins.push({

        x:700 + i * 130,

        y:
        450 +
        Math.sin(i) * 70,

        collected:false

    });

}

// ======================================
// GOAL
// ======================================

const goalFlag = {

    x:7500,

    y:420,

    width:80,

    height:200

};

// ======================================
// BACKGROUND
// ======================================

function drawSky(){

    ctx.fillStyle =
    "#7fd6ff";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

}

function drawParallax(){

    let mountainMove =
    cameraX * 0.2;

    let treeMove =
    cameraX * 0.5;

    // mountains

    ctx.fillStyle =
    "#88a5d8";

    ctx.beginPath();

    ctx.moveTo(-mountainMove,500);

    ctx.lineTo(
        300-mountainMove,
        180
    );

    ctx.lineTo(
        600-mountainMove,
        500
    );

    ctx.fill();

    ctx.beginPath();

    ctx.moveTo(
        450-mountainMove,
        500
    );

    ctx.lineTo(
        800-mountainMove,
        150
    );

    ctx.lineTo(
        1200-mountainMove,
        500
    );

    ctx.fill();

    // forest silhouette

    ctx.fillStyle =
    "#4f8052";

    for(let i=0;i<20;i++){

        ctx.fillRect(
            i*120-treeMove,
            350,
            80,
            250
        );

    }

}

// ======================================
// GROUND
// ======================================

function drawGround(){

    for(
        let x=0;
        x<WORLD.width;
        x+=64
    ){

        ctx.drawImage(

            Assets.worldSheet,

            0,
            0,

            64,
            64,

            x-cameraX,

            WORLD.groundY,

            64,
            64

        );

    }

}

// ======================================
// DECORATIONS
// ======================================

function drawDecorations(){

    decorations.forEach(obj=>{

        let data =
        WorldObjects[
            obj.type
        ];

        if(!data) return;

        ctx.drawImage(

            Assets.worldSheet,

            data.x,
            data.y,

            data.w,
            data.h,

            obj.x-cameraX,
            obj.y,

            data.w,
            data.h

        );

    });

}

// ======================================
// OBSTACLES
// ======================================

function drawObstacles(){

    obstacles.forEach(obj=>{

        let data =
        WorldObjects[
            obj.type
        ];

        if(!data) return;

        ctx.drawImage(

            Assets.worldSheet,

            data.x,
            data.y,

            data.w,
            data.h,

            obj.x-cameraX,
            obj.y,

            data.w,
            data.h

        );

    });

}

// ======================================
// COINS
// ======================================

function updateCoins(){

    coins.forEach(coin=>{

        if(
            coin.collected
        ) return;

        const dx =
        player.x - coin.x;

        const dy =
        player.y - coin.y;

        const dist =
        Math.sqrt(
            dx*dx +
            dy*dy
        );

        if(dist < 50){

            coin.collected =
            true;

            player.addScore(
                Collectables.coinValue
            );

        }

    });

}

function drawCoins(){

    coins.forEach(coin=>{

        if(
            coin.collected
        ) return;

        ctx.fillStyle =
        "gold";

        ctx.beginPath();

        ctx.arc(

            coin.x-cameraX,
            coin.y,

            12,

            0,

            Math.PI*2

        );

        ctx.fill();

    });

}

// ======================================
// GOAL FLAG
// ======================================

function drawGoal(){

    ctx.fillStyle =
    "#444";

    ctx.fillRect(

        goalFlag.x-cameraX,

        goalFlag.y,

        12,

        200

    );

    ctx.fillStyle =
    "lime";

    ctx.fillRect(

        goalFlag.x-cameraX + 12,

        goalFlag.y,

        70,

        50

    );

}

function checkGoal(){

    if(

        player.x >
        goalFlag.x

    ){

        alert(
            "YOU WIN!"
        );

        location.reload();

    }

}

// ======================================
// DAMAGE OBSTACLES
// ======================================

function updateObstacles(){

    obstacles.forEach(obj=>{

        if(
            obj.type !==
            "spikes"
        ) return;

        if(

            player.x <
            obj.x + obj.w &&

            player.x +
            player.width >
            obj.x &&

            player.y <
            obj.y + obj.h &&

            player.y +
            player.height >
            obj.y

        ){

            player.takeDamage(
                1
            );

        }

    });

}

// ======================================
// WORLD UPDATE
// ======================================

function updateWorld(){

    updateCamera();

    updateCoins();

    updateObstacles();

    checkGoal();

}

// ======================================
// WORLD DRAW
// ======================================

function drawWorld(){

    drawSky();

    drawParallax();

    drawGround();

    drawDecorations();

    drawObstacles();

    drawCoins();

    drawGoal();

}
