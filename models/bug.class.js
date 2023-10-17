/**
 * Represents a bug that can move and be affected by gravity on the canvas.
 * Extends the functionality of MovebleObjects.
 */
class Bug extends MovebleObjects {

    /**
     * The height of the bug.
     * @type {number}
     */
    height = 70;

    /**
     * The width of the bug.
     * @type {number}
     */
    width = 70;

    /**
     * The y-position of the bug.
     * @type {number}
     */
    y = 380;

    /**
     * Indicates whether the bug is dead or not.
     * @type {boolean}
     */
    isDead = false;

    /**
     * The gravity value affecting the bug.
     * @type {number}
     */
    gravity = 0.25;

    /**
     * The y-velocity of the bug.
     * @type {number}
     */
    velocityY = 0;

    /**
     * The offsets for the bug's positioning.
     * @type {Object}
     * @property {number} top - The top offset.
     * @property {number} left - The left offset.
     * @property {number} right - The right offset.
     * @property {number} bottom - The bottom offset.
     */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    /**
     * Array of image paths representing the bug walking animation.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/Purple Bug Sprites/png/skeleton-animation_00.png',
        'img/Purple Bug Sprites/png/skeleton-animation_01.png',
        'img/Purple Bug Sprites/png/skeleton-animation_02.png',
        'img/Purple Bug Sprites/png/skeleton-animation_03.png',
        'img/Purple Bug Sprites/png/skeleton-animation_04.png',
        'img/Purple Bug Sprites/png/skeleton-animation_05.png',
        'img/Purple Bug Sprites/png/skeleton-animation_06.png',
        'img/Purple Bug Sprites/png/skeleton-animation_07.png',
        'img/Purple Bug Sprites/png/skeleton-animation_08.png',
        'img/Purple Bug Sprites/png/skeleton-animation_09.png',
        'img/Purple Bug Sprites/png/skeleton-animation_10.png',
        'img/Purple Bug Sprites/png/skeleton-animation_11.png',
        'img/Purple Bug Sprites/png/skeleton-animation_12.png',
        'img/Purple Bug Sprites/png/skeleton-animation_13.png'

    ];

    /**
     * Array of image paths representing the bug's dead state.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/Purple Bug Sprites/png/skeleton-animation_08.png',
        'img/Purple Bug Sprites/png/skeleton-animation_09.png',
        'img/Purple Bug Sprites/png/skeleton-animation_10.png',
        'img/Purple Bug Sprites/png/skeleton-animation_11.png'
    ];


    /**
        * Constructs a Bug object.
        */
    constructor() {
        super().loadImage('Files/png/2x/slime1/WalkLeft (1).png');

        this.x = 500 + Math.random() * 4500;
        this.y = 300 - Math.random() * 300;
        this.speed = 0.50 + Math.random() * 0.5;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
        this.applyGravity();
    }

    /**
     * Applies gravity effect to the bug.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isDead) {
                this.velocityY += this.gravity;
                this.y += this.velocityY;
                if (this.y > 375) {
                    this.y = 375;
                    this.velocityY = 0;
                }
            }
        }, 1000 / 60);
    }

    /**
     * Animates the bug, making it move and change animation frames.
     */
    animate() {
        setInterval(() => {
            if (!this.isDead) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead) {
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 150);
    }
}