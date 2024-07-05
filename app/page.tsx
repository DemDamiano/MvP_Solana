import React from 'react';
//import './css/home/style.css';
import Layout from './layout';

const CarReservation = () => {
  return (
    <Layout>
      <header className="header">
        <div className="header-user">Hello User</div>
        <div className="header-notification"><img src="/IMG/home/notification-icon.svg" alt="Notifications" /></div>
      </header>
      <div className="search-container">
        <h1>Odin</h1>
        <p>Wisdom in Motion</p>
        <div className="search-forms">
          <div className="search-form">
            <h2>Reserve a car for a trip</h2>
            <form>
              <input type="text" placeholder="From" />
              <input type="text" placeholder="To" />
              <input type="text" placeholder="Day" />
              <input type="text" placeholder="Time" />
              <label>
                <input type="checkbox" />
                Return stroke?
              </label>
              <button type="submit">Search</button>
            </form>
          </div>
          <div className="search-form">
            <h2>Reserve a car for a day or some</h2>
            <form>
              <input type="text" placeholder="From" />
              <input type="text" placeholder="To" />
              <input type="text" placeholder="Day" />
              <input type="text" placeholder="Time" />
              <button type="submit">Search</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CarReservation;