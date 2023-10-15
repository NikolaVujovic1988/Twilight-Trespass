let canvas;
let world;
let keyboard = new Keyboard();
let isInFullscreen = false;
let isGameStarted = false;  
let shouldToggleFullscreenAfterGameStarts = false;

function init() {
    canvas = document.getElementById('canvas');
    addStartStyles();
}

function startGame() {
    init();
    checkWichDevice();
    initLevel();
    world = new World(canvas, keyboard);
    isGameStarted = true;

    if (shouldToggleFullscreenAfterGameStarts) {
        toggleFullscreen(); 
        shouldToggleFullscreenAfterGameStarts = false; 
    }
}

function checkWichDevice() {
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

function forceLandscapeModeAnimation() {
    toggleBlurOnStartscreen();
    forceLandscapeModeAnimationAddStyles();
}

function toggleBlurOnStartscreen() {
    const canvas = document.getElementById('canvas'); 
    if (canvas && canvas.style) {   
        if (canvas.style.filter.includes('blur')) {
            canvas.style.filter = '';
        } else {
            canvas.style.filter = 'blur(5px)';
        }
    }
}

function toggleFullscreen() {
    if (!isGameStarted) {
        shouldToggleFullscreenAfterGameStarts = true;  
        return; 
    }
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
        ? '<img src="img/icons/minimize.png" alt="" class="img-settings-buttons">'
        : '<img src="img/icons/fullscreen.png" alt="" class="img-settings-buttons">';
});

function showActionIcons() {
    document.getElementById('overlay-bottom').classList.remove('d-none');
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

function forceLandscapeModeAnimationAddStyles() {
    document.getElementById('control-buttons').classList.add('d-none');
    document.getElementById('action-buttons').classList.add('d-none');
    document.getElementById('rotate-device-container').classList.remove('d-none');
}

function forceLandscapeModeAnimationRemoveStyles() {
    document.getElementById('rotate-device-container').classList.add('d-none');
    document.getElementById('control-buttons').classList.remove('d-none');
    document.getElementById('action-buttons').classList.remove('d-none');
}

function changeStylesForMobileDevices() {
    document.getElementById('canvas').classList.add('height100');
    document.getElementById('startScreen').classList.add('height100');
}

function addStartStyles() {
    document.getElementById('youLostScreen').classList.add('d-none');
    document.getElementById('youWonScreen').classList.add('d-none');
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('startscreen-background').style.display = 'none';
    document.getElementById('startScreen').style.backgroundImage = 'none';
    document.getElementById('overlay').classList.add('overlay');
    document.getElementById('overlay').classList.remove('overlay-center');
}
