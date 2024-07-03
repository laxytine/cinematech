import React from "react";
import { useNavigate } from "react-router-dom";
import '../assets/css/home.css';
import backgroundImage from '../assets/images/background.png'; // Import your background image

export default function Banner() {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`, // Set background image dynamically
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };

  return (
    <div className="bg-hero" style={backgroundStyle}>
      <div>
        <div className="text-center">
          <h1 className="h1">Cinematech</h1>
          <p className="p pt-2">Discover, Stream, Repeat:</p>
          <p className="p">Your Gateway to Infinite Entertainment!</p>
        </div>
      </div>
    </div>
  );
}
