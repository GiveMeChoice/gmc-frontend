import cn from 'classnames';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useUser } from '../UserProvider';
import DropdownMenuTransition from './DropdownMenu/DropdownMenuTransition';
import FavoritesDropdownMenu from './DropdownMenu/FavoritesDropdownMenu';
import MainDropdownMenu from './DropdownMenu/MainDropdownMenu';
import ThemeDropdownMenu from './DropdownMenu/ThemeDropdownMenu';

interface Props {
  closeMenu: () => void;
  open: boolean;
}

export enum DropdownMenuName {
  MAIN,
  THEME,
  FAVORITES,
}

const DropdownMenu: React.FC<Props> = ({ closeMenu, open }) => {
  const [activeMenu, setActiveMenu] = useState<DropdownMenuName>(
    DropdownMenuName.MAIN
  );
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);
  const router = useRouter();

  const { profile } = useUser();

  const calcHeight = (el) => {
    const height = el.offsetHeight;
    setMenuHeight(height);
  };

  const handleClickaway = (e: PointerEvent) => {
    const menuContainer = (e.target as any).closest('#dropdown-menu');
    if (!menuContainer) {
      closeMenu();
    }
  };
  const handleEscapeKey = (e) => {
    if (e.key === 'Escape') {
      closeMenu();
    }
  };
  const handleScroll = (e) => {
    if (router.pathname.includes('/blog')) {
      closeMenu();
    }
  };

  useEffect(() => {
    setMenuHeight(open ? dropdownRef.current?.firstChild.offsetHeight : 0);
    if (open) {
      const body = document.getElementsByTagName('body')[0];
      body.addEventListener('click', handleClickaway);
      document.addEventListener('keydown', handleEscapeKey);
      document.addEventListener('scroll', handleScroll);
      return () => {
        body.removeEventListener('click', handleClickaway);
        document.removeEventListener('keydown', handleEscapeKey);
        document.removeEventListener('scroll', handleScroll);
      };
    } else {
      setActiveMenu(DropdownMenuName.MAIN);
    }
  }, [open]);

  return (
    <div
      id="dropdown-menu"
      className={cn(
        `dropdown-menu absolute -right-2 z-50 w-[365px] -translate-y-[30px] overflow-hidden rounded-2xl border border-secondary-dark-50 bg-secondary-light-10 shadow-md duration-300 ease-in-out`,
        {
          'pointer-events-none -z-10 h-0 opacity-0': !open,
        }
      )}
      style={{ height: menuHeight }}
      ref={dropdownRef}
    >
      <DropdownMenuTransition
        menuName={DropdownMenuName.MAIN}
        activeMenu={activeMenu}
        calcHeight={calcHeight}
      >
        <MainDropdownMenu setActiveMenu={setActiveMenu} close={closeMenu} />
      </DropdownMenuTransition>

      <DropdownMenuTransition
        menuName={DropdownMenuName.THEME}
        activeMenu={activeMenu}
        calcHeight={calcHeight}
      >
        <ThemeDropdownMenu setActiveMenu={setActiveMenu} />
      </DropdownMenuTransition>

      <DropdownMenuTransition
        menuName={DropdownMenuName.FAVORITES}
        activeMenu={activeMenu}
        calcHeight={calcHeight}
      >
        <FavoritesDropdownMenu setActiveMenu={setActiveMenu} />
      </DropdownMenuTransition>
    </div>
  );
};

export default DropdownMenu;
