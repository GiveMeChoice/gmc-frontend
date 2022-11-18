import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarBottom from './Navbar/navbar-bottom';
import NavbarTop from './Navbar/navbar-top';

const Navbar: React.FC = () => {
  return (
    <div className="flex w-full flex-col">
      <NavbarTop />
      <NavbarBottom />
      <Outlet />
    </div>
  );
};

export default Navbar;
