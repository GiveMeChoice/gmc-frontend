/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import ScreenLinkButton from './sidebar/screen-link-button';
import cn from 'classnames';
import dashboardService from '@root/services/dashboard.service';
import providersService from '@root/services/providers.service';
import sourcesService from '@root/services/sources.service';
import runsService from '@root/services/runs.service';
import productsService from '@root/services/products.service';

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
          <img src="GMC_logo.svg" alt="GMC Logo" />
        </div>
        <div
          className={cn('h-8', {
            hidden: pinExpand,
            'lg:hidden': !pinShrink,
            flex: !pinExpand,
          })}
        >
          <img src="GMC_G.svg" alt="GMC Logo" />
        </div>
      </div>
      <div className="mt-14 flex h-full flex-col justify-between">
        <div className="flex flex-col items-center space-y-2.5 active:[&>*]:bg-primary">
          <ScreenLinkButton
            link={dashboardService.dashboardScreenControl.pathname}
            title="Home"
            pinExpand={pinExpand}
            pinShrink={pinShrink}
          >
            <img className="h-5" src="home-icon.svg" alt="home icon" />
          </ScreenLinkButton>
          <ScreenLinkButton
            link={providersService.providersScreenControl.pathname}
            title={providersService.providersScreenControl.title}
            pinExpand={pinExpand}
            pinShrink={pinShrink}
          >
            <img className="h-5" src="user-icon.svg" alt="user icon" />
          </ScreenLinkButton>
          <ScreenLinkButton
            link={sourcesService.sourcesScreenControl.pathname}
            title={sourcesService.sourcesScreenControl.title}
            pinExpand={pinExpand}
            pinShrink={pinShrink}
          >
            <img className="h-5" src="tree-icon.svg" alt="tree icon" />
          </ScreenLinkButton>
          <ScreenLinkButton
            link={runsService.runsScreenControl.pathname}
            title={runsService.runsScreenControl.title}
            pinExpand={pinExpand}
            pinShrink={pinShrink}
          >
            <img className="h-5" src="cart.svg" alt="cart icon" />
          </ScreenLinkButton>
          <ScreenLinkButton
            link={productsService.productsScreenControl.pathname}
            title={productsService.productsScreenControl.title}
            pinExpand={pinExpand}
            pinShrink={pinShrink}
          >
            <img className="h-5" src="bananas-icon.svg" alt="bananas icon" />
          </ScreenLinkButton>
          <ScreenLinkButton
            link="/mappings"
            title="Mappings"
            pinExpand={pinExpand}
            pinShrink={pinShrink}
          >
            <img className="h-5" src="basket-icon.svg" alt="basket icon" />
          </ScreenLinkButton>
          <ScreenLinkButton
            link="/jobs"
            title="Jobs"
            pinExpand={pinExpand}
            pinShrink={pinShrink}
          >
            <img className="h-5" src="human-icon.svg" alt="human icon" />
          </ScreenLinkButton>
          <ScreenLinkButton
            link="/search"
            title="Search"
            pinExpand={pinExpand}
            pinShrink={pinShrink}
          >
            <img className="h-5" src="search-icon.svg" alt="search icon" />
          </ScreenLinkButton>
        </div>
        <div className="flex w-full justify-center">
          <button
            onClick={onTogglePin}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full',
              {
                'hover:bg-gmc-berry hover:bg-opacity-20 active:bg-opacity-60':
                  !pinExpand && !pinShrink,
                'bg-gmc-berry bg-opacity-60': pinExpand || pinShrink,
              }
            )}
          >
            <img className="h-4" src="pin-icon.svg" alt="pin icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
