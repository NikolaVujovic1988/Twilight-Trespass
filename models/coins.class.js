class Coin extends DrawableObject {
    
    IMAGES = [
        'img/progress-bars/star.png'
    ];

    width = 30;
    height = 30;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };
    
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.loadImage(this.IMAGES[0]); 
    }

}