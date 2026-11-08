// ===================================
// CROSSY CHICKEN ADVENTURE
// GAME.JS
// ===================================

// GAME STATE

let gameStarted = false;

let cameraX = 0;

const WORLD_WIDTH = 12000;

// ===================================
// PLAYER
// ===================================

class Chicken {

    constructor() {

        this.x = 100;
        this.y = 400;

        this.width = 64;
        this.height = 64;

        this.velX = 0;
        this.velY = 0;

        this.speed = GameData.playerSpeed;

        this.health = GameData.maxHealth;

        this.eggs = 0;

        this.score = 0;

        this.grounded = false;

        this.frame = 0;

        this.animationTime = 0;

        this.currentAnimation =
            ChickenAnimations.idle;

    }

    update() {

        this.velX = 0;

        if(keys["a"])
            this.velX = -this.speed;

        if(keys["d"])
            this.velX = this.speed;

        this.x += this.velX;

        if((keys["w"] || keys[" "]) &&
            this.grounded){

            this.velY =
                -GameData.jumpPower;

            this.grounded = false;

            Sounds.jump.play();

        }

        this.velY +=
            GameData.gravity;

        this.y += this.velY;

        this.grounded = false;

        levelPlatforms.forEach(platform=>{

            if(

                this.x + this.width >
                platform.x &&

                this.x <
                platform.x +
                platform.width &&

                this.y + this.height >
                platform.y &&

                this.y + this.height -
                this.velY <=
                platform.y

            ){

                this.y =
                    platform.y -
                    this.height;

                this.velY = 0;

                this.grounded = true;

            }

        });

        if(this.velX !== 0){

            this.currentAnimation =
                ChickenAnimations.walk;

        }

        else{

            this.currentAnimation =
                ChickenAnimations.idle;

        }

        this.animate();

    }

    animate() {

        this.animationTime++;

        if(this.animationTime > 10){

            this.frame++;

            this.animationTime = 0;

            if(
                this.frame >=
                this.currentAnimation.length
            ){

                this.frame = 0;

            }

        }

    }

    draw() {

        let frame =
            this.currentAnimation[
                this.frame
            ];

        ctx.drawImage(

            Assets.chickenSheet,

            frame.x,
            frame.y,

            frame.w,
            frame.h,

            this.x - cameraX,
            this.y,

            this.width,
            this.height

        );

    }

}

const player =
    new Chicken();

// ===================================
// PLATFORMS
// ===================================

const levelPlatforms = [];

for(let i=0;i<150;i++){

    levelPlatforms.push({

        x:i * 80,

        y:620,

        width:80,

        height:100

    });

}

levelPlatforms.push(

    {
        x:800,
        y:500,
        width:250,
        height:40
    },

    {
        x:1400,
        y:420,
        width:300,
        height:40
    },

    {
        x:2400,
        y:350,
        width:250,
        height:40
    },

    {
        x:3500,
        y:450,
        width:400,
        height:40
    }

);

// ===================================
// COINS
// ===================================

const coins = [];

for(let i=0;i<50;i++){

    coins.push({

        x:600 + i*200,

        y:300 +

        Math.sin(i)*100,

        collected:false

    });

}

// ===================================
// SLIMES
// ===================================

class Slime {

    constructor(x,y){

        this.x = x;
        this.y = y;

        this.width = 48;
        this.height = 48;

        this.dir = 1;

        this.origin =
        x;

        this.dead =
        false;

    }

    update(){

        if(this.dead)
            return;

        this.x +=
        this.dir * 2;

        if(
            this.x >
            this.origin + 120
        ){

            this.dir =
            -1;

        }

        if(
            this.x <
            this.origin - 120
        ){

            this.dir =
            1;

        }

        if(collide(
            player,
            this
        )){

            if(
                player.velY > 2
            ){

                this.dead =
                true;

                player.velY =
                -10;

                player.score +=
                100;

            }

            else{

                damagePlayer(
                    1
                );

            }

        }

    }

    draw(){

        if(this.dead)
            return;

        let frame =
        EnemySprites.slime.idle[0];

        ctx.drawImage(

            Assets.enemySheet,

            frame.x,
            frame.y,
            frame.w,
            frame.h,

            this.x-cameraX,
            this.y,

            64,
            64

        );

    }

}

const enemies = [

    new Slime(1000,560),

    new Slime(2200,560),

    new Slime(4200,560),

    new Slime(6000,560),

    new Slime(8000,560)

];

// ===================================
// COLLISION
// ===================================

function collide(a,b){

    return(

        a.x <
        b.x + b.width &&

        a.x + a.width >
        b.x &&

        a.y <
        b.y + b.height &&

        a.y + a.height >
        b.y

    );

}

// ===================================
// DAMAGE
// ===================================

function damagePlayer(amount){

    player.health -= amount;

    document
    .getElementById(
        "healthValue"
    )
    .innerText =
    player.health;

    Sounds.hurt.play();

    if(
        player.health <= 0
    ){

        player.health = 0;

        gameOver();

    }

}

// ===================================
// GAME OVER
// ===================================

function gameOver(){

    alert(
        "Game Over!"
    );

    location.reload();

}

// ===================================
// COINS
// ===================================

function updateCoins(){

    coins.forEach(coin=>{

        if(
            coin.collected
        )

            return;

        let dx =
            player.x - coin.x;

        let dy =
            player.y - coin.y;

        let distance =
            Math.sqrt(
                dx*dx +
                dy*dy
            );

        if(distance < 50){

            coin.collected =
            true;

            player.score +=
            50;

            Sounds.coin.play();

            document
            .getElementById(
                "scoreValue"
            )
            .innerText =
            player.score;

        }

    });

}

// ===================================
// DRAW COINS
// ===================================

function drawCoins(){

    coins.forEach(coin=>{

        if(
            coin.collected
        )

            return;

        ctx.fillStyle =
        "gold";

        ctx.beginPath();

        ctx.arc(

            coin.x-cameraX,

            coin.y,

            12,

            0,

            Math.PI * 2

        );

        ctx.fill();

    });

}

// ===================================
// WORLD DRAWING
// ===================================

function drawPlatforms(){

    levelPlatforms.forEach(

        platform=>{

            ctx.fillStyle =
            "#5d9642";

            ctx.fillRect(

                platform.x -
                cameraX,

                platform.y,

                platform.width,

                platform.height

            );

        }

    );

}

// ===================================
// CAMERA
// ===================================

function updateCamera(){

    cameraX =
        player.x - 400;

    if(
        cameraX < 0
    )

        cameraX = 0;

}

// ===================================
// MAIN UPDATE
// ===================================

function update(){

    player.update();

    updateCamera();

    updateCoins();

    enemies.forEach(

        enemy=>
        enemy.update()

    );

}

// ===================================
// MAIN DRAW
// ===================================

function draw(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.fillStyle =
    "#6fd3ff";

    ctx.fillRect(

        0,
        0,

        canvas.width,

        canvas.height

    );

    drawPlatforms();

    drawCoins();

    enemies.forEach(

        enemy=>
        enemy.draw()

    );

    player.draw();

}

// ===================================
// GAME LOOP
// ===================================

function gameLoop(){

    if(
        !gameStarted
    ){

        requestAnimationFrame(
            gameLoop
        );

        return;

    }

    update();

    draw();

    requestAnimationFrame(
        gameLoop
    );

}

// ===================================
// CALLED FROM INDEX.HTML
// ===================================

function initGame(){

    gameStarted = true;

    console.log(
        "Crossy Chicken Started"
    );

}

// ===================================
// START LOOP
// ===================================

gameLoop();
