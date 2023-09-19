class BackgroundObject extends MovebleObjects {

    constructor(imagePath, x, canvasWidth = 720, canvasHeight = 480) {
        super().loadImage(imagePath);
        this.x = x;

        this.width = canvasWidth;
        this.height = canvasHeight;
        this.y = canvasHeight - this.height;
    }

}