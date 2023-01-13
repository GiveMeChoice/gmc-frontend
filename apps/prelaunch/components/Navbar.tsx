import React from 'react';
import Image from 'next/image';
import { Header } from 'blog';
import MobileMenu from './MobileMenu';
import HamburgerButton from './HamburgerButton';

const Navbar: React.FC = () => {
  return (
    <nav className="z-20 w-full">
      {/* FLEX CONTAINER */}
      <div className="container mx-auto flex w-full items-center justify-between px-5 pt-8 pb-3 xl:px-36">
        {/* LOGO */}
        <a href="/">
          <Image
            src="/img/GMC_logo.svg"
            alt="GMC Logo"
            height="50"
            width="320"
          />
        </a>
        <HamburgerButton />
      </div>
      <MobileMenu />
    </nav>
  );
};

export default Navbar;
