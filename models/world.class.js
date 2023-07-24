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


    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
        this.run();
        this.generateCoins();
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

    // Function to generate a single coin
generateCoin(xCenter, yCenter, radius, angle) {
    const x = xCenter + radius * Math.cos(angle);
    const y = yCenter - radius * Math.sin(angle);
    return new Coin(x, y);
}

// Function to generate a semi-circle arc of coins
generateArc(xCenter, yCenter, radius, coinsPerArc) {
    const coins = [];
    for(let i = 0; i < coinsPerArc; i++) {
        const angle = Math.PI * i / (coinsPerArc - 1);
        coins.push(this.generateCoin(xCenter, yCenter, radius, angle));
    }
    return coins;
}

// Function to generate all the arcs of coins
generateCoins() {
    const numArcs = 4;
    const radius = 100;
    const minYCenter = 100;
    const maxYCenter = 300;
    let xCenter = 400;
    const xStep = 400;

    for(let i = 0; i < numArcs; i++) {
        const coinsPerArc = Math.floor(Math.random() * 3) + 3;
        const yCenter = Math.random() * (maxYCenter - minYCenter) + minYCenter;
        const arcCoins = this.generateArc(xCenter, yCenter, radius, coinsPerArc);
        this.coin = this.coin.concat(arcCoins);
        xCenter += xStep;
    }
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