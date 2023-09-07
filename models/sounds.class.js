class Sounds extends MovebleObjects {

    hyena_hurt = new Audio('audio/hyena-hurt.mp3');
    bug_hurt = new Audio('audio/bug-hurt.mp3');


    enemyHurtSounds(enemy) {
        if (enemy instanceof Bug) {
            this.bug_hurt.currentTime = 0;
            this.bug_hurt.play();
        } else {
            this.hyena_hurt.currentTime = 0;
            this.hyena_hurt.play();
        }
    }
}