// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Company Logo</div>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-400">Flights</Link>
          <Link to="/company/register" className="text-white hover:text-gray-400">Register</Link>
          <Link to="/company/login" className="text-white hover:text-gray-400">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
