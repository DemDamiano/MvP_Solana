let map;
let control;
let latitudeStart;
let longitudeStart;
let latitudeEnd;
let longitudeEnd;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
} else {
    console.log("Geolocation non è supportata da questo browser.");
}
function successCallback(position) {
    latitudeStart = position.coords.latitude;
    longitudeStart = position.coords.longitude;
    console.log("Latitudine: " + latitudeStart + ", Longitudine: " + longitudeStart);

    // Inizializza la mappa con le coordinate ottenute
    initMap();
}

// Funzione chiamata quando c'è un errore nell'ottenere la posizione
function errorCallback(error) {
    console.log("Errore nel recuperare la posizione: " + error.message);
}


function initAutocomplete() {
    console.log("autocomplete")
    let fromTrip = document.getElementById('from-trip');
    let toTrip = document.getElementById('to-trip');
    let autocomplete_fromTrip = new google.maps.places.Autocomplete(fromTrip);
    let autocomplete_toTrip = new google.maps.places.Autocomplete(toTrip);
    // Aggiungi un listener per l'evento di selezione di un posto
    autocomplete_fromTrip.addListener('place_changed', function() {
        getPlaceDetails(autocomplete_fromTrip.getPlace(), "from-trip");
    });
    autocomplete_toTrip.addListener('place_changed', function() {
        getPlaceDetails(autocomplete_toTrip.getPlace(), "to-trip");
    });
    
}

// Funzione per ottenere i dettagli del posto selezionato
function getPlaceDetails(place,action) {
    if (!place.geometry) {
        console.error("Errore: Dettagli del posto non disponibili per ", place);
        return;
    }
    let latitude = undefined;
    let longitude = undefined;
    let placeName = undefined;

     latitude = place.geometry.location.lat();
     longitude = place.geometry.location.lng();
    placeName = place.name; // Nome completo del posto

    console.log("\nplace name: ", placeName, "\nCoordinate: " + latitude + ", " + longitude);
    addPlaceDetails(action, latitude, longitude, placeName);

}

function addPlaceDetails(action, latitude, longitude, placeName) {
    placeDetails.push({
        action:action,
        latitude: latitude,
        longitude: longitude,
        placeName: placeName
    });
}

function initMap() {
    // Inizializza la mappa
    map = L.map('map').setView([41.9028, 12.4964], 7); // Coordinate di Roma

    // Aggiungi il layer di OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
}

function showRoute(startLat, endLat, startLng, endLng) {
    if (control) {
        map.removeControl(control);
    }
    console.log("show route ",startLat, endLat, startLng, endLng)
    // Aggiungi il percorso da Roma a Firenze
    control = L.Routing.control({
        waypoints: [
            L.latLng(startLat, startLng),
            L.latLng(endLat, endLng)
        ],
        routeWhileDragging: true
    }).addTo(map);
}

function closePopup(){
    parent.postMessage('closePopup', '*');

}

function onDisplayRoute(){
    console.log("searchpressed")
    defineDataRoute()
}

function defineDataRoute(){
    console.log("defineRoute")
    let startLat = "null";
    let startLng = "null";
    let endLat = "null";
    let endLng = "null";
    console.log("placeDetails ",placeDetails)
    for(let i = 0;i<placeDetails.length;i++){
       switch(placeDetails[i].action){
                case 'from-trip':
                    startLat = placeDetails[i].latitude
                    startLng = placeDetails[i].longitude
                break;
                case 'to-trip':
                    endLat = placeDetails[i].latitude
                    endLng = placeDetails[i].longitude
                break;
        }
    }

    showRoute(startLat,endLat,startLng,endLng)
}


document.addEventListener('DOMContentLoaded', function() {
    console.log("onload tripManagerOK")
    initAutocomplete()
    initMap();
});
