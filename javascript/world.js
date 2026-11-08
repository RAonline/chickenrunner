// =====================================
// WORLD.JS
// CHICKEN RUNNER
// =====================================

let cameraX = 0;

const WORLD = {

    width: 8000,

    groundY: 620

};

// =====================================
// CAMERA
// =====================================

function updateCamera(){

    cameraX =
    player.x -
    canvas.width / 3;

    if(cameraX < 0)
        cameraX = 0;

    if(
        cameraX >
        WORLD.width -
        canvas.width
    ){

        cameraX =
        WORLD.width -
        canvas.width;

    }

}

// =====================================
// LEVEL OBJECTS
// =====================================

const decorations = [

    {type:"tree",x:500,y:360},
    {type:"tree",x:1300,y:360},
    {type:"tree",x:2500,y:360},

    {type:"pine",x:3400,y:320},
    {type:"pine",x:4300,y:320},

    {type:"bush",x:1800,y:520},
    {type:"bush",x:2900,y:520},
    {type:"bush",x:5200,y:520},
    {type:"bush",x:6500,y:520}

];

const obstacles = [

    {type:"rock",x:800,y:560,w:80,h:60},

    {type:"log",x:1200,y:560,w:120,h:50},

    {type:"hay",x:1800,y:520,w:90,h:100},

    {type:"crate",x:2600,y:520,w:90,h:90},

    {type:"barrel",x:3200,y:500,w:80,h:120},

    {type:"spikes",x:4200,y:580,w:80,h:40},

    {type:"mushroom",x:4700,y:540,w:70,h:70},

    {type:"barrel",x:6000,y:500,w:80,h:120},

    {type:"spikes",x:6900,y:580,w:80,h:40}

];

// =====================================
// COINS
// =====================================

const coins = [];

for(let i=0;i<45;i++){

    coins.push({

        x:600 + (i * 150),

        y:
        420 +
        Math.sin(i)*60,

        collected:false

    });

}

// =====================================
// GOAL
// =====================================

const goalFlag = {

    x:7600,

    y:380,

    width:100,

    height:220

};

// =====================================
// BACKGROUND
// =====================================

function drawSky(){

    ctx.fillStyle =
    "#87CEEB";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

}

// =====================================
// PARALLAX
// =====================================

function drawParallax(){

    const move =
    cameraX * 0.25;

    // mountains

    ctx.fillStyle =
    "#93B5E1";

    ctx.beginPath();

    ctx.moveTo(-move,500);
    ctx.lineTo(250-move,220);
    ctx.lineTo(500-move,500);

    ctx.fill();

    ctx.beginPath();

    ctx.moveTo(350-move,500);
    ctx.lineTo(700-move,180);
    ctx.lineTo(1050-move,500);

    ctx.fill();

    // forest

    ctx.fillStyle =
    "#4B8B51";

    for(let i=0;i<20;i++){

        ctx.fillRect(

            (i*150) - move,

            340,

            70,

            280

        );

    }

}

// =====================================
// GROUND
// =====================================

function drawGround(){

    ctx.fillStyle =
    "#65C255";

    ctx.fillRect(

        -cameraX,

        WORLD.groundY,

        WORLD.width,

        200

    );

    ctx.fillStyle =
    "#734D26";

    ctx.fillRect(

        -cameraX,

        WORLD.groundY + 30,

        WORLD.width,

        170

    );

}

// =====================================
// DECORATIONS
// =====================================

function drawDecorations(){

    decorations.forEach(obj=>{

        switch(obj.type){

            case "tree":

                ctx.fillStyle =
                "#3E8B3E";

                ctx.beginPath();

                ctx.arc(
                    obj.x-cameraX,
                    obj.y,
                    50,
                    0,
                    Math.PI*2
                );

                ctx.fill();

                ctx.fillStyle =
                "#7B4B20";

                ctx.fillRect(
                    obj.x-cameraX-10,
                    obj.y,
                    20,
                    100
                );

                break;

            case "pine":

                ctx.fillStyle =
                "#2E7D32";

                ctx.beginPath();

                ctx.moveTo(
                    obj.x-cameraX,
                    obj.y
                );

                ctx.lineTo(
                    obj.x-cameraX-50,
                    obj.y+120
                );

                ctx.lineTo(
                    obj.x-cameraX+50,
                    obj.y+120
                );

                ctx.fill();

                break;

            case "bush":

                ctx.fillStyle =
                "#4CAF50";

                ctx.beginPath();

                ctx.arc(
                    obj.x-cameraX,
                    obj.y,
                    35,
                    0,
                    Math.PI*2
                );

                ctx.fill();

                break;

        }

    });

}

// =====================================
// OBSTACLES
// =====================================

function drawObstacles(){

    obstacles.forEach(obj=>{

        switch(obj.type){

            case "rock":

                ctx.fillStyle =
                "gray";

                ctx.beginPath();

                ctx.arc(
                    obj.x-cameraX,
                    obj.y,
                    35,
                    0,
                    Math.PI*2
                );

                ctx.fill();

                break;

            case "log":

                ctx.fillStyle =
                "#8B5A2B";

                ctx.fillRect(
                    obj.x-cameraX,
                    obj.y,
                    120,
                    40
                );

                break;

            case "barrel":

                ctx.fillStyle =
                "#8D5524";

                ctx.fillRect(
                    obj.x-cameraX,
                    obj.y,
                    60,
                    90
                );

                break;

            case "crate":

                ctx.fillStyle =
                "#A05A2C";

                ctx.fillRect(
                    obj.x-cameraX,
                    obj.y,
                    70,
                    70
                );

                break;

            case "hay":

                ctx.fillStyle =
                "#E4D96F";

                ctx.fillRect(
                    obj.x-cameraX,
                    obj.y,
                    90,
                    90
                );

                break;

            case "spikes":

                ctx.fillStyle =
                "#CCCCCC";

                for(
                    let i=0;
                    i<4;
                    i++
                ){

                    ctx.beginPath();

                    ctx.moveTo(
                        obj.x-cameraX +
                        i*20,
                        obj.y+30
                    );

                    ctx.lineTo(
                        obj.x-cameraX +
                        10 +
                        i*20,
                        obj.y
                    );

                    ctx.lineTo(
                        obj.x-cameraX +
                        20 +
                        i*20,
                        obj.y+30
                    );

                    ctx.fill();

                }

                break;

            case "mushroom":

                ctx.fillStyle =
                "red";

                ctx.beginPath();

                ctx.arc(
                    obj.x-cameraX,
                    obj.y,
                    25,
                    Math.PI,
                    0
                );

                ctx.fill();

                ctx.fillStyle =
                "#EEE";

                ctx.fillRect(
                    obj.x-cameraX-8,
                    obj.y,
                    16,
                    30
                );

                break;

        }

    });

}

// =====================================
// COINS
// =====================================

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

// =====================================
// GOAL FLAG
// =====================================

function drawGoal(){

    ctx.fillStyle =
    "#444";

    ctx.fillRect(

        goalFlag.x-cameraX,

        goalFlag.y,

        10,

        220

    );

    ctx.fillStyle =
    "lime";

    ctx.fillRect(

        goalFlag.x-cameraX+10,

        goalFlag.y,

        80,

        50

    );

}

// =====================================
// UPDATE
// =====================================

function updateWorld(){

    updateCamera();

}

// =====================================
// DRAW
// =====================================

function drawWorld(){

    drawSky();

    drawParallax();

    drawGround();

    drawDecorations();

    drawObstacles();

    drawCoins();

    drawGoal();

}
