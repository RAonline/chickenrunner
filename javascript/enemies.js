// =====================================
// ENEMIES.JS
// CHICKEN RUNNER
// =====================================

class Enemy {

    constructor(type,x,y){

        this.type = type;

        this.x = x;
        this.y = y;

        this.startX = x;

        this.direction = 1;

        this.dead = false;

        this.frame = 0;
        this.frameTimer = 0;

        this.health =
        EnemyTypes[type].health;

        this.width = 80;
        this.height = 80;

        this.speed =
        EnemyTypes[type].speed;

    }

    // ===========================
    // UPDATE
    // ===========================

    update(){

        if(this.dead)
            return;

        this.move();

        this.animate();

        this.checkCollision();

    }

    // ===========================
    // MOVEMENT
    // ===========================

    move(){

        if(
            this.type === "plant"
        ){

            return;

        }

        this.x +=
        this.speed *
        this.direction;

        if(
            this.x >
            this.startX + 150
        ){

            this.direction = -1;

        }

        if(
            this.x <
            this.startX - 150
        ){

            this.direction = 1;

        }

    }

    // ===========================
    // PLAYER COLLISION
    // ===========================

    checkCollision(){

        if(

            player.x <
            this.x + this.width &&

            player.x +
            player.width >
            this.x &&

            player.y <
            this.y + this.height &&

            player.y +
            player.height >
            this.y

        ){

            // Stomp

            if(
                player.velY > 2 &&
                player.y <
                this.y
            ){

                this.takeDamage(1);

                player.velY =
                -10;

            }

            else{

                player.takeDamage(1);

            }

        }

    }

    // ===========================
    // DAMAGE
    // ===========================

    takeDamage(amount){

        this.health -= amount;

        if(
            this.health <= 0
        ){

            this.dead =
            true;

            player.addScore(100);

        }

    }

    // ===========================
    // ANIMATE
    // ===========================

    animate(){

        this.frameTimer++;

        if(
            this.frameTimer > 10
        ){

            this.frameTimer = 0;

            this.frame++;

            if(
                this.frame > 2
            ){

                this.frame = 0;

            }

        }

    }

    // ===========================
    // DRAW
    // ===========================

    draw(){

        if(this.dead)
            return;

        if(
            !Assets.ready()
        ) return;

        const frameWidth = 150;
        const frameHeight = 150;

        const row =
        EnemyTypes[
            this.type
        ].row;

        ctx.save();

        if(
            this.direction < 0
        ){

            ctx.scale(-1,1);

            ctx.drawImage(

                Assets.enemySheet,

                this.frame *
                frameWidth,

                row *
                frameHeight,

                frameWidth,

                frameHeight,

                -(this.x-cameraX) -
                this.width,

                this.y,

                this.width,

                this.height

            );

        }

        else{

            ctx.drawImage(

                Assets.enemySheet,

                this.frame *
                frameWidth,

                row *
                frameHeight,

                frameWidth,

                frameHeight,

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

    // Slimes

    new Enemy(
        "slime",
        900,
        540
    ),

    new Enemy(
        "slime",
        1400,
        540
    ),

    // Goblins

    new Enemy(
        "goblin",
        2200,
        520
    ),

    new Enemy(
        "goblin",
        2800,
        520
    ),

    // Skeletons

    new Enemy(
        "skeleton",
        3500,
        520
    ),

    new Enemy(
        "skeleton",
        3900,
        520
    ),

    // Bats

    new Enemy(
        "bat",
        4600,
        300
    ),

    new Enemy(
        "bat",
        5200,
        350
    ),

    // Spider

    new Enemy(
        "spider",
        6000,
        540
    ),

    // Ghost

    new Enemy(
        "ghost",
        6700,
        450
    ),

    // Final Bandit

    new Enemy(
        "bandit",
        7300,
        500
    )

];

// =====================================
// UPDATE ALL
// =====================================

function updateEnemies(){

    enemies.forEach(enemy=>{

        enemy.update();

    });

}

// =====================================
// DRAW ALL
// =====================================

function drawEnemies(){

    enemies.forEach(enemy=>{

        enemy.draw();

    });

}
