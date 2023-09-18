class MobileControls {


    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.setupMobileControls();
        this.loadBtns();

        this.canvas.addEventListener('touchstart', this.handleMobileControls.bind(this));
        this.canvas.addEventListener('touchend', this.handleMobileControlsRelease.bind(this));
    }


    setupMobileControls() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            this.mobileControls = {
                left: { x: 50, y: this.canvas.height - 50, width: 40, height: 40 },
                right: { x: 120, y: this.canvas.height - 50, width: 40, height: 40 },
                jump: { x: this.canvas.width - 120, y: this.canvas.height - 50, width: 40, height: 40 },
                throw: { x: this.canvas.width - 50, y: this.canvas.height - 50, width: 40, height: 40 },
            };          
        }
    }

    loadBtns() {
        this.leftImg = new Image();
        this.leftImg.src = 'img/icons/left.png'; 

        this.rightImg = new Image();
        this.rightImg.src = 'img/icons/right.png';

        this.jumpImg = new Image();
        this.jumpImg.src = 'img/icons/jump.png';

        this.throwImg = new Image();
        this.throwImg.src = 'img/icons/throw.png';
    }

    drawMobileControls() {
        if (this.mobileControls) {
            this.ctx.drawImage(this.leftImg, this.mobileControls.left.x, this.mobileControls.left.y, this.mobileControls.left.width, this.mobileControls.left.height);
            this.ctx.drawImage(this.rightImg, this.mobileControls.right.x, this.mobileControls.right.y, this.mobileControls.right.width, this.mobileControls.right.height);
            this.ctx.drawImage(this.jumpImg, this.mobileControls.jump.x, this.mobileControls.jump.y, this.mobileControls.jump.width, this.mobileControls.jump.height);
            this.ctx.drawImage(this.throwImg, this.mobileControls.throw.x, this.mobileControls.throw.y, this.mobileControls.throw.width, this.mobileControls.throw.height);
        }
    }

    handleMobileControls(event) {
        if (this.mobileControls) {
            const { left, right, jump, throw: throwBtn } = this.mobileControls;
    
            const isWithinRectangle = (x, y, rectX, rectY, width, height) => {
                return x >= rectX && x <= rectX + width && y >= rectY && y <= rectY + height;
            };
            
    
            const { clientX: x, clientY: y } = event.touches[0];
            const rect = this.canvas.getBoundingClientRect();
    
            const touchX = x - rect.left;
            const touchY = y - rect.top;
    
            console.log(`Touch X: ${touchX}, Touch Y: ${touchY}`);
    
            if (isWithinRectangle(touchX, touchY, left.x, left.y, left.width, left.height)) {
                this.keyboard.LEFT = true;
            }
            if (isWithinRectangle(touchX, touchY, right.x, right.y, right.width, right.height)) {
                this.keyboard.RIGHT = true;
            }
            if (isWithinRectangle(touchX, touchY, jump.x, jump.y, jump.width, jump.height)) {
                this.keyboard.SPACE = true;
            }
            if (isWithinRectangle(touchX, touchY, throwBtn.x, throwBtn.y, throwBtn.width, throwBtn.height)) {
                this.keyboard.D = true;
            }
        }
    }
    

    handleMobileControlsRelease(event) {
        this.keyboard.LEFT = false;
        this.keyboard.RIGHT = false;
        this.keyboard.SPACE = false;
        this.keyboard.D = false;
    }
}
