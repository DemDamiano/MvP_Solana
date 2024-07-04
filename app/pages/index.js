import { useEffect, useState } from 'react';
import Head from 'next/head';
import "../css/home/style.css"

const Home = () => {
    const [placeDetails, setPlaceDetails] = useState([]);
    
    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCKYIUUKpUGlRbuu1BFgBBv05eSvyqiUsY&libraries=places`;
        script.async = true;
        script.onload = () => {
            initAutocomplete();
        };
        document.body.appendChild(script);
    }, []);

    const initAutocomplete = () => {
        let fromTrip = document.getElementById('from-trip');
        let toTrip = document.getElementById('to-trip');
        let fromTripDay = document.getElementById('from-trip-day');
        let toTripDay = document.getElementById('to-trip-day');
        let autocomplete_fromTrip = new google.maps.places.Autocomplete(fromTrip);
        let autocomplete_toTrip = new google.maps.places.Autocomplete(toTrip);
        let autocomplete_fromTripDay = new google.maps.places.Autocomplete(fromTripDay);
        let autocomplete_toTripDay = new google.maps.places.Autocomplete(toTripDay);

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
    };

    const getPlaceDetails = (place, action) => {
        if (!place.geometry) {
            console.error("Errore: Dettagli del posto non disponibili per ", place);
            return;
        }
        let latitude = place.geometry.location.lat();
        let longitude = place.geometry.location.lng();
        let placeName = place.name;

        addPlaceDetails(action, latitude, longitude, placeName);
    };

    const addPlaceDetails = (action, latitude, longitude, placeName) => {
        const newDetails = [...placeDetails, {
            action: action,
            latitude: latitude,
            longitude: longitude,
            placeName: placeName
        }];
        setPlaceDetails(newDetails);
        localStorage.setItem('placeDetails', JSON.stringify(newDetails));
    };

    return (
        <html>
            <Head>
                <title>Odin - Car Reservation Content</title>
                <link rel="stylesheet" href="/styles/common.css" />
                <link rel="stylesheet" href="/styles/style.css" />
            </Head>
            <div className="main-content">
                <div className="reservation-forms">
                    <div className="reservation-form" id="trip-form">
                        <h2>Reserve a car for a trip</h2>
                        <table className="table-container">
                            <tr className="table-row">
                                <td className="table-cell">
                                    <div className="input-container">
                                        <label htmlFor="from-trip" className="label">From</label>
                                        <input type="text" id="from-trip" name="from" className="rounded-input" placeholder="Enter location" />
                                    </div>
                                </td>
                                <td className="table-cell">
                                    <div className="input-container">
                                        <label htmlFor="to-trip" className="label">To</label>
                                        <input type="text" id="to-trip" name="to" className="rounded-input" placeholder="Enter destination" />
                                    </div>
                                </td>
                            </tr>
                            <tr className="table-row">
                                <td className="table-cell">
                                    <div className="input-container">
                                        <label htmlFor="day-trip" className="label">Day</label>
                                        <input type="date" id="day-trip" name="day" className="rounded-input" />
                                    </div>
                                </td>
                                <td className="table-cell">
                                    <div className="input-container">
                                        <label htmlFor="time-trip" className="label">Time</label>
                                        <input type="time" id="time-trip" name="time" className="rounded-input" />
                                    </div>
                                </td>
                            </tr>
                        </table>
                        <div className="input-container input-group input-group-stroke">
                            <label htmlFor="return-trip" className="return-label">Return stroke?</label>
                            <input type="checkbox" id="return-trip" name="return" />
                        </div>
                        <input type="button" className="button-search" id="search-trip" onClick={() => console.log('Search clicked')} value="Search" />
                    </div>
                    <div className="reservation-form" id="day-form">
                        <h2>Reserve a car for a day or some</h2>
                        <table className="table-container">
                            <tr className="table-row">
                                <td className="table-cell">
                                    <div className="input-container">
                                        <label htmlFor="from-trip-day" className="label">From</label>
                                        <input type="text" id="from-trip-day" name="from" className="rounded-input" placeholder="Enter location" />
                                    </div>
                                </td>
                                <td className="table-cell">
                                    <div className="input-container">
                                        <label htmlFor="to-trip-day" className="label">To</label>
                                        <input type="text" id="to-trip-day" name="to" className="rounded-input" placeholder="Enter destination" />
                                    </div>
                                </td>
                            </tr>
                            <tr className="table-row">
                                <td className="table-cell">
                                    <div className="input-container">
                                        <label htmlFor="day-trip-day" className="label">Day</label>
                                        <input type="date" id="day-trip-day" name="day" className="rounded-input" />
                                    </div>
                                </td>
                                <td className="table-cell">
                                    <div className="input-container">
                                        <label htmlFor="time-trip-day" className="label">Time</label>
                                        <input type="time" id="time-trip-day" name="time" className="rounded-input" />
                                    </div>
                                </td>
                            </tr>
                        </table>
                        <div className="input-container input-group input-group-stroke">
                            <label htmlFor="return-trip-day" className="return-label"></label>
                            <input type="checkbox" id="return-trip-day" name="return" style={{ display: 'none' }} />
                        </div>
                        <input type="button" className="button-search" id="search-trip-day" onClick={() => console.log('Search clicked')} value="Search" />
                    </div>
                </div>
            </div>
        </html>
    );
};

export default Home;