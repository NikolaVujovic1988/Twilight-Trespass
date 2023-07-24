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
        this.generateObjects(this.coin, Coin, 200, 1900, 100, 200);
        this.generateObjects(this.bottle, Bottle, 200, 1900, 100, 200);
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

    generateBottles() {
        this.generateObjects(this.bottle, Bottle, 200, 1900, 100, 200);
    }

    generateObjects(objects, objectClass, xStart, xRange, yStart, yRange) {
        const arcCount = 5;
        for (let i = 0; i < arcCount; i++) {
            this.generateArc(objects, objectClass, xStart, xRange, yStart, yRange);
        }
    }

    generateArc(objects, objectClass, xStart, xRange, yStart, yRange) {
        const arcSize = this.getRandomInt(3, 6);
        const arcHeight = this.getRandomInt(100, 300);
        const arcWidth = this.getRandomInt(100, 300);
        const arcXStart = xStart + Math.random() * xRange;
        const arcYStart = yStart + Math.random() * yRange;
        for (let i = 0; i < arcSize; i++) {
            const x = arcXStart + arcWidth * Math.cos((i / arcSize) * Math.PI);
            const y = arcYStart + arcHeight * Math.sin((i / arcSize) * Math.PI);
            const newObject = new objectClass(x, y);
            objects.push(newObject);
        }
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusbar.setPercentage(this.character.energy);
            }
        });
    }

    checkTrowObjects() {
        if (this.keyboard.D) {
            let bottle = new TrowableObject(this.character.x + 60, this.character.y + 100);
            this.trowableObjects.push(bottle);
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
}