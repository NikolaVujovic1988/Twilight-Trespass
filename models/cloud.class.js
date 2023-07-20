class Cloud extends MovebleObjects {

    y = 50;
    width = 500;
    height = 250;

    constructor(){
        super().loadImage('../img/5_background/layers/4_clouds/1.png');
        
        this.x = Math.random() * 500;
        this.direction = 'right';
        this.animateClouds();
    }

    animateClouds(){
        setInterval(() => {
            if (this.direction === 'right') {
                if (this.x >= 2000) {
                    this.direction = 'left';
                } else {
                    this.x += this.speed;
                }
            } else { // this.direction === 'left'
                if (this.x <= 0) {
                    this.direction = 'right';
                } else {
                    this.x -= this.speed;
                }
            }
        }, 25);
    }
}