/**
 * Represents the game world where different objects interact.
 */
class World {
    character = new Character();
    statusbar = new Statusbar();
    coinbar = new Coinsbar();
    hyena = new Hyena();
    bottlesBar = new BottleStatusbar();
    endboss = new Endboss();
    endbossStatusbar = new EndbossStatusbar();
    sounds = new Sounds();

    characterPassedLimit = false;
    level = level1;
    endboss;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    isFullScreen = false;
    trowableObjects = [];
    coin = [];
    bottle = [];
    enemiesToAnimateDeath = [];


    /**
     * Creates a new game world.
     *
     * @param {HTMLCanvasElement} canvas - The canvas on which the game world is rendered.
     * @param {Object} keyboard - The keyboard input handler.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.volume = 1;
        this.previousVolume = 0;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.run();
        this.generateObjects(this.coin, Coin, 15, 400, 3500, 100, 300);
        this.generateObjects(this.bottle, Bottle, 10, 400, 3500, 100, 300);
    }

    /**
     * Sets the current world instance to the character.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Main game loop that checks for collisions at a regular interval.
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkTrowObjects();
        }, 150);
    }

    /**
     * Generates objects in the game world.
     *
     * @param {Array} objectArray - The array to store the generated objects.
     * @param {Function} objClass - The class constructor of the objects to be generated.
     * @param {number} numObjects - The number of objects to be generated.
     * @param {number} minX - The minimum x-coordinate for object placement.
     * @param {number} maxX - The maximum x-coordinate for object placement.
     * @param {number} minY - The minimum y-coordinate for object placement.
     * @param {number} maxY - The maximum y-coordinate for object placement.
     */
    generateObjects(objectArray, objClass, numObjects, minX, maxX, minY, maxY) {
        for (let i = 0; i < numObjects; i++) {
            const x = Math.random() * (maxX - minX) + minX;
            const y = Math.random() * (maxY - minY) + minY;
            objectArray.push(new objClass(x, y));
        }
    }

    /**
    * Checks collisions between the character and regular enemies.
    */
    checkEnemyCollisions() {
        for (let enemy of this.level.enemies) {
            if (enemy && !enemy.isDead && this.character.isColliding(enemy)) {
                this.handleEnemyCollision(enemy);
            }
        }
    }
    /**
     * Handle actions after colliding with an enemy
     */
    handleEnemyCollision(enemy) {
        // Check if the bottom of the character is descending on the enemy
        if (this.character.isColliding(enemy) && this.character.y + this.character.height - this.character.offset.bottom - 30 < enemy.y + enemy.offset.top) {
                enemy.isDead = true;
                this.sounds.enemyHurtSounds(enemy);
                this.enemiesToAnimateDeath.push(enemy);
        } else {
            this.character.hit();
            this.sounds.character_hurt.play();
            this.statusbar.setPercentage(this.character.energy);
        }
        console.warn('character is on:', this.character.y + this.character.height - this.character.offset.bottom);
        console.log('enemy is on:', enemy.y + enemy.offset.top);
    }
    /**
     * Check collision with endboss
     */
    checkEndbossCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (enemy && enemy instanceof Endboss && this.character.isColliding(enemy)) {
                this.character.hit();
                this.sounds.character_hurt.play();
                this.statusbar.setPercentage(this.character.energy);
            }
        });
    }

    /**
     * Check collisions of arrows with regular enemies
     */
    checkArrowRegularEnemyCollisions() {
        for (let i = this.trowableObjects.length - 1; i >= 0; i--) {
            for (let j = this.level.enemies.length - 1; j >= 0; j--) {
                let enemy = this.level.enemies[j];
                let arrow = this.trowableObjects[i];

                if (enemy && !enemy.isDead && arrow && arrow.isColliding(enemy)) {
                    this.handleArrowHit(enemy, i);
                    break;
                }
            }
        }
    }

    /**
     * Check collisions of arrows with Endboss instances
     */
    checkArrowEndbossCollisions() {
        for (let i = this.trowableObjects.length - 1; i >= 0; i--) {
            for (let j = this.level.enemies.length - 1; j >= 0; j--) {
                let enemy = this.level.enemies[j];
                let arrow = this.trowableObjects[i];

                if (enemy instanceof Endboss && arrow && arrow.isColliding(enemy)) {
                    this.handleEndbossDamage(enemy);
                    this.trowableObjects.splice(i, 1);
                    break;
                }
            }
        }
    }

    /**
     * Main function to call Collisions between enemies and arrows
     */
    checkArrowEnemyCollisions() {
        this.checkArrowRegularEnemyCollisions();
        this.checkArrowEndbossCollisions();
    }

    /**
     * Handle arrow hitting an enemy
     */
    handleArrowHit(enemy, arrowIndex) {
        this.sounds.enemyHurtSounds(enemy);
        enemy.isDead = true;
        this.enemiesToAnimateDeath.push(enemy);
        this.trowableObjects.splice(arrowIndex, 1);
    }

    /**
    * Animate the death of enemies and remove if needed
    */
    checkAnimateAndRemoveEnemies() {
        this.enemiesToAnimateDeath = this.enemiesToAnimateDeath.filter(enemy => {
            if (enemy && enemy.shouldRemove) {
                const index = this.level.enemies.indexOf(enemy);
                if (index !== -1) this.level.enemies.splice(index, 1);
                return false;
            } else {
                this.animateEnemyDeath(enemy);
                return true;
            }
        });
    }

    /**
     * Check collision with bottles
     */
    checkBottleCollisions() {
        for (let i = 0; i < this.bottle.length; i++) {
            if (this.bottle[i] && this.character.isColliding(this.bottle[i])) {
                this.character.bottles++;
                this.sounds.arrow_collected.currentTime = 0;
                this.sounds.arrow_collected.play();
                this.bottlesBar.setPercentage(this.character.bottles * 20);
                this.bottle.splice(i, 1);
                i--;
            }
        }
    }

    /**
     * Check collision with coins
     */
    checkCoinCollisions() {
        for (let i = this.coin.length - 1; i >= 0; i--) {
            let percentage = this.character.coinCount * 20;
            if (percentage > 100) {
                percentage = 100;
            }
            if (this.coin[i] && this.character.isColliding(this.coin[i])) {
                this.character.collectCoin();
                this.coinbar.setPercentage(percentage);
                this.coin.splice(i, 1);
            }
        }
    }

    /**
     * Main function to check for all types of collisions in the game world.
     */
    checkCollisions() {
        this.checkEnemyCollisions();
        this.checkEndbossCollisions();
        this.checkArrowEnemyCollisions();
        this.checkAnimateAndRemoveEnemies();
        if (this.bottle) { // Adding a check for bottle array existence before calling its collision check
            this.checkBottleCollisions();
        }
        if (this.coin) { // Adding a check for coin array existence before calling its collision check
            this.checkCoinCollisions();
        }
    }

    /**
     * Handles damage to the end boss.
     *
     * @param {Object} enemy - The enemy instance representing the end boss.
     */
    handleEndbossDamage(enemy) {
        enemy.hit(20);
        this.sounds.enemyHurtSounds(enemy);
        this.endbossStatusbar.setPercentage(enemy.energy);
    }

    /**
     * Animates the death sequence for an enemy.
     *
     * @param {Object} enemy - The enemy instance to be animated.
     */
    animateEnemyDeath(enemy) {
        if (enemy.animationInitialized) return; // ensures animation starts only once
        enemy.animationInitialized = true; // flag to mark the animation started
        let currentAnimationFrame = 0;
        const deathAnimationFrames = enemy.IMAGES_DEAD;
        const animationDuration = 200;
        const animationInterval = setInterval(() => {
            this.advanceDeathAnimation(enemy, deathAnimationFrames, currentAnimationFrame, animationInterval);
            currentAnimationFrame++;
        }, animationDuration);
    }

    advanceDeathAnimation(enemy, frames, frameIndex, interval) {
        if (frameIndex >= frames.length - 1) {
            enemy.loadImage(frames[frames.length - 1]); // Set to the last frame
            clearInterval(interval);
            enemy.shouldRemove = true; // flag to mark the enemy to be removed
        } else {
            enemy.loadImage(frames[frameIndex]);
        }
    }

    /**
     * Checks for throwable object actions.
     */
    checkTrowObjects() {
        if (this.keyboard.D && this.character.hasThrowableObjects()) {
            let bottle = new TrowableObject(this.character.x + 30, this.character.y + 30);
            bottle.direction = this.character.lastDirection;
            this.trowableObjects.push(bottle);
            this.character.bottles--;
            this.bottlesBar.setPercentage(this.character.bottles * 20);
        }
    }

    /**
     * Main drawing function that continuously renders the game world.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.coin);
        this.addObjectsToMap(this.bottle);

        this.ctx.translate(-this.camera_x, 0);
        // ------ space for fixed objects -------------
        this.addToMap(this.statusbar);
        this.addToMap(this.coinbar);
        this.addToMap(this.bottlesBar);
        if (this.characterPassedLimit) {
            this.addToMap(this.endbossStatusbar);
        }

        // ------ space for fixed objects -------------

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.trowableObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);

        this.bottlesBar.setPercentage(this.character.bottles * 20);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Adds a collection of objects to the map.
     *
     * @param {Array} objects - Array of objects to be added to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Adds a single object to the map.
     *
     * @param {Object} moveble - The object to be added to the map.
     */
    addToMap(moveble) {
        if (moveble instanceof Bug || moveble.otherDirection || (moveble instanceof Endboss && !moveble.facingLeft) || (moveble instanceof TrowableObject && moveble.direction === 'left')) {
            this.flipCharacter(moveble);
        }
        moveble.draw(this.ctx);
        moveble.drawFrame(this.ctx);

        if (moveble instanceof Bug || moveble.otherDirection || (moveble instanceof Endboss && !moveble.facingLeft) || (moveble instanceof TrowableObject && moveble.direction === 'left')) {
            this.flipCharacterBack(moveble);
        }
    }

    /**
     * Flips an object's orientation in the game world.
     *
     * @param {Object} moveble - The object whose orientation is to be flipped.
     */
    flipCharacter(moveble) {
        this.ctx.save();
        this.ctx.translate(moveble.width, 0);
        this.ctx.scale(-1, 1);
        moveble.x = moveble.x * -1;
    }

    /**
     * Reverts an object's orientation to its original in the game world after it has been flipped.
     *
     * @param {Object} moveble - The object whose orientation is to be reverted.
     */
    flipCharacterBack(moveble) {
        this.ctx.restore();
        moveble.x = moveble.x * -1;
    }

}