import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto text-center">
        {/* Footer Text */}
        <p className="mb-4 text-lg font-semibold">
          © 2025 PC Games. All rights reserved.
        </p>

        {/* Social Links */}
        <div className="flex justify-center space-x-6">
          <a
            href="#"
            className="hover:text-blue-400 transition duration-300 ease-in-out"
            aria-label="Visit Facebook"
          >
            <i className="fab fa-facebook text-2xl"></i> {/* FontAwesome Icon */}
          </a>
          <a
            href="#"
            className="hover:text-blue-400 transition duration-300 ease-in-out"
            aria-label="Visit Twitter"
          >
            <i className="fab fa-twitter text-2xl"></i>
          </a>
          <a
            href="#"
            className="hover:text-pink-500 transition duration-300 ease-in-out"
            aria-label="Visit Instagram"
          >
            <i className="fab fa-instagram text-2xl"></i>
          </a>
        </div>

        {/* Bottom Text */}
        <p className="mt-6 text-sm">
          Designed with ❤️ by <a href="#" className="hover:underline">Surya</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
