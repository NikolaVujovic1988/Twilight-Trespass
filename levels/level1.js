const level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Endboss()
    ],
    [
        new BackgroundObject('img/game_background_3/game_background_3.png', -719),
        
        new BackgroundObject('img/game_background_3/game_background_3.png', 0),
        
        new BackgroundObject('img/game_background_3/game_background_3.png', 719),
        
        new BackgroundObject('img/game_background_3/game_background_3.png', 719*2),
        
        new BackgroundObject('img/game_background_3/game_background_3.png', 719*3),
    ]
)