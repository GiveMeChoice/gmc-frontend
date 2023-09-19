import cn from 'classnames';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import 'react-responsive-modal/styles.css';
import { BlogNavProvider } from './BlogNavProvider';
import BlogNavbar from './Navbar/BlogNavbar';
import GiveMeBarNav from './Navbar/GiveMeBarNav';
import LinkChips from './Navbar/LinkChips/LinkChips';
import LoginButton from './Navbar/LoginButton';
import ProfileButton from './Navbar/ProfileButton';
import ShopNavbar from './Navbar/ShopNavbar';
import { useUser } from './UserProvider';

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
    <>
      <BlogNavProvider>
        <nav
          id="navbar-container"
          className={cn(
            'fixed top-0 z-10 flex w-screen flex-col bg-white transition-all duration-500',
            {
              // 'transition-all': router.pathname.includes('/blog'),
              // 'transition-none': !router.pathname.includes('/blog'),
            }
          )}
        >
          <div
            id="navbar-content"
            className="flex h-22 w-full items-center justify-between px-[70px]"
          >
            <div className="flex w-full max-w-[850px] items-center gap-x-8 pr-12">
              <GiveMeBarNav />
            </div>
            <div className="flex items-center gap-x-5">
              <LinkChips />
              {user ? <ProfileButton /> : <LoginButton />}
              {/* <SideMenuButton /> */}
            </div>
          </div>
          {router.route.includes('/blog') && <BlogNavbar />}
          {router.route.includes('/shop') && <ShopNavbar />}
        </nav>
      </BlogNavProvider>
    </>
  );
};

export default Navbar;
