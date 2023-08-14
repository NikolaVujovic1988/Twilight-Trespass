class Slime extends MovebleObjects {

    height = 70;
    width = 70;
    y = 380;

    isDead = false;


    IMAGES_WALKING = [
        'Files/png/2x/slime1/WalkLeft (1).png',
        'Files/png/2x/slime1/WalkLeft (2).png',
        'Files/png/2x/slime1/WalkLeft (3).png',
        'Files/png/2x/slime1/WalkLeft (4).png'
    ];

    IMAGES_DEAD = [
        'Files/png/2x/slime1/DeadLeft (1).png',
        'Files/png/2x/slime1/DeadLeft (2).png',
        'Files/png/2x/slime1/DeadLeft (3).png',
        'Files/png/2x/slime1/DeadLeft (4).png'
    ];
    

    constructor() {
        super().loadImage('Files/png/2x/slime1/WalkLeft (1).png');

        this.x = 500 + Math.random() * 4500;
        this.y = 300 - Math.random() * 300;
        this.speed = 0.50 + Math.random() * 0.5;
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