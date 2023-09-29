class BackgroundObject extends MovebleObjects {

    imageIndex = 0; 
    images = [];

    constructor(imagesPath, x) {
        super();
        this.images = imagesPath;
        this.loadImage(this.images[this.imageIndex]); 
        this.x = x;
        this.width = canvas.width; 
        this.height = canvas.height; 
        this.y = canvas.height - this.height; 
    }

    animateBackground() {
        setInterval(() => {
            this.imageIndex++;
            if (this.imageIndex >= this.images.length) this.imageIndex = 0;
            this.img = this.imageCache[this.images[this.imageIndex]];
        }, 1000/25);
    }
}

