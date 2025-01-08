import React from 'react';
import './Hero.css'; // Import the CSS file

const Hero = () => {
  return (
    <div
      className="hero h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{
        backgroundImage: `url('https://example.com/pc-games-background.jpg')`,
        backgroundColor: '#1a1a1a', // Fallback color
      }}
    >
      {/* Overlay for improved text readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Hero Content */}
      <div className="hero-content relative text-center text-white px-6 bg-gray-900/70 backdrop-blur-md rounded-lg p-10 max-w-3xl shadow-lg">
        <h1 className="hero-title text-5xl font-extrabold mb-6 drop-shadow-lg">
          <span className="text-blue-500">Discover</span> the Best Deals on{' '}
          <span className="text-purple-500">PC Games</span>
        </h1>
        <p className="hero-text text-lg mb-8 drop-shadow-md leading-relaxed">
          Find exclusive deals, track price drops, and explore a wide range of games for every genre. Get the best offers on your favorite titles.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="hero-button bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out flex items-center justify-center">
            <span className="mr-2">🎮</span> Shop Now
          </button>
          <button className="hero-button bg-gradient-to-r from-gray-700 to-gray-900 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out flex items-center justify-center">
            <span className="mr-2">💸</span> View Deals
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
