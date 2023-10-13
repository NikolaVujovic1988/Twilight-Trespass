class Sounds extends MovebleObjects {
    allSounds = [];

    isMuted = false;

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
        this.running_sound = this.createSound('audio/walking.mp3', 0.1);
        this.trown_arrow = this.createSound('audio/thrown-arrow.mp3');
        this.jump_sound = this.createSound('audio/jumping.mp3');
        this.character_hurt = this.createSound('audio/female-pain.mp3');
        this.arrow_collected = this.createSound('audio/arrow-collected.mp3');
        this.endboss_dead = this.createSound('audio/endboss-dead.mp3', 1);
        this.game_won = this.createSound('audio/game-won.mp3');
        this.game_over = this.createSound('audio/game-over.mp3', 1);
    }

    createSound(src, volume = 0.5) {
        let sound = new Audio(src);
        sound.volume = volume;
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


    gameVolume() {
        const volumeButton = document.getElementById('btnVolume');
        this.isMuted = !this.isMuted;
        this.muteSounds(this.isMuted);

        if (this.isMuted) {
            volumeButton.innerHTML = '<img src="img/icons/mute.png" alt="" class="img-settings-buttons">';
        } else {
            volumeButton.innerHTML = '<img src="img/icons/volume-up.png" alt="" class="img-settings-buttons">';
        }
    }

    muteSounds(mute) {
        this.allSounds.forEach(sound => {
            sound.muted = mute;
        });
    }

}