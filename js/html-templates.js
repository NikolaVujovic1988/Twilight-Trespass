function initStartscreen() {
    let startscreen = document.getElementById('gamaContainer');
    startscreen.innerHTML = startscreenHtmlTemplate();
    checkWichDevice();

}

function startscreenHtmlTemplate() {
    return `
    <div class="d-none" id="youLostScreen">

    </div>
    <div class="d-none" id="youWonScreen">

    </div>
    <div class="startScreen" id="startScreen">
        <div class="overlay-center" id="overlay">
            <div class="overlay-top">
                <button onclick="toggleFullscreen()" id="btnFullscreen" class="setting-buttons pointer"><img
                        src="img/icons/fullscreen.png" alt="" class="img-settings-buttons"></button>
                <img id="startButton" onclick="startGame()" src="img/icons/play.png" alt=""
                    class="img-play-button pointer">
                <button onclick="Sounds.instance.gameVolume()" id="btnVolume" class="setting-buttons pointer"><img
                        src="img/icons/volume-button.png" alt="" class="img-settings-buttons"></button>
            </div>
            <img src="img/startscreen-background.png" alt="" class="startscreen-background"
                id="startscreen-background">
            <div class="overlay-bottom d-none" id="overlay-bottom">
                <div class="control-buttons" id="control-buttons">
                    <button onclick="loadMobileControlEvents()" id="btnLeft" class="setting-buttons"><img
                            src="img/icons/left-arrow.png" alt="" class="img-settings-buttons"></button>
                    <button onclick="loadMobileControlEvents()" id="btnRight" class="setting-buttons"><img
                            src="img/icons/arrow-right.png" alt="" class="img-settings-buttons"></button>
                </div>
                <div class="action-buttons" id="action-buttons">
                    <button onclick="loadMobileControlEvents()" id="btnUp" class="setting-buttons"><img
                            src="img/icons/up-arrow.png" alt="" class="img-settings-buttons"></button>
                    <button onclick="loadMobileControlEvents()" id="btnThrow" class="setting-buttons"><img
                            src="img/icons/bow.png" alt="" class="img-settings-buttons"></button>
                </div>

            </div>
        </div>
    </div>
    <canvas id="canvas" width="720px" height="480px">

    </canvas>

    <div class="rotate-device-container d-none" id="rotate-device-container">
        <div class="rotate-image">
            <img src="img/icons/phone.png" alt="please rotate your device">
        </div>
        <p class="image-description">Please Rotate Device to Enjoy the full experience!</p>
    </div>

    `;
    
}
