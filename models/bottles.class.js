class Bottle extends DrawableObject {

    width = 80;
    height = 70;

    IMAGES = [
        'Files/png/1x/hero2/Arrow (1).png'
    ];

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.loadImage(this.IMAGES);
    }

}