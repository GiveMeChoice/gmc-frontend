import cn from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';
import 'react-responsive-modal/styles.css';
import BlogNavbar from './Navbar/BlogNavbar';
import GiveMeBarNav from './Navbar/GiveMeBarNav';
import LinkChips from './Navbar/LinkChips/LinkChips';
import LoginButton from './Navbar/LoginButton';
import ProfileButton from './Navbar/ProfileButton';
import SideMenuButton from './Navbar/SideMenuButton';
import { useUser } from './UserProvider';

const Navbar: React.FC = () => {
  const { user } = useUser();
  const router = useRouter();
  return (
    <nav
      id="navbar-container"
      className={cn(
        'fixed top-0 z-10 flex w-screen flex-col border-b-1.5 border-secondary-dark-10 bg-white transition-all duration-500',
        {}
      )}
    >
      <div
        id="navbar-content"
        className="flex h-22 w-full items-center justify-between px-16"
      >
        <div className="flex w-1/2 items-center">
          {router.route === '/' || (
            <div className="flex w-full items-center gap-x-5">
              {/* <HomeButton /> */}
              <GiveMeBarNav />
            </div>
          )}
        </div>
        <div className="flex items-center gap-x-6">
          <LinkChips />
          {user ? <ProfileButton /> : <LoginButton />}
          <SideMenuButton />
        </div>
      </div>
      {router.route.includes('/blog') && <BlogNavbar />}
    </nav>
  );
};

export default Navbar;
