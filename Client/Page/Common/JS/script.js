//variabili globali tra i vari file
let placeDetails = [];
let trip = "null"

function openHome(){
    console.log("open Home");
    const iframe = document.getElementById('main-content-iframe');
    if (iframe) {
        iframe.src = '../../Home/HTML/index.html';
        setupClosePopupListener();
    }
}

function openTripMonitor() {
    console.log("open TripMonitor");
    const iframe = document.getElementById('main-content-iframe');
    if (iframe) {
        iframe.src = '../../TripMonitor/HTML/index.html';
        setupClosePopupListener();
    }
}

function setupClosePopupListener() {
    window.addEventListener('message', function(event) {
        if (event.data === 'closePopup') {
            const iframe = document.getElementById('main-content-iframe');
            if (iframe) {
                iframe.src = 'about:blank';
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    openHome();

});
