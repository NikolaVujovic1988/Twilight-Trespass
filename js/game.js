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
    // checkWitchDevice();
    initLevel();
    world = new World(canvas, keyboard);
    // window.addEventListener('resize', () => {
    //     world.setupMobileControls();
    // });
}


function checkWitchDevice() {
    if (isMobileDevice()) {
        forceLandscapeMode();
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