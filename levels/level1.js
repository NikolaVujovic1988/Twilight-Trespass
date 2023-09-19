let level1;

function initLevel() {

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
            
            new BackgroundObject('img/fairy-tale-game-backgrounds/_PNG/3/background.png', -719),

            new BackgroundObject('img/fairy-tale-game-backgrounds/_PNG/3/background.png', 0),

            new BackgroundObject('img/fairy-tale-game-backgrounds/_PNG/3/background.png', 719),

            new BackgroundObject('img/fairy-tale-game-backgrounds/_PNG/3/background.png', 719 * 2),

            new BackgroundObject('img/fairy-tale-game-backgrounds/_PNG/3/background.png', 719 * 3),

            new BackgroundObject('img/fairy-tale-game-backgrounds/_PNG/3/background.png', 719 * 4),

            new BackgroundObject('img/fairy-tale-game-backgrounds/_PNG/3/background.png', 719 * 5),

            new BackgroundObject('img/fairy-tale-game-backgrounds/_PNG/3/background.png', 719 * 6),

        ]
    )
}