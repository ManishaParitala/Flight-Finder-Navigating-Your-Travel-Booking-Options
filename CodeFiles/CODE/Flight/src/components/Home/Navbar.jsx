// src/components/Navbar.js

import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">MyApp</div>
        <div className="space-x-4">
          <a href="/" className="hover:text-gray-400">Home</a>
          <a href="/login" className="hover:text-gray-400">Login</a>
          <a href="/register" className="hover:text-gray-400">Register</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
