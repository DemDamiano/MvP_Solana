import React from 'react';
import Link from 'next/link';
import  '../app/css/common/style.css';

const Layout = ({ children }) => {
  return (
    <html>
        <body>
            <div className="layout">
                <div className="sidebar">
                    <div className="user-section">
                    <div className="user-icon"></div>
                    <p>Hello User</p>
                    </div>
                    <nav>
                    <ul>
                        <li className="active">
                        <Link href="/">    
                            <img src="../app/IMG/Home/iocn-home.png" alt="Home" className="home-icon" />
                        </Link>
                        </li>
                        <li>
                        <Link href="/trip-monitor">    
                            <img src="../app/IMG/Home/icon-dashboard.png" alt="Dashboard" className="home-icon" />
                        </Link>
                        </li>
                        <li>
                        <Link href="/trip-manager">    
                            <img src="../app/IMG/Home/icon-bag.png" alt="Trip Manager" className="home-icon" />
                        </Link>
                        </li>
                        <li>
                        <Link href="/group">    
                            <img src="../app/IMG/Home/icon-people.png" alt="Group" className="home-icon" />
                        </Link>
                        </li>
                    </ul>
                    </nav>
                    <div className="logout-section">
                    <Link href="/logout">
                        <img src="../app/IMG/Home/icon-shutoff.png" alt="Logout" className="home-icon" />
                    </Link>
                    </div>
                </div>
                <div className="main-content">
                    <header className="main-header">
                    <div className="header-left">
                        <div className="user-info">
                        <img src="../app/IMG/Home/icon-user.png" alt="User Home" className="header-icon user-icon" />
                        <span>Hello User</span>
                        </div>
                        <div className="notification">
                        <img src="../app/IMG/Home/icon-notification.png" alt="Notification Bell" className="header-icon" />
                        <span className="notification-count">1</span>
                        </div>
                    </div>
                    <div className="header-right">
                        <div className="search">
                        <img src="../app/IMG/Home/icon-instruction.png" alt="Logo" className="header-icon" />
                        </div>
                        <div className="search-bar">
                        <input type="text" placeholder="Search" />
                        <img src="../app/IMG/Home/icon-search.png" alt="Search" className="header-icon" />
                        </div>
                    </div>
                    </header>
                    {children}
                </div>
            </div>
        </body>
    </html>
  );
};

export default Layout;
