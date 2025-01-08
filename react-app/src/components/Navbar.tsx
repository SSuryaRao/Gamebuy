import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
