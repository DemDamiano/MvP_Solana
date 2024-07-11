'use client';
import React, { useState } from 'react';
import CarReservation from './carReservation'; // Make sure this path is correct
import TripMonitor from './tripMonitor'; // Make sure this path is correct
import TripManager from './tripManager'
import LoginPage from './login'; // Make sure this path is correct
import './common.css';

const Page = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track authentication
  const [currentPage, setCurrentPage] = useState('reservation'); // State to track the current page

  const handleLogin = () => {
    setIsLoggedIn(true); // Set login state
  };

  const handleCarReservation = () => {
    setCurrentPage('tripMonitor'); // Navigate to TripMonitor
  };

  const renderPageContent = () => {
    if (!isLoggedIn) {
      return <LoginPage onLogin={handleLogin} />; // Show login page if not authenticated
    }
    switch (currentPage) {
      case 'reservation':
        return <CarReservation carReservation={handleCarReservation} />;
      case 'tripMonitor':
        return <TripMonitor />;
      case 'tripManager':
        return <TripManager />;
      default:
        return <CarReservation carReservation={handleCarReservation} />;
    }
  };

  return (
    <>
        {isLoggedIn && ( // Show sidebar only if the user is authenticated
          <div className="sidebar">
            <div className="user-section">
              <div className="user-icon"></div>
              <p></p>
            </div>
            <nav>
              <ul>
                <li className="active">
                  <a href="#" onClick={() => setCurrentPage('reservation')}>
                    <img 
                      src={currentPage === 'reservation' ? "/IMG/Main/Home/icon-home2.png" : 
                        "/IMG/Main/Home/icon-home.png"} 
                      alt="Home" 
                      className="home-icon" 
                    />
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => setCurrentPage('tripMonitor')}>
                    <img 
                      src={currentPage === 'tripMonitor' ? "/IMG/Main/Home/icon-dashboard2.png" : 
                        "/IMG/Main/Home/icon-dashboard.png"} 
                      alt="Home" 
                      className="home-icon" 
                    />
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => setCurrentPage('tripManager')}>
                    <img 
                      src={currentPage === 'tripManager' ? "/IMG/Main/Home/icon-bag2.png" : 
                        "/IMG/Main/Home/icon-bag.png"} 
                      alt="Home" 
                      className="home-icon" 
                    />
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
        )}
        <div className="main-content">
          <header className="main-header">
            <div className="header-left">
              {isLoggedIn && ( // Show user info only if authenticated
                <>
                  <div className="user-info">
                    <img src="/IMG/Main/Home/icon-user.png" alt="User Home" className="header-icon user-icon" />
                    <span>Hello User</span>
                  </div>
                  <div className="notification">
                    <img src="/IMG/Main/Home/icon-notification.png" alt="Notification Bell" className="header-icon" />
                    <span className="notification-count">1</span>
                  </div>
                </>
              )}
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
      </>
  );
};

export default Page;
