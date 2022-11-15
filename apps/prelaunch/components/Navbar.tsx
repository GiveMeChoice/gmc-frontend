import React from 'react';
import Image from 'next/image';
import { Header } from 'blog';
import { useRouter } from 'next/router';

const Navbar: React.FC = () => {
  const router = useRouter();
  return (
    <nav className="relative mx-auto w-full bg-white pt-4">
      {/* FLEX CONTAINER */}
      <div className="container mx-auto flex items-center justify-between px-6 xl:px-36">
        {/* LOGO */}
        <div className="pt-2 md:pt-0">
          <a href="/">
            <Image
              src="/img/GMC_logo.svg"
              alt="GMC Logo"
              height="60"
              width="350"
            />
          </a>
        </div>
        {/* MENU ITEMS */}
        <div className="hidden space-x-10  md:flex md:items-center">
          <a href="/about-us" className="text-lg hover:text-secondary-dark-50">
            About Us
          </a>
          {router.route.includes('[slug]') ? (
            <Header />
          ) : (
            <a href="/blog" className="text-lg hover:text-secondary-dark-50">
              Blog
            </a>
          )}
        </div>
        {/* HAMBURGER */}
        <button
          id="menu-btn"
          className="hamburger mt-3 mr-3 ml-6 focus:outline-none md:hidden"
          onClick={(e) => {
            const btn = document.getElementById('menu-btn');
            const nav = document.getElementById('menu');
            btn.classList.toggle('open');
            nav.classList.toggle('flex');
            nav.classList.toggle('hidden');
          }}
        >
          <span className="hamburger-top"></span>
          <span className="hamburger-middle"></span>
          <span className="hamburger-bottom"></span>
        </button>
      </div>
      {/* MOBILE MENU */}
      <div className="md:hidden">
        <div
          id="menu"
          className="absolute right-0 z-10 mt-0 hidden w-1/2 flex-col items-center self-end rounded-sm border-2 border-black bg-white"
        >
          <a className="glow-effect w-full py-3 text-center" href="/about-us">
            About Us
          </a>
          <a className="glow-effect w-full py-3 text-center" href="/blog">
            Blog
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
