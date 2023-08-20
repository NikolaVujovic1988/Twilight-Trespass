class Endboss extends MovebleObjects {

    height = 300;
    width = 250;
    y = 165;


    IMAGES_WALKING = [
        'Files/png/1x/shroom1/WalkLeft (1).png',
        'Files/png/2x/shroom1/WalkLeft (2).png',
        'Files/png/2x/shroom1/WalkLeft (3).png',
        'Files/png/2x/shroom1/WalkLeft (4).png',

    ];


    constructor() {
        super().loadImage('Files/png/1x/shroom1/IdleLeft (1).png');
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