import channelsService from '@root/services/channels.service';
import merchantBrandsService from '@root/services/merchant-brands.service';
import merchantCategoriesService from '@root/services/merchant-categories.service';
import merchantLabelsService from '@root/services/merchant-labels.service';
import providersService from '@root/services/providers.service';
import runsService from '@root/services/runs.service';
import screensService from '@root/services/screens.service';
import cn from 'classnames';
import React from 'react';
import NavbarSublink from './navbar-bottom/navbar-sublink';

const NavbarBottomMappings: React.FC = () => {
  return (
    <div
      className={cn(
        'flex w-full border-b-2 border-secondary bg-zinc-900 pl-4 text-secondary-dark-10',
        {}
      )}
    >
      <NavbarSublink
        screen={merchantCategoriesService.categoriesScreenControl}
      />
      <NavbarSublink screen={merchantLabelsService.labelsScreenControl} />
      <NavbarSublink screen={merchantBrandsService.brandsScreenControl} />
      <div
        className={cn(
          'relative top-0 z-0 flex w-28 justify-center duration-300',
          {
            '-left-80 pr-8': screensService.isActive(
              merchantCategoriesService.categoriesScreenControl
            ),
            '-left-56': screensService.isActive(
              merchantLabelsService.labelsScreenControl
            ),
            '-left-28': screensService.isActive(
              merchantBrandsService.brandsScreenControl
            ),
          }
        )}
      >
        <div className={cn('z-0 h-1.5 w-16 rounded-b-lg bg-primary')} />
      </div>
    </div>
  );
};

export default NavbarBottomMappings;
