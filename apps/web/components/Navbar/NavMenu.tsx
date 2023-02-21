import React, { useEffect } from 'react';
import cn from 'classnames';
import NavMenuItem from './NavMenu/NavMenuItem';
import Image from 'next/image';
import { auth } from '../../lib/firebase';

interface Props {
  closeMenu: () => void;
  open: boolean;
}

const NavMenu: React.FC<Props> = ({ closeMenu, open }) => {
  const handleClickaway = () => {
    closeMenu();
  };
  const handleEscapeKey = (e) => {
    if (e.key === 'Escape') {
      closeMenu();
    }
  };
  useEffect(() => {
    if (open) {
      console.log('registering handlers');
      const body = document.getElementsByTagName('body')[0];
      body.addEventListener('click', handleClickaway);
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
        console.log('removing handlers');
        body.removeEventListener('click', handleClickaway);
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [open]);

  const handleSignOut = async () => {
    try {
      console.log('signing out');
      await auth.signOut();
      console.log('sign out successful');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={cn(
        'transition-height absolute top-14 mx-4 max-h-fit w-72 max-w-full -translate-x-1/2 overflow-hidden rounded-xl shadow-lg duration-100 ease-in-out',
        {
          'h-0': !open,
          'h-48 border-2 border-black': open,
        }
      )}
    >
      <ul className="flex w-full flex-col gap-1 rounded-xl bg-white p-1.5">
        <NavMenuItem title="Profile">
          <Image
            draggable={false}
            src="/img/user.svg"
            alt="User Icon"
            height={17}
            width={10}
          />
        </NavMenuItem>
        <NavMenuItem title="Settings">
          <Image
            draggable={false}
            src="/img/tree.svg"
            alt="Tree Icon"
            height={17}
            width={17}
          />
        </NavMenuItem>
        <NavMenuItem title="Favorites">
          <Image
            draggable={false}
            src="/img/heart.svg"
            alt="Heart Icon"
            height={20}
            width={20}
          />
        </NavMenuItem>
        <hr className="" />
        <li
          className="flex h-10 w-full cursor-pointer items-center justify-center gap-1 rounded-lg px-2 text-sm transition-colors duration-150 ease-in-out hover:bg-secondary active:bg-secondary-dark-10 active:bg-opacity-50"
          onClick={handleSignOut}
        >
          <span>Sign Out</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-full">
            <Image
              draggable={false}
              src="/img/logout.svg"
              alt="Logout Icon"
              height={22}
              width={22}
            />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default NavMenu;
