/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React, { useState } from 'react';
// import { auth } from '../../lib/firebase';
import NavMenu from './NavMenu';
import cn from 'classnames';
import { useUser } from '../UserProvider';

const ProfileButton: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => {
    setMenuOpen(false);
  };
  const { user } = useUser();

  return (
    <>
      {user && (
        <>
          {' '}
          <button
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
            {user.photoURL ? (
              <img
                draggable={false}
                className={cn(
                  'rounded-full transition-opacity  group-active:opacity-80',
                  {
                    'opacity-30': menuOpen,
                    'group-hover:opacity-70': !menuOpen,
                  }
                )}
                src={user.photoURL}
                referrerPolicy="no-referrer"
                alt="profile photo"
              />
            ) : (
              <div
                className={cn(
                  'flex h-full w-full items-center justify-center rounded-full bg-gmc-surf',
                  {
                    'opacity-50': menuOpen,
                    'hover:opacity-80': !menuOpen,
                  }
                )}
              >
                <span
                  className={cn('pb-0.5 text-2xl', {
                    hidden: menuOpen,
                  })}
                >
                  {user.displayName ? user.displayName[0] : 'U'}
                </span>
              </div>
            )}
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
      )}
    </>
  );
};

export default ProfileButton;
