class EndbossStatusbar extends Statusbar {

    endboss = new Endboss();

    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 500;
        this.setPercentage(this.percentage);
        this.energy -= 20;
    }
}
