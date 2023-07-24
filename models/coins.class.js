class Coin extends DrawableObject {
    
    IMAGES = [
        'img/8_coin/coin_1.png'
    ];

    width = 100;
    height = 100;
    
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.loadImage(this.IMAGES[0]); 
    }

}