import cn from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { getUserTheme } from '../../lib/theme';
import { useUser } from '../UserProvider';
import DropdownMenuTransition from './DropdownMenu/DropdownMenuTransition';
import FavoritesDropdownMenu from './DropdownMenu/FavoritesDropdownMenu';
import MainDropdownMenu from './DropdownMenu/MainDropdownMenu';
import ThemeDropdownMenu from './DropdownMenu/ThemeDropdownMenu';
import { useRouter } from 'next/router';

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

  useEffect(() => {
    setMenuHeight(open ? dropdownRef.current?.firstChild.offsetHeight : 0);
    if (open) {
      const body = document.getElementsByTagName('body')[0];
      body.addEventListener('click', handleClickaway);
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
        body.removeEventListener('click', handleClickaway);
        document.removeEventListener('keydown', handleEscapeKey);
      };
    } else {
      setActiveMenu(DropdownMenuName.MAIN);
    }
  }, [open]);

  return (
    <div
      id="dropdown-menu"
      className={cn(
        `transition-height absolute z-50 max-h-fit w-96 max-w-full overflow-hidden rounded-sm border border-secondary-dark-20 bg-secondary shadow-md shadow-zinc-700 duration-300 ease-in-out bg-${
          getUserTheme(profile).base
        }`,
        {
          'dropdown-menu-home': router.route === '/',
          'dropdown-menu': router.route !== '/',
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
