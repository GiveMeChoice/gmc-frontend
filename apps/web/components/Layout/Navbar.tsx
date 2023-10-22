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
          'fixed top-0 z-10 flex w-screen flex-col bg-white transition-all duration-500'
        )}
      >
        <div
          id="navbar-content"
          className="flex h-[70px] w-full items-center justify-between px-[16px] md:h-[88px] md:px-[60px]"
        >
          <div className="flex w-fit items-center gap-x-5 md:gap-x-8">
            <GiveMeBarNav />
            <GiveMeBarMobile />
          </div>
          <div className="flex items-center gap-x-3">
            {/* <LinkChips /> */}
            {user ? <ProfileButton /> : <LoginButton />}
            {/* <SideMenuButton /> */}
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
