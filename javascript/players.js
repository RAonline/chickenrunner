// =====================================
// PLAYER.JS
// =====================================

class Chicken {

    constructor() {

        this.x = 100;
        this.y = 500;

        this.width = 64;
        this.height = 64;

        this.velX = 0;
        this.velY = 0;

        this.speed = GameData.playerSpeed;

        this.health = GameData.maxHealth;

        this.score = 0;
        this.eggs = 0;

        this.grounded = false;

        this.facing = "right";

        this.animation = "idle";

        this.frame = 0;

        this.frameTimer = 0;

        this.frameSpeed = 8;

        this.attacking = false;

    }

    // ==========================
    // INPUT
    // ==========================

    handleInput() {

        this.velX = 0;

        if(keys["a"]){

            this.velX = -this.speed;

            this.facing = "left";

        }

        if(keys["d"]){

            this.velX = this.speed;

            this.facing = "right";

        }

        if(
            (keys["w"] ||
             keys["arrowup"] ||
             keys[" "]) &&
            this.grounded
        ){

            this.velY = -GameData.jumpPower;

            this.grounded = false;

            if(Sounds.jump){
                Sounds.jump.currentTime = 0;
                Sounds.jump.play();
            }

        }

        if(keys["f"]){

            this.attacking = true;

        }

    }

    // ==========================
    // MOVEMENT
    // ==========================

    updatePhysics() {

        this.x += this.velX;

        this.velY += GameData.gravity;

        this.y += this.velY;

        if(this.y > 1000){

            this.health = 0;

        }

    }

    // ==========================
    // ANIMATION
    // ==========================

    chooseAnimation() {

        if(this.health <= 0){

            this.animation = "death";

            return;

        }

        if(this.attacking){

            this.animation = "peck";

            return;

        }

        if(!this.grounded){

            if(this.facing === "right")
                this.animation = "walkRight";
            else
                this.animation = "walkLeft";

            return;

        }

        if(this.velX > 0){

            this.animation = "walkRight";

        }

        else if(this.velX < 0){

            this.animation = "walkLeft";

        }

        else{

            this.animation = "idle";

        }

    }

    animate() {

        this.frameTimer++;

        const anim =
        ChickenAnimations[
            this.animation
        ];

        if(this.frameTimer >= this.frameSpeed){

            this.frameTimer = 0;

            this.frame++;

            if(this.frame >= anim.frames){

                this.frame = 0;

                if(this.attacking){

                    this.attacking = false;

                }

            }

        }

    }

    // ==========================
    // UPDATE
    // ==========================

    update() {

        this.handleInput();

        this.updatePhysics();

        this.chooseAnimation();

        this.animate();

    }

    // ==========================
    // DRAW
    // ==========================

    draw() {

        if(!Assets.ready())
            return;

        const spriteWidth = 128;
        const spriteHeight = 128;

        const anim =
        ChickenAnimations[
            this.animation
        ];

        const sourceX =
        this.frame * spriteWidth;

        const sourceY =
        anim.row * spriteHeight;

        if(this.facing === "left"){

            ctx.save();

            ctx.scale(-1,1);

            ctx.drawImage(

                Assets.chickenSheet,

                sourceX,
                sourceY,

                spriteWidth,
                spriteHeight,

                -(this.x-cameraX)-this.width,
                this.y,

                this.width,
                this.height

            );

            ctx.restore();

        }

        else{

            ctx.drawImage(

                Assets.chickenSheet,

                sourceX,
                sourceY,

                spriteWidth,
                spriteHeight,

                this.x-cameraX,
                this.y,

                this.width,
                this.height

            );

        }

    }

    // ==========================
    // DAMAGE
    // ==========================

    takeDamage(amount) {

        this.health -= amount;

        document.getElementById(
            "healthValue"
        ).innerText =
        Math.max(this.health,0);

        if(Sounds.hurt){

            Sounds.hurt.currentTime = 0;

            Sounds.hurt.play();

        }

    }

    // ==========================
    // COINS
    // ==========================

    addScore(amount){

        this.score += amount;

        document.getElementById(
            "scoreValue"
        ).innerText =
        this.score;

    }

    addEgg(){

        this.eggs++;

        document.getElementById(
            "eggValue"
        ).innerText =
        this.eggs;

    }

}

// =====================================
// CREATE PLAYER
// =====================================

const player =
new Chicken();
