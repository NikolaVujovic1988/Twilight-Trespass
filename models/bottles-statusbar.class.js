/**
 * Represents a status bar with arrow imagery which can be drawn on the canvas.
 * Extends the functionality of DrawableObject.
 */
class BottleStatusbar extends DrawableObject {

      /**
     * Array of image paths representing the status of the bottle.
     * @type {string[]}
     */
    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];

     /**
     * Array of image paths representing thunder.
     * @type {string[]}
     */
    THUNDER = [
        'img/progress-bars/thunder.png'
    ];

     /**
     * Constructs a BottleStatusbar.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.loadImage(this.THUNDER);
        this.thunder = this.imageCache[this.THUNDER[0]];
        this.x = 40;
        this.y = 100;
        this.width = 170;
        this.height = 40;
        this.setPercentage(0);

        // Create a new Image instance for thunder
        this.thunder = new Image();
        this.thunder.src = this.THUNDER[0];
    }
}