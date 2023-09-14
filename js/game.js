let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    document.getElementById('startScreen').style.display = 'none';

    canvas = document.getElementById('canvas');
    canvas.width = 720;
    canvas.height = 480;


}

function startGame() {
    init();
    checkWitchDevice();
    initLevel();
    world = new World(canvas, keyboard);
}

function checkWitchDevice() {
    if (isMobileDevice()) {
        forceLandscapeMode();
        forceFullScreen();
    }
}

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);
}

function forceLandscapeMode() {
    window.addEventListener("orientationchange", function() {
        if (window.orientation !== 90 && window.orientation !== -90) {
            alert("Please use landscape mode!");
        }
    }, false);

    if (window.orientation !== 90 && window.orientation !== -90) {
        alert("Please switch to landscape mode to play the game!");
    }
}

function forceFullScreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen(); // Firefox
    } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(); // Chrome and Safari
    } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen(); // IE
    }
}

window.addEventListener("keydown", (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (event.keyCode == 38) {
        keyboard.UP = true;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = true;
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
    if (event.keyCode == 38) {
        keyboard.UP = false;
    }
    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (event.keyCode == 68) {
        keyboard.D = false;
    }
});