import React, { useEffect, useRef, useState } from 'react';
import DropdownItemButton from './dropdown-menu-item';
const LogoutIcon = require('../../../../assets/images/logout.svg');
import cn from 'classnames';
import { useAuth } from '@root/components/auth/auth.provider';
import DropdownProfileSummary from './dropdown-profile-summary';

interface Props {
  closeMenu: () => void;
  open: boolean;
}

const DropdownMenu: React.FC<Props> = ({ closeMenu, open }) => {
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);
  const auth = useAuth();

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

  const handleSignOut = async () => {
    try {
      await auth.logOut();
    } catch (err) {
      console.log(err);
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
    }
  }, [open]);

  return (
    <div
      id="dropdown-menu"
      className={cn(
        `dropdown-menu transition-height absolute top-20 z-50 max-h-fit w-80 max-w-full overflow-hidden rounded-md border-1.5 border-black bg-secondary text-black shadow-xl duration-300 ease-in-out`,
        {
          'pointer-events-none -z-10 h-0 opacity-0': !open,
        }
      )}
      style={{ height: menuHeight }}
      ref={dropdownRef}
    >
      <div className="flex flex-col p-3">
        <DropdownProfileSummary />
        <hr className="mb-2 mt-4 border-black" />
        <DropdownItemButton handleClick={handleSignOut} centered>
          <div className="flex items-center gap-1">
            <span className="text-base text-black">Sign Out</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full">
              <img className="h-5 w-5" src={LogoutIcon} alt="user icon" />
            </div>
          </div>
        </DropdownItemButton>
      </div>
    </div>
  );
};

export default DropdownMenu;
