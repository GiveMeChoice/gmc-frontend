import cn from 'classnames';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import 'react-responsive-modal/styles.css';
import { BlogNavProvider } from '../Context/BlogNavProvider';
import { useUser } from '../Context/UserProvider';
import BlogNavbar from './Navbar/BlogNavbar';
import GiveMeBarNav from './Navbar/GiveMeBarNav';
import LoginButton from './Navbar/LoginButton';
import ProfileButton from './Navbar/ProfileButton';
import ShopNavbar from './Navbar/ShopNavbar';
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
          'fixed top-0 z-10 flex w-screen flex-col bg-white transition-all duration-500'
        )}
      >
        <div
          id="navbar-content"
          className="flex h-[88px] w-full items-center justify-between px-[60px]"
        >
          <div className="flex w-full max-w-[850px] items-center gap-x-8 pr-12">
            <SideMenuButton />
            <GiveMeBarNav />
          </div>
          <div className="flex items-center gap-x-5">
            {/* <LinkChips /> */}
            {user ? <ProfileButton /> : <LoginButton />}
          </div>
        </div>
        {router.route.includes('/blog') && <BlogNavbar />}
        {router.route.includes('/shop') && <ShopNavbar />}
      </nav>
    </BlogNavProvider>
  );
};

export default Navbar;
