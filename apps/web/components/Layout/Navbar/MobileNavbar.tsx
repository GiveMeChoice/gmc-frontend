import cn from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import MobileSearchScreen from './MobileNavbar/MobileSearchScreen';
import SideMenuButtonMobile from './MobileNavbar/SideMenuButtonMobile';
import UserButton from './UserButton';
import SearchResultLogo from './MobileNavbar/SearchResultLogo';

const MobileNavbar: React.FC = () => {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);

  const openSearch = () => {
    document.body.style.overflow = 'hidden';
    setShowSearch(true);
  };

  const closeSearch = () => {
    document.body.style.overflow = 'auto';
    setShowSearch(false);
  };

  return (
    <>
      {router.route.includes('/shop/search') ? (
        <div
          id="navbar-content-mobile-search"
          className={cn(
            'flex h-[128px] w-full flex-col items-center border-b-1.5 border-zinc-700 px-[16px] py-5 md:hidden md:px-[60px]'
          )}
        >
          <div className="flex w-full justify-between">
            <SideMenuButtonMobile />
            <Image
              draggable={false}
              src="/img/GIVE_ME_button.svg"
              alt="GMC Logo"
              height={36}
              width={145}
            />
            <UserButton />
          </div>
          <SearchResultLogo onClick={openSearch} />
        </div>
      ) : (
        <div
          id="navbar-content-mobile"
          className={cn(
            'flex h-[70px] w-full items-center justify-between border-b-1.5 border-zinc-700 px-[16px] py-5 md:hidden md:px-[60px]'
          )}
        >
          <SideMenuButtonMobile />
          <Image
            draggable={false}
            src="/img/GMC_LOGO.svg"
            alt="GMC Logo"
            height={50}
            width={220}
            onClick={openSearch}
          />
          <UserButton />
        </div>
      )}
      <MobileSearchScreen show={showSearch} onClose={closeSearch} />
    </>
  );
};

export default MobileNavbar;
