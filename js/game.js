let canvas;
let ctx;
let character = new movebleObjects();

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    console.log('movable object is', character);
}