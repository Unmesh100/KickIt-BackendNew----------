import { useState } from "react";
import PropTypes from "prop-types";
import "./App.css";
import React from "react";
import { useNavigate } from "react-router-dom";
function About() {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/joinus");
  };

  return (
    <>
      <div className="app">
        <main className="main-content">
          <h1 className="title">
            Find Your
            <br />
            Game Anytime
          </h1>
          <p className="subtitle">
            Discover your perfect venue for your next game, whether you are into
            football, basketball, cricket, or any other sports... we make it
            simple to book your venue. We value your time !!
          </p>

          <button className="cta-button" onClick={handleButtonClick}>
            Book Now
          </button>
        </main>
      </div>
    </>
  );
}

export default About;
