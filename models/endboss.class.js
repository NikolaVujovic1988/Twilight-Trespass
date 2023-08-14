class Endboss extends MovebleObjects {

    height = 400;
    width = 250;
    y = 95;


    IMAGES_WALKING = [
        'Files/png/2x/slime2/WalkLeft (1).png',
        'Files/png/2x/slime2/WalkLeft (2).png',
        'Files/png/2x/slime2/WalkLeft (3).png',
        'Files/png/2x/slime2/WalkLeft (4).png',

    ];


    constructor() {
        super().loadImage('Files/png/2x/slime2/WalkLeft (1).png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 4650;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }
}