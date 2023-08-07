import cn from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';
import 'react-responsive-modal/styles.css';
import GiveMeBarNav from './Navbar/GiveMeBarNav';
import LinkChips from './Navbar/LinkChips/LinkChips';
import LoginButton from './Navbar/LoginButton';
import ProfileButton from './Navbar/ProfileButton';
import { useUser } from './UserProvider';
import HomeButton from './Navbar/HomeButton';

const Navbar: React.FC = () => {
  const { user } = useUser();
  const router = useRouter();
  return (
    <nav
      id="navbar-content"
      className={cn(
        'border-secondar-dark-10 fixed z-10 flex h-24 w-full items-center gap-x-8 bg-white px-10 pb-1',
        {
          'justify-end': router.route === '/',
          'justify-between border-b-1.5': router.route !== '/',
        }
      )}
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
      </div>
    </nav>
  );
};

export default Navbar;
