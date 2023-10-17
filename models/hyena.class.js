/**
 * Represents a Hyena character in the game.
 * Extends the functionalities of MovebleObjects class.
 * Contains methods to generate image paths, animate the hyena character, and determine its state based on the character's proximity.
 */
class Hyena extends MovebleObjects {

    height = 140;
    width = 140;
    y = 315;
    isDead = false;
    currentFrame = 0; // To store the current frame
    currentState = 'walking'; // To store the current animation state

    BASE_PATH = 'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/brown/';

    IMAGES_WALKING = this.generateImagePaths('__brown_hyena_walk_', 8);
    IMAGES_DEAD = this.generateImagePaths('__brown_hyena_die_', 6);
    IMAGES_ATTACK = this.generateImagePaths('__brown_hyena_bite_', 10);

    offset = {
        top: 40,
        left: 20,
        right: 20,
        bottom: 0
    };

    /**
     * Constructs the Hyena object.
     * Initializes the object's properties, loads necessary images, and triggers animation.
     */
    constructor() {
        super().loadImage(this.BASE_PATH + '__brown_hyena_idle_000.png');

        this.x = 700 + Math.random() * 5000;
        this.speed = 2 + Math.random();
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACK);
        this.animate();
    }

    /**
    * Generates an array of image paths based on a given base name and count.
    * 
    * @param {string} base - The base name of the image files.
    * @param {number} count - The number of images that need to be generated using the base name.
    * @returns {string[]} - An array of fully constructed image paths.
    * 
    * How it works:
    * 1. An array of a specified length (`count`) is created using `Array.from`.
    * 2. For each element in the array, a callback function is executed.
    * 3. Inside the callback:
    *     a. The `BASE_PATH` (a class property) is prefixed. This is the directory path where all images are stored.
    *     b. The `base` parameter is added next. This is the common prefix for the set of images being generated.
    *     c. The index `i` is converted to a string and padded with zeroes to the left, ensuring it's always three characters long. 
    *        This is because the image names have a format like "001", "002", and so on.
    *     d. The file extension ".png" is suffixed.
    * 4. The end result is an array of image paths, ready to be used elsewhere in the code.
    */
    generateImagePaths(base, count) {
        return Array.from({ length: count }, (_, i) => `${this.BASE_PATH}${base}${String(i).padStart(3, '0')}.png`);
    }


    /**
     * Initiates the animation process for the Hyena.
     * A set interval updates the Hyena's position, animation state, and frame if it's not dead.
     */
    animate() {
        setInterval(() => {
            if (!this.isDead) {
                this.moveLeft();
                this.updateStateAndAnimate();
                this.incrementFrame();
            }
        }, 1000 / 25);
    }

    /**
     * Updates the Hyena's animation state based on the proximity to the main character.
     * Sets the Hyena to either 'attacking' or 'walking' state.
     */
    updateStateAndAnimate() {
        if (this.isCharacterClose()) {
            this.updateStateAndPlayAnimation('attacking', this.IMAGES_ATTACK);
        } else {
            this.updateStateAndPlayAnimation('walking', this.IMAGES_WALKING);
        }
    }

    /**
     * Updates the Hyena's current state and plays the corresponding animation.
     * 
     * @param {string} state - The desired animation state ('attacking' or 'walking').
     * @param {string[]} animation - Array of image paths representing the animation frames.
     */
    updateStateAndPlayAnimation(state, animation) {
        if (this.currentState !== state) {
            this.currentState = state;
            this.resetFrame();
        }
        this.playAnimation(animation);
    }

    /**
     * Resets the animation frame counter to its initial value.
     */
    resetFrame() {
        this.currentFrame = 0;
    }

    /**
     * Increments the animation frame counter by one.
     */
    incrementFrame() {
        this.currentFrame++;
    }

    /**
     * Plays the animation using the provided array of image paths.
     * Loads images one by one based on the current frame. Resets to the first image when the end is reached.
     * 
     * @param {string[]} images - Array of image paths representing the animation frames.
     */
    playAnimation(images) {
        if (this.currentFrame >= images.length) this.currentFrame = 0; // Reset if we've passed the end
        super.loadImage(images[this.currentFrame]);
    }

    /**
     * Determines if the main character is close to the Hyena.
     * 
     * @returns {boolean} - True if the character is within a specified proximity; otherwise, false.
     */
    isCharacterClose() {
        return Math.abs(this.x - world.character.x) < 150;
    }
}
