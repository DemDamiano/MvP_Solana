'use client'; // Aggiungi questa linea all'inizio del file
import CarReservation from './page';
import TripMonitor from './tripMonitor';
import React, { useState } from 'react';
import './common.css';

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const [currentPage, setCurrentPage] = useState('reservation'); // stato per tracciare la pagina corrente

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
    <html lang="en">
      <head>
        <title>Car Reservation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div className="sidebar">
          <div className="user-section">
            <div className="user-icon"></div>
            <p></p>
          </div>
          <nav>
            <ul>
              <li className="active">
                <a href="#">
                  <img src="/IMG/Main/Home/icon-home.png" onClick={() => setCurrentPage('reservation')} alt="Home" className="home-icon" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="/IMG/Main/Home/icon-dashboard.png" onClick={() => setCurrentPage('tripMonitor')} alt="Dashboard" className="home-icon" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="/IMG/Main/Home/icon-bag.png" alt="Dashboard" className="home-icon" />
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="/IMG/Main/Home/icon-people.png" alt="Group" className="home-icon" />
                </a>
              </li>
            </ul>
          </nav>
          <div className="logout-section">
            <a href="#">
              <img src="/IMG/Main/Home/icon-shutoff.png" alt="Logout" className="home-icon" />
            </a>
          </div>
        </div>
        <div className="main-content">
          <header className="main-header">
            <div className="header-left">
              <div className="user-info">
                <img src="/IMG/Main/Home/icon-user.png" alt="User Home" className="header-icon user-icon" />
                <span>Hello User</span>
              </div>
              <div className="notification">
                <img src="/IMG/Main/Home/icon-notification.png" alt="Notification Bell" className="header-icon" />
                <span className="notification-count">1</span>
              </div>
            </div>
            <div className="header-right">
              <div className="search">
                <img src="/IMG/Main/Home/icon-instruction.png" alt="Logo" className="header-icon" />
              </div>
              <div className="search-bar">
                <input type="text" placeholder="Search" />
                <img src="/IMG/Main/Home/icon-search.png" alt="Search" className="header-icon" />
              </div>
            </div>
          </header>
         
          <main className="main-content">
            {renderPageContent()}
          </main>
        </div>
      </body>
    </html>
  );
};

export default Layout;
