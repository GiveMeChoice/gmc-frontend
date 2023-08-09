/* eslint-disable @next/next/no-img-element */
import cn from 'classnames';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getUserTheme } from '../../lib/theme';
import { useUser } from '../UserProvider';
import DropdownMenu from './DropdownMenu';

const ProfileButton: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => {
    setMenuOpen(false);
  };
  const { user, profile } = useUser();
  const router = useRouter();

  useEffect(() => {
    closeMenu();
  }, [router.pathname]);

  return (
    <>
      <button
        title="Menu"
        className={cn(
          `group flex h-10 w-10 items-center justify-center rounded-full border border-black shadow-sm transition-transform duration-150 active:border-1.5 dark:border-white bg-${
            getUserTheme(profile).modal
          }`,
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

export default ProfileButton;
