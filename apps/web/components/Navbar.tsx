import cn from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';
import 'react-responsive-modal/styles.css';
import GiveMeBar from './GiveMeBar';
import HomeButton from './Navbar/HomeButton';

import LocaleButton from './Navbar/LocaleButton';
import LoginButton from './Navbar/LoginButton';
import UserButton from './Navbar/UserButton';
import { useUser } from './UserProvider';

const Navbar: React.FC = () => {
  const { user } = useUser();
  const router = useRouter();
  return (
    <nav
      id="navbar-content"
      className={cn('fixed z-10 flex h-24 w-full items-center gap-x-8 px-8', {
        'justify-end': router.route === '/',
        'justify-between': router.route !== '/',
      })}
    >
      {router.route === '/' || (
        <div className="flex items-center gap-6">
          <GiveMeBar />
        </div>
      )}
      <div className="flex items-center gap-6">
        <HomeButton />
        <LocaleButton />
        {user ? <UserButton /> : <LoginButton />}
      </div>
    </nav>
  );
};

export default Navbar;
