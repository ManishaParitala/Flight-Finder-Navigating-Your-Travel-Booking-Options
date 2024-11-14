// src/components/Footer.js

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-orange-800 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        &copy; {new Date().getFullYear()} MyApp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;