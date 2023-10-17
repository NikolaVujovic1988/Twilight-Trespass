/**
 * Represents a Coin object that can be drawn on the screen.
 * @extends DrawableObject
 */
class Coin extends DrawableObject {
    
    /**
     * Array of image paths representing the coin.
     * @type {string[]}
     */
    IMAGES = [
        'img/progress-bars/star.png'
    ];

    /**
     * Width of the coin in pixels.
     * @type {number}
     */
    width = 30;

    /**
     * Height of the coin in pixels.
     * @type {number}
     */
    height = 30;

    /**
     * Offsets for the coin's bounding box.
     * @type {Object}
     * @property {number} top - Top offset.
     * @property {number} left - Left offset.
     * @property {number} right - Right offset.
     * @property {number} bottom - Bottom offset.
     */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };
    
    /**
     * Creates a new Coin instance.
     * @param {number} x - The x-coordinate where the coin will be drawn.
     * @param {number} y - The y-coordinate where the coin will be drawn.
     */
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.loadImage(this.IMAGES[0]); 
    }

}
