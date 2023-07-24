class Bottle extends DrawableObject {

    width = 50;
    height = 60;

    IMAGES = [
        'img/6_salsa_bottle/salsa_bottle.png'
    ];

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.loadImage(this.IMAGES);
    }

}