import React from 'react';
import { Outlet } from 'react-router-dom';
import NavbarBottom from './navbar/navbar-bottom';
import NavbarTop from './navbar/navbar-top';
import ScreenContainer from './screen/screen-container';

const Navbar: React.FC = () => {
  return (
    <>
      <NavbarTop />
      <NavbarBottom />
    </>
  );
};

export default Navbar;
