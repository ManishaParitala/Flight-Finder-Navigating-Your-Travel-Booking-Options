// Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="text-pink-900 py-4">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Company Name. All rights reserved.</p>
      </div>
    </footer>
    
  );
};

export default Footer;
