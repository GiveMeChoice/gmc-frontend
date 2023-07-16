/* eslint-disable @next/next/no-img-element */
import { useAuth } from '@root/components/auth/auth.provider';
import React, { useEffect, useState } from 'react';
import DropdownMenu from './dropdown-menu';
import cn from 'classnames';
const AngleDownIcon = require('../../../../assets/images/angle-down.svg');

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
      <button
        title="Menu"
        className={cn(
          `group flex h-10 w-10 items-center justify-center rounded-full border-1.5 border-secondary bg-secondary text-zinc-900 shadow-sm transition-transform duration-150 active:border-1.5`,
          {
            'bg-primary hover:scale-105 hover:opacity-90': !menuOpen,
            'scale-105': menuOpen,
          }
        )}
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      >
        {menuOpen ? (
          <img
            className="absolute h-6 cursor-pointer rounded-full"
            draggable={false}
            src={AngleDownIcon}
            alt="Angle Down"
          />
        ) : (
          <>
            {auth.user.photoURL ? (
              <img
                draggable={false}
                className="rounded-full"
                src={auth.user.photoURL}
                referrerPolicy="no-referrer"
                alt="profile photo"
              />
            ) : (
              <span className="pb-0.5 text-2xl">
                {auth.user.displayName ? auth.user.displayName[0] : 'U'}
              </span>
            )}
          </>
        )}
      </button>
      <DropdownMenu open={menuOpen} closeMenu={closeMenu} />
    </>
  );
};

export default ProfileButton;
