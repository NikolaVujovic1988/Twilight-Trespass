class Statusbar extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    HEALTH = [
        'img/progress-bars/hearth-character.png'
    ]

    percentage = 100;

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