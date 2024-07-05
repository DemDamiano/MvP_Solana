import React from 'react';
import Head from 'next/head';
import './css/home/style.css';

const Layout = ({ children }) => {
    return (
      <html lang="en">
        <Head>
          <title>Car Reservation</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <body>
          <div className="container">
            <aside className="sidebar">
              <div className="sidebar-icon"><img src="/IMG/home/home-icon.svg" alt="Home" /></div>
              <div className="sidebar-icon"><img src="/IMG/home/user-icon.svg" alt="User" /></div>
              <div className="sidebar-icon"><img src="/IMG/home/notification-icon.svg" alt="Notifications" /></div>
              <div className="sidebar-icon"><img src="/IMG/home/settings-icon.svg" alt="Settings" /></div>
              <div className="sidebar-icon"><img src="/IMG/home/logout-icon.svg" alt="Logout" /></div>
            </aside>
            <main className="main-content">
              {children}
            </main>
          </div>
        </body>
      </html>
    );
  };
  
  export default Layout;