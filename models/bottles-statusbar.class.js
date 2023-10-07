class BottleStatusbar extends DrawableObject {

    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];

    THUNDER = [
        'img/progress-bars/thunder.png'
    ];

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

        this.thunder = new Image();
        this.thunder.src = this.THUNDER[0];
    }
}