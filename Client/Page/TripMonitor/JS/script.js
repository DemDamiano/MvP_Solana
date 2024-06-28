let map;
let control;

function initMap() {
    // Inizializza la mappa
    map = L.map('map').setView([41.9028, 12.4964], 7); // Coordinate di Roma

    // Aggiungi il layer di OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
}

function showRoute() {
    if (control) {
        map.removeControl(control);
    }

    // Aggiungi il percorso da Roma a Firenze
    control = L.Routing.control({
        waypoints: [
            L.latLng(41.9028, 12.4964), // Roma
            L.latLng(43.7696, 11.2558)  // Firenze
        ],
        routeWhileDragging: true
    }).addTo(map);
}

function closePopup(){
    parent.postMessage('closePopup', '*');

}

// Inizializza la mappa al caricamento della pagina
window.onload = initMap;