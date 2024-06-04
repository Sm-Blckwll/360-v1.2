$(document).ready(function () {
openAFrameScene('skyTexture');});

function openAFrameScene(photoId) {
    var aframeScene = document.querySelector('a-scene');
    var aframeSky = document.querySelector('a-sky');
    aframeSky.setAttribute('src', '#' + photoId);
    aframeScene.style.display = 'block';
    console.log("Photo ID:", photoId);
    $('#map').hide();
    $('#fullscreenButton').show();
}

var aframeScene = document.querySelector('a-scene');

aframeScene.addEventListener('wheel', function (event) {
    event.preventDefault();
    var cameraEl = document.getElementById('camera');
    var camera = cameraEl.getObject3D('camera');
    camera.fov += event.deltaY * 0.05;
    camera.fov = Math.max(40, Math.min(80, camera.fov));
    camera.updateProjectionMatrix();
});

var initialPinchDistance = null;
var initialFov = null;

$(document).on('touchstart', function (event) {
    if (event.touches.length === 2) {
        initialPinchDistance = getPinchDistance(event.touches);
        var cameraEl = $('#camera')[0];
        var camera = cameraEl.getObject3D('camera');
        initialFov = camera.fov;
        cameraEl.setAttribute('look-controls', 'enabled', false);
    }
});

$(document).on('touchmove', function (event) {
    if (event.touches.length === 2 && initialPinchDistance !== null) {
        var newPinchDistance = getPinchDistance(event.touches);
        var scaleFactor = initialPinchDistance / newPinchDistance;
        var cameraEl = $('#camera')[0];
        var camera = cameraEl.getObject3D('camera');
        camera.fov = initialFov * scaleFactor;
        camera.fov = Math.max(40, Math.min(80, camera.fov));
        camera.updateProjectionMatrix();
    }
});

$(document).on('touchend', function (event) {
    if (event.touches.length < 2) {
        initialPinchDistance = null;
        initialFov = null;
        
        cameraEl.setAttribute('look-controls', 'enabled', true);
    }
});

function getPinchDistance(touches) {
    var dx = touches[0].clientX - touches[1].clientX;
    var dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
}
