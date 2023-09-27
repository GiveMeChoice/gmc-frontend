import channelsService from '@root/services/channels.service';
import providersService from '@root/services/providers.service';
import runsService from '@root/services/runs.service';
import screensService from '@root/services/screens.service';
import cn from 'classnames';
import React from 'react';
import NavbarSublink from './navbar-bottom/navbar-sublink';
import merchantsService from '@root/services/merchants.service';

const NavbarBottomIntegration: React.FC = () => {
  return (
    <div
      className={cn(
        'flex h-12 w-full border-b-2 border-secondary bg-zinc-900 pl-8 text-secondary-dark-10',
        {}
      )}
    >
      <NavbarSublink
        screen={merchantsService.merchantsScreenControl}
        actionType="SCREEN_REFRESH_MERCHANTS"
      />
      <NavbarSublink
        screen={providersService.providersScreenControl}
        actionType="SCREEN_REFRESH_PROVIDERS"
      />
      <NavbarSublink
        screen={channelsService.channelsScreenControl}
        actionType="SCREEN_REFRESH_CHANNELS"
      />
      <NavbarSublink
        screen={runsService.runsScreenControl}
        actionType="SCREEN_REFRESH_RUNS"
      />
      <div
        className={cn(
          'relative top-0 z-0 flex w-28 justify-center duration-300',
          {
            '-left-[475px]': screensService.isActive(
              merchantsService.merchantsScreenControl
            ),
            '-left-[355px]': screensService.isActive(
              providersService.providersScreenControl
            ),
            '-left-[235px]': screensService.isActive(
              channelsService.channelsScreenControl
            ),
            '-left-[115px]': screensService.isActive(
              runsService.runsScreenControl
            ),
          }
        )}
      >
        <div className={cn('z-0 h-1.5 w-16 rounded-b-lg bg-primary')} />
      </div>
    </div>
  );
};

export default NavbarBottomIntegration;
