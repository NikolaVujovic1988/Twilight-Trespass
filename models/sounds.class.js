class Sounds extends MovebleObjects {
    allSounds = [];

    static instance = new Sounds();

    constructor() {
        super();
        if (Sounds.instance) {
            return Sounds.instance;
        }
        Sounds.instance = this;
        this.initSounds();
    }

    initSounds() {
        this.hyena_hurt = this.createSound('audio/hyena-hurt.mp3');
        this.bug_hurt = this.createSound('audio/bug-hurt.mp3');
        this.coin_collected = this.createSound('audio/coin.mp3');
        this.running_sound = this.createSound('audio/running.mp3');
        this.trown_arrow = this.createSound('audio/thrown-arrow.mp3');
        this.jump_sound = this.createSound('audio/jumping.mp3');
        this.character_hurt = this.createSound('audio/female-pain.mp3');
        this.arrow_collected = this.createSound('audio/arrow-collected.mp3');
        this.endboss_dead = this.createSound('audio/endboss-dead.mp3');
    }

    createSound(src) {
        let sound = new Audio(src);
        this.allSounds.push(sound);
        return sound;
    }


    enemyHurtSounds(enemy) {
        if (enemy instanceof Bug) {
            this.bug_hurt.currentTime = 0;
            this.bug_hurt.play();
        } else {
            this.hyena_hurt.currentTime = 0;
            this.hyena_hurt.play();
        }
    }


   updateVolume(newVolume) {
        this.allSounds.forEach(sound => {
            sound.volume = newVolume;
            console.log(sound.src, sound.volume);
        });
    }


}