class MovebleObjects extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    energy = 100;
    lastHit = 0;
    CharacterPreviousY = 291;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.CharacterPreviousY = this.y + 101;
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof TrowableObject) {
            return true;
        } else {
            return this.y < 300;
        }
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
        this.sounds.running_sound.play();
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }

    isColliding(mo) {
        if (!mo || !mo.offset) {
            console.warn("Undefined object or offset encountered in isColliding method.");
            return false;
        }
    
        return (this.x + this.width - (this.offset?.right || 0)) >= mo.x + (mo.offset.left || 0) &&
               this.x + (this.offset?.left || 0) <= (mo.x + mo.width - (mo.offset.right || 0)) &&
               (this.y + this.height - (this.offset?.bottom || 0)) >= mo.y + (mo.offset.top || 0) &&
               this.y + (this.offset?.top || 0) <= (mo.y + mo.height - (mo.offset.bottom || 0));
    }
    
    
    hit() {
        this.energy -= 5;
        if (this.energy < 20) {
            this.energy = 0;
        }
        else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // Difference in ms
        timePassed = timePassed / 1000; // Difference in s
        return timePassed < 0.2;
    }

    isDead() {
        return this.energy === 0;
    }
}