class EndbossStatusbar extends DrawableObject {

    endboss = new Endboss();

    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    HEALTH_ENDBOSS = [
        'img/progress-bars/hearth-endboss.png'
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.loadImage(this.HEALTH_ENDBOSS);
        this.healthEndboss = this.imageCache[this.HEALTH_ENDBOSS[0]];
        this.x = 500;
        this.y = 0;
        this.width = 170;
        this.height = 40;
        this.setPercentage(this.percentage);
        this.energy -= 20;

        this.healthEndboss = new Image();
        this.healthEndboss.src = this.HEALTH_ENDBOSS[0];
    }
}
