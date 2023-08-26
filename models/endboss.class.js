class Endboss extends MovebleObjects {

    height = 350;
    width = 280;
    y = 125;


    IMAGES_WALKING = [
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_walk_000.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_walk_001.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_walk_002.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_walk_003.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_walk_004.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_walk_005.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_walk_006.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_walk_007.png'
    ];


    constructor() {
        super();
        this.loadImage('img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_idle_000.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = 4650;
        this.speed = 10;
        this.animate();
        this.huntCharacter();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }

    huntCharacter() {
        setInterval(() => {
            if (world.character.x >= 3500) {
                this.moveLeft();
            }
        }, 150);
    }

}