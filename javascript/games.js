// =====================================
// GAME.JS
// MAIN GAME CONTROLLER
// =====================================

let gameStarted = false;

let gameWon = false;

// =====================================
// GAME START
// =====================================

function initGame(){

    gameStarted = true;

    console.log(
        "Crossy Chicken Adventure Started"
    );

}

// =====================================
// UPDATE
// =====================================

function update(){

    if(!gameStarted)
        return;

    if(gamePaused)
        return;

    if(player.health <= 0)
        return;

    if(gameWon)
        return;

    player.update();

    updateWorld();

    updateEnemies();

    updateCollisions();

    updateUI();

    // Win Check

    if(
        player.x >=
        goalFlag.x
    ){

        gameWon = true;

        if(
            Sounds.win
        ){

            Sounds.win.play();

        }

    }

}

// =====================================
// DRAW ORDER
// =====================================

function draw(){

    if(!Assets.ready())
        return;

    drawWorld();

    drawEnemies();

    player.draw();

    drawUI();

}

// =====================================
// DEBUG INFO
// =====================================

function drawDebug(){

    ctx.fillStyle =
    "white";

    ctx.font =
    "16px Arial";

    ctx.fillText(

        "Player X: " +
        Math.floor(player.x),

        10,

        canvas.height - 60

    );

    ctx.fillText(

        "Player Y: " +
        Math.floor(player.y),

        10,

        canvas.height - 40

    );

    ctx.fillText(

        "Camera: " +
        Math.floor(cameraX),

        10,

        canvas.height - 20

    );

}

// =====================================
// DEV TOOLS
// =====================================

document.addEventListener(

    "keydown",

    (e)=>{

        // Heal

        if(e.key === "9"){

            player.health =
            GameData.maxHealth;

        }

        // Add Score

        if(e.key === "8"){

            player.addScore(
                100
            );

        }

        // Teleport Midway

        if(e.key === "7"){

            player.x = 4000;

        }

        // Teleport End

        if(e.key === "6"){

            player.x =
            goalFlag.x - 100;

        }

    }

);

// =====================================
// LOADING SCREEN
// =====================================

function waitForAssets(){

    if(
        Assets.ready()
    ){

        console.log(
            "Assets Loaded"
        );

        return;

    }

    setTimeout(
        waitForAssets,
        100
    );

}

waitForAssets();

// =====================================
// MAIN LOOP
// =====================================

function gameLoop(){

    update();

    draw();

    requestAnimationFrame(
        gameLoop
    );

}

gameLoop();

// =====================================
// LEVEL INFO
// =====================================

console.log(
`
=====================================
CROSSY CHICKEN ADVENTURE
=====================================

A/D = Move

W or SPACE = Jump

F = Peck

ESC = Pause

H = Toggle Controls

Developer Keys

9 = Full Health
8 = +100 Score
7 = Mid-Level Warp
6 = End-Level Warp

=====================================
`
);
