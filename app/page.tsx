import React from 'react';
import './page.module.css';

const CarReservation: React.FC = () => {
  const openTripMonitor = () => {
    console.log('openTripMonitor');
  };

  const saveDataLocalStorage = () => {
    console.log('saveDataLocalStorage');
  };

  const openPopupPage = () => {
    console.log('openPopupPage');
  };

  return (
    <div className="main-content">
      <div className="reservation-forms">
        <div className="reservation-form" id="trip-form">
          <h2>Reserve a car for a trip</h2>
          <table className="table-container">
            <tbody>
              <tr className="table-row">
                <td className="table-cell">
                  <div className="input-container">
                    <label htmlFor="from-trip" className="label">From</label>
                    <input type="text" id="from-trip" name="from" className="rounded-input" placeholder="Enter location" />
                  </div>
                </td>
                <td className="table-cell">
                  <div className="input-container">
                    <label htmlFor="to-trip" className="label">To</label>
                    <input type="text" id="to-trip" name="to" className="rounded-input" placeholder="Enter destination" />
                  </div>
                </td>
              </tr>
              <tr className="table-row">
                <td className="table-cell">
                  <div className="input-container">
                    <label htmlFor="day-trip" className="label">Day</label>
                    <input type="date" id="day-trip" name="day" className="rounded-input" />
                  </div>
                </td>
                <td className="table-cell">
                  <div className="input-container">
                    <label htmlFor="time-trip" className="label">Time</label>
                    <input type="time" id="time-trip" name="time" className="rounded-input" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="input-container input-group input-group-stroke">
            <label className="return-label">Return stroke?</label>
            <input type="checkbox" id="return-trip" name="return" />
          </div>
          <input type="button" className="button-search" id="search-trip" value="Search" />
        </div>
        <div className="reservation-form" id="day-form">
          <h2>Reserve a car for a day or some</h2>
          <table className="table-container">
            <tbody>
              <tr className="table-row">
                <td className="table-cell">
                  <div className="input-container">
                    <label htmlFor="from-trip-day" className="label">From</label>
                    <input type="text" id="from-trip-day" name="from" className="rounded-input" placeholder="Enter location" />
                  </div>
                </td>
                <td className="table-cell">
                  <div className="input-container">
                    <label htmlFor="to-trip-day" className="label">To</label>
                    <input type="text" id="to-trip-day" name="to" className="rounded-input" placeholder="Enter destination" />
                  </div>
                </td>
              </tr>
              <tr className="table-row">
                <td className="table-cell">
                  <div className="input-container">
                    <label htmlFor="day-trip-day" className="label">Day</label>
                    <input type="date" id="day-trip-day" name="day" className="rounded-input" />
                  </div>
                </td>
                <td className="table-cell">
                  <div className="input-container">
                    <label htmlFor="time-trip-day" className="label">Time</label>
                    <input type="time" id="time-trip-day" name="time" className="rounded-input" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <input type="button" className="button-search" id="search-trip-day" value="Search" />
        </div>
      </div>
    </div>
  );
};

export default CarReservation;
