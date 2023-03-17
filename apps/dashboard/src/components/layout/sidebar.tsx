/* eslint-disable @next/next/no-img-element */
import dashboardService from '@root/services/dashboard.service';
import productsService from '@root/services/products.service';
import providersService from '@root/services/providers.service';
import sourcesService from '@root/services/sources.service';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import ScreenLinkButton from './sidebar/screen-link-button';
const GMCLogo = require('../../assets/images/GMC_logo.svg');
const GMCG = require('../../assets/images/GMC_G.svg');
const HomeIcon = require('../../assets/images/home-icon.svg');
const UserIcon = require('../../assets/images/user-icon.svg');
const TreeIcon = require('../../assets/images/tree-icon.svg');
const CartIcon = require('../../assets/images/cart-icon.svg');
const BananasIcon = require('../../assets/images/bananas-icon.svg');
const BasketIcon = require('../../assets/images/basket-icon.svg');
const HumanIcon = require('../../assets/images/human-icon.svg');
const SearchIcon = require('../../assets/images/search-icon.svg');
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
      <div className="mt-14 flex h-full flex-col justify-between">
        <div className="flex flex-col items-center space-y-2 active:[&>*]:bg-primary">
          <ScreenLinkButton
            link={dashboardService.dashboardScreenControl.pathname}
            title="Home"
            pinExpand={pinExpand}
            pinShrink={pinShrink}
          >
            <img className="h-5" src={HomeIcon} alt="home icon" />
          </ScreenLinkButton>
          <ScreenLinkButton
            link={providersService.providersScreenControl.pathname}
            title={providersService.providersScreenControl.title}
            pinExpand={pinExpand}
            pinShrink={pinShrink}
          >
            <img className="h-5" src={UserIcon} alt="user icon" />
          </ScreenLinkButton>
          <ScreenLinkButton
            link={sourcesService.sourcesScreenControl.pathname}
            title={sourcesService.sourcesScreenControl.title}
            pinExpand={pinExpand}
            pinShrink={pinShrink}
          >
            <img className="h-5" src={TreeIcon} alt="tree icon" />
          </ScreenLinkButton>
          <ScreenLinkButton
            link="/mappings"
            title="Mappings"
            pinExpand={pinExpand}
            pinShrink={pinShrink}
          >
            <img className="h-5" src={BasketIcon} alt="basket icon" />
          </ScreenLinkButton>
          <ScreenLinkButton
            link={productsService.productsScreenControl.pathname}
            title={productsService.productsScreenControl.title}
            pinExpand={pinExpand}
            pinShrink={pinShrink}
          >
            <img className="h-5" src={BananasIcon} alt="bananas icon" />
          </ScreenLinkButton>
          <ScreenLinkButton
            link="/jobs"
            title="Jobs"
            pinExpand={pinExpand}
            pinShrink={pinShrink}
          >
            <img className="h-5" src={HumanIcon} alt="human icon" />
          </ScreenLinkButton>
          {/* <ScreenLinkButton
            link="/search"
            title="Search"
            pinExpand={pinExpand}
            pinShrink={pinShrink}
          >
            <img className="h-5" src={SearchIcon} alt="search icon" />
          </ScreenLinkButton> */}
        </div>
        <div className="flex w-full justify-center">
          <button
            onClick={onTogglePin}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full',
              {
                'hover:bg-gmc-berry hover:bg-opacity-30 active:bg-opacity-60':
                  !pinExpand && !pinShrink,
                'bg-gmc-berry bg-opacity-70': pinExpand || pinShrink,
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
