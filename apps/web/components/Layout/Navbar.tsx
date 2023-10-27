import cn from 'classnames';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import 'react-responsive-modal/styles.css';
import { BlogNavProvider } from '../Context/BlogNavProvider';
import BlogNavbar from './Navbar/BlogNavbar';
import GiveMeBarNav from './Navbar/GiveMeBarNav';
import MobileNavbar from './Navbar/MobileNavbar';
import ShopNavbarMobile from './Navbar/MobileNavbar/ShopNavbarMobile';
import ShopNavbar from './Navbar/ShopNavbar';
import SideMenuButton from './Navbar/SideMenuButton';
import UserButton from './Navbar/UserButton';

const Navbar: React.FC = () => {
  const router = useRouter();
  useEffect(() => {
    const navContainer = document.getElementById('navbar-container');
    if (navContainer) {
      navContainer.style.top = '0px';
    }
  }, [router.asPath]);
  return (
    <BlogNavProvider>
      <nav
        id="navbar-container"
        className={cn(
          'fixed top-0 z-10 flex w-screen flex-col bg-white transition-all duration-150 md:duration-500'
        )}
      >
        <MobileNavbar />
        <div
          id="navbar-content"
          className={cn(
            'hidden h-[88px] w-full items-center justify-between px-[32px] py-5 md:flex'
          )}
        >
          <div
            className={cn(
              'flex h-full w-fit items-center justify-start gap-x-3 md:gap-x-5'
            )}
          >
            <SideMenuButton />
            <GiveMeBarNav />
          </div>
          <div
            className={cn('flex h-full gap-x-3', {
              'items-start sm:items-center':
                router.route.includes('/shop/search'),
              'items-center': !router.route.includes('/shop/search'),
            })}
          >
            {/* <LinkChips /> */}
            <UserButton />
          </div>
        </div>
        {router.route.includes('/blog') && (
          <>
            <BlogNavbar />
          </>
        )}
        {router.route.includes('/shop') && (
          <>
            <ShopNavbar />
            <ShopNavbarMobile />
          </>
        )}
      </nav>
    </BlogNavProvider>
  );
};

export default Navbar;
