class DrawableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 180;
    imageCache = {};
    currentImage = 0;

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        if (this instanceof Coinsbar && this.star) {
            if (this.star.complete) {
                ctx.drawImage(this.star, this.x - 10, this.y, 50, 50);
            }
        }
        if (this instanceof BottleStatusbar && this.thunder) {
            if (this.thunder.complete) {
                ctx.drawImage(this.thunder, this.x - 15, this.y - 5, 55, 55);
            }
        }
        if (this instanceof Statusbar && this.health) {
            if (this.health.complete) {
                ctx.drawImage(this.health, this.x - 15, this.y - 5, 50, 50);
            }
        }
        if (this instanceof EndbossStatusbar && this.healthEndboss) {
            if (this.healthEndboss.complete) {
                ctx.drawImage(this.healthEndboss, this.x - 5, this.y - 5, 60, 60);
            }
        }
    }
    drawFrame(ctx) {
        // if (this instanceof Character || this instanceof Hyena || this instanceof Bug || this instanceof Endboss) {
        //     ctx.beginPath();
        //     ctx.lineWidth = '1';
        //     ctx.strokeStyle = 'blue';

        //     const effectiveX = this.x + this.offset.left;
        //     const effectiveY = this.y + this.offset.top;
        //     const effectiveWidth = this.width - this.offset.left - this.offset.right;
        //     const effectiveHeight = this.height - this.offset.top - this.offset.bottom;

        //     ctx.rect(effectiveX, effectiveY, effectiveWidth, effectiveHeight);
        //     ctx.stroke();
        // }
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