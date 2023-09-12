class Bottle extends DrawableObject {

    width = 80;
    height = 70;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    IMAGES = [
        'img/wand.png'
    ];

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.loadImage(this.IMAGES);
    }

}