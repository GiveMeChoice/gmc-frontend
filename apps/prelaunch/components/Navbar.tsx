import React from 'react';
import Image from 'next/image';
import { Header } from 'blog';
import MobileMenu from './MobileMenu';
import HamburgerButton from './HamburgerButton';

const Navbar: React.FC = () => {
  return (
    <nav className="z-20 w-full bg-secondary">
      {/* FLEX CONTAINER */}
      <div className="flex w-full items-center justify-between px-6 pt-6 pb-3 sm:px-12 lg:pl-32 xl:pl-40">
        {/* LOGO */}
        <div>
          <Image
            src="/img/GMC_logo.svg"
            alt="GMC Logo"
            height="60"
            width="340"
          />
        </div>
        <HamburgerButton />
      </div>
      <MobileMenu />
    </nav>
  );
};

export default Navbar;
