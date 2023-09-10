class Endboss extends MovebleObjects {

    height = 550;
    width = 430;
    y = -60;
    
    endbossIsDead = false;

    offset = {
        top: 200,
        left: 80,
        right: 50,
        bottom: 50
    };


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

    IMAGES_ATTACK = [
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_bite_000.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_bite_001.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_bite_002.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_bite_003.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_bite_004.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_bite_005.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_bite_006.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_bite_007.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_bite_008.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_bite_009.png'
    ];

    IMAGES_DEAD = [
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_whacked_000.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_whacked_001.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_whacked_002.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_whacked_003.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_whacked_004.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_whacked_005.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_whacked_006.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_whacked_007.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_whacked_008.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_whacked_009.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_whacked_010.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_whacked_011.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_whacked_012.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_whacked_013.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_whacked_014.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_whacked_015.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_die_000.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_die_001.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_die_002.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_die_003.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_die_004.png',
        'img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_die_005.png'
    ];

    constructor() {
        super();
        this.loadImage('img/gdm-animated-hyena-cartoon-game-sprite/keyframes/grey/__grey_hyena_idle_000.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 4650;
        this.speed = 15;
        this.world = world;
        this.animateEndboss();
        this.huntCharacter();
    }

    animateEndboss() {
        setInterval(() => {
            if (this.isCharacterCloseToEndboss()) {
                this.playAnimation(this.IMAGES_ATTACK);
            } else if (this.energy === 0) {
                this.playAnimation(this.IMAGES_DEAD);
                this.endbossIsDead = true;
            } else if (!this.endbossIsDead) {
                this.playAnimation(this.IMAGES_WALKING);
            } 
            
        }, 200);
    }

    huntCharacter() {    
        setInterval(() => {
            if (world.character.x >= 3500) {
                world.characterPassedLimit = true;
            }
    
            if (world.characterPassedLimit && !this.endbossIsDead) {
                this.moveLeft();
            }
        }, 150);
    }

    isCharacterCloseToEndboss() {
        return Math.abs(this.x - world.character.x) < 200;
    }
    
}