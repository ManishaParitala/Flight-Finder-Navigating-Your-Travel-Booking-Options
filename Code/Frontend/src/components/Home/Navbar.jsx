// src/components/Navbar.js

import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-red-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-white text-4xl font-bold">Flight Finder</a>
        <div className="space-x-4">
          <a href="/" className="text-2xl hover:text-black">Home</a>
          <a href="/login" className="text-2xl hover:text-black">Login</a>
          <a href="/register" className="text-2xl hover:text-black">Register</a>
          <a href="/company/login" className="text-2xl hover:text-black">Company Login</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
