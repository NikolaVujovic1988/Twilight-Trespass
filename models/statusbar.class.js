/**
 * Represents the status bar of a game character or entity, showing visual representation of health or other attributes.
 * This class extends the DrawableObject class.
 */
class Statusbar extends DrawableObject {

    /**
     * Array of image paths for different health stages on the status bar.
     * @type {string[]}
     * @default various stages of health
     */
    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    /**
     * Array containing image paths for a representation of health, e.g., a heart.
     * @type {string[]}
     * @default image of a heart
     */
    HEALTH = [
        'img/progress-bars/hearth-character.png'
    ]

    /**
     * Represents the current health or status percentage of the entity.
     * @type {number}
     * @default 100
     */
    percentage = 100;

    /**
     * Constructs a new Statusbar with default properties and loads required images.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.loadImage(this.HEALTH);
        this.health = this.imageCache[this.HEALTH[0]];
        this.x = 40;
        this.y = 0;
        this.width = 170;
        this.height = 40;
        this.setPercentage(100);

        this.health = new Image();
        this.health.src = this.HEALTH[0];
    }
}