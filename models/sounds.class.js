class Sounds extends MovebleObjects {

    hyena_hurt = new Audio('audio/hyena-hurt.mp3');
    bug_hurt = new Audio('audio/bug-hurt.mp3');
    coin_collected = new Audio('audio/coin.mp3');
    running_sound = new Audio('audio/running.mp3');
    trown_arrow = new Audio('audio/thrown-arrow.mp3');
    jump_sound = new Audio('audio/jumping.mp3');
    character_hurt = new Audio('audio/female-pain.mp3');
    arrow_collected = new Audio('audio/arrow-collected.mp3');
    endboss_dead = new Audio('audio/endboss-dead.mp3');



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