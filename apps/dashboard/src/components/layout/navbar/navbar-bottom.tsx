import React, { useState } from 'react';
import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';

const NavbarBottom: React.FC = () => {
  const [optionsOn, setOptionsOn] = useState<boolean>(false);
  const location = useLocation();
  return (
    <div className="flex flex-col border-b-2 border-secondary bg-zinc-900 text-secondary-dark-10 lg:hidden">
      <div className="flex justify-between px-6">
        <div className="flex space-x-2">
          <Link
            className={cn('p-3 duration-150', {
              'bolder-text text-primary':
                location.pathname.includes('/providers'),
              'hover:bolder-text hover:scale-105 hover:text-white':
                !location.pathname.includes('/providers'),
            })}
            to="/providers"
          >
            Providers
          </Link>
          <Link
            className={cn('p-3 duration-150', {
              'bolder-text text-primary':
                location.pathname.includes('/product-sources'),
              'hover:bolder-text hover:scale-105 hover:text-white':
                !location.pathname.includes('/product-sources'),
            })}
            to="/product-sources"
          >
            Product Sources
          </Link>
          <Link
            className={cn('p-3 duration-150', {
              ' bolder-text text-primary':
                location.pathname.includes('/product-runs'),
              'hover:bolder-text hover:scale-105 hover:text-white':
                !location.pathname.includes('/product-runs'),
            })}
            to="product-runs"
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
                tabs_indicator_runs:
                  location.pathname.includes('/product-runs'),
              }
            )}
          />
        </div>
        <div
          className={cn('cursor-pointer space-y-1 p-3', {
            '[&>*]:hover:bg-white': !optionsOn,
            '[&>*]:bg-primary': optionsOn,
          })}
          onClick={() => setOptionsOn(!optionsOn)}
        >
          <div className="h-1 w-1 rounded-full bg-secondary-dark-10"></div>
          <div className="h-1 w-1 rounded-full bg-secondary-dark-10"></div>
          <div className="h-1 w-1 rounded-full bg-secondary-dark-10"></div>
        </div>
      </div>
      <div
        className={cn('flex h-52 justify-between border-t border-secondary', {
          hidden: !optionsOn,
        })}
      ></div>
    </div>
  );
};

export default NavbarBottom;
