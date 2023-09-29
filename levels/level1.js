let level1;

function initLevel() {

    let backgroundImages = [
        'img/background/background-0.png',
        'img/background/background-1.png',
        'img/background/background-2.png',
        'img/background/background-3.png'
    ];

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
            new BackgroundObject(backgroundImages, - canvas.width),

            new BackgroundObject(backgroundImages, 0),

            new BackgroundObject(backgroundImages, canvas.width * 1),

            new BackgroundObject(backgroundImages, canvas.width * 2),

            new BackgroundObject(backgroundImages, canvas.width * 3),

            new BackgroundObject(backgroundImages, canvas.width * 4),

            new BackgroundObject(backgroundImages, canvas.width * 5),

            new BackgroundObject(backgroundImages, canvas.width * 6)

        ]
    )

    for (let bg of level1.backgroundObjects) {
        bg.loadImages(backgroundImages);
        bg.animateBackground();
    }
}