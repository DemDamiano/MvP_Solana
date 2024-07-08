// CarReservation.js
import React, { useState } from 'react';
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import './carReservation.css';

const CarReservation = () => {
  const [placeDetails, setPlaceDetails] = useState([]); // State to store place details

  // States for 'Trip' form
  const [autocompleteFromTrip, setAutocompleteFromTrip] = useState(null);
  const [autocompleteToTrip, setAutocompleteToTrip] = useState(null);

  // States for 'Day' form
  const [autocompleteFromDay, setAutocompleteFromDay] = useState(null);
  const [autocompleteToDay, setAutocompleteToDay] = useState(null);

  const callTripMonitor = () => {
    if (placeDetails.length > 0) {
      localStorage.setItem('placeDetails', JSON.stringify(placeDetails));
      history.push('/tripMonitor'); // Utilizza history.push per navigare a tripMonitor
    } else {
      console.error("No place details found.");
    }
  };

  const getPlaceDetails = (place, action) => {
    if (!place || !place.geometry) {
      console.error('Place details not available for ', place);
      return;
    }

    const latitude = place.geometry.location.lat();
    const longitude = place.geometry.location.lng();
    const placeName = place.name;

    const newPlaceDetails = {
      action,
      latitude,
      longitude,
      placeName,
    };

    setPlaceDetails(prevPlaceDetails => [...prevPlaceDetails, newPlaceDetails]);
  };

  const handleAutocompleteLoad = (autocomplete, type, formType) => {
    console.log(`Autocomplete loaded for ${type}`, autocomplete);
    if (formType === 'trip') {
      if (type === 'from') {
        setAutocompleteFromTrip(autocomplete);
      } else if (type === 'to') {
        setAutocompleteToTrip(autocomplete);
      }
    } else if (formType === 'day') {
      if (type === 'from') {
        setAutocompleteFromDay(autocomplete);
      } else if (type === 'to') {
        setAutocompleteToDay(autocomplete);
      }
    }
  };

  const handlePlaceChanged = (type, formType) => {
    let autocomplete;
    if (formType === 'trip') {
      autocomplete = type === 'from' ? autocompleteFromTrip : autocompleteToTrip;
    } else if (formType === 'day') {
      autocomplete = type === 'from' ? autocompleteFromDay : autocompleteToDay;
    }

    if (!autocomplete) {
      console.error(`Autocomplete instance not available for ${type}`);
      return;
    }
    
    const place = autocomplete.getPlace();
    console.log(`Place changed for ${type}`, place);

    if (place && place.geometry) {
      getPlaceDetails(place, `${type}-${formType}`);
    } else {
      console.error('Place details not available for ', place);
    }
  };

  const renderReservationForm = () => (
    <div className="reservation-forms">
      <div className="reservation-form" id="trip-form">
        <h2>Reserve a car for a trip</h2>
        <table className="table-container">
          <tbody>
            <tr className="table-row">
              <td className="table-cell">
                <div className="input-container">
                  <label htmlFor="from-trip" className="label">From</label>
                  <Autocomplete
                    onLoad={(autocomplete) => handleAutocompleteLoad(autocomplete, 'from', 'trip')}
                    onPlaceChanged={() => handlePlaceChanged('from', 'trip')}
                  >
                    <input
                      type="text"
                      id="from-trip"
                      name="from-trip"
                      className="rounded-input"
                      placeholder="Enter location"
                    />
                  </Autocomplete>
                </div>
              </td>
              <td className="table-cell">
                <div className="input-container">
                  <label htmlFor="to-trip" className="label">To</label>
                  <Autocomplete
                    onLoad={(autocomplete) => handleAutocompleteLoad(autocomplete, 'to', 'trip')}
                    onPlaceChanged={() => handlePlaceChanged('to', 'trip')}
                  >
                    <input
                      type="text"
                      id="to-trip"
                      name="to-trip"
                      className="rounded-input"
                      placeholder="Enter destination"
                    />
                  </Autocomplete>
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
          </tbody>
        </table>
        <input type="button" onClick={() => callTripMonitor()} className="button-search" id="search-trip" value="Search" />
      </div>
      <div className="reservation-form" id="day-form">
        <h2>Reserve a car for a day or some</h2>
        <table className="table-container">
          <tbody>
            <tr className="table-row">
              <td className="table-cell">
                <div className="input-container">
                  <label htmlFor="from-trip-day" className="label">From</label>
                  <Autocomplete
                    onLoad={(autocomplete) => handleAutocompleteLoad(autocomplete, 'from', 'day')}
                    onPlaceChanged={() => handlePlaceChanged('from', 'day')}
                  >
                    <input type="text" id="from-trip-day" name="from-trip-day" className="rounded-input" placeholder="Enter location" />
                  </Autocomplete>
                </div>
              </td>
              <td className="table-cell">
                <div className="input-container">
                  <label htmlFor="to-trip-day" className="label">To</label>
                  <Autocomplete
                    onLoad={(autocomplete) => handleAutocompleteLoad(autocomplete, 'to', 'day')}
                    onPlaceChanged={() => handlePlaceChanged('to', 'day')}
                  >
                    <input type="text" id="to-trip-day" name="to-trip-day" className="rounded-input" placeholder="Enter destination" />
                  </Autocomplete>
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
          </tbody>
        </table>
        <input type="button" onClick={() => callTripMonitor()} className="button-search" id="search-trip-day" value="Search" />
      </div>
    </div>
  );

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyCKYIUUKpUGlRbuu1BFgBBv05eSvyqiUsY"
      libraries={['places']}
    >
      {renderReservationForm()}
    </LoadScript>
  );
};

export default CarReservation;
