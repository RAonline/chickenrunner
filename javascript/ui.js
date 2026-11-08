// =====================================
// UI.JS
// =====================================

let gamePaused = false;

let showControls = true;

let fps = 0;
let frames = 0;

// =====================================
// FPS COUNTER
// =====================================

setInterval(() => {

    fps = frames;
    frames = 0;

},1000);

// =====================================
// ESC TO PAUSE
// =====================================

document.addEventListener("keydown",(e)=>{

    if(e.key === "Escape"){

        gamePaused =
        !gamePaused;

    }

    if(e.key === "h"){

        showControls =
        !showControls;

    }

});

// =====================================
// DOM HUD
// =====================================

function updateHUD(){

    const health =
    document.getElementById(
        "healthValue"
    );

    const score =
    document.getElementById(
        "scoreValue"
    );

    const eggs =
    document.getElementById(
        "eggValue"
    );

    if(health){

        health.innerText =
        player.health;

    }

    if(score){

        score.innerText =
        player.score;

    }

    if(eggs){

        eggs.innerText =
        player.eggs;

    }

}

// =====================================
// HEART BAR
// =====================================

function drawHearts(){

    for(
        let i=0;
        i<player.health;
        i++
    ){

        ctx.fillStyle =
        "red";

        ctx.beginPath();

        ctx.arc(
            40 + (i*35),
            40,
            12,
            0,
            Math.PI*2
        );

        ctx.fill();

    }

}

// =====================================
// SCORE PANEL
// =====================================

function drawScoreBox(){

    ctx.fillStyle =
    "rgba(0,0,0,0.5)";

    ctx.fillRect(
        15,
        60,
        250,
        110
    );

    ctx.fillStyle =
    "white";

    ctx.font =
    "20px Arial";

    ctx.fillText(
        "Score: " + player.score,
        30,
        90
    );

    ctx.fillText(
        "Eggs: " + player.eggs,
        30,
        120
    );

    ctx.fillText(
        "Enemies: " +
        enemies.filter(
            e=>!e.dead
        ).length,
        30,
        150
    );

}

// =====================================
// FPS DISPLAY
// =====================================

function drawFPS(){

    ctx.fillStyle =
    "yellow";

    ctx.font =
    "18px Arial";

    ctx.fillText(
        "FPS: " + fps,
        canvas.width - 100,
        30
    );

}

// =====================================
// CONTROLS
// =====================================

function drawControls(){

    if(!showControls)
        return;

    ctx.fillStyle =
    "rgba(0,0,0,0.7)";

    ctx.fillRect(
        20,
        500,
        340,
        170
    );

    ctx.fillStyle =
    "white";

    ctx.font =
    "18px Arial";

    ctx.fillText(
        "Controls",
        40,
        530
    );

    ctx.fillText(
        "A/D = Move",
        40,
        560
    );

    ctx.fillText(
        "W or Space = Jump",
        40,
        590
    );

    ctx.fillText(
        "F = Peck Attack",
        40,
        620
    );

    ctx.fillText(
        "ESC = Pause",
        40,
        650
    );

}

// =====================================
// PAUSE MENU
// =====================================

function drawPauseScreen(){

    if(!gamePaused)
        return;

    ctx.fillStyle =
    "rgba(0,0,0,0.8)";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.fillStyle =
    "white";

    ctx.textAlign =
    "center";

    ctx.font =
    "64px Arial";

    ctx.fillText(

        "PAUSED",

        canvas.width/2,

        canvas.height/2

    );

    ctx.font =
    "24px Arial";

    ctx.fillText(

        "Press ESC To Continue",

        canvas.width/2,

        canvas.height/2 + 50

    );

    ctx.textAlign =
    "left";

}

// =====================================
// GAME OVER
// =====================================

function drawGameOver(){

    if(player.health > 0)
        return;

    ctx.fillStyle =
    "rgba(0,0,0,0.9)";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.fillStyle =
    "#ff4444";

    ctx.textAlign =
    "center";

    ctx.font =
    "72px Arial";

    ctx.fillText(

        "GAME OVER",

        canvas.width/2,

        250

    );

    ctx.fillStyle =
    "white";

    ctx.font =
    "32px Arial";

    ctx.fillText(

        "Score: " +
        player.score,

        canvas.width/2,

        340

    );

    ctx.fillText(

        "Refresh To Try Again",

        canvas.width/2,

        400

    );

    ctx.textAlign =
    "left";

}

// =====================================
// WIN SCREEN
// =====================================

function drawVictory(){

    if(
        player.x <
        goalFlag.x
    ) return;

    ctx.fillStyle =
    "rgba(0,0,0,0.8)";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.fillStyle =
    "#00ff88";

    ctx.textAlign =
    "center";

    ctx.font =
    "70px Arial";

    ctx.fillText(

        "YOU WIN!",

        canvas.width/2,

        250

    );

    ctx.font =
    "32px Arial";

    ctx.fillText(

        "Final Score: " +
        player.score,

        canvas.width/2,

        330

    );

    ctx.fillText(

        "Eggs Collected: " +
        player.eggs,

        canvas.width/2,

        380

    );

    ctx.textAlign =
    "left";

}

// =====================================
// UPDATE UI
// =====================================

function updateUI(){

    updateHUD();

}

// =====================================
// DRAW UI
// =====================================

function drawUI(){

    frames++;

    drawHearts();

    drawScoreBox();

    drawFPS();

    drawControls();

    drawPauseScreen();

    drawGameOver();

    drawVictory();

}
