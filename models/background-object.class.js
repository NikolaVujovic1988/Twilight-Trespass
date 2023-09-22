class BackgroundObject extends MovebleObjects {
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.width = canvas.width; 
        this.height = canvas.height; 
        this.y = canvas.height - this.height; 
    }
}
