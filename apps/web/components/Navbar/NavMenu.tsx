import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import NavMenuItem from './NavMenu/NavMenuItem';
import Image from 'next/image';
import { auth } from '../../lib/firebase';
import { CSSTransition } from 'react-transition-group';
import { useUser } from '../UserProvider';
import { getUserTheme, Theme } from '../../lib/theme';
import ThemeColorButton from './NavMenu/ThemeColorButton';

interface Props {
  closeMenu: () => void;
  open: boolean;
}

const NavMenu: React.FC<Props> = ({ closeMenu, open }) => {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  const { profile } = useUser();

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
    } else {
      setActiveMenu('main');
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
        `dropdown-menu transition-height absolute top-14 mx-4 max-h-fit w-80 max-w-full overflow-hidden rounded-md border-2 border-black duration-300 ease-in-out bg-${
          getUserTheme(profile).modal
        }`,
        {
          'pointer-events-none -z-10 h-0 opacity-0': !open,
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
          className={`flex w-full flex-col gap-1 rounded-lg p-1.5`}
          onClick={() => setActiveMenu('secondary')}
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
          <hr className="border-zinc-700" />
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
        <ul className={`flex w-full flex-col gap-1 rounded-lg p-1.5`}>
          <li
            className="flex h-10 w-full cursor-pointer items-center justify-center gap-1 rounded-md px-2 text-sm transition-colors duration-150 ease-in-out hover:bg-secondary active:bg-secondary-dark-10 active:bg-opacity-50"
            onClick={() => setActiveMenu('main')}
          >
            BACK
          </li>
          <hr className="border-zinc-700" />
          <li className="flex w-full flex-col gap-3 py-3">
            <div className="flex w-full justify-evenly">
              <ThemeColorButton
                color="white"
                theme={Theme.GMC_DEFAULT}
                title="Default"
              />
              <ThemeColorButton
                color="gmc-dune"
                theme={Theme.GMC_DUNE}
                title="Dune"
              />
              <ThemeColorButton
                color="gmc-jungle"
                theme={Theme.GMC_JUNGLE}
                title="Jungle"
              />
              <ThemeColorButton
                color="gmc-forest"
                theme={Theme.GMC_FOREST}
                title="Forest"
              />
            </div>
            <div className="flex w-full justify-evenly">
              <ThemeColorButton
                color="gmc-heart"
                theme={Theme.GMC_HEART}
                title="Heart"
              />
              <ThemeColorButton
                color="gmc-glacier"
                theme={Theme.GMC_GLACIER}
                title="Glacier"
              />
              <ThemeColorButton
                color="gmc-beach"
                theme={Theme.GMC_BEACH}
                title="Beach"
              />
              <ThemeColorButton
                color="gmc-surf"
                theme={Theme.GMC_SURF}
                title="Surf"
              />
            </div>
            <div className="flex w-full justify-evenly">
              <ThemeColorButton
                color="gmc-soil"
                theme={Theme.GMC_SOIL}
                title="Soil"
              />
              <ThemeColorButton
                color="gmc-berry"
                theme={Theme.GMC_BERRY}
                title="Berry"
              />
              <ThemeColorButton
                color="gmc-sunset"
                theme={Theme.GMC_SUNSET}
                title="Sunset"
              />
              <ThemeColorButton
                color="gmc-ocean"
                theme={Theme.GMC_OCEAN}
                title="Ocean"
              />
            </div>
          </li>
        </ul>
      </CSSTransition>
    </div>
  );
};

export default NavMenu;
