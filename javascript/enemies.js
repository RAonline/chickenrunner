// =====================================
// ENEMIES.JS
// =====================================

class Enemy {

    constructor(type,x,y){

        this.type = type;

        this.data =
        EnemyTypes[type];

        this.x = x;
        this.y = y;

        this.startX = x;

        this.width =
        this.data.width;

        this.height =
        this.data.height;

        this.speed =
        this.data.speed;

        this.health =
        this.data.health;

        this.dead = false;

        this.direction = 1;

        this.frame = 0;

        this.frameTimer = 0;

        this.animationSpeed = 10;

    }

    // =============================
    // AI
    // =============================

    update(){

        if(this.dead)
            return;

        this.patrol();

        this.animate();

        this.checkPlayerCollision();

    }

    patrol(){

        if(this.type === "plant")
            return;

        this.x +=
        this.speed *
        this.direction;

        if(
            this.x >
            this.startX + 120
        ){

            this.direction = -1;

        }

        if(
            this.x <
            this.startX - 120
        ){

            this.direction = 1;

        }

    }

    animate(){

        this.frameTimer++;

        if(
            this.frameTimer >=
            this.animationSpeed
        ){

            this.frameTimer = 0;

            this.frame++;

            if(
                this.frame >= 3
            ){

                this.frame = 0;

            }

        }

    }

    checkPlayerCollision(){

        if(
            !player ||
            this.dead
        ) return;

        if(

            player.x <
            this.x + this.width &&

            player.x + player.width >
            this.x &&

            player.y <
            this.y + this.height &&

            player.y + player.height >
            this.y

        ){

            // stomp

            if(
                player.velY > 3
            ){

                this.takeDamage(1);

                player.velY = -8;

            }

            else{

                player.takeDamage(
                    GameData.enemyDamage
                );

            }

        }

    }

    takeDamage(amount){

        if(this.dead)
            return;

        this.health -= amount;

        if(this.health <= 0){

            this.dead = true;

            player.addScore(100);

        }

    }

    draw(){

        if(this.dead)
            return;

        const frameSize = 128;

        let sourceX =
        this.frame *
        frameSize;

        let sourceY =
        this.data.row *
        frameSize;

        ctx.save();

        if(
            this.direction < 0
        ){

            ctx.scale(-1,1);

            ctx.drawImage(

                Assets.enemySheet,

                sourceX,
                sourceY,

                frameSize,
                frameSize,

                -(this.x-cameraX)
                - this.width,

                this.y,

                this.width,
                this.height

            );

        }

        else{

            ctx.drawImage(

                Assets.enemySheet,

                sourceX,
                sourceY,

                frameSize,
                frameSize,

                this.x-cameraX,

                this.y,

                this.width,
                this.height

            );

        }

        ctx.restore();

    }

}

// =====================================
// LEVEL ENEMIES
// =====================================

const enemies = [

    // SPAWN AREA

    new Enemy(
        "slime",
        700,
        555
    ),

    new Enemy(
        "slime",
        1200,
        555
    ),

    // FOREST

    new Enemy(
        "goblin",
        1900,
        540
    ),

    new Enemy(
        "goblin",
        2400,
        540
    ),

    // GRAVEYARD

    new Enemy(
        "skeleton",
        3200,
        540
    ),

    new Enemy(
        "skeleton",
        3600,
        540
    ),

    // CAVE

    new Enemy(
        "bat",
        4500,
        350
    ),

    new Enemy(
        "bat",
        5000,
        300
    ),

    // DANGER ZONE

    new Enemy(
        "spider",
        5600,
        560
    ),

    new Enemy(
        "ghost",
        6200,
        450
    ),

    // FINAL AREA

    new Enemy(
        "bandit",
        7200,
        520
    )

];

// =====================================
// UPDATE
// =====================================

function updateEnemies(){

    for(
        let enemy of enemies
    ){

        enemy.update();

    }

}

// =====================================
// DRAW
// =====================================

function drawEnemies(){

    for(
        let enemy of enemies
    ){

        enemy.draw();

    }

}
