let latitude = undefined;
let longitude = undefined;
let placeName = undefined;

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

    latitude = place.geometry.location.lat();
    longitude = place.geometry.location.lng();
    placeName = place.name; // Nome completo del posto

    console.log("\nAction: ", action, "\nplace name: ", placeName, "\nCoordinate: " + latitude + ", " + longitude);
}

document.getElementById('search-trip').addEventListener('click', function(event) {
    event.preventDefault();
    // Controlla se i parametri sono stati definiti
    if (latitude === undefined || longitude === undefined || placeName === undefined) {
        console.log("Errore: Assicurati di aver selezionato tutti i luoghi necessari.");
        //return;
    }
    openPopupPage();
});

function openPopupPage() {
    const popupContainer = document.getElementById('popup-container');
    console.log("Trying to open popup");

    // Create an iframe element
    const iframe = document.createElement('iframe');
    iframe.src = '../../TripMonitor/HTML/index.html'; // URL della pagina HTML da caricare
    iframe.style.border = 'none'; // Rimuove il bordo dell'iframe per renderlo più pulito

    // Imposta l'iframe per adattarsi automaticamente all'altezza del contenuto
    iframe.style.width = '100%'; // Larghezza al 100% del container
    iframe.style.height = '100vh'; // Altezza al 100% del container

    // Aggiungi l'iframe al container del popup
    popupContainer.innerHTML = ''; // Pulisce il contenuto precedente
    popupContainer.appendChild(iframe);

    // Mostra il popup
    popupContainer.classList.remove('hidden');
    popupContainer.classList.add('visible');

    window.addEventListener('message', function(event) {
        if (event.data === 'closePopup') {
            popupContainer.classList.remove('visible');
            popupContainer.classList.add('hidden');
            popupContainer.innerHTML = '';
        }
    });

  

    // Aggiungi un gestore per l'evento load dell'iframe
    //iframe.onload = adjustIframeHeight;
}

document.addEventListener('DOMContentLoaded', function() {
    initAutocomplete();
});
