// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-red-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-white text-4xl font-bold">Flight Finder</a>
        <div className="space-x-4">
          <Link to="/" className="text-white text-2xl hover:text-black">Home</Link>
          <Link to="/company/register" className="text-white text-2xl hover:text-black">Register</Link>
          <Link to="/company/login" className="text-white text-2xl hover:text-black">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
