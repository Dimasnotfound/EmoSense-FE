import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-2">© 2025 EmoSense. All Rights Reserved.</p>
        <div className="space-x-4">
          <Link to="/privacy" className="hover:text-yellow-300 transition duration-300">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-yellow-300 transition duration-300">
            Terms of Service
          </Link>
          <Link to="/contact" className="hover:text-yellow-300 transition duration-300">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;