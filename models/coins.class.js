class Coin extends DrawableObject {
    
    IMAGES = [
        'img/8_coin/coin_1.png'
    ];

    width = 100;
    height = 100;

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