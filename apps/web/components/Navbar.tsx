import cn from 'classnames';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import 'react-responsive-modal/styles.css';
import { auth } from '../lib/firebase';
import SearchBar from './SearchBar';

import LoginButton from './Navbar/LoginButton';
import ProfileButton from './Navbar/ProfileButton';
import LocaleButton from './Navbar/LocaleButton';
import HomeButton from './Navbar/HomeButton';
// import HamburgerButton from './HamburgerButton';
// import MobileMenu from './MobileMenu';

const Navbar: React.FC = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(auth.currentUser);
    auth.onAuthStateChanged((updatedUser) => {
      setUser(updatedUser);
    });
  }, []);
  const router = useRouter();
  return (
    <nav className={cn('flex w-full justify-center bg-white')}>
      <div
        id="navbar-content"
        className="container fixed z-50 mx-auto flex h-16 w-full flex-grow items-center justify-between p-3"
      >
        <div id="nav-items-left">{router.route === '/' || <HomeButton />}</div>
        <div
          id="nav-items-right"
          className="flex items-center gap-8 duration-100"
        >
          <LocaleButton />
          {user ? <ProfileButton /> : <LoginButton />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
