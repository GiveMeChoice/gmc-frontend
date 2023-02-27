import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import NavMenuItem from './NavMenu/NavMenuItem';
import Image from 'next/image';
import { auth } from '../../lib/firebase';
import { CSSTransition } from 'react-transition-group';

interface Props {
  closeMenu: () => void;
  open: boolean;
}

const NavMenu: React.FC<Props> = ({ closeMenu, open }) => {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(open ? dropdownRef.current?.firstChild.offsetHeight : 0);
  }, [open]);

  const calcHeight = (el) => {
    const height = el.offsetHeight;
    setMenuHeight(height);
  };

  const handleClickaway = (e: PointerEvent) => {
    const menu = e.target.closest('#dropdown-menu');
    if (!menu) {
      closeMenu();
    }
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
      id="dropdown-menu"
      className={cn(
        'dropdown-menu transition-height absolute top-14 mx-4 max-h-fit w-80 max-w-full overflow-hidden rounded-md border-2 border-black bg-white duration-200 ease-in-out',
        {
          '-z-10 opacity-0': !open,
        }
      )}
      style={{ height: menuHeight }}
      ref={dropdownRef}
    >
      <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <ul
          className={cn('flex w-full flex-col gap-1 rounded-lg bg-white p-1.5')}
          onClick={() => setActiveMenu('secondary')}
        >
          {/* <li
            className="flex h-20 w-full cursor-pointer items-center gap-3 px-2 text-sm"
            // onClick={() => router.push(title.toLowerCase())}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary-dark-10 bg-opacity-60">
              Profile
            </div>
          </li> */}
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
            className="flex h-10 w-full cursor-pointer items-center justify-center gap-1 px-2 text-sm transition-colors duration-150 ease-in-out hover:bg-secondary active:bg-secondary-dark-10 active:bg-opacity-50"
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
      </CSSTransition>
      <CSSTransition
        in={activeMenu === 'secondary'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <ul
          className="flex w-full flex-col gap-1 rounded-lg bg-white p-1.5"
          onClick={() => setActiveMenu('main')}
        >
          <NavMenuItem title="Profile">
            <Image
              draggable={false}
              src="/img/user.svg"
              alt="User Icon"
              height={17}
              width={10}
            />
          </NavMenuItem>
          <NavMenuItem title="Something">
            <Image
              draggable={false}
              src="/img/tree.svg"
              alt="Tree Icon"
              height={17}
              width={17}
            />
          </NavMenuItem>
          <NavMenuItem title="Something Else">
            <Image
              draggable={false}
              src="/img/heart.svg"
              alt="Heart Icon"
              height={20}
              width={20}
            />
          </NavMenuItem>
          <NavMenuItem title="Something Else">
            <Image
              draggable={false}
              src="/img/heart.svg"
              alt="Heart Icon"
              height={20}
              width={20}
            />
          </NavMenuItem>
          <NavMenuItem title="Something Else">
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
            className="flex h-10 w-full cursor-pointer items-center justify-center gap-1 rounded-md px-2 text-sm transition-colors duration-150 ease-in-out hover:bg-secondary active:bg-secondary-dark-10 active:bg-opacity-50"
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
      </CSSTransition>
    </div>
  );
};

export default NavMenu;
