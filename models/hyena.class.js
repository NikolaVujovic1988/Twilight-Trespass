class Hyena extends MovebleObjects {

    height = 140;
    width = 140;
    y = 315;

    isDead = false;


    IMAGES_WALKING = [
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/brown/__brown_hyena_walk_000.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/brown/__brown_hyena_walk_001.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/brown/__brown_hyena_walk_002.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/brown/__brown_hyena_walk_003.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/brown/__brown_hyena_walk_004.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/brown/__brown_hyena_walk_005.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/brown/__brown_hyena_walk_006.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/brown/__brown_hyena_walk_007.png'
    ];

    IMAGES_DEAD = [
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/brown/__brown_hyena_die_000.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/brown/__brown_hyena_die_001.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/brown/__brown_hyena_die_002.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/brown/__brown_hyena_die_003.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/brown/__brown_hyena_die_004.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/brown/__brown_hyena_die_005.png'
    ];
    

    constructor() {
        super().loadImage('img/gdm-animated-hyena-cartoon-game-sprite/keyframes/brown/__brown_hyena_idle_000.png');

        this.x = 300 + Math.random() * 4500;
        this.speed = 0.15 + Math.random() * 0.5;
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