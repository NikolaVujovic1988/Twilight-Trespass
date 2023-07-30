class World {
    character = new Character();
    statusbar = new Statusbar();
    coins = new Coinsbar();
    bottlesBar = new BottleStatusbar();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    isFullScreen = false;
    trowableObjects = [];
    coin = [];
    bottle = [];


    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
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

    // Function to generate all the arcs of objects (Coins or Bottles)
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


    checkCollisions() {
        for (let i = 0; i < this.bottle.length; i++) {
            if (this.character.isColliding(this.bottle[i])) {
                this.character.bottles++;
                this.bottlesBar.setPercentage(this.character.bottles * 20);
                this.bottle.splice(i, 1);
                i--;
            }
        }
        for (let i = this.coin.length - 1; i >= 0; i--) {
            let percentage = this.character.coinCount * 20;
            if (percentage > 100) {
                percentage = 100;
            }
            if (this.character.isColliding(this.coin[i])) {
                this.character.collectCoin();
                this.coins.setPercentage(percentage);
                this.coin.splice(i, 1);
            }
        }
    }

    checkTrowObjects() {
        if (this.keyboard.D && this.character.bottles > 0) {
            let bottle = new TrowableObject(this.character.x + 60, this.character.y + 100);
            this.trowableObjects.push(bottle);
            this.character.bottles--;
            this.bottlesBar.setPercentage(this.character.bottles * 20);
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.coin);
        this.addObjectsToMap(this.bottle);

        this.ctx.translate(-this.camera_x, 0);
        // ------ space for fixed objects -------------
        this.addToMap(this.statusbar);
        this.addToMap(this.coins);
        this.addToMap(this.bottlesBar);

        // ------ space for fixed objects -------------

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.addObjectsToMap(this.trowableObjects);

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
        if (moveble.otherDirection) {
            this.flipCharacter(moveble);
        }
        moveble.draw(this.ctx);
        moveble.drawFrame(this.ctx);

        if (moveble.otherDirection) {
            this.flipCharacterBack(moveble);
        }
    }

    showIcons() {

        let imgVolume = new Image();
        let imgFullScreen = new Image();
        imgFullScreen.src = this.isFullScreen ? "img/icons/close.png" : "img/icons/fullscreen.png";
        imgVolume.src = "img/icons/medium-volume.png";
        this.ctx.drawImage(imgFullScreen, this.canvas.width - 50, this.canvas.height - 50, 20, 20);
        this.ctx.drawImage(imgVolume, this.canvas.width - 90, this.canvas.height - 50, 20, 20);
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
            if (x >= this.canvas.width - 50 && x <= this.canvas.width - 30 &&
                y >= this.canvas.height - 50 && y <= this.canvas.height - 30) {
                this.openFullscreen();
            }
            if (x >= this.canvas.width - 70 && x <= this.canvas.width - 50 &&
                y >= this.canvas.height - 50 && y <= this.canvas.height - 30) {
                this.increaseVolume();
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
}