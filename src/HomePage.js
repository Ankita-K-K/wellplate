import React from 'react';
import './App.css';

function HomePage() {
  return (
    <div>
      <nav className="navbar">
        <div className="logo">Diet Lens</div>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/profile">Profile</a></li>
        </ul>
      </nav>

      <div className="hero-section">
        <div className="content">
          <h1 className="hero-title">One Scan Away For Good Diet</h1>
          <p className="hero-text">
          Upload your meal image and discover tailored 
          dietary recommendations. Smart eating made simple with Diet Lens.
          </p>
          <button className="custom-button">Get Started</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
