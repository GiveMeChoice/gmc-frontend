/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React, { useState } from 'react';
import { auth } from '../../lib/firebase';
import NavMenu from './NavMenu';
import cn from 'classnames';

const ProfileButton: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => {
    setMenuOpen(false);
  };
  console.log(auth.currentUser);
  return (
    <>
      <button
        // onClick={() => setLoginModalOpen(true)}
        title="Profile Menu"
        className={cn(
          'group flex h-10 w-10 items-center justify-center rounded-full border-1.5 border-zinc-800 shadow-sm duration-150 active:border-1.5',
          {
            'border-1.5': menuOpen,
          }
        )}
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      >
        <img
          className={cn(
            'rounded-full transition-opacity  group-hover:opacity-50 group-active:opacity-70',
            {
              'opacity-50': menuOpen,
            }
          )}
          src={auth.currentUser ? auth.currentUser.photoURL : ''}
          referrerPolicy="no-referrer"
          alt="profile photo"
        />
        <img
          className={cn('absolute h-9 cursor-pointer rounded-full  ', {
            hidden: !menuOpen,
            // block: menuOpen,
          })}
          draggable={false}
          src="/img/expand-down.svg"
          alt="User Icon"
        />
      </button>
      <NavMenu open={menuOpen} closeMenu={closeMenu} />
    </>
  );
};

export default ProfileButton;
