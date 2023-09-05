class Character extends MovebleObjects {

    height = 140;
    width = 220;
    y = 315;

    offset = {
        top: 20,
        left: 55,
        right: 55,
        bottom: 0
    };

    IMAGES_WALKING = [
        'Files/png/2x/hero2/WalkRight (1).png',
        'Files/png/2x/hero2/WalkRight (2).png',
        'Files/png/2x/hero2/WalkRight (3).png',
        'Files/png/2x/hero2/WalkRight (4).png'
    ];

    IMAGES_JUMPING = [
        'Files/png/2x/hero2/WalkRight (1).png',
        'Files/png/2x/hero2/WalkRight (2).png',
        'Files/png/2x/hero2/WalkRight (3).png',
        'Files/png/2x/hero2/WalkRight (4).png'
    ];

    IMAGES_DEAD = [
        'Files/png/2x/hero2/DeadRight (1).png',
        'Files/png/2x/hero2/DeadRight (2).png',
        'Files/png/2x/hero2/DeadRight (3).png'
    ];

    IMAGES_HURT = [
        'Files/png/2x/hero2/HurtRight.png'
    ];

    IMAGES_SHOT = [
        'Files/png/2x/hero2/ShootRight (1).png',
        'Files/png/2x/hero2/ShootRight (2).png',
        'Files/png/2x/hero2/ShootRight (3).png',
        'Files/png/2x/hero2/ShootRight (4).png'
    ]

    world;
    running_sound = new Audio('audio/running.mp3');
    trown_arrow = new Audio('audio/thrown-arrow.mp3');
    coin_collected = new Audio('audio/coin.mp3');
    jump_sound = new Audio('audio/jumping.mp3')
    speed = 5;
    bottles = 0;
    coinCount = 0;

    constructor() {
        super().loadImage('Files/png/2x/hero2/IdleRight (1).png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_SHOT);
        this.animate();
        this.applyGravity();
    }
    // TO DO!!! Splice animate() function on clean code principe!!!
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
    
            // First, check if the character is on the ground and if the D key is pressed.
            if (this.world.keyboard.D && this.hasThrowableObjects()) {
                this.throwObject();
            } else if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                this.jump_sound.play();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
    
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.world.keyboard.D && this.hasThrowableObjects()) {
                // Play the shooting animation whether on the ground or above
                this.playAnimation(this.IMAGES_SHOT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (!this.isAboveGround() && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 50);
    }
    

    throwObject() {
        // Adjusting x and y to set the position from where the object will be thrown
        let throwX = this.x + this.width;   // For right direction, starts at the right edge of the character
        if (this.lastDirection === 'left') {
            throwX = this.x;  // For left direction, starts at the left edge of the character
        }
        let throwY = this.y + (this.height / 5) - 30; // Middle of the character's height
    
        let throwable = new TrowableObject(throwX, throwY);
        throwable.direction = this.lastDirection;
        this.trown_arrow.play();
    }

    hasThrowableObjects() {
        return this.bottles > 0;
    }

    collectCoin() {
        this.coinCount += 1;
        this.coin_collected.play();
    }
    
}