// =====================================
// UI.JS
// =====================================

let gamePaused = false;

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
// PAUSE
// =====================================

document.addEventListener("keydown",(e)=>{

    if(e.key === "Escape"){

        gamePaused = !gamePaused;

    }

});

// =====================================
// UPDATE
// =====================================

function updateUI(){

    // future UI updates here

}

// =====================================
// HEARTS
// =====================================

function drawHearts(){

    for(let i=0;i<player.health;i++){

        ctx.fillStyle = "red";

        ctx.beginPath();

        ctx.arc(
            25 + (i*30),
            30,
            10,
            0,
            Math.PI * 2
        );

        ctx.fill();

    }

}

// =====================================
// SCORE
// =====================================

function drawScore(){

    ctx.fillStyle = "white";

    ctx.font = "20px Arial";

    ctx.fillText(
        "Score: " + player.score,
        20,
        80
    );

    ctx.fillText(
        "Eggs: " + player.eggs,
        20,
        110
    );

}

// =====================================
// FPS
// =====================================

function drawFPS(){

    ctx.fillStyle = "yellow";

    ctx.font = "16px Arial";

    ctx.fillText(
        "FPS: " + fps,
        canvas.width - 100,
        25
    );

}

// =====================================
// CONTROLS
// =====================================

function drawControls(){

    ctx.fillStyle =
    "rgba(0,0,0,0.6)";

    ctx.fillRect(
        10,
        canvas.height - 120,
        250,
        110
    );

    ctx.fillStyle =
    "white";

    ctx.font =
    "16px Arial";

    ctx.fillText(
        "A / D = Move",
        20,
        canvas.height - 85
    );

    ctx.fillText(
        "SPACE = Jump",
        20,
        canvas.height - 60
    );

    ctx.fillText(
        "F = Peck",
        20,
        canvas.height - 35
    );

}

// =====================================
// PAUSE SCREEN
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

    ctx.font =
    "60px Arial";

    ctx.textAlign =
    "center";

    ctx.fillText(
        "PAUSED",
        canvas.width/2,
        canvas.height/2
    );

    ctx.textAlign =
    "left";

}

// =====================================
// DRAW UI
// =====================================

function drawUI(){

    frames++;

    drawHearts();

    drawScore();

    drawFPS();

    drawControls();

    drawPauseScreen();

}
