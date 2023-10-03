let canvas;
let world;
let keyboard = new Keyboard();
let isInFullscreen = false;

function init() {
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('startscreen-background').style.display = 'none';
    document.getElementById('startScreen').style.backgroundImage = 'none';
    document.getElementById('overlay').classList.add('overlay');
    document.getElementById('overlay').classList.remove('overlay-center');
    canvas = document.getElementById('canvas');
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
        showActionIcons();
        changeStylesForMobileDevices();
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

function toggleFullscreen() {
    const fullscreenButton = document.getElementById('btnFullscreen');
    const canvas = document.getElementById('canvas');
    isInFullscreen = !isInFullscreen;

    if (isInFullscreen) {
        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        } else if (canvas.mozRequestFullScreen) { // Firefox
            canvas.mozRequestFullScreen();
        } else if (canvas.webkitRequestFullscreen) { // Chrome, Safari and Opera
            canvas.webkitRequestFullscreen();
        } else if (canvas.msRequestFullscreen) { // IE/Edge
            canvas.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
        }
    }
}

document.addEventListener('fullscreenchange', function () {
    const fullscreenButton = document.getElementById('btnFullscreen');
    isInFullscreen = document.fullscreenElement != null;

    fullscreenButton.innerHTML = isInFullscreen
        ? '<img src="img/icons/close-fullscreen.png" alt="" class="img-settings-buttons">'
        : '<img src="img/icons/open-fullscreen.png" alt="" class="img-settings-buttons">';
});

function showActionIcons() {
    document.getElementById('overlay-bottom').classList.remove('d-none');
}

function changeStylesForMobileDevices() {
    document.getElementById('startScreen').classList.add('height100');
    document.getElementById('canvas').classList.add('height100');
}

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

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}