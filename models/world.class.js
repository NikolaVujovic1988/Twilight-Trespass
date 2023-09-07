class World {
    character = new Character();
    statusbar = new Statusbar();
    coins = new Coinsbar();
    hyena = new Hyena();
    bottlesBar = new BottleStatusbar();
    endbossStatusbar = new EndbossStatusbar();
    sounds = new Sounds();
    character_hurt = new Audio('audio/pain.mp3');
    hyena_hurt = new Audio('audio/hyena-hurt.mp3');
    arrow_collected = new Audio('audio/arrow-collected.mp3');
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


    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.volume = 1;
        this.previousVolume = 0;
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.run();
        this.generateObjects(this.coin, Coin, 120, 350);
        this.generateObjects(this.bottle, Bottle, 120, 350);
        this.setupEventListeners();
        this.setupFullScreenChangeHandler();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkTrowObjects();
        }, 150);
    }

    // Function to generate a single object (Coin or Bottle)
    generateObject(objClass, xCenter, yCenter, radius, angle) {
        const x = xCenter + radius * Math.cos(angle);
        const y = yCenter - radius * Math.sin(angle);
        return new objClass(x, y);
    }

    // Function to generate a semi-circle arc of objects (Coins or Bottles)
    generateArc(objClass, xCenter, yCenter, radius, objectsPerArc) {
        const objects = [];
        for (let i = 0; i < objectsPerArc; i++) {
            const angle = Math.PI * i / (objectsPerArc - 1);
            objects.push(this.generateObject(objClass, xCenter, yCenter, radius, angle));
        }
        return objects;
    }

    // Function to generate all the arcs of objects (Coins or Arrows)
    generateObjects(objectArray, objClass, minYCenter, maxYCenter) {
        const numArcs = 4;
        const radius = 100;
        let xCenter = 400;
        const xStep = 400;

        for (let i = 0; i < numArcs; i++) {
            const objectsPerArc = Math.floor(Math.random() * 3) + 3;
            const yCenter = Math.random() * (maxYCenter - minYCenter) + minYCenter;
            const arcObjects = this.generateArc(objClass, xCenter, yCenter, radius, objectsPerArc);
            objectArray.push(...arcObjects);
            xCenter += xStep;
        }
    }

    // Check collision with regular enemies
    checkEnemyCollisions() {
        for (let i = this.level.enemies.length - 1; i >= 0; i--) {
            let enemy = this.level.enemies[i];
            if (enemy && !enemy.isDead && this.character.isColliding(enemy)) {
                this.handleEnemyCollision(enemy);
            }
        }
    }

    // Handle actions after colliding with an enemy
    handleEnemyCollision(enemy) {
        // Check if the bottom of the character is above the top of the enemy
        if (this.character.y + this.character.height/2 <= enemy.y + enemy.offset.top) {
            console.warn('enemy is on', enemy.y, 'character is on', this.character.y + this.character.height);
            enemy.isDead = true;
            this.sounds.enemyHurtSounds();

            this.enemiesToAnimateDeath.push(enemy);
        } else {
            console.log('enemy is on', enemy.y, 'character is on', this.character.y + this.character.height);
            this.character.hit();
            this.character_hurt.play();
            this.statusbar.setPercentage(this.character.energy);
        }
    }

    // Check collision with end bosses
    checkEndbossCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (enemy && enemy instanceof Endboss && this.character.isColliding(enemy)) {
                this.character.hit();
                this.character_hurt.play();
                this.statusbar.setPercentage(this.character.energy);
            }
        });
    }

    // Check collisions of arrows with regular enemies
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

    // Check collisions of arrows with Endboss instances
    checkArrowEndbossCollisions() {
        for (let i = this.trowableObjects.length - 1; i >= 0; i--) {
            for (let j = this.level.enemies.length - 1; j >= 0; j--) {
                let enemy = this.level.enemies[j];
                let arrow = this.trowableObjects[i];

                if (enemy instanceof Endboss && arrow && arrow.isColliding(enemy)) {
                    enemy.hit();
                    
                    this.sounds.enemyHurtSounds();
                    this.endbossStatusbar.setPercentage(enemy.energy);
                    console.warn(enemy.energy);
                    this.trowableObjects.splice(i, 1);
                    break;
                }
            }
        }
    }

    // Main function to call Collisions between enemies and arrows
    checkArrowEnemyCollisions() {
        this.checkArrowRegularEnemyCollisions();
        this.checkArrowEndbossCollisions();
    }



    // Handle arrow hitting an enemy
    handleArrowHit(enemy, arrowIndex) {
        enemy.isDead = true;
        this.enemiesToAnimateDeath.push(enemy);
        this.trowableObjects.splice(arrowIndex, 1);
    }

    // Animate the death of enemies and remove if needed
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

    // Check collision with bottles
    checkBottleCollisions() {
        for (let i = 0; i < this.bottle.length; i++) {
            if (this.bottle[i] && this.character.isColliding(this.bottle[i])) {
                this.character.bottles++;
                this.arrow_collected.currentTime = 0;
                this.arrow_collected.play();
                this.bottlesBar.setPercentage(this.character.bottles * 20);
                this.bottle.splice(i, 1);
                i--;
            }
        }
    }


    // Check collision with coins and update the coin count
    checkCoinCollisions() {
        for (let i = this.coin.length - 1; i >= 0; i--) {
            let percentage = this.character.coinCount * 20;
            if (percentage > 100) {
                percentage = 100;
            }
            if (this.coin[i] && this.character.isColliding(this.coin[i])) {
                this.character.collectCoin();
                this.coins.setPercentage(percentage);
                this.coin.splice(i, 1);
            }
        }
    }

    // Main function to call the broken down functions
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

    animateEnemyDeath(enemy) {
        if (enemy.animationInitialized) return; // ensures animation starts only once

        enemy.animationInitialized = true; // flag to mark the animation started
        let currentAnimationFrame = 0;
        const deathAnimationFrames = enemy.IMAGES_DEAD;

        const animationInterval = setInterval(() => {
            if (currentAnimationFrame >= deathAnimationFrames.length - 1) {
                enemy.loadImage(deathAnimationFrames[deathAnimationFrames.length - 1]); // Set to the last frame
                clearInterval(animationInterval);
                enemy.shouldRemove = true; // flag to mark the enemy to be removed
            } else {
                enemy.loadImage(deathAnimationFrames[currentAnimationFrame]);
                currentAnimationFrame++;
            }
        }, 200);
    }

    checkTrowObjects() {
        if (this.keyboard.D && this.character.hasThrowableObjects()) {
            let bottle = new TrowableObject(this.character.x + 30, this.character.y + 30);
            bottle.direction = this.character.lastDirection;
            this.trowableObjects.push(bottle);
            this.character.bottles--;
            this.bottlesBar.setPercentage(this.character.bottles * 20);
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        // this.addObjectsToMap(this.level.clouds);
        // this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.coin);
        this.addObjectsToMap(this.bottle);

        this.ctx.translate(-this.camera_x, 0);
        // ------ space for fixed objects -------------
        this.addToMap(this.statusbar);
        this.addToMap(this.endbossStatusbar);
        this.addToMap(this.coins);
        this.addToMap(this.bottlesBar);

        // ------ space for fixed objects -------------

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.trowableObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);

        this.bottlesBar.setPercentage(this.character.bottles * 20);
        this.showIcons();

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(moveble) {
        if (moveble instanceof Bug || moveble.otherDirection || (moveble instanceof TrowableObject && moveble.direction === 'left')) {
            this.flipCharacter(moveble);
        }
        moveble.draw(this.ctx);
        moveble.drawFrame(this.ctx);

        if (moveble instanceof Bug || moveble.otherDirection || (moveble instanceof TrowableObject && moveble.direction === 'left')) {
            this.flipCharacterBack(moveble);
        }
    }


    showIcons() {
        let imgVolume = new Image();
        let imgFullScreen = new Image();
        imgFullScreen.src = this.isFullScreen ? "img/icons/close.png" : "img/icons/fullscreen.png";
        imgVolume.src = this.volume ? "img/icons/medium-volume.png" : "img/icons/mute (1).png";
        const iconWidth = 20;
        const iconSpacing = 10;
        const totalWidth = 2 * iconWidth + iconSpacing;
        this.ctx.drawImage(imgFullScreen, (this.canvas.width - totalWidth) / 2, 10, iconWidth, iconWidth);
        this.ctx.drawImage(imgVolume, (this.canvas.width - totalWidth) / 2 + iconWidth + iconSpacing, 10, iconWidth, iconWidth);
    }

    flipCharacter(moveble) {
        this.ctx.save();
        this.ctx.translate(moveble.width, 0);
        this.ctx.scale(-1, 1);
        moveble.x = moveble.x * -1;
    }

    flipCharacterBack(moveble) {
        this.ctx.restore();
        moveble.x = moveble.x * -1;
    }

    setupFullScreenChangeHandler() {
        const handler = () => {
            this.isFullScreen = document.fullscreenElement == this.canvas;
            this.draw();  // Force a redraw to refresh the fullscreen icon immediately.
        };

        document.addEventListener('fullscreenchange', handler);
    }


    setupEventListeners() {
        this.canvas.addEventListener('click', (event) => {
            let rect = this.canvas.getBoundingClientRect();
            let x = event.clientX - rect.left;
            let y = event.clientY - rect.top;

            const iconWidth = 20;
            const iconSpacing = 10;
            const totalWidth = 2 * iconWidth + iconSpacing;
            const startFullScreenX = (this.canvas.width - totalWidth) / 2;
            const startVolumeX = (this.canvas.width - totalWidth) / 2 + iconWidth + iconSpacing;

            if (x >= startFullScreenX && x <= startFullScreenX + iconWidth &&
                y >= 10 && y <= 10 + iconWidth) {
                this.openFullscreen();
            }

            if (x >= startVolumeX && x <= startVolumeX + iconWidth &&
                y >= 10 && y <= 10 + iconWidth) {
                this.toggleVolume();
            }
        });
    }

    openFullscreen() {
        if (!this.isFullScreen) {
            this.canvas.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    toggleVolume() {
        if (this.volume) {
            this.previousVolume = this.volume;
            this.volume = 0;
            // Adjust the icon to indicate muted status
        } else {
            this.volume = this.previousVolume || 1;  // Adjust the icon back to indicate volume is on
        }
    }

}