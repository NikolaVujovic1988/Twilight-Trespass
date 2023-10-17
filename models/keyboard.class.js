/**
 * Represents a simple keyboard state tracker.
 * This class provides boolean flags for specific keys to indicate whether they are currently pressed.
 * 
 * @example
 * let kb = new Keyboard();
 * if (kb.LEFT) {
 *   // Handle left key press logic here
 * }
 */
class Keyboard {

    /**
     * Indicates if the LEFT arrow key is currently pressed.
     * @type {boolean}
     */
    LEFT = false;

    /**
     * Indicates if the RIGHT arrow key is currently pressed.
     * @type {boolean}
     */
    RIGHT = false;

    /**
     * Indicates if the SPACE key is currently pressed.
     * @type {boolean}
     */
    SPACE = false;

    /**
     * Indicates if the 'D' key is currently pressed.
     * @type {boolean}
     */
    D = false;
}
