import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer } from '@react-google-maps/api';
import './tripMonitor.css';

const containerStyle = {
  height: '250px',
  width: '100%'
};

const center = {
  lat: 41.9028,
  lng: 12.4964
};

const TripMonitor = () => {
  const [availableCars, setAvailableCars] = useState(0);
  const [rentalCost, setRentalCost] = useState(0);
  const [balance, setBalance] = useState(0);
  const [fuelPercentage, setFuelPercentage] = useState(0);
  const [fuelDistance, setFuelDistance] = useState(0);
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    fetchIoTData(); // Fetch IoT data when component mounts
  }, []);

  const fetchIoTData = () => {
    // Assume fetching logic here (mocked for demonstration)
    // Replace with actual data fetching from your IoT source
    // Example placeholder values
    setAvailableCars(14);
    setRentalCost(0.008);
    setBalance(3.02);
    setFuelPercentage(78);
    setFuelDistance(4);
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
          <p>{availableCars}</p>
        </div>
        <div className="card">
          <img src="/IMG/Main/TripMonitor/icon-ticket.png" alt="Marker" className="icon" />
          <h3>Rental Cost/km</h3>
          <p>{rentalCost}</p>
        </div>
        <div className="card">
          <img src="/IMG/Main/TripMonitor/icon-cash.png" alt="Marker" className="icon" />
          <h3>Balance Available SOL</h3>
          <p>{balance}</p>
        </div>
        <div className="card">
          <div className="info-row">
            <img src="/IMG/Main/TripMonitor/icon-fuel-tank.png" alt="Marker" className="icon" />
            <p>{fuelPercentage}%</p>
          </div>
          <div className="info-row">
            <img src="/IMG/Main/TripMonitor/icon-fuel-station.png" alt="Marker" className="icon" />
            <p>{fuelDistance}km</p>
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
          <LoadScript googleMapsApiKey="AIzaSyCKYIUUKpUGlRbuu1BFgBBv05eSvyqiUsY" libraries={['places']}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
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
