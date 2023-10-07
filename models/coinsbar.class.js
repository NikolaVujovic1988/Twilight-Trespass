class Coinsbar extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ];

    STAR = [
        'img/progress-bars/star.png'
    ];

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

    setPercentage(percentage) {
        let path = this.IMAGES[percentage / 20];
        this.img = this.imageCache[path];
    }
}