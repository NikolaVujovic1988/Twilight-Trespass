/**
 * Represents the Endboss character in the game, extending the basic MovebleObjects class.
 */
class Endboss extends MovebleObjects {

    /**
     * Height of the Endboss.
     * @type {number}
     */
    height = 550;

    /**
     * Width of the Endboss.
     * @type {number}
     */
    width = 430;

    /**
     * Y-position of the Endboss.
     * @type {number}
     */
    y = -60;

    /**
     * Flag indicating whether the Endboss is dead.
     * @type {boolean}
     */
    endbossIsDead = false;

    /**
     * Flag indicating if the death animation is in progress.
     * @type {boolean}
     */
    deathAnimationInProgress = false;

    /**
     * Instance to handle sounds related to the Endboss.
     * @type {Sounds}
     */
    sound = new Sounds();

    /**
     * Flag indicating whether the Endboss is facing left.
     * @type {boolean}
     */
    facingLeft = true;

    /**
     * The offset positions for the Endboss character.
     * @type {Object}
     */
    offset = {
        top: 200,
        left: 50,
        right: 50,
        bottom: 0
    };

    /**
     * Array of paths to images representing the walking animation of the Endboss.
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_walk_000.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_walk_001.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_walk_002.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_walk_003.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_walk_004.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_walk_005.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_walk_006.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_walk_007.png'
    ];

    /**
     * Array of paths to images representing the attack animation of the Endboss.
     * @type {string[]}
     */
    IMAGES_ATTACK = [
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_bite_000.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_bite_001.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_bite_002.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_bite_003.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_bite_004.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_bite_005.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_bite_006.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_bite_007.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_bite_008.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_bite_009.png'
    ];

    /**
     * Array of paths to images representing the death animation of the Endboss.
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_whacked_000.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_whacked_001.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_whacked_002.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_whacked_003.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_whacked_004.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_whacked_005.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_whacked_006.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_whacked_007.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_whacked_008.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_whacked_009.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_whacked_010.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_whacked_011.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_whacked_012.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_whacked_013.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_whacked_014.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_whacked_015.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_die_000.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_die_001.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_die_002.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_die_003.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_die_004.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_die_005.png'
    ];

    /**
     * Constructs a new Endboss instance.
     */
    constructor() {
        super();
        this.loadImage('img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_idle_000.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 4650;
        this.baseSpeed = 15;
        this.world = world;
        this.animateEndboss();
        this.huntCharacter();
    }

    /**
     * Sets up animations for the Endboss.
     */
    animateEndboss() {
        setInterval(() => {
            if (this.isCharacterCloseToEndboss()) {
                this.playAnimation(this.IMAGES_ATTACK);
            } else if (this.energy === 0 && !this.deathAnimationInProgress) {
                this.sound.endboss_dead.play();
                this.handleDeathAnimation();
            } else if (!this.endbossIsDead && !this.deathAnimationInProgress) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }

    /**
     * Handles the death animation for the Endboss.
     */
    handleDeathAnimation() {
        this.deathAnimationInProgress = true;
        let currentFrame = 0;

        const deathAnimationInterval = setInterval(() => {
            if (currentFrame >= this.IMAGES_DEAD.length) {
                clearInterval(deathAnimationInterval);
                this.endbossIsDead = true;
                this.gameWon();
            } else {
                this.img.src = this.IMAGES_DEAD[currentFrame];
                currentFrame++;
            }
        }, 200);
    }

    /**
     * Makes the Endboss hunt the character if character is near.
     */
    huntCharacter() {
        setInterval(() => {
            this.updateCharacterPassLimit();

            if (this.shouldHunt()) {
                this.updateSpeed();
                this.updateFacingDirection();
                this.moveEndboss();
            }
        }, 150);
    }

    /**
     * Updates the character's passing limit when Endboss healthbar should be shown.
     */
    updateCharacterPassLimit() {
        if (world.character.x >= 3500) {
            world.characterPassedLimit = true;
        }
    }

    /**
     * Checks whether the Endboss should hunt the character.
     * @returns {boolean} Returns true if the Endboss should hunt the character.
     */
    shouldHunt() {
        return world.characterPassedLimit && !this.endbossIsDead && !this.deathAnimationInProgress;
    }

    /**
     * Updates the speed of the Endboss based on the character's proximity.
     */
    updateSpeed() {
        if (this.isCharacterCloseToEndboss()) {
            this.speed = this.baseSpeed + 5;
        } else {
            this.speed = this.baseSpeed;
        }
    }
    /**
     * Updates the direction the Endboss is facing based on the character's position.
     */
    updateFacingDirection() {
        if (world.character.x > this.x + 300) {
            this.facingLeft = false;
        } else if (world.character.x < this.x) {
            this.facingLeft = true;
        }
    }

    /**
     * Moves the Endboss in the direction it's facing.
     */
    moveEndboss() {
        if (this.facingLeft) {
            this.moveLeft();
        } else {
            this.moveRight();
        }
    }
    
    /**
     * Shows the "You Won" screen.
     */
    gameWon() {
        const youWonScreen = document.getElementById('youWonScreen');
        youWonScreen.classList.remove('d-none');
        youWonScreen.innerHTML = this.gameWonScreenHTMLTemplate();
        clearAllIntervals();
        this.sound.game_won.play();

        setTimeout(() => {
            youWonScreen.classList.add('EndScreen');
        }, 300);
    }

    /**
     * Provides the HTML template for the "You Won" screen.
     * @returns {string} The HTML template.
     */
    gameWonScreenHTMLTemplate() {
        return `
            <h2 class="h2Endscreen">You Won !!!</h2>
            <button class="youLostBtn pointer" onclick="startGame()">Play Again ?</button>
        `;
    }

    /**
     * Checks if the character is close to the Endboss.
     * @returns {boolean} Returns true if the character is close.
     */
    isCharacterCloseToEndboss() {
        return Math.abs(this.x - world.character.x) < 200;
    }

}
