/* eslint-disable @next/next/no-img-element */
import { useAuth } from '@root/components/auth/auth.provider';
import React, { useEffect, useState } from 'react';
import DropdownMenu from './dropdown-menu';
import cn from 'classnames';

const ProfileButton: React.FC = () => {
  const auth = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => {
    setMenuOpen(false);
  };
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);
  return (
    <>
      <img
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
        src={auth.user.photoURL}
        className={cn(
          'mr-3 h-10 w-10 cursor-pointer rounded-full ring-2 ring-black ',
          {
            'opacity-70 ring-primary active:ring-white': menuOpen,
            'ring-white hover:ring-primary': !menuOpen,
          }
        )}
        height={96}
        width={96}
        alt="asdf"
      />
      <DropdownMenu open={menuOpen} closeMenu={closeMenu} />
    </>
  );
};

export default ProfileButton;
