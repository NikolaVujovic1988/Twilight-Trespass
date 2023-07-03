let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    canvas.width = 720; 
    canvas.height = 480;
    world = new World(canvas);

    console.log('My character is', world.character);
}

window.addEventListener("keypress", (event) => {
    console.log(event);
});