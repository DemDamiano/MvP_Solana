
let geocoder;
function addGeocoder() {
    let inputId = "from-trip"
    let input = document.getElementById(inputId);
    console.log("input ",input)
    if (!input) {
        console.error('Elemento input non trovato:', inputId);
        return;
    }

    input.addEventListener('input', function () {
        let query = input.value;
        //if (query.length < 3) {
        //    clearAutocomplete(inputId);
        //    return;
        //}
        geocoder.geocode(query, function (results) {
            let autocompleteList = document.getElementById(inputId + '-autocomplete-list');
            autocompleteList.innerHTML = '';
            results.forEach(result => {
                let item = document.createElement('div');
                item.innerHTML = result.name;
                item.addEventListener('click', function () {
                    input.value = result.name;
                    autocompleteList.innerHTML = '';
                });
                autocompleteList.appendChild(item);
            });
        });
    });
}

function clearAutocomplete(inputId) {
    let autocompleteList = document.getElementById(inputId + '-autocomplete-list');
    if (autocompleteList) {
        autocompleteList.innerHTML = '';
    }
}

function init() {
    //addGeocoder('from');
    //addGeocoder('to');
};