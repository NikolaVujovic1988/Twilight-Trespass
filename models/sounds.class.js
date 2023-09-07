class Sounds extends MovebleObjects {

    hyena_hurt = new Audio('audio/hyena-hurt.mp3');


    // constructor() {
    //     super();
    // }

    enemyHurtSounds() {
        this.hyena_hurt.currentTime = 0;
        this.hyena_hurt.play();
    }
}