/**
 * @description Main game script for handling game logic, interaction, and visual changes.
 */

// Global Variables
/** @type {HTMLElement} */
let canvas;

/** @type {any} */
let world;

/** @type {Keyboard} */
let keyboard = new Keyboard();

/** @type {boolean} */
let isInFullscreen = false;

/** @type {boolean} */
let shouldToggleFullscreenAfterGameStarts = false;

/**
 * Initialize game setup, setup styles.
 */
function init() {
    canvas = document.getElementById('canvas');
    addStartStyles();
    activateActionButtons();
}

/**
 * Starts the game.
 */
function startGame() {
    init();
    // checkWichDevice();
    initLevel();
    world = new World(canvas, keyboard);
    isGameStarted = true;

    if (shouldToggleFullscreenAfterGameStarts) {
        toggleFullscreen();
        shouldToggleFullscreenAfterGameStarts = false;
    }
}

/**
 * Checks the device and applies specific functionalities based on device type.
 */
function checkWichDevice() {
    if (isMobileDevice()) {
        forceLandscapeMode();
        showActionIcons();
        changeStylesForMobileDevices();
    }
}

/**
 * Determines if the user's device is a mobile device.
 * @returns {boolean} True if it's a mobile device, otherwise false.
 */
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);
}

/**
 * Forces the game view to be in landscape mode on mobile devices.
 */

function forceLandscapeMode() {
    window.addEventListener("orientationchange", function () {
        if (window.orientation !== 90 && window.orientation !== -90) {
            forceLandscapeModeAnimation();
        } else {
            toggleBlurOnStartscreen();
            forceLandscapeModeAnimationRemoveStyles();
        }
    }, false);

    if (window.orientation !== 90 && window.orientation !== -90) {
        forceLandscapeModeAnimation();
    }
}

// ... [Other forceLandscapeMode helper functions]
function forceLandscapeModeAnimation() {
    forceLandscapeModeAnimationAddStyles();
    toggleBlurOnStartscreen();
}

function toggleBlurOnStartscreen() {
    const canvas = document.getElementById('canvas');
    const startscreen = document.getElementById('startScreen');

    if (canvas && canvas.style || startscreen && startscreen.style) {
        if (canvas.style.filter.includes('blur') || startscreen.style.filter.includes('blur') ) {
            canvas.style.filter = '';
            startscreen.style.filter = '';
        } else {
            canvas.style.filter = 'blur(5px)';
            startscreen.style.filter = 'blur(5px)';
        }
    }
}

/**
 * Toggles the fullscreen mode.
 */
function toggleFullscreen() {
    isInFullscreen = !isInFullscreen;

    if (isInFullscreen) {
        openFullscreen();
    } else {
        closeFullscreen();
    }
}

/**
 * Enables fullscreen mode.
 */
function openFullscreen() {
    const canvas = document.getElementById('gamaContainer');

    if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
    } else if (canvas.mozRequestFullScreen) { // Firefox
        canvas.mozRequestFullScreen();
    } else if (canvas.webkitRequestFullscreen) { // Chrome, Safari and Opera
        canvas.webkitRequestFullscreen();
    } else if (canvas.msRequestFullscreen) { // IE/Edge
        canvas.msRequestFullscreen();
    }
    addFullscreenStyles();
}

/**
 * Exits fullscreen mode.
 */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
    }
    removeFullscreenStyles();
    closeFullscreenOnMobile();
}

/**
 * Handles exiting fullscreen mode on mobile devices.
 */
function closeFullscreenOnMobile() {
    if (isMobileDevice()) {
        changeStylesForMobileDevices();
    }
}

/**
 * Listens to fullscreen changes and updates fullscreen button accordingly.
 */
document.addEventListener('fullscreenchange', function () {
    const fullscreenButton = document.getElementById('btnFullscreen');
    isInFullscreen = document.fullscreenElement != null;

    fullscreenButton.innerHTML = isInFullscreen
        ? '<img src="img/icons/minimize.png" alt="" class="img-settings-buttons">'
        : '<img src="img/icons/fullscreen.png" alt="" class="img-settings-buttons">';
});

/**
 * Displays action icons on screen on mobile devices.
 */
function showActionIcons() {
    document.getElementById('overlay-bottom').classList.remove('d-none');
}

/**
 * Keyboard Event listeners
 */
window.addEventListener("keydown", (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (event.keyCode == 68) {
        keyboard.D = true;
    }
});

window.addEventListener("keyup", (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (event.keyCode == 68) {
        keyboard.D = false;
    }
});

/**
 * Loads and initializes controls for mobile devices.
 */
function loadMobileControlEvents() {
    document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('btnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
    document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('btnLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
    document.getElementById('btnUp').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('btnUp').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
    document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });
    document.getElementById('btnThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });

}

/**
 * Clears all running intervals. Used for cleanup.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

