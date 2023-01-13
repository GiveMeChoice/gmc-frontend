import React from 'react';
import { toggleNavMenu } from '../helpers/toggle-nav-menu';

const HamburgerButton: React.FC = () => {
  return (
    <button
      id="menu-btn"
      className="hamburger z-20 ml-12 mr-3 block focus:outline-none sm:float-right sm:ml-0 xl:-right-24"
      onClick={toggleNavMenu}
    >
      <span className="hamburger-top"></span>
      <span className="hamburger-middle"></span>
      <span className="hamburger-bottom"></span>
    </button>
  );
};

export default HamburgerButton;
