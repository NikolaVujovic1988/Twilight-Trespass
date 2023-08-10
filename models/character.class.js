class Character extends MovebleObjects {

    height = 150;
    y = 300;
    IMAGES_WALKING = [
        'Files/png/1x/hero2/WalkRight (1).png',
        'Files/png/1x/hero2/WalkRight (2).png',
        'Files/png/1x/hero2/WalkRight (3).png',
        'Files/png/1x/hero2/WalkRight (4).png'
    ];

    IMAGES_JUMPING = [
        'Files/png/1x/hero2/WalkRight (1).png',
        'Files/png/1x/hero2/WalkRight (2).png',
        'Files/png/1x/hero2/WalkRight (3).png',
        'Files/png/1x/hero2/WalkRight (4).png'
    ];

    IMAGES_DEAD = [
        'Files/png/1x/hero2/DeadRight (1).png',
        'Files/png/1x/hero2/DeadRight (2).png',
        'Files/png/1x/hero2/DeadRight (3).png'
    ];

    IMAGES_HURT = [
        'Files/png/1x/hero2/HurtRight.png'
    ];

    world;
    running_sound = new Audio('./audio/running.mp3');
    speed = 5;
    bottles = 0;
    coinCount = 0;

    constructor() {
        super().loadImage('Files/png/1x/hero2/IdleRight (1).png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.applyGravity();
    }

    animate() {

        setInterval(() => {
            this.running_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.lastDirection = 'right';
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                this.running_sound.play();
                this.lastDirection = 'left';
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);


        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            }
            else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 50);
    }

    collectCoin() {
        this.coinCount += 1;
    }
}