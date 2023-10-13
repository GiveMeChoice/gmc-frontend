import merchantBrandsService from '@root/services/merchant-brands.service';
import merchantCategoriesService from '@root/services/merchant-categories.service';
import merchantLabelsService from '@root/services/merchant-labels.service';
import screensService from '@root/services/screens.service';
import cn from 'classnames';
import React from 'react';
import NavbarSublink from './navbar-bottom/navbar-sublink';
import { gmcCategoriesService } from '@root/services/gmc-categories.service';
import { gmcLabelsService } from '@root/services/gmc-labels.service';
import { gmcBrandsService } from '@root/services/gmc-brands.service';

const NavbarBottomMappings: React.FC = () => {
  return (
    <div
      className={cn(
        'flex h-12 w-full border-b-2 border-secondary bg-zinc-900 pl-8 text-secondary-dark-10',
        {}
      )}
    >
      <NavbarSublink
        screen={gmcBrandsService.gmcBrandsScreenControl}
        actionType="NO_OP"
      />
      <NavbarSublink
        screen={gmcCategoriesService.gmcCategoriesScreenControl}
        actionType="NO_OP"
      />
      <NavbarSublink
        screen={gmcLabelsService.gmcLabelsScreenControl}
        actionType="NO_OP"
      />
      <div
        className={cn(
          'relative top-0 z-0 flex w-28 justify-center duration-300',
          {
            '-left-[355px]': screensService.isActive(
              gmcBrandsService.gmcBrandsScreenControl
            ),
            '-left-[235px]': screensService.isActive(
              gmcCategoriesService.gmcCategoriesScreenControl
            ),
            '-left-[115px]': screensService.isActive(
              gmcLabelsService.gmcLabelsScreenControl
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
