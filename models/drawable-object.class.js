/**
 * Represents a base class for objects that can be drawn on a canvas context.
 */
class DrawableObject {

    /**
     * Object's horizontal position.
     * @type {number}
     */
    x = 120;

    /**
     * Object's vertical position.
     * @type {number}
     */
    y = 280;

    /**
     * Image object representing the drawable image.
     * @type {Image}
     */
    img;

    /**
     * Height of the drawable object.
     * @type {number}
     */
    height = 150;

    /**
     * Width of the drawable object.
     * @type {number}
     */
    width = 180;

    /**
     * Cache containing all the loaded images for this object.
     * @type {Object<string, Image>}
     */
    imageCache = {};

    /**
     * Index of the current image to be drawn.
     * @type {number}
     */
    currentImage = 0;

    /**
     * Draws the object on the given canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
     */
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

    /**
     * Draws an image on the given canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
     * @param {Image} img - The image object to draw.
     * @param {number} x - Horizontal position.
     * @param {number} y - Vertical position.
     * @param {number} width - Image width.
     * @param {number} height - Image height.
     */
    drawImage(ctx, img, x, y, width, height) {
        ctx.drawImage(img, x, y, width, height);
    }

    /**
     * Draws an image on the given canvas context if the image is loaded.
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
     * @param {Image} img - The image object to draw.
     * @param {number} x - Horizontal position.
     * @param {number} y - Vertical position.
     * @param {number} width - Image width.
     * @param {number} height - Image height.
     */
    drawIfComplete(ctx, img, x, y, width, height) {
        if (img.complete) {
            this.drawImage(ctx, img, x, y, width, height);
        }
    }

    /**
     * Loads an image from a given path.
     * @param {string} path - The path to the image.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads a set of images from an array of paths.
     * @param {string[]} arr - Array containing paths to the images.
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Sets the percentage of progress for statusbar objects.
     * @param {number} percentage - The percentage to set.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveIndexOfStatusbarImage()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the index of the image to be displayed based on the set percentage.
     * @returns {number} - The index of the image.
     */
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