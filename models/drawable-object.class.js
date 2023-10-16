class DrawableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 180;
    imageCache = {};
    currentImage = 0;

    draw(ctx) {
        this.drawImage(ctx, this.img, this.x, this.y, this.width, this.height);
    
        if (this instanceof Coinsbar && this.star) {
            this.drawIfComplete(ctx, this.star, this.x - 10, this.y, 50, 50);
        }
    
        if (this instanceof BottleStatusbar && this.thunder) {
            this.drawIfComplete(ctx, this.thunder, this.x - 15, this.y - 5, 55, 55);
        }
    
        if (this instanceof Statusbar && this.health) {
            this.drawIfComplete(ctx, this.health, this.x - 15, this.y - 5, 50, 50);
        }
    
        if (this instanceof EndbossStatusbar && this.healthEndboss) {
            this.drawIfComplete(ctx, this.healthEndboss, this.x - 5, this.y - 5, 60, 60);
        }
    }
    
    drawImage(ctx, img, x, y, width, height) {
        ctx.drawImage(img, x, y, width, height);
    }
    
    drawIfComplete(ctx, img, x, y, width, height) {
        if (img.complete) {
            this.drawImage(ctx, img, x, y, width, height);
        }
    }
    
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveIndexOfStatusbarImage()];
        this.img = this.imageCache[path];
    }

    resolveIndexOfStatusbarImage() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}