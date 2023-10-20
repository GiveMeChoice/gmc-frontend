/* eslint-disable @next/next/no-img-element */
import dashboardService from '@root/services/dashboard.service';
import { gmcCategoriesService } from '@root/services/gmc-categories.service';
import jobsService from '@root/services/jobs.service';
import merchantCategoriesService from '@root/services/merchant-categories.service';
import merchantsService from '@root/services/merchants.service';
import productsService from '@root/services/products.service';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import ScreenLinkButton from './sidebar/screen-link-button';
import { gmcBrandsService } from '@root/services/gmc-brands.service';
import merchantBrandsService from '@root/services/merchant-brands.service';
const GMCLogo = require('../../assets/images/GMC_logo.svg');
const GMCG = require('../../assets/images/GMC_G.svg');
const HomeIcon = require('../../assets/images/home-icon.svg');
const DataMapIcon = require('../../assets/images/data-map-icon.svg');
const TreeIcon = require('../../assets/images/tree-icon.svg');
const CartIcon = require('../../assets/images/cart-icon.svg');
const BananasIcon = require('../../assets/images/bananas-icon.svg');
const HumanIcon = require('../../assets/images/human-icon.svg');
const PinIcon = require('../../assets/images/pin-icon.svg');

const Sidebar: React.FC = () => {
  const [pinExpand, setPinExpand] = useState(false);
  const [pinShrink, setPinShrink] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 976) {
        if (pinExpand) {
          setPinExpand(false);
        }
      } else if (pinShrink) {
        document.getElementById('sidebar-container').classList.add('lg:w-64');
        setPinShrink(false);
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [pinShrink, pinExpand, setPinExpand, setPinShrink]);

  const onTogglePin = () => {
    if (window.innerWidth >= 976) {
      if (!pinShrink) {
        document
          .getElementById('sidebar-container')
          .classList.remove('lg:w-64');
      } else {
        document.getElementById('sidebar-container').classList.add('lg:w-64');
      }
      setPinShrink(!pinShrink);
    } else {
      setPinExpand(!pinExpand);
    }
  };

  return (
    <div
      id="sidebar-container"
      className={cn('flex flex-col bg-secondary py-8 duration-300', {
        'lg:w-64': !pinShrink,
        'w-64': pinExpand,
        'w-16': !pinExpand,
      })}
    >
      <div className="mx-5 w-48">
        <div
          id="full-gmc-logo"
          className={cn({
            'lg:flex': !pinShrink,
            hidden: !pinExpand,
          })}
        >
          <img src={GMCLogo} alt="GMC Logo Full" />
        </div>
        <div
          className={cn('h-8', {
            hidden: pinExpand,
            'lg:hidden': !pinShrink,
            flex: !pinExpand,
          })}
        >
          <img src={GMCG} alt="GMC Logo" />
        </div>
      </div>
      <div className="mt-20 flex h-full flex-col justify-between">
        <div className="flex flex-col items-center space-y-2 active:[&>*]:bg-primary">
          {/* <ScreenLinkButton
            screen={dashboardService.dashboardScreenControl}
            pinExpand={pinExpand}
            pinShrink={pinShrink}
          >
            <img className="h-5" src={HomeIcon} alt="home icon" />
          </ScreenLinkButton> */}
          <ScreenLinkButton
            screen={merchantsService.merchantsScreenControl}
            alternativeTitle="Integration"
            alternativePathMatch="/integration/"
            actionType="SCREEN_REFRESH_PROVIDERS"
            pinExpand={pinExpand}
            pinShrink={pinShrink}
          >
            <img className="h-5" src={TreeIcon} alt="user icon" />
          </ScreenLinkButton>
          <ScreenLinkButton
            screen={gmcBrandsService.gmcBrandsScreenControl}
            alternativeTitle="GMC Config"
            alternativePathMatch="/config/"
            actionType="NO_OP"
            pinExpand={pinExpand}
            pinShrink={pinShrink}
          >
            <img className="h-5" src={CartIcon} alt="tree icon" />
          </ScreenLinkButton>
          <ScreenLinkButton
            alternativeTitle="Mappings"
            alternativePathMatch="/mappings/"
            screen={merchantBrandsService.brandsScreenControl}
            actionType="SCREEN_REFRESH_MERCHANT_BRANDS"
            pinExpand={pinExpand}
            pinShrink={pinShrink}
          >
            <img className="h-5" src={DataMapIcon} alt="basket icon" />
          </ScreenLinkButton>
          <ScreenLinkButton
            screen={productsService.productsScreenControl}
            actionType="SCREEN_REFRESH_PRODUCTS"
            pinExpand={pinExpand}
            pinShrink={pinShrink}
          >
            <img className="h-5" src={BananasIcon} alt="bananas icon" />
          </ScreenLinkButton>
          {/* <ScreenLinkButton
            screen={jobsService.jobsScreenControl}
            pinExpand={pinExpand}
            pinShrink={pinShrink}
          >
            <img className="h-5" src={HumanIcon} alt="human icon" />
          </ScreenLinkButton> */}
        </div>
        <div className="flex w-full justify-center">
          <button
            onClick={onTogglePin}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full',
              {
                'hover:bg-gmc-berry hover:bg-opacity-40 active:bg-opacity-70':
                  !pinExpand && !pinShrink,
                'bg-gmc-berry bg-opacity-70 hover:bg-opacity-80 active:bg-opacity-90':
                  pinExpand || pinShrink,
              }
            )}
          >
            <img className="h-4" src={PinIcon} alt="pin icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
