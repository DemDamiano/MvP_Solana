import React, { useState } from 'react';
import { LoadScript, GoogleMap, Autocomplete, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import './carReservation.css';

const CarReservation: React.FC = () => {
  const [placeDetails, setPlaceDetails] = useState<any[]>([]); // State to store place details

  // Function to handle place selection and update state
  const getPlaceDetails = (place: google.maps.places.PlaceResult | null, action: string) => {
    if (!place?.geometry) {
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

    setPlaceDetails([...placeDetails, newPlaceDetails]);
  };

  // Rendering function for reservation form
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
                    onLoad={(autocomplete) => console.log('Autocomplete loaded:', autocomplete)}
                    onPlaceChanged={() => getPlaceDetails(autocomplete.getPlace(), 'from')}
                  >
                    <input
                      type="text"
                      id="from-trip"
                      name="from"
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
                    onLoad={(autocomplete) => console.log('Autocomplete loaded:', autocomplete)}
                    onPlaceChanged={() => getPlaceDetails(autocomplete.getPlace(), 'to')}
                  >
                    <input
                      type="text"
                      id="to-trip"
                      name="to"
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
        <div className="input-container input-group input-group-stroke">
          <label className="return-label">Return stroke?</label>
          <input type="checkbox" id="return-trip" name="return" />
        </div>
        <input type="button" className="button-search" id="search-trip" value="Search" />
      </div>
      {/* Day form omitted for brevity */}
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
