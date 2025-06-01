import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white h-screen flex items-center">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
          Selamat Datang di EmoSense
        </h1>
        <p className="text-lg md:text-xl mb-6 animate-fade-in-delay">
          Cek Tingkat Depresimu Sekarang!
        </p>
        <Link
          to="/diagnose"
          className="bg-yellow-500 text-white px-6 py-3 rounded-md hover:bg-yellow-600 transition duration-300 animate-fade-in-delay-2"
        >
          Isi Form
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;