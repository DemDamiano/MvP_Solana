import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselItems = [
    "/IMG/Login/Carousel/1.png",
    "/IMG/Login/Carousel/3.png",
    "/IMG/Login/Carousel/5.png",
    "/IMG/Login/Carousel/7.png"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselItems.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
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
      <div className="carousel">
        {carouselItems.map((src, index) => (
          <div key={index} className={`carousel-item ${index === currentSlide ? 'active' : ''}`}>
            <img src={src} alt={`Car ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoginPage;
