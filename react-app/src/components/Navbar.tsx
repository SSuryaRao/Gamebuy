import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css';

// Define the structure of the game data
interface Game {
  _id: string;
  title: string;
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Game[]>([]); // Type the results state
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Fetch search results in real-time
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const queryValue = e.target.value;
    setQuery(queryValue);

    if (queryValue.trim() === "") {
      setResults([]);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/search-games?query=${queryValue}`);
      if (response.ok) {
        const data: Game[] = await response.json(); // Specify the expected response type
        setResults(data);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // Navigate to game details
  const handleSelect = (id: string) => {
    navigate(`/game/${id}`);
    setQuery(""); // Clear the search bar
    setResults([]); // Clear the dropdown
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3">
          <img
            src="media/images/logo.png" // Replace with your logo path
            alt="PC Games Logo"
            className="w-11 h-11 object-contain"
          />
          <h1 className="text-2xl font-bold tracking-wide">
            <Link to="/">PC Games</Link>
          </h1>
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 mx-4 lg:mx-8">
          <input
            type="text"
            placeholder="Search for games..."
            value={query}
            onChange={handleSearch}
            className="w-full px-4 py-2 text-black rounded-lg focus:outline-none"
          />
          {results.length > 0 && (
            <ul className="absolute bg-white text-black w-full rounded-lg shadow-lg z-50 mt-2">
              {results.map((game) => (
                <li
                  key={game._id}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelect(game._id)}
                >
                  {game.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Hamburger Menu (Mobile View) */}
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle Navigation"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>

        {/* Navigation Links */}
        <ul
          className={`${
            isOpen ? "block" : "hidden"
          } lg:flex lg:space-x-6 absolute lg:static top-16 left-0 bg-gray-800 lg:bg-transparent w-full lg:w-auto text-center lg:text-left z-50 lg:flex-row flex-col`}
        >
          <li>
            <Link
              to="/"
              className="block px-4 py-2 lg:p-0 hover:text-blue-400 transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/games"
              className="block px-4 py-2 lg:p-0 hover:text-blue-400 transition duration-300"
            >
              Games
            </Link>
          </li>

          <li>
            <Link
              to="/about"
              className="block px-4 py-2 lg:p-0 hover:text-blue-400 transition duration-300"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="block px-4 py-2 lg:p-0 hover:text-blue-400 transition duration-300"
            >
              Contact
            </Link>
          </li>
          {/* Call-to-Action Button */}
          <li>
            <a
              href="#"
              className="block px-4 py-2 lg:p-0 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 lg:ml-4 lg:px-6"
            >
              Sign In
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
