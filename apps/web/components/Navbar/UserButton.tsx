/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import cn from 'classnames';
import { useUser } from '../UserProvider';
import DropdownMenu from './DropdownMenu';

const UserButton: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => {
    setMenuOpen(false);
  };
  const { user } = useUser();

  return (
    <>
      <button
        title="Menu"
        className={cn(
          'group flex h-10 w-10 items-center justify-center rounded-full border-1.5 border-zinc-800 shadow-sm transition-transform duration-150 active:border-1.5',
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
            src="/img/angle-down.svg"
            alt="User Icon"
          />
        ) : (
          <>
            {user.photoURL ? (
              <img
                draggable={false}
                className="rounded-full"
                src={user.photoURL}
                referrerPolicy="no-referrer"
                alt="profile photo"
              />
            ) : (
              <span className="pb-0.5 text-2xl">
                {user.displayName ? user.displayName[0] : 'U'}
              </span>
            )}
          </>
        )}
      </button>
      <DropdownMenu open={menuOpen} closeMenu={closeMenu} />
    </>
  );
};

export default UserButton;
