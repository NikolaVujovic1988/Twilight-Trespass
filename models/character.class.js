/**
 * Represents the main character in the game, capable of various movements and actions.
 * Extends the functionality of MovebleObjects.
 */
class Character extends MovebleObjects {

    /**
     * The height of the character.
     * @type {number}
     */
    height = 140;

    /**
     * The width of the character.
     * @type {number}
     */
    width = 220;

    /**
     * The y-position of the character.
     * @type {number}
     */
    y = 315;

    /**
     * The offsets for the character's positioning.
     * @type {Object}
     * @property {number} top - The top offset.
     * @property {number} left - The left offset.
     * @property {number} right - The right offset.
     * @property {number} bottom - The bottom offset.
     */
    offset = {
        top: 20,
        left: 75,
        right: 75,
        bottom: 40
    };

    /**
     * Array of image paths representing the character's walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'Files/png/2x/hero2/WalkRight (1).png',
        'Files/png/2x/hero2/WalkRight (2).png',
        'Files/png/2x/hero2/WalkRight (3).png',
        'Files/png/2x/hero2/WalkRight (4).png'
    ];

    /**
     * Array of image paths representing the character's jumping animation.
     * @type {string[]}
     */
    IMAGES_JUMPING = [
        'Files/png/2x/hero2/WalkRight (1).png',
        'Files/png/2x/hero2/WalkRight (2).png',
        'Files/png/2x/hero2/WalkRight (3).png',
        'Files/png/2x/hero2/WalkRight (4).png'
    ];

    /**
     * Array of image paths representing the character's dead state.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'Files/png/2x/hero2/DeadRight (1).png',
        'Files/png/2x/hero2/DeadRight (2).png',
        'Files/png/2x/hero2/DeadRight (3).png'
    ];

    /**
     * Array of image paths representing the character when hurt.
     * @type {string[]}
     */
    IMAGES_HURT = [
        'Files/png/2x/hero2/HurtRight.png'
    ];

    /**
     * Array of image paths representing the character shooting with a bow.
     * @type {string[]}
     */
    IMAGES_SHOT = [
        'Files/png/2x/hero2/ShootRight (1).png',
        'Files/png/2x/hero2/ShootRight (2).png',
        'Files/png/2x/hero2/ShootRight (3).png',
        'Files/png/2x/hero2/ShootRight (4).png'
    ];

    /**
     * Array of image paths representing the character's idle state.
     * @type {string[]}
     */
    IMAGES_IDLE = [
        'Files/png/1x/hero2/IdleRight (1).png',
        'Files/png/1x/hero2/IdleRight (2).png',
        'Files/png/1x/hero2/IdleRight (3).png',
        'Files/png/1x/hero2/IdleRight (4).png'
    ];

    /** 
         * The world in which the character exists.
         */
    world;

    /**
     * Object for managing game sounds.
     * @type {Sounds}
     */
    sounds = new Sounds();

    /**
     * Speed at which the character moves.
     * @type {number}
     */
    speed = 5;

    /**
     * Number of bottles the character possesses.
     * @type {number}
     */
    bottles = 0;

    /**
     * Count of coins the character has collected.
     * @type {number}
     */
    coinCount = 0;

    /**
     * Indicates if the character is dead.
     * @type {boolean}
     */
    characterIsDead = false;

    /**
     * Indicates if death animation is currently in progress.
     * @type {boolean}
     */
    deathAnimationInProgress = false;

    /**
     * Constructs a Character object.
     */
    constructor() {
        super().loadImage('Files/png/2x/hero2/IdleRight (1).png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_SHOT);
        this.loadImages(this.IMAGES_IDLE);
        this.animate();
        this.applyGravity();
    }

    /**
     * Animates the character based on various conditions.
     */
    animate() {
        setInterval(() => {
            this.sounds.rain.play();
            if (this.shouldCancelAnimation()) {
                return;
            }
            this.handleMovementAndActions();
        }, 1000 / 60);

        setInterval(() => {
            if (this.shouldCancelAnimation()) {
                return;
            }
            this.handleCharacterAnimation();
        }, 100);
    }

    /**
     * Determines if animation should be canceled based on character's state.
     * @returns {boolean} - True if animation should be canceled, otherwise false.
     */
    shouldCancelAnimation() {
        return this.characterIsDead || this.deathAnimationInProgress;
    }

    /**
     * Handles movement and actions based on keyboard inputs.
     */
    handleMovementAndActions() {
        this.handleRightMovement();
        this.handleLeftMovement();
        this.handleThrowAction();
        this.handleJumpAction();
        this.updateCameraPosition();
    }

    /**
     * Handles the character's movement to the right based on keyboard input.
     */
    handleRightMovement() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            this.lastDirection = 'right';
            this.playRunningSound();
        }
    }

    /**
     * Handles the character's movement to the left based on keyboard input.
     */
    handleLeftMovement() {
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            this.lastDirection = 'left';
            this.playRunningSound();
        }
    }

    /**
     * Plays the sound associated with the character running.
     */
    playRunningSound() {
        if (this.y > 310) {
            this.sounds.running_sound.play();
        }
    }

    /**
     * Handles the throw action based on keyboard input.
     */
    handleThrowAction() {
        if (this.world.keyboard.D && this.hasThrowableObjects()) {
            this.throwObject();
        }
    }

    /**
     * Handles the jump action of the character based on keyboard input and ground check.
     */
    handleJumpAction() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            this.sounds.jump_sound.play();
        }
    }

    /**
     * Updates the camera's x position based on the character's position.
     */
    updateCameraPosition() {
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Handles the character's animations based on its state.
     */
    handleCharacterAnimation() {
        if (this.isDead()) {
            this.handleDeathAnimation();
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else {
            this.handleRegularAnimation();
        }
    }

    /**
     * Handles the regular animations of the character based on movement or idle state.
     */
    handleRegularAnimation() {
        if (this.world.keyboard.D && this.hasThrowableObjects()) {
            this.playAnimation(this.IMAGES_SHOT);
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else if (!this.isAboveGround() && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)) {
            this.playAnimation(this.IMAGES_WALKING);
        } else if (!this.isAboveGround() && !this.isAnyKeyPressed()) {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }

    /**
     * Checks if any movement-related key is pressed.
     * @returns {boolean} - True if no key is pressed, otherwise false.
     */
    isAnyKeyPressed() {
        return !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.SPACE && !this.world.keyboard.D;
    }

    /**
     * Enables the character to throw an Arrow.
     */
    throwObject() {
        let throwX = this.x + this.width;
        if (this.lastDirection === 'left') {
            throwX = this.x;
        }
        let throwY = this.y + (this.height / 5) - 30;

        let throwable = new TrowableObject(throwX, throwY);
        throwable.direction = this.lastDirection;
        this.sounds.trown_arrow.currentTime = 0;
        this.sounds.trown_arrow.play();
    }

    /**
     * Determines if the character has throwable objects.
     * @returns {boolean} - True if character has throwable objects, otherwise false.
     */
    hasThrowableObjects() {
        return this.bottles > 0;
    }

    /**
     * Handles the coin collection action.
     */
    collectCoin() {
        this.coinCount += 1;
        this.sounds.coin_collected.currentTime = 0;
        this.sounds.coin_collected.play();
    }

    /**
     * Handles the death animation of the character.
     */
    handleDeathAnimation() {
        this.deathAnimationInProgress = true;
        let currentFrame = 0;

        const deathAnimationInterval = setInterval(() => {
            if (currentFrame >= this.IMAGES_DEAD.length) {
                clearInterval(deathAnimationInterval);
                this.characterIsDead = true;
                this.youLost();
            } else {
                this.img.src = this.IMAGES_DEAD[currentFrame];
                currentFrame++;
            }
        }, 200);
    }

    /**
     * Displays the 'you lost' screen.
     */
    youLost() {
        const youLostScreen = document.getElementById('youLostScreen');
        youLostScreen.classList.remove('d-none');
        youLostScreen.innerHTML = this.youLostScreenHTMLTemplate();
        clearAllIntervals();
        this.sounds.game_over.play();

        setTimeout(() => {
            youLostScreen.classList.add('EndScreen');
        }, 300);
    }

    /**
     * Provides the HTML template for the 'you lost' screen.
     * @returns {string} - The HTML template as a string.
     */
    youLostScreenHTMLTemplate() {
        return `
            <h2 class="h2Endscreen">You Lost !!!</h2>
            <button class="youLostBtn pointer" onclick="startGame()">Play Again ?</button>
        `;
    }

}