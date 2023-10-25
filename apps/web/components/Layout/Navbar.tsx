import cn from 'classnames';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import 'react-responsive-modal/styles.css';
import { BlogNavProvider } from '../Context/BlogNavProvider';
import { useUser } from '../Context/UserProvider';
import BlogNavbar from './Navbar/BlogNavbar';
import GiveMeBarMobile from './Navbar/GiveMeBarMobile';
import GiveMeBarNav from './Navbar/GiveMeBarNav';
import LoginButton from './Navbar/LoginButton';
import ProfileButton from './Navbar/ProfileButton';
import ShopNavbar from './Navbar/ShopNavbar';
import ShopNavbarMobile from './Navbar/ShopNavbarMobile';
import SideMenuButton from './Navbar/SideMenuButton';

const Navbar: React.FC = () => {
  const { user } = useUser();
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
        <div
          id="navbar-content"
          className={cn(
            'flex h-[70px] w-full items-center justify-between px-[16px] py-5 sm:h-[88px] md:px-[60px]',
            {
              'h-[128px]': router.route.includes('/shop/search'),
            }
          )}
        >
          {router.route.includes('/shop/search') && (
            <div className="h-full w-[36px] sm:hidden" />
          )}
          <div
            className={cn('flex h-full w-fit items-center gap-x-3 md:gap-x-5', {
              'w-fit justify-center sm:justify-start':
                !router.route.includes('/shop/search'),
              'w-full justify-center sm:w-fit sm:justify-start':
                router.route.includes('/shop/search'),
            })}
          >
            {/* <SideMenuButton /> */}
            <GiveMeBarNav />
            <GiveMeBarMobile />
          </div>
          <div
            className={cn('flex h-full gap-x-3', {
              'items-start sm:items-center':
                router.route.includes('/shop/search'),
              'items-center': !router.route.includes('/shop/search'),
            })}
          >
            {/* <LinkChips /> */}
            {user ? <ProfileButton /> : <LoginButton />}
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
