import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer } from '@react-google-maps/api';
import './tripMonitor.css';
import machineKey from '../scripts/machine.json'
import ownerKey from '../scripts/owner.json'
import { loadTokensByMachineIdAndOwner } from  "../app/_lib/lib"
import { Keypair } from "@solana/web3.js";

const containerStyle = {
  height: '250px',
  width: '100%'
};

let center = {
  lat: 41.9028,
  lng: 12.4964
};

const TripMonitor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [availableCars, setAvailableCars] = useState(0);
  const [rentalCost, setRentalCost] = useState(0);
  const [balance, setBalance] = useState(0);
  const [fuelPercentage, setFuelPercentage] = useState(0);
  const [fuelDistance, setFuelDistance] = useState(0);
  const [directions, setDirections] = useState(null);
  const [storedData, setStoredData] = useState([]);

  useEffect(() => {
    console.log("Inside useEffect");
    fetchIoTData(); // Fetch IoT data when component mounts
    const storedData = JSON.parse(localStorage.getItem('placeDetails')) || [];
  
    console.log("tripMonitor storeddata ",storedData);
    
    if (storedData.length > 0) {
      const fromPlace = storedData.find(detail => detail.action.includes('from'));
      const toPlace = storedData.find(detail => detail.action.includes('to'));
      
      if (fromPlace && toPlace) {
        calculateDirections(fromPlace.latitude, fromPlace.longitude, toPlace.latitude, toPlace.longitude);
      }
      
      //console.log(" tripMonitor from:", fromPlace, " toPlace:", toPlace);
    }else{
        calculateDirections(45.070312,7.686856499999999, 45.070312,7.686856499999999);
      
    }
  }, []);

  const LoadingPopup = () => (
    <div className="loading-popup">
      <p>On loading, please wait...</p>
    </div>
  );

  const fetchIoTData = async () => {
    let machinePublicKey = Keypair.fromSecretKey(new Uint8Array(machineKey)).publicKey;
    let ownerPublicKey = Keypair.fromSecretKey(new Uint8Array(ownerKey)).publicKey;

    console.log('fetchIoTData ', machinePublicKey, ' ', ownerPublicKey);

    setIsLoading(true); // Mostra il popup di attesa
    try {
      const iotDataArray = await loadTokensByMachineIdAndOwner(machinePublicKey, ownerPublicKey);
      console.log("iotDataArray ", iotDataArray);
      if (iotDataArray.length > 0) {
        for (let i = 0; i < iotDataArray.length; i++) {
          const iotData = iotDataArray[i];

          setAvailableCars(iotData.sensors.find(sensor => sensor.type === 'availableCars').data[0]);
          setRentalCost(iotData.sensors.find(sensor => sensor.type === 'rentalCost').data[0]);
          setBalance(iotData.sensors.find(sensor => sensor.type === 'balance').data[0]);
          setFuelPercentage(iotData.sensors.find(sensor => sensor.type === 'fuel_pump').data[0]);
          setFuelDistance(iotData.sensors.find(sensor => sensor.type === 'fuelDistance').data[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching IoT data:', error);
    } finally {
      setIsLoading(false); // Nasconde il popup di attesa
    }
  };

  const calculateDirections = (startLat, startLng, endLat, endLng) => {
    const directionsService = new window.google.maps.DirectionsService();
    center = {
      lat: startLat,
      lng: startLng
    };
    const origin = { lat: startLat, lng: startLng };
    const destination = { lat: endLat, lng: endLng };

    console.log("origin ", origin, " destination ", destination);

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        console.log("end operation result ", result, " status ", status);
        switch (status) {
          case window.google.maps.DirectionsStatus.OK:
            setDirections(result);
            break;
          case window.google.maps.DirectionsStatus.ZERO_RESULTS:
            console.error('Nessun risultato trovato per la richiesta di direzioni.');
            break;
          case window.google.maps.DirectionsStatus.NOT_FOUND:
            console.error('Uno o entrambi i punti di partenza/arrivo non sono validi.');
            break;
          default:
            console.error(`Errore nel recupero delle direzioni. Status: ${status}`);
        }
      }
    );
  };

  return (
    <div className="main-content">
      <div className="dashboard">
        {isLoading && <LoadingPopup />}
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
          <LoadScript googleMapsApiKey="" libraries={['places']}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={7}
            >
              {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
          </LoadScript>
          <p>Start Address: {directions?.routes[0]?.legs[0]?.start_address}</p>
          <p>End Address: {directions?.routes[0]?.legs[0]?.end_address}</p>
        </div>
      </div>
    </div>
  );
};

export default TripMonitor;
