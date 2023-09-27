import NavButtons from '@root/components/layout/navbar/navbar-top/nav-buttons';
import screensService from '@root/services/screens.service';
import React from 'react';
import ToggleFilterBarButton from './navbar-top/toggle-filter-bar-button';
import ProfileButton from './navbar-top/profile-button';

const NavbarTop: React.FC = () => {
  const getTitle = (): string => {
    if (screensService.getCurrentScreen().pathname.includes('/mappings/')) {
      return 'Merchant Mappings';
    } else if (
      screensService.getCurrentScreen().pathname.includes('/config/')
    ) {
      return 'GMC Configuration';
    } else if (
      screensService.getCurrentScreen().pathname.includes('/integration/')
    ) {
      return 'Integration Settings';
    } else {
      return screensService.getCurrentScreen().title;
    }
  };

  return (
    <div className="flex h-20 w-full items-center justify-between border-b-2 border-secondary bg-zinc-900 px-6 text-secondary lg:px-7 xl:px-16">
      <h2 className="w-1/3 whitespace-nowrap text-xl font-bold lg:text-2xl">
        {getTitle()}
      </h2>
      <div className="flex w-1/2 justify-center lg:w-1/2">
        <NavButtons />
      </div>
      <div className="flex w-1/4 items-center justify-end lg:w-1/3">
        <ProfileButton />
      </div>
      <ToggleFilterBarButton />
    </div>
  );
};

export default NavbarTop;
