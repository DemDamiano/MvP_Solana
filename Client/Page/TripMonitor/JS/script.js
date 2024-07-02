let map;
let control;

function initMap() {
    // Inizializza la mappa
    map = L.map('map').setView([41.9028, 12.4964], 7); // Coordinate di Roma

    // Aggiungi il layer di OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
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
        if(placeDetails[i].action == 'from-trip-day' ||  placeDetails[i].action == 'to-trip-day' ){
            switch(placeDetails[i].action){
                case 'from-trip-day':
                    startLat = placeDetails[i].latitude
                    startLng = placeDetails[i].longitude
                break;
                case 'to-trip-day':
                    endLat = placeDetails[i].latitude
                    endLng = placeDetails[i].longitude
                break;
                
            }
        }else if(placeDetails[i].action == 'from-trip' || placeDetails[i].action == "to-trip"){
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
        }else{
            alert("No data defined")
            console.error("No data defined for map ", placeDetails, " type ",trip )
        }
    }

    showRoute(startLat,endLat,startLng,endLng)
}

function showRoute(startLat, endLat, startLng, endLng) {
    if (control) {
        map.removeControl(control);
    }

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

function retrievePlaceDetails() {
    let storedPlaceDetails = localStorage.getItem('placeDetails');
    if (storedPlaceDetails) {
        placeDetails = JSON.parse(storedPlaceDetails);
        console.log('placeDetails recuperato da localStorage', placeDetails);                
        updateSpanValues();
    } else {
        console.error("Nessun placeDetails trovato in localStorage");
    }
}

function updateSpanValues() {
    let startPlace = placeDetails.find(detail => detail.action.includes('from'));
    let endPlace = placeDetails.find(detail => detail.action.includes('to'));

    if (startPlace) {
        document.getElementById('current-position').innerText = startPlace.placeName;
    }
    if (endPlace) {
        document.getElementById('destination').innerText = endPlace.placeName;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("onload tripMonitorOK")
    retrievePlaceDetails()
    initMap();
});
