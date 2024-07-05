import React from 'react';
import './common.css';

const Layout = ({ 
  children 
}: Readonly<{
  children: React.ReactNode;
}>) => {
    return (
      <html lang="en">
        <head>
          <title>Car Reservation</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body>
          <div className="container">
            <aside className="sidebar">
              <div className="sidebar-icon"><img src="/IMG/Main/Home/icon-home.png" alt="Home" /></div>
              <div className="sidebar-icon"><img src="/IMG/Main/Home/icon-user.png" alt="User" /></div>
              <div className="sidebar-icon"><img src="/IMG/Main/Home/icon-notification.png" alt="Notifications" /></div>
              <div className="sidebar-icon"><img src="/IMG/Main/Home/icon-settings.png" alt="Settings" /></div>
              <div className="sidebar-icon"><img src="/IMG/Main/Home/icon-logout.png" alt="Logout" /></div>
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