/**
 * Represents a Coinsbar that visually displays a percentage of coins collected.
 * @extends DrawableObject
 */
class Coinsbar extends DrawableObject {

    /**
     * Array of image paths representing the coin's progress.
     * @type {string[]}
     */
    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ];

    /**
     * Array containing the image path for the star.
     * @type {string[]}
     */
    STAR = [
        'img/progress-bars/star.png'
    ];

    /**
     * Creates a new Coinsbar instance.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.loadImage(this.STAR);
        this.star = this.imageCache[this.STAR[0]];
        this.x = 35;
        this.y = 50;
        this.width = 175;
        this.height = 40;
        this.setPercentage(0);

        this.star = new Image();
        this.star.src = this.STAR[0];
    }

    /**
     * Sets the coin percentage display of the coinsbar.
     * @param {number} percentage - The percentage of coins to display.
    */
    setPercentage(percentage) {
        let path = this.IMAGES[percentage / 20];
        this.img = this.imageCache[path];
    }
}