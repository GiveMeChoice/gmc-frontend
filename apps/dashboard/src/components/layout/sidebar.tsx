/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

const Sidebar: React.FC = () => {
  const location = useLocation();
  return (
    <div className="hidden flex-col bg-secondary py-8 lg:flex">
      <div className="mx-5 w-48">
        <img src="GMC_logo.svg" alt="GMC Logo" />
      </div>
      <div className="mx-5 mt-14 flex h-full flex-col justify-between">
        <div className="flex flex-col space-y-2.5">
          <Link
            to="/providers"
            className={cn(
              'flex rounded-md py-3 text-sm font-bold duration-150 hover:bg-primary-light-50',
              {
                'bg-primary': location.pathname.includes('/providers'),
              }
            )}
          >
            <img className="h-5 w-12" src="person.svg" alt="person icon" />
            <span>Providers</span>
          </Link>
          <Link
            to="/product-sources"
            className={cn(
              'flex rounded-md py-3 text-sm font-bold duration-150 hover:bg-primary-light-50',
              {
                'bg-primary': location.pathname.includes('/product-sources'),
              }
            )}
          >
            <img className="h-5 w-12" src="bananas.svg" alt="bananas icon" />
            <span>Product Sources</span>
          </Link>
          <Link
            to="/source-runs"
            className={cn(
              'flex rounded-md py-3 text-sm font-bold duration-150 hover:bg-primary-light-50',
              {
                'bg-primary': location.pathname.includes('/source-runs'),
              }
            )}
          >
            <img className="h-5 w-12" src="cart.svg" alt="cart icon" />
            <span>Product Runs</span>
          </Link>
          <Link
            to="/jobs"
            className={cn(
              'flex rounded-md py-3 text-sm font-bold duration-150 hover:bg-primary-light-50',
              {
                'bg-primary': location.pathname.includes('/jobs'),
              }
            )}
          >
            <img className="h-5 w-12" src="cart.svg" alt="cart icon" />
            <span>Jobs</span>
          </Link>
        </div>
        <div className="h-10 rounded-md border-2 border-black">OPTIONS</div>
      </div>
    </div>
  );
};

export default Sidebar;
