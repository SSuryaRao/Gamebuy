import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedGames from "./components/FeaturedGames";
import Footer from "./components/Footer";
import About from "./components/About"; // Import About component
import Contact from "./components/Contact"; // Import Contact component
import Games from "./components/Games"; // Import Games component
import GameDetails from "./components/GameDetails"; // Import GameDetails component

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Route for Home */}
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <FeaturedGames />
                </>
              }
            />
            {/* Route for Games */}
            <Route path="/games" element={<Games />} />
            {/* Route for About */}
            <Route path="/about" element={<About />} />
            {/* Route for Contact */}
            <Route path="/contact" element={<Contact />} />
            {/* Route for Game Details */}
            <Route path="/game/:id" element={<GameDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
