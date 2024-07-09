import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './css/login/style.css';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implementa la logica di login qui
    onLogin();
  };

  const togglePasswordVisibility = () => {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="logo-title-container">
          <div className="title-container">
            <h1>Odin</h1>
            <p>Wisdom in Motion</p>
          </div>
          <div className="logo-container">
            <img src="/IMG/Login/Logo/odin_logo.png" alt="Odin Logo" className="odin-logo" />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <div className="input-group">
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-group password-container">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" id="toggle-password" onClick={togglePasswordVisibility}>
                <img src="/IMG/Login/Icon/hidePssw.png" alt="Show/Hide Password" />
              </button>
            </div>
            <div className="input-group input-group-remember">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <label htmlFor="remember">Remember Me</label>
            </div>
            <button type="submit">Log in</button>
          </div>
        </form>
      </div>
      <div className="carousel active">
        <div className="carousel-item active">
          <img src="/IMG/Login/Carousel/1.png" alt="Car 1" />
          <div className="carousel-caption">
            <h2>Connected. Informed. Secure.</h2>
            <p>Welcome to Odin</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="/IMG/Login/Carousel/3.png" alt="Car 2" />
          <div className="carousel-caption">
            <h2>Drive into the future of trasportation with Odin.</h2>
            <p>Welcome to Odin</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="/IMG/Login/Carousel/5.png" alt="Car 2" />
          <div className="carousel-caption">
            <h3>A suite of innovative features desifned to enhance your car-sharing experience</h3>
            <h5>With the blockchain-based system, Odin provides unmatched security and transparency for all transaction</h5>
            <h4>Enjoy real-time vehicle availability, smart contracts for hassle-free rentals, and advanced user authentication</h4>
          </div>
        </div>
        <div className="carousel-item">
          <img src="/IMG/Login/Carousel/7.png" alt="Car 2" />
          <div className="carousel-caption">
            <h5>Wisdom in Motion</h5>
            <h2>Odin</h2>
            <h3>Experience the next level of car sharing</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
