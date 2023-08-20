class TrowableObject extends MovebleObjects {


    constructor(x, y) {
        super().loadImage('Files/png/1x/hero2/Arrow (1).png');
        this.x = x + 50;
        this.y = y + 30;
        this.width = 50;
        this.height = 60;
        this.trow();
    }

    trow() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            if (this.direction === 'right') {
                this.x += 10;
            } else {
                this.x -= 10;
                if(!this.otherDirection) {
                    this.flipArrow();
                }
            }
        }, 25);
    }

    flipArrow() {
        this.otherDirection = true;
    }

}