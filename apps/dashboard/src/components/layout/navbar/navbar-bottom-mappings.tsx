import merchantBrandsService from '@root/services/merchant-brands.service';
import merchantCategoriesService from '@root/services/merchant-categories.service';
import merchantLabelsService from '@root/services/merchant-labels.service';
import screensService from '@root/services/screens.service';
import cn from 'classnames';
import React from 'react';
import NavbarSublink from './navbar-bottom/navbar-sublink';

const NavbarBottomMappings: React.FC = () => {
  return (
    <div
      className={cn(
        'flex h-12 w-full border-b-2 border-secondary bg-zinc-900 pl-8 text-secondary-dark-10',
        {}
      )}
    >
      <NavbarSublink
        screen={merchantBrandsService.brandsScreenControl}
        actionType="SCREEN_REFRESH_MERCHANT_BRANDS"
      />
      <NavbarSublink
        screen={merchantCategoriesService.categoriesScreenControl}
        actionType="SCREEN_REFRESH_MERCHANT_CATEGORIES"
      />
      <NavbarSublink
        screen={merchantLabelsService.labelsScreenControl}
        actionType="SCREEN_REFRESH_MERCHANT_LABELS"
      />
      <div
        className={cn(
          'relative top-0 z-0 flex w-28 justify-center duration-300',
          {
            '-left-[355px]': screensService.isActive(
              merchantBrandsService.brandsScreenControl
            ),
            '-left-[235px]': screensService.isActive(
              merchantCategoriesService.categoriesScreenControl
            ),
            '-left-[115px]': screensService.isActive(
              merchantLabelsService.labelsScreenControl
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
