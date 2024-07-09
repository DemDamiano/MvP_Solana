// placeDetailsContext.js
import React, { createContext, useState } from 'react';

export const PlaceDetailsContext = createContext();

export const PlaceDetailsProvider = ({ children }) => {
  const [placeDetails, setPlaceDetails] = useState([]);

  // Function to set place details
  const addPlaceDetails = (newPlaceDetails) => {
    //console.log("placeDetailsContext ",newPlaceDetails)
    //setPlaceDetails((prevPlaceDetails) => [...prevPlaceDetails, newPlaceDetails]);
  };

  // Example logic to fetch or set placeDetails

  return (
    <PlaceDetailsContext.Provider value={{ placeDetails, addPlaceDetails }}>
      {children}
    </PlaceDetailsContext.Provider>
  );
};
