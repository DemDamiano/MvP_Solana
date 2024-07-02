
function initAutocomplete() {
    console.log("autocomplete")
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
        getPlaceDetails(autocomplete_fromTrip.getPlace(), "from-trip");
    });
    autocomplete_toTrip.addListener('place_changed', function() {
        getPlaceDetails(autocomplete_toTrip.getPlace(), "to-trip");
    });
    autocomplete_fromTripDay.addListener('place_changed', function() {
        getPlaceDetails(autocomplete_fromTripDay.getPlace(), "from-trip-day");
    });
    autocomplete_toTripDay.addListener('place_changed', function() {
        getPlaceDetails(autocomplete_toTripDay.getPlace(), "to-trip-day");
    });
}

// Funzione per ottenere i dettagli del posto selezionato
function getPlaceDetails(place, action) {
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

    console.log("\nAction: ", action, "\nplace name: ", placeName, "\nCoordinate: " + latitude + ", " + longitude);
    addPlaceDetails(action, latitude, longitude, placeName);
}

function addPlaceDetails(action, latitude, longitude, placeName) {
    placeDetails.push({
        action: action,
        latitude: latitude,
        longitude: longitude,
        placeName: placeName
    });

}

function mapValueDefine(){
    for(let i = 0; i<placeDetails.length;i++){
        if(placeDetails[i].action == "from-trip" || placeDetails[i].action == "to-trip"){
            trip = "normal"
        }else if(placeDetails[i].action == "from-trip-day" || placeDetails[i].action== "to-trip-day"){
            trip = "day"
        }else {
            alert("Trip value, error")
            console.error("Trip value error ", placeDetails)
        }
    }

}

function saveDataLocalStorage() {
    localStorage.setItem('placeDetails', JSON.stringify(placeDetails));
    console.log('placeDetails salvato in localStorage');
}
document.addEventListener('DOMContentLoaded', function() {
    initAutocomplete();
});
