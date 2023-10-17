/**
 * Represents a status bar for the Endboss character, extending the basic DrawableObject class.
 */
class EndbossStatusbar extends DrawableObject {

    /**
     * The Endboss character for which the status bar is displayed.
     * @type {Endboss}
     */
    endboss = new Endboss();

    /**
     * Array of paths to images representing the health status of the Endboss.
     * @type {string[]}
     */
    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    /**
         * Path to the Endboss health icon.
         * @type {string[]}
         */
    HEALTH_ENDBOSS = [
        'img/progress-bars/hearth-endboss.png'
    ];

    /**
     * Percentage of health for the Endboss.
     * @type {number}
     */
    percentage = 100;

    /**
     * Constructs a new EndbossStatusbar instance.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.loadImage(this.HEALTH_ENDBOSS);
        this.healthEndboss = this.imageCache[this.HEALTH_ENDBOSS[0]];
        this.x = 480;
        this.y = 0;
        this.width = 200;
        this.height = 40;
        this.setPercentage(this.percentage);
        this.energy -= 20;

        this.healthEndboss = new Image();
        this.healthEndboss.src = this.HEALTH_ENDBOSS[0];
    }
}
