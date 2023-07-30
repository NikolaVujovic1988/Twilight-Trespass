class Coinsbar extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 40;
        this.y = 40;
        this.width = 170;
        this.height = 40;
        this.setPercentage(0);
    }

    setPercentage(percentage) {
        let path = this.IMAGES[percentage / 20];
        this.img = this.imageCache[path];
    }
}