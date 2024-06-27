let latitude = "undefined";
let longitude= "undefined";
let placeName= "undefined";

function initAutocomplete() {
    let fromTrip = document.getElementById('from-trip');
    let toTrip = document.getElementById('to-trip');
    let fromTripDay = document.getElementById('from-trip-day');
    let toTripDay = document.getElementById('to-trip-day');
    let autocomplete_fromTrip = new google.maps.places.Autocomplete(fromTrip);
    let autocomplete_toTrip = new google.maps.places.Autocomplete(toTrip);
    let autocomplete_fromTripDay = new google.maps.places.Autocomplete(fromTripDay);
    let autocomplete_toTripDay = new google.maps.places.Autocomplete(toTripDay);

    // Aggiungi un listener per l'evento di selezione di un posto
    autocomplete_fromTrip.addListener('place_changed', function() {
        getPlaceDetails(autocomplete_fromTrip.getPlace(),"from-trip");
    });
    autocomplete_toTrip.addListener('place_changed', function() {
        getPlaceDetails(autocomplete_toTrip.getPlace(),"to-trip");
    });
    autocomplete_fromTripDay.addListener('place_changed', function() {
        getPlaceDetails(autocomplete_fromTripDay.getPlace(),"from-trip-day");
    });
    autocomplete_toTripDay.addListener('place_changed', function() {
        getPlaceDetails(autocomplete_toTripDay.getPlace(),"to-trip-day");
    });
}

// Funzione per ottenere i dettagli del posto selezionato
function getPlaceDetails(place,action) {
    if (!place.geometry) {
        console.error("Errore: Dettagli del posto non disponibili per ", place);
        return;
    }

    let latitude = place.geometry.location.lat();
    let longitude = place.geometry.location.lng();
    let placeName = place.name; // Nome completo del posto


    console.log("\nAction: ",action ,"\nplace name: ",placeName , "\nCoordinate: " + latitude + ", " + longitude);
    
}

let button = document.getElementById('search-trip');

button.addEventListener('click', function() {
    // Controlla se i parametri sono stati definiti
    if (latitude === undefined || longitude === undefined || placeName === undefined) {
        console.error("Errore: Assicurati di aver selezionato tutti i luoghi necessari.");
        return;
    }

    // Codifica dei parametri per l'URL
    let encodedPlaceName = encodeURIComponent(placeName);
    let encodedLatitude = encodeURIComponent(latitude);
    let encodedLongitude = encodeURIComponent(longitude);

    // Costruisci l'URL con i parametri
    let url = `../../Home/HTML/index.html?from=${encodedPlaceName}&lat=${encodedLatitude}&lng=${encodedLongitude}`;

    // Redirigi verso la nuova pagina con i parametri
    window.location.href = url;
});

document.addEventListener('DOMContentLoaded', function() {
    initAutocomplete();
});