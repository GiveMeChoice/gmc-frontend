import React from 'react';

const HamburgerButton: React.FC = () => {
  return (
    <button
      id="menu-btn"
      className="hamburger z-20 ml-12 mr-3 block focus:outline-none sm:float-right sm:ml-0 xl:-right-24"
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
