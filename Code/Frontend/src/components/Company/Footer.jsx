// Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-yellow-50 text-red-900 text-3xlpy-4">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Company Name. All rights reserved.</p>
      </div>
    </footer>
    
  );
};

export default Footer;
