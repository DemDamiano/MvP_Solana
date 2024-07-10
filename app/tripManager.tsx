import React, { useEffect, useState, useContext } from 'react';

import { GoogleMap,Autocomplete, LoadScript, DirectionsRenderer,DirectionsService } from '@react-google-maps/api';
import './tripManager.css';
import machineKey from '../scripts/machine.json'
import ownerKey from '../scripts/owner.json'
import { loadTokensByMachineIdAndOwner } from  "../app/_lib/lib"
import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { createSignerFromKeypair, signerIdentity, generateSigner, percentAmount, createGenericFile } from "@metaplex-foundation/umi";

const containerStyle = {
  height: '250px',
  width: '100%'
};

let center = {
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
  const [storedData, setStoredData] = useState([]);

  
  const [placeDetails, setPlaceDetails] = useState([]); // State to store place details

  // States for 'Trip' form
  const [autocompleteFromTrip, setAutocompleteFromTrip] = useState(null);
  const [autocompleteToTrip, setAutocompleteToTrip] = useState(null);

  useEffect(() => {
    console.log("Inside useEffect");
    fetchIoTData(); // Fetch IoT data when component mounts
    const storedData = JSON.parse(localStorage.getItem('placeDetails'));
  
    console.log("tripMonitor storeddata ",storedData);
    
    if (storedData.length > 0) {
      const fromPlace = storedData.find(detail => detail.action.includes('from'));
      const toPlace = storedData.find(detail => detail.action.includes('to'));
      
      if (fromPlace && toPlace) {
        calculateDirections(fromPlace.latitude, fromPlace.longitude, toPlace.latitude, toPlace.longitude);
      }
      
      //console.log(" tripMonitor from:", fromPlace, " toPlace:", toPlace);
    }
  }, [storedData]);

  const fetchIoTData =async () => {
    // Fetch the machine and owner public keys
    
    //let machineKeyString = machineKey.toString()
    //let ownerKeyString = ownerKey.toString()
    
    let machinePublicKey = Keypair.fromSecretKey(new Uint8Array(machineKey)).publicKey; // Replace with actual machine public key
    let ownerPublicKey = Keypair.fromSecretKey(new Uint8Array(ownerKey)).publicKey;// Replace with actual owner public key
    
    //machinePublicKey = machinePublicKey.publicKey
   // ownerPublicKey = ownerPublicKey.publicKey
    
    console.log('fetchIoTData ',machinePublicKey, ' ', ownerPublicKey)
    try {
      const iotDataArray = await loadTokensByMachineIdAndOwner(machinePublicKey, ownerPublicKey);
      console.log("iotDataArray ",iotDataArray)
      if (iotDataArray.length > 0) {
        let nftLoadedCorrectly =0;
        for(let i=0;i<iotDataArray.length;i++){
          if(iotDataArray[i].sensors.length>4) nftLoadedCorrectly = i
        }
        const iotData = iotDataArray[nftLoadedCorrectly];

        setAvailableCars(iotData.sensors.find(sensor => sensor.type === 'availableCars')?.data[0] || 0);
        setRentalCost(iotData.sensors.find(sensor => sensor.type === 'rentalCost')?.data[0] || 0);
        setBalance(iotData.sensors.find(sensor => sensor.type === 'balance')?.data[0] || 0);
        setFuelPercentage(iotData.sensors.find(sensor => sensor.type === 'fuel_pump')?.data[0] || 0);
        setFuelDistance(iotData.sensors.find(sensor => sensor.type === 'fuelDistance')?.data[0] || 0);
      }
    } catch (error) {
      console.error('Error fetching IoT data:', error);
    }
  };

  const calculateDirections = (startLat, startLng, endLat, endLng) => {
    const directionsService = new window.google.maps.DirectionsService();
    center={
      lat: startLat,
      lng: startLng
    }
    const origin = { lat: startLat, lng: startLng };
    const destination = { lat: endLat, lng: endLng };

    console.log("origin ",origin, " destination ",destination)

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        console.log("end operation result ",result," status ",status)
        setDirections(result);
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
          // Aggiungi gestione per altri stati di errore se necessario
          default:
              console.error(`Errore nel recupero delle direzioni. Status: ${status}`);
      }
      }
    );
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

    setPlaceDetails((prevPlaceDetails) => [...prevPlaceDetails, newPlaceDetails]);
  };

  const handleAutocompleteLoad = (autocomplete, type) => {
    console.log(`Autocomplete loaded for ${type}`, autocomplete);
      if (type === 'from') {
        setAutocompleteFromTrip(autocomplete);
      } else if (type === 'to') {
        setAutocompleteToTrip(autocomplete);
      }
    
  };

  const handlePlaceChanged = (type) => {
    let autocomplete;
    autocomplete = type === 'from' ? autocompleteFromTrip : autocompleteToTrip;
    

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
                    <h4>Days booked</h4>
                    <p>3</p>
                  </div>
                </td>
                <td>
                  <div>
                    <h4>Time on board</h4>
                    <p>1h20'</p>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>
                    <h4>Days remaining</h4>
                    <p>4</p>
                  </div>
                </td>
                <td>
                  <div>
                    <h4>Kilometers travelled</h4>
                    <p>143km</p>
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
          <LoadScript googleMapsApiKey="AIzaSyCKYIUUKpUGlRbuu1BFgBBv05eSvyqiUsY" libraries={[ 'places']}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={7}
            >
            {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
          </LoadScript>
          <div className="input-group">
            <img src="/IMG/Main/TripMonitor/icon-marker2.png" alt="Marker" className="input-icon" />
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
        </div>
      </div>
    </div>
  );
};

export default TripMonitor;
