import React from 'react';

const HamburgerButton: React.FC = () => {
  return (
    <button
      id="menu-btn"
      className="flixed hamburger z-20 ml-8 focus:outline-none sm:ml-0"
      onClick={(e) => {
        const btn = document.getElementById('menu-btn');
        const nav = document.getElementById('menu');
        const body = document.getElementsByTagName('body')[0];
        btn.classList.toggle('open');
        nav.classList.toggle('-right-full');
        nav.classList.toggle('right-0');
        body.classList.toggle('overflow-y-hidden');
      }}
    >
      <span className="hamburger-top"></span>
      <span className="hamburger-middle"></span>
      <span className="hamburger-bottom"></span>
    </button>
  );
};

export default HamburgerButton;
