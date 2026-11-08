// =====================================
// PLAYER.JS
// CHICKEN RUNNER
// =====================================

class Chicken {

    constructor() {

        this.x = 100;
        this.y = 500;

        this.width = 96;
        this.height = 96;

        this.velX = 0;
        this.velY = 0;

        this.speed = 5;

        this.health = 5;

        this.score = 0;
        this.eggs = 0;

        this.grounded = false;

        this.direction = "right";

        this.animation = "idle";

        this.frame = 0;

        this.frameTimer = 0;

        this.frameSpeed = 8;

        this.attacking = false;

    }

    // ==============================
    // INPUT
    // ==============================

    handleInput() {

        this.velX = 0;

        if(keys["a"]) {

            this.velX = -this.speed;

            this.direction = "left";

            this.animation = "walkLeft";

        }

        if(keys["d"]) {

            this.velX = this.speed;

            this.direction = "right";

            this.animation = "walkRight";

        }

        if(
            !keys["a"] &&
            !keys["d"] &&
            !this.attacking
        ){

            this.animation = "idle";

        }

        if(
            (keys["w"] || keys[" "]) &&
            this.grounded
        ){

            this.velY =
            -GameData.jumpPower;

            this.grounded = false;

        }

        if(keys["f"]) {

            this.attacking = true;

            this.animation = "peck";

        }

    }

    // ==============================
    // PHYSICS
    // ==============================

    updatePhysics(){

        this.x += this.velX;

        this.velY +=
        GameData.gravity;

        this.y += this.velY;

    }

    // ==============================
    // ANIMATION
    // ==============================

    animate(){

        this.frameTimer++;

        if(
            this.frameTimer >=
            this.frameSpeed
        ){

            this.frameTimer = 0;

            this.frame++;

            if(this.frame > 5){

                this.frame = 0;

                if(this.attacking){

                    this.attacking =
                    false;

                    this.animation =
                    "idle";

                }

            }

        }

    }

    // ==============================
    // UPDATE
    // ==============================

    update(){

        this.handleInput();

        this.updatePhysics();

        this.animate();

    }

    // ==============================
    // DRAW
    // ==============================

    draw(){

        if(
            !Assets.ready()
        ) return;

        const frameWidth = 170;
        const frameHeight = 170;

        let row = 0;

        switch(
            this.animation
        ){

            case "idle":

                row = 0;

                break;

            case "walkRight":

                row = 1;

                break;

            case "walkLeft":

                row = 2;

                break;

            case "walkUp":

                row = 3;

                break;

            case "walkDown":

                row = 4;

                break;

            case "peck":

                row = 5;

                break;

            case "hurt":

                row = 6;

                break;

            case "death":

                row = 7;

                break;

        }

        ctx.drawImage(

            Assets.chickenSheet,

            this.frame *
            frameWidth,

            row *
            frameHeight,

            frameWidth,

            frameHeight,

            this.x -
            cameraX,

            this.y,

            this.width,

            this.height

        );

    }

    // ==============================
    // DAMAGE
    // ==============================

    takeDamage(amount){

        this.health -= amount;

        if(
            this.health < 0
        ){

            this.health = 0;

        }

    }

    // ==============================
    // SCORE
    // ==============================

    addScore(amount){

        this.score += amount;

    }

    // ==============================
    // EGGS
    // ==============================

    addEgg(){

        this.eggs++;

    }

}

// =====================================
// PLAYER INSTANCE
// =====================================

const player =
new Chicken();
