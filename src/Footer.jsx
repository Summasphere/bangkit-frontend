import React from 'react';
import logo from './assets/logo.png';

const Footer = () => {
  return (
    <div className="px-[10%]"> {/* px-14  */}
      <div className="relative mt-16 flex items-center justify-between border-t border-white py-4 text-white">
        <div className="my-3 flex items-center">
          <img src={logo} alt="logo" className="mr-2 h-10" />
          <p className="text-xl">Summasphere</p>
        </div>
        <div>© Copyright 2024 Summasphere Software. All rights reserved.</div>
      </div>
    </div>
  );
}

export default Footer;