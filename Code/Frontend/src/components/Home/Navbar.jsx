// src/components/Navbar.js

import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-red-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-white text-4xl font-bold">Flight Finder</a>
        <div className="space-x-4">
          <a href="/" className="hover:text-gray-400 text-2xl">Home</a>
          <a href="/login" className="hover:text-gray-400 text-2xl">Login</a>
          <a href="/register" className="hover:text-gray-400 text-2xl">Register</a>
          <a href="/company/login" className="hover:text-gray-400 text-2xl">Company Login</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
