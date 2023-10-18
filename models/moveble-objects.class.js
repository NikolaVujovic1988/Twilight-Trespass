/**
 * Represents objects that can be moved and interacted with in the game environment.
 * This class extends the DrawableObject class to provide movement functionality.
 */
class MovebleObjects extends DrawableObject {

    /**
     * Speed at which the object moves.
     * @type {number}
     * @default 0.15
     */
    speed = 0.15;

    /**
     * Indicates if the object is moving in the opposite direction.
     * @type {boolean}
     * @default false
     */
    otherDirection = false;

    /**
     * Vertical speed of the object.
     * @type {number}
     * @default 0
     */
    speedY = 0;

    /**
     * Rate at which the speed of the object increases over time.
     * @type {number}
     * @default 2
     */
    acceleration = 2;

    /**
     * Current energy or health of the object.
     * @type {number}
     * @default 100
     */
    energy = 100;

    /**
     * Timestamp of the last hit received by the object.
     * @type {number}
     * @default 0
     */
    lastHit = 0;

    /**
     * Previous vertical position of the character.
     * @type {number}
     * @default 291
     */
    CharacterPreviousY = 291;

    /**
    * Represents the offset values for the objects.
    * @property {number} top - The top offset value. Default is 0.
    * @property {number} left - The left offset value. Default is 0.
    * @property {number} right - The right offset value. Default is 0.
    * @property {number} bottom - The bottom offset value. Default is 0.
    */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };


    /**
     * Applies gravity effect to the object.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.CharacterPreviousY = this.y + 101;
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} - Returns true if the object is above the ground, otherwise false.
     */
    isAboveGround() {
        if (this instanceof TrowableObject) {
            return true;
        } else {
            return this.y < 300;
        }
    }

    /**
     * Plays animations of the provided images.
     * @param {string[]} images - Array containing paths to the animation images.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the object jump.
     */
    jump() {
        this.speedY = 30;
    }

    /**
     * Checks if the object is colliding with another moveable object.
     * @param {MovebleObjects} mo - The moveable object to check collision with.
     * @returns {boolean} - Returns true if the objects are colliding, otherwise false.
     */
    isColliding(mo) {
        return (this.x + this.width - (this.offset.right || 0)) > mo.x + (mo.offset.left || 0) &&
            this.x + (this.offset.left || 0) < (mo.x + mo.width - (mo.offset.right || 0)) &&
            (this.y + this.height - (this.offset.bottom || 0)) > mo.y + (mo.offset.top || 0) &&
            this.y + (this.offset.top || 0) < (mo.y + mo.height - (mo.offset.bottom || 0));
    }

    /**
     * Reduces the object's energy by a specified damage amount.
     * @param {number} [damage=5] - The amount of damage to apply. Default is 5.
     */
    hit(damage = 5) {
        this.energy -= damage;
        if (this.energy < 20) {
            this.energy = 0;
        }
        else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is hurt.
     * @returns {boolean} - Returns true if the object was hit recently, otherwise false.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // Difference in ms
        timePassed = timePassed / 1000; // Difference in s
        return timePassed < 0.2;
    }

    /**
     * Checks if the object is dead.
     * @returns {boolean} - Returns true if the object's energy is 0, otherwise false.
     */
    isDead() {
        return this.energy === 0;
    }
}