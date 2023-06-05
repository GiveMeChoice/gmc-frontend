import channelsService from '@root/services/channels.service';
import providersService from '@root/services/providers.service';
import runsService from '@root/services/runs.service';
import screensService from '@root/services/screens.service';
import cn from 'classnames';
import React from 'react';
import NavbarSublink from './navbar-bottom/navbar-sublink';

const NavbarBottomIntegration: React.FC = () => {
  return (
    <div
      className={cn(
        'flex w-full border-b-2 border-secondary bg-zinc-900 pl-4 text-secondary-dark-10',
        {}
      )}
    >
      <NavbarSublink screen={providersService.providersScreenControl} />
      <NavbarSublink screen={channelsService.channelsScreenControl} />
      <NavbarSublink screen={runsService.runsScreenControl} />
      <div
        className={cn(
          'relative top-0 z-0 flex w-28 justify-center duration-300',
          {
            '-left-80 pr-8': screensService.isActive(
              providersService.providersScreenControl
            ),
            '-left-56': screensService.isActive(
              channelsService.channelsScreenControl
            ),
            '-left-28': screensService.isActive(runsService.runsScreenControl),
          }
        )}
      >
        <div className={cn('z-0 h-1.5 w-16 rounded-b-lg bg-primary')} />
      </div>
    </div>
  );
};

export default NavbarBottomIntegration;
