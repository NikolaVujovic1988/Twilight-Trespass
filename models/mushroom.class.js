class Mushroom extends MovebleObjects {

    height = 70;
    width = 70;
    y = 375;

    isDead = false;


    IMAGES_WALKING = [
        'Files/png/2x/shroom2/WalkLeft (1).png',
        'Files/png/2x/shroom2/WalkLeft (2).png',
        'Files/png/2x/shroom2/WalkLeft (3).png',
        'Files/png/2x/shroom2/WalkLeft (4).png'
    ];

    constructor() {
        super().loadImage('Files/png/2x/shroom2/WalkLeft (1).png');

        this.x = 300 + Math.random() * 4500;
        this.speed = 0.15 + Math.random() * 0.5;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (!this.isDead) {
                this.moveLeft();
            }
        }, 1000 / 60);
        
        setInterval(() => {
            if (!this.isDead) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 150);
    }


}