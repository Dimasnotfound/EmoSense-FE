import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          EmoSense
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-yellow-300 transition duration-300">
            Home
          </Link>
          <Link to="/diagnose" className="hover:text-yellow-300 transition duration-300">
            Diagnose
          </Link>
          <Link to="/dashboard" className="hover:text-yellow-300 transition duration-300">
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;