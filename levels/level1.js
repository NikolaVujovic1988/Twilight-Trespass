let level1;

function initLevel() {

    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;

    level1 = new Level(
        [
            new Hyena(),
            new Hyena(),
            new Hyena(),
            new Hyena(),
            new Hyena(),
            new Hyena(),
            new Hyena(),
            new Hyena(),
            new Hyena(),
            new Hyena(),


            new Bug(),
            new Bug(),
            new Bug(),
            new Bug(),
            new Bug(),
            new Bug(),
            new Bug(),
            new Bug(),
            new Bug(),
            new Bug(),



            new Endboss()
        ],
        [   
            new BackgroundObject('img/fairy-tale-game-backgrounds/_PNG/3/background.png', -canvasWidth, canvasWidth, canvasHeight),
            new BackgroundObject('img/fairy-tale-game-backgrounds/_PNG/3/background.png', 0, canvasWidth, canvasHeight),
            new BackgroundObject('img/fairy-tale-game-backgrounds/_PNG/3/background.png', canvasWidth, canvasWidth, canvasHeight),
            new BackgroundObject('img/fairy-tale-game-backgrounds/_PNG/3/background.png', canvasWidth * 2, canvasWidth, canvasHeight),
            new BackgroundObject('img/fairy-tale-game-backgrounds/_PNG/3/background.png', canvasWidth * 3, canvasWidth, canvasHeight),
            new BackgroundObject('img/fairy-tale-game-backgrounds/_PNG/3/background.png', canvasWidth * 4, canvasWidth, canvasHeight),
            new BackgroundObject('img/fairy-tale-game-backgrounds/_PNG/3/background.png', canvasWidth * 5, canvasWidth, canvasHeight),
            new BackgroundObject('img/fairy-tale-game-backgrounds/_PNG/3/background.png', canvasWidth * 6, canvasWidth, canvasHeight),

        ]
    )
}