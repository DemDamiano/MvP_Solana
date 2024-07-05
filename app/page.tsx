'use client';
import React, { useState } from 'react';
import CarReservation from './carReservation'; // Assicurati di importare il componente
import TripMonitor from './tripMonitor'; // Se esiste un altro componente
import './common.css';

const Page: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('reservation');

  const renderPageContent = () => {
    switch (currentPage) {
      case 'reservation':
        return <CarReservation />;
      case 'tripMonitor':
        return <TripMonitor />;
      default:
        return <CarReservation />;
    }
  };

  return (
    <div className="main-content">
      {renderPageContent()}
    </div>
  );
};

export default Page;
