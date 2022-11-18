import React, { useState } from 'react';
import cn from 'classnames';

enum Tab {
  PROVIDERS,
  SOURCES,
  RUNS,
}

const NavbarBottom: React.FC = () => {
  const [tab, setTab] = useState<Tab>(Tab.PROVIDERS);
  return (
    <div className="flex justify-between bg-black px-6 text-secondary-dark-10 lg:hidden">
      <div className="flex space-x-2">
        <a
          className={cn('p-3 duration-150 hover:scale-105', {
            'bolder-text scale-105 text-primary': tab === Tab.PROVIDERS,
            'hover:bolder-text hover:text-white': tab !== Tab.PROVIDERS,
          })}
          href="#"
          onClick={() => setTab(Tab.PROVIDERS)}
        >
          Providers
        </a>
        <a
          className={cn('p-3 duration-150 hover:scale-105', {
            'bolder-text scale-105 text-primary': tab === Tab.SOURCES,
            'hover:bolder-text hover:text-white': tab !== Tab.SOURCES,
          })}
          href="#"
          onClick={() => setTab(Tab.SOURCES)}
        >
          Product Sources
        </a>
        <a
          className={cn('p-3 duration-150 hover:scale-105', {
            'bolder-text scale-105 text-primary': tab === Tab.RUNS,
            'hover:bolder-text hover:text-white': tab !== Tab.RUNS,
          })}
          href="#"
          onClick={() => setTab(Tab.RUNS)}
        >
          Source Runs
        </a>
        <div
          className={cn(
            'relative top-0 z-0 h-1 w-16 rounded-b-lg bg-primary duration-500 ease-in-out',
            {
              tabs_indicator_providers: tab === Tab.PROVIDERS,
              tabs_indicator_sources: tab === Tab.SOURCES,
              tabs_indicator_runs: tab === Tab.RUNS,
            }
          )}
        />
      </div>
      <div className="cursor-pointer space-y-0.5 p-3">
        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
        <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
      </div>
    </div>
  );
};

export default NavbarBottom;
