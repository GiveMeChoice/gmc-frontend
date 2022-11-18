import React, { useState } from 'react';
import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';

enum Tab {
  PROVIDERS,
  SOURCES,
  RUNS,
}

const NavbarBottom: React.FC = () => {
  const [tab, setTab] = useState<Tab>(Tab.PROVIDERS);
  const location = useLocation();
  return (
    <div className="flex justify-between bg-black px-6 text-secondary-dark-10 lg:hidden">
      <div className="flex space-x-2">
        <Link
          className={cn('p-3 duration-150 hover:scale-105', {
            'bolder-text scale-105 text-primary':
              location.pathname.includes('/providers'),
            'hover:bolder-text hover:text-white':
              !location.pathname.includes('/providers'),
          })}
          to="/providers"
          onClick={() => setTab(Tab.PROVIDERS)}
        >
          Providers
        </Link>
        <Link
          className={cn('p-3 duration-150 hover:scale-105', {
            'bolder-text scale-105 text-primary':
              location.pathname.includes('/product-sources'),
            'hover:bolder-text hover:text-white':
              !location.pathname.includes('/product-sources'),
          })}
          to="/product-sources"
          onClick={() => setTab(Tab.SOURCES)}
        >
          Product Sources
        </Link>
        <Link
          className={cn('p-3 duration-150 hover:scale-105', {
            'bolder-text scale-105 text-primary':
              location.pathname.includes('/source-runs'),
            'hover:bolder-text hover:text-white':
              !location.pathname.includes('/source-runs'),
          })}
          to="/source-runs"
          onClick={() => setTab(Tab.RUNS)}
        >
          Source Runs
        </Link>
        <div
          className={cn(
            'relative top-0 z-0 h-1 w-16 rounded-b-lg bg-primary duration-500 ease-in-out',
            {
              tabs_indicator_providers:
                location.pathname.includes('/providers'),
              tabs_indicator_sources:
                location.pathname.includes('/product-sources'),
              tabs_indicator_runs: location.pathname.includes('/source-runs'),
            }
          )}
        />
      </div>
      <div className="cursor-pointer space-y-0.5 p-3">
        <div className="h-1.5 w-1.5 rounded-full bg-secondary hover:bg-primary"></div>
        <div className="h-1.5 w-1.5 rounded-full bg-secondary hover:bg-primary"></div>
        <div className="h-1.5 w-1.5 rounded-full bg-secondary hover:bg-primary"></div>
      </div>
    </div>
  );
};

export default NavbarBottom;
