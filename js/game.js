let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('startScreen').style.backgroundImage = 'none';
    canvas = document.getElementById('canvas');
    // updateCanvasDimensions();
    // window.addEventListener('resize', updateCanvasDimensions); 
}



function startGame() {
    init();
    checkWitchDevice();
    initLevel();
    world = new World(canvas, keyboard);
    // window.addEventListener('resize', () => {
    //     world.setupMobileControls();
    // });
}


function checkWitchDevice() {
    if (isMobileDevice()) {
        forceLandscapeMode();
        showActionIcons();
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

function showActionIcons() {
    document.getElementById('overlay-bottom').classList.remove('d-none');
}

// function updateCanvasDimensions() {
//     if (isMobileDevice()) {
//         canvas.style.width = '100%';
//         canvas.style.height = '100vh';
//         canvas.width = window.innerWidth;
//         canvas.height = window.innerHeight;
//     } else {
//         canvas.width = 720;
//         canvas.height = 480;
//     }
// }

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