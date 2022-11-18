import React from 'react';
import NavbarBottom from './Navbar/navbar-bottom';
import NavbarTop from './Navbar/navbar-top';

const Navbar: React.FC = () => {
  return (
    <div className="flex w-full flex-col">
      <NavbarTop />
      <NavbarBottom />
    </div>
  );
};

export default Navbar;
