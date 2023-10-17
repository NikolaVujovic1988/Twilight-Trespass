/**
 * Manages the game sounds and provides sound-related functionalities.
 * This class extends the MovebleObjects class.
 */
class Sounds extends MovebleObjects {

    /**
     * Array containing all the game sound objects.
     * @type {HTMLAudioElement[]}
     * @default []
     */
    allSounds = [];

    /**
     * Indicates if all the sounds are muted or not.
     * @type {boolean}
     * @default false
     */
    isMuted = false;

    /**
     * Singleton instance of the Sounds class.
     * @type {Sounds}
     * @default new Sounds()
     */
    static instance = new Sounds();

    /**
     * Constructor initializes the sounds for the game.
     */
    constructor() {
        super();
        if (Sounds.instance) {
            return Sounds.instance;
        }
        Sounds.instance = this;
        this.initSounds();
    }

    /**
     * Initializes various game sounds.
     */
    initSounds() {
        this.rain = this.createSound('audio/rain-drops.mp3', 0.2)
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

    /**
     * Creates a new game sound with the given source and volume.
     * @param {string} src - The path to the sound file.
     * @param {number} [volume=0.5] - The volume level for the sound. Default is 0.5.
     * @returns {HTMLAudioElement} - Returns the created sound object.
     */
    createSound(src, volume = 0.5) {
        let sound = new Audio(src);
        sound.volume = volume;
        this.allSounds.push(sound);
        return sound;
    }
    
    /**
     * Plays the hurt sound effect based on the type of enemy provided.
     * @param {Bug|*} enemy - The enemy object.
     */
    enemyHurtSounds(enemy) {
        if (enemy instanceof Bug) {
            this.bug_hurt.currentTime = 0;
            this.bug_hurt.play();
        } else {
            this.hyena_hurt.currentTime = 0;
            this.hyena_hurt.play();
        }
    }

    /**
     * Toggles game sound between muted and unmuted and updates the volume button visuals.
     */
    gameVolume() {
        const volumeButton = document.getElementById('btnVolume');
        this.isMuted = !this.isMuted;
        this.muteSounds(this.isMuted);

        if (this.isMuted) {
            volumeButton.innerHTML = '<img src="img/icons/mute.png" alt="" class="img-settings-buttons">';
        } else {
            volumeButton.innerHTML = '<img src="img/icons/volume-button.png" alt="" class="img-settings-buttons">';
        }
    }

    /**
     * Mutes or unmutes all the game sounds based on the provided flag.
     * @param {boolean} mute - If true, all sounds are muted, otherwise they are unmuted.
     */
    muteSounds(mute) {
        this.allSounds.forEach(sound => {
            sound.muted = mute;
        });
    }
}