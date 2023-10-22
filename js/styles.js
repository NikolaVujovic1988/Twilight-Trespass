/**
 * UI-related helper functions...
 */
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
    document.getElementById('instructionsContainer').classList.add('d-none');
    document.getElementById('canvas').classList.add('height-width100');
    document.getElementById('startScreen').classList.add('height-width100');
}

function activateActionButtons() {
    if (isMobileDevice) {
        document.getElementById('overlay-bottom').style = 'display: flex';
    }
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

function addFullscreenStyles() {
    document.getElementById('canvas').classList.add('height-width100');
    document.getElementById('startScreen').classList.add('height-width100');
    document.getElementById('youLostScreen').classList.add('height-width100');
    document.getElementById('youWonScreen').classList.add('height-width100');
    if (isMobileDevice) {
        document.getElementById('canvas').classList.add('fill');
    }
}

function removeFullscreenStyles() {
    document.getElementById('canvas').classList.remove('fill');
    document.getElementById('canvas').classList.remove('height-width100');
    document.getElementById('startScreen').classList.remove('height-width100');
    document.getElementById('youLostScreen').classList.remove('height-width100');
    document.getElementById('youWonScreen').classList.remove('height-width100');
}
