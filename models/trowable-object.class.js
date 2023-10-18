/**
 * Represents an object that can be thrown in a game.
 * This class extends the MovebleObjects class.
 */
class TrowableObject extends MovebleObjects {

    /**
     * Constructs a new ThrowableObject at the specified position and initializes the object's properties.
     *
     * @param {number} x - The x-coordinate where the object is initialized.
     * @param {number} y - The y-coordinate where the object is initialized.
     */
    constructor(x, y) {
        super().loadImage('Files/png/1x/hero2/Arrow (1).png');
        this.x = x + 50;
        this.y = y + 30;
        this.width = 50;
        this.height = 60;
        this.trow();
    }

    /**
     * Throws the object in the specified direction with the influence of gravity.
     * The direction is determined by the 'direction' property.
     * It also adjusts the position of the object over time.
     */
    trow() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            if (this.direction === 'right') {
                this.x += 10;
            } else {
                this.x -= 10;
                if(!this.otherDirection) {
                    this.flipArrow();
                }
            }
        }, 25);
    }

    /**
     * Flips the direction of the arrow. 
     * Updates the 'otherDirection' property to true indicating the arrow has been flipped.
     */
    flipArrow() {
        this.otherDirection = true;
    }
}