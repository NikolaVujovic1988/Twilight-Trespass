/**
 * Represents a game level containing enemies and background objects.
 */
class Level {

    /**
     * Collection of enemies present in the level.
     * @type {Array}
     */
    enemies;

    /**
     * Collection of background objects present in the level.
     * @type {Array}
     */
    backgroundObjects;

    /**
     * The x-coordinate marking the end of the level.
     * @type {number}
     * @default 4300
     */
    level_end_x = 4300;

    /**
     * Creates a new Level instance.
     * 
     * @param {Array} enemies - The list of enemies for the level.
     * @param {Array} backgroundObjects - The list of background objects for the level.
     */
    constructor(enemies, backgroundObjects) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
    }
}