// ======================================
// COLLISION.JS
// ======================================

// ======================================
// BASIC AABB COLLISION
// ======================================

function rectCollision(a, b) {

    return (

        a.x < b.x + b.width &&

        a.x + a.width > b.x &&

        a.y < b.y + b.height &&

        a.y + a.height > b.y

    );

}

// ======================================
// DISTANCE
// ======================================

function distance(x1, y1, x2, y2) {

    const dx = x2 - x1;
    const dy = y2 - y1;

    return Math.sqrt(
        dx * dx +
        dy * dy
    );

}

// ======================================
// GROUND COLLISION
// ======================================

function handleGroundCollision() {

    const groundY =
        WORLD.groundY;

    if(

        player.y +
        player.height >

        groundY

    ){

        player.y =
        groundY -
        player.height;

        player.velY = 0;

        player.grounded =
        true;

    }

}

// ======================================
// WORLD BORDER
// ======================================

function handleWorldBounds() {

    if(player.x < 0){

        player.x = 0;

    }

    if(

        player.x >
        WORLD.width -
        player.width

    ){

        player.x =
        WORLD.width -
        player.width;

    }

}

// ======================================
// DEATH PIT
// ======================================

function handleFallDeath() {

    if(

        player.y >
        canvas.height + 500

    ){

        player.health = 0;

        gameOver();

    }

}

// ======================================
// PLAYER VS ENEMIES
// ======================================

function handleEnemyCollisions() {

    enemies.forEach(enemy => {

        if(enemy.dead)
            return;

        if(

            player.x <
            enemy.x + enemy.width &&

            player.x +
            player.width >
            enemy.x &&

            player.y <
            enemy.y +
            enemy.height &&

            player.y +
            player.height >
            enemy.y

        ){

            // stomp

            if(

                player.velY > 2 &&

                player.y +
                player.height <

                enemy.y +
                enemy.height / 2

            ){

                enemy.takeDamage(1);

                player.velY = -12;

            }

            else{

                player.takeDamage(
                    1
                );

            }

        }

    });

}

// ======================================
// PLAYER VS OBSTACLES
// ======================================

function handleObstacleCollisions() {

    obstacles.forEach(obstacle => {

        if(

            obstacle.type !==
            "spikes"

        ){

            return;

        }

        if(

            player.x <
            obstacle.x + obstacle.w &&

            player.x +
            player.width >
            obstacle.x &&

            player.y <
            obstacle.y + obstacle.h &&

            player.y +
            player.height >
            obstacle.y

        ){

            player.takeDamage(1);

        }

    });

}

// ======================================
// PLAYER VS COINS
// ======================================

function handleCoinCollisions() {

    coins.forEach(coin => {

        if(
            coin.collected
        ) return;

        const d = distance(

            player.x +
            player.width / 2,

            player.y +
            player.height / 2,

            coin.x,

            coin.y

        );

        if(d < 40){

            coin.collected =
            true;

            player.addScore(
                Collectables.coinValue
            );

            if(Sounds.coin){

                Sounds.coin.currentTime = 0;

                Sounds.coin.play();

            }

        }

    });

}

// ======================================
// GOAL FLAG
// ======================================

function handleGoalCollision() {

    if(

        player.x +
        player.width >

        goalFlag.x

    ){

        if(typeof winGame ===
        "function"){

            winGame();

        }

    }

}

// ======================================
// PLATFORM COLLISION
// ======================================

function handlePlatformCollisions() {

    if(

        typeof levelPlatforms ===
        "undefined"

    ){

        return;

    }

    player.grounded = false;

    levelPlatforms.forEach(

        platform => {

            if(

                player.x <
                platform.x +
                platform.width &&

                player.x +
                player.width >
                platform.x &&

                player.y +
                player.height >
                platform.y &&

                player.y +
                player.height -
                player.velY <=
                platform.y

            ){

                player.y =
                platform.y -
                player.height;

                player.velY = 0;

                player.grounded =
                true;

            }

        }

    );

}

// ======================================
// MAIN COLLISION UPDATE
// ======================================

function updateCollisions() {

    handleGroundCollision();

    handlePlatformCollisions();

    handleWorldBounds();

    handleEnemyCollisions();

    handleObstacleCollisions();

    handleCoinCollisions();

    handleGoalCollision();

    handleFallDeath();

}

// ======================================
// CHECKPOINTS
// ======================================

let checkpointX = 100;

function activateCheckpoint(x) {

    if(x > checkpointX){

        checkpointX = x;

    }

}

function respawnPlayer() {

    player.x =
    checkpointX;

    player.y = 400;

    player.velX = 0;

    player.velY = 0;

}

// ======================================
// GAME OVER
// ======================================

function gameOver() {

    alert(
        "Game Over! Score: " +
        player.score
    );

    location.reload();

}

// ======================================
// WIN GAME
// ======================================

function winGame() {

    if(Sounds.win){

        Sounds.win.play();

    }

    alert(
        "YOU WIN!\n\nScore: " +
        player.score
    );

    location.reload();

}
