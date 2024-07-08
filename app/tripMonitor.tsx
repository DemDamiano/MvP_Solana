import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import './tripMonitor.css';

const TripMonitor = () => {
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    retrievePlaceDetails();
  }, []);

  const retrievePlaceDetails = () => {
    let storedPlaceDetails = localStorage.getItem('placeDetails');
    if (storedPlaceDetails) {
      const placeDetails = JSON.parse(storedPlaceDetails);
      console.log('placeDetails recuperato da localStorage', placeDetails);
      updateSpanValues(placeDetails);
    } else {
      console.error('Nessun placeDetails trovato in localStorage');
    }
  };

  const updateSpanValues = (placeDetails) => {
    let startPlace = placeDetails.find(detail => detail.action.includes('from'));
    let endPlace = placeDetails.find(detail => detail.action.includes('to'));

    if (startPlace) {
      document.getElementById('current-position').innerText = startPlace.placeName;
    }
    if (endPlace) {
      document.getElementById('destination').innerText = endPlace.placeName;
    }

    // Calcola le indicazioni stradali solo se ci sono entrambi i punti di partenza e destinazione
    if (startPlace && endPlace) {
      calculateDirections(startPlace.latitude, startPlace.longitude, endPlace.latitude, endPlace.longitude);
    }
  };

  const calculateDirections = (startLat, startLng, endLat, endLng) => {
    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: { lat: parseFloat(startLat), lng: parseFloat(startLng) },
        destination: { lat: parseFloat(endLat), lng: parseFloat(endLng) },
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error('Errore nel calcolo delle direzioni:', status);
        }
      }
    );
  };

  return (
    <div className="main-content">
      <div className="dashboard">
        <div className="card">
          <img src="/IMG/Main/TripMonitor/icon-marker.png" alt="Marker" className="icon" />
          <h3>Available Cars Nearby</h3>
          <p>14</p>
        </div>
        <div className="card">
          <img src="/IMG/Main/TripMonitor/icon-ticket.png" alt="Marker" className="icon" />
          <h3>Rental Cost/km</h3>
          <p>0.008</p>
        </div>
        <div className="card">
          <img src="/IMG/Main/TripMonitor/icon-cash.png" alt="Marker" className="icon" />
          <h3>Balance Available SOL</h3>
          <p>3.02</p>
        </div>
        <div className="card">
          <div className="info-row">
            <img src="/IMG/Main/TripMonitor/icon-fuel-tank.png" alt="Marker" className="icon" />
            <p>78%</p>
          </div>
          <div className="info-row">
            <img src="/IMG/Main/TripMonitor/icon-fuel-station.png" alt="Marker" className="icon" />
            <p>4km</p>
          </div>
        </div>
      </div>
      <div className="trip-info">
        <div className="container">
          <table className="trip-stats">
            <tbody>
              <tr>
                <td>
                  <div>
                    <h4>Kilometers travelled</h4>
                    <p>17km</p>
                  </div>
                </td>
                <td>
                  <div>
                    <h4>Time on board</h4>
                    <p>20'</p>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>
                    <h4>Kilometers remaining</h4>
                    <p>10km</p>
                  </div>
                </td>
                <td>
                  <div>
                    <h4>Time upon arrival</h4>
                    <p>13'</p>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <h4>Drop off points</h4>
                </td>
                <td>
                  <h4>Rental Duration</h4>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="drop-off">
                    <div className="icon-wrapper">
                      <img src="/IMG/Main/TripMonitor/icon-parking.png" alt="Drop off icon" />
                      <p>7</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="rental-chart">
                    <div className="time-spent" style={{ width: '40%' }}></div>
                    <div className="active-time" style={{ width: '60%' }}></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="map">
          <LoadScript
            googleMapsApiKey="AIzaSyCKYIUUKpUGlRbuu1BFgBBv05eSvyqiUsY"
          >
            <GoogleMap
              mapContainerStyle={{ height: '250px', width: '100%' }}
              center={{ lat: 41.9028, lng: 12.4964 }} // Coordinate di Roma
              zoom={7}
            >
              {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
          </LoadScript>
          <p>You're heading towards <span id="destination"></span></p>
          <p>Your current position: <span id="current-position"></span></p>
        </div>
      </div>
    </div>
  );
};

export default TripMonitor;
