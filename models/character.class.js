class Character extends MovebleObjects {

    height = 150;
    y = 220;
    IMAGES_WALKING = [
        'img/png/Run (1).png',
        'img/png/Run (2).png',
        'img/png/Run (3).png',
        'img/png/Run (4).png',
        'img/png/Run (5).png',
        'img/png/Run (6).png',
        'img/png/Run (7).png',
        'img/png/Run (8).png'
    ];

    IMAGES_JUMPING = [
        'img/png/Jump (1).png',
        'img/png/Jump (2).png',
        'img/png/Jump (3).png',
        'img/png/Jump (4).png',
        'img/png/Jump (5).png',
        'img/png/Jump (6).png',
        'img/png/Jump (7).png',
        'img/png/Jump (8).png',
        'img/png/Jump (9).png',
        'img/png/Jump (10).png'
    ];

    IMAGES_DEAD = [
        'img/png/Dead (1).png',
        'img/png/Dead (2).png',
        'img/png/Dead (3).png',
        'img/png/Dead (4).png',
        'img/png/Dead (5).png',
        'img/png/Dead (6).png',
        'img/png/Dead (7).png',
        'img/png/Dead (8).png',
        'img/png/Dead (9).png',
        'img/png/Dead (10).png'
    ];

    IMAGES_HURT = [
        'img/png/Dead (1).png',
        'img/png/Dead (2).png'
    ];

    world;
    running_sound = new Audio('./audio/running.mp3');
    speed = 5;
    bottles = 0;
    coinCount = 0;

    constructor() {
        super().loadImage('img/png/Idle (1).png');
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