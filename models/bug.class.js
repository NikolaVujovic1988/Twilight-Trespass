class Bug extends MovebleObjects {

    height = 70;
    width = 70;
    y = 380;

    isDead = false;


    IMAGES_WALKING = [
        'img/Purple Bug Sprites/png/skeleton-animation_00.png',
        'img/Purple Bug Sprites/png/skeleton-animation_01.png',
        'img/Purple Bug Sprites/png/skeleton-animation_02.png',
        'img/Purple Bug Sprites/png/skeleton-animation_03.png',
        'img/Purple Bug Sprites/png/skeleton-animation_04.png',
        'img/Purple Bug Sprites/png/skeleton-animation_05.png',
        'img/Purple Bug Sprites/png/skeleton-animation_06.png',
        'img/Purple Bug Sprites/png/skeleton-animation_07.png',
        'img/Purple Bug Sprites/png/skeleton-animation_08.png',
        'img/Purple Bug Sprites/png/skeleton-animation_09.png',
        'img/Purple Bug Sprites/png/skeleton-animation_10.png',
        'img/Purple Bug Sprites/png/skeleton-animation_11.png',
        'img/Purple Bug Sprites/png/skeleton-animation_12.png',
        'img/Purple Bug Sprites/png/skeleton-animation_13.png'
        
    ];

    IMAGES_DEAD = [
        'img/Purple Bug Sprites/png/skeleton-animation_08.png',
        'img/Purple Bug Sprites/png/skeleton-animation_09.png',
        'img/Purple Bug Sprites/png/skeleton-animation_10.png',
        'img/Purple Bug Sprites/png/skeleton-animation_11.png'
    ];
    

    constructor() {
        super().loadImage('Files/png/2x/slime1/WalkLeft (1).png');

        this.x = 500 + Math.random() * 4500;
        this.y = 300 - Math.random() * 300;
        this.speed = 0.50 + Math.random() * 0.5;
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (!this.isDead) {
                this.moveLeft();
            }
        }, 1000 / 60);
        
        setInterval(() => {
            if (!this.isDead) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 150);
    }


}