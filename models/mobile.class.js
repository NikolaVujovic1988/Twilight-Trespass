class MobileControls {
    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;

        this.setupMobileControls();

        this.canvas.addEventListener('touchstart', this.handleMobileControls.bind(this));
        this.canvas.addEventListener('touchend', this.handleMobileControlsRelease.bind(this));
    }

    setupMobileControls() {
        // Provera da li je uređaj mobilni
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            // Dodajemo dugmiće za mobilne uređaje
            this.mobileControls = {
                left: { x: 50, y: this.canvas.height - 50, radius: 20, color: 'blue' },
                right: { x: 120, y: this.canvas.height - 50, radius: 20, color: 'green' },
                jump: { x: this.canvas.width - 120, y: this.canvas.height - 50, radius: 20, color: 'yellow' },
                throw: { x: this.canvas.width - 50, y: this.canvas.height - 50, radius: 20, color: 'red' },
            };
        }
    }

    drawMobileControls() {
        if (this.mobileControls) {
            this.ctx.fillStyle = this.mobileControls.left.color;
            this.ctx.beginPath();
            this.ctx.arc(this.mobileControls.left.x, this.mobileControls.left.y, this.mobileControls.left.radius, 0, 2 * Math.PI);
            this.ctx.fill();

            this.ctx.fillStyle = this.mobileControls.right.color;
            this.ctx.beginPath();
            this.ctx.arc(this.mobileControls.right.x, this.mobileControls.right.y, this.mobileControls.right.radius, 0, 2 * Math.PI);
            this.ctx.fill();

            this.ctx.fillStyle = this.mobileControls.jump.color;
            this.ctx.beginPath();
            this.ctx.arc(this.mobileControls.jump.x, this.mobileControls.jump.y, this.mobileControls.jump.radius, 0, 2 * Math.PI);
            this.ctx.fill();

            this.ctx.fillStyle = this.mobileControls.throw.color;
            this.ctx.beginPath();
            this.ctx.arc(this.mobileControls.throw.x, this.mobileControls.throw.y, this.mobileControls.throw.radius, 0, 2 * Math.PI);
            this.ctx.fill();
        }
    }

    handleMobileControls(event) {
        if (this.mobileControls) {
            const { left, right, jump, throw: throwBtn } = this.mobileControls;

            const isWithinCircle = (x, y, cx, cy, radius) => {
                const distSq = (cx - x) * (cx - x) + (cy - y) * (cy - y);
                return distSq <= radius * radius;
            };

            const { clientX: x, clientY: y } = event.touches[0];
            const rect = this.canvas.getBoundingClientRect();

            const touchX = x - rect.left;
            const touchY = y - rect.top;

            if (isWithinCircle(touchX, touchY, left.x, left.y, left.radius)) {
                this.keyboard.LEFT = true;
            }
            if (isWithinCircle(touchX, touchY, right.x, right.y, right.radius)) {
                this.keyboard.RIGHT = true;
            }
            if (isWithinCircle(touchX, touchY, jump.x, jump.y, jump.radius)) {
                this.keyboard.SPACE = true;
            }
            if (isWithinCircle(touchX, touchY, throwBtn.x, throwBtn.y, throwBtn.radius)) {
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
