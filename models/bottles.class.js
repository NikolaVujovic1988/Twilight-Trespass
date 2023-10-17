/**
 * Represents a drawable arrow object on the canvas.
 * Extends the functionality of DrawableObject.
 */
class Bottle extends DrawableObject {

    /**
     * The width of the Arrow.
     * @type {number}
     */
    width = 60;

    /**
     * The height of the Arrow.
     * @type {number}
     */
    height = 40;

    /**
     * The offsets for the Arrow's positioning.
     * @type {Object}
     * @property {number} top - The top offset.
     * @property {number} left - The left offset.
     * @property {number} right - The right offset.
     * @property {number} bottom - The bottom offset.
     */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    /**
     * Array of image paths associated with the Arrow.
     * @type {string[]}
     */
    IMAGES = [
        'img/icons/arrow.png'
    ];

    /**
     * Constructs a Arrow object.
     * 
     * @param {number} x - The x-position of the Arrow.
     * @param {number} y - The y-position of the Arrow.
     */
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.loadImage(this.IMAGES);
    }
}
