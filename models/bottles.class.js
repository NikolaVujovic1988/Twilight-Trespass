class Bottle extends DrawableObject {

    width = 50;
    height = 60;

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