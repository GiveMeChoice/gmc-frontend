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
        <div className="flex flex-col space-y-2.5 active:[&>*]:bg-primary">
          <Link
            to="/providers"
            className={cn(
              'flex rounded-md py-3 text-sm font-bold duration-150',
              {
                'hover:bg-primary-light-50':
                  !location.pathname.includes('/providers'),
                'bg-primary': location.pathname.includes('/providers'),
              }
            )}
          >
            <img className="h-5 w-12" src="user-icon.svg" alt="person icon" />
            <span>Providers</span>
          </Link>
          <Link
            to="/product-sources"
            className={cn(
              'flex rounded-md py-3 text-sm font-bold duration-150',
              {
                'hover:bg-primary-light-50':
                  !location.pathname.includes('/product-sources'),
                'bg-primary': location.pathname.includes('/product-sources'),
              }
            )}
          >
            <img className="h-5 w-12" src="tree-icon.svg" alt="bananas icon" />
            <span>Product Sources</span>
          </Link>
          <Link
            to="/product-runs"
            className={cn(
              'flex rounded-md py-3 text-sm font-bold duration-150',
              {
                'hover:bg-primary-light-50':
                  !location.pathname.includes('/product-runs'),
                'bg-primary': location.pathname.includes('/product-runs'),
              }
            )}
          >
            <img className="h-5 w-12" src="cart.svg" alt="cart icon" />
            <span>Product Runs</span>
          </Link>
          <Link
            to="/products"
            className={cn(
              'flex rounded-md py-3 text-sm font-bold duration-150',
              {
                'hover:bg-primary-light-50':
                  !location.pathname.includes('/products'),
                'bg-primary': location.pathname.includes('/products'),
              }
            )}
          >
            <img className="h-5 w-12" src="bananas-icon.svg" alt="cart icon" />
            <span>Products</span>
          </Link>
          <Link
            to="/jobs"
            className={cn(
              'flex rounded-md py-3 text-sm font-bold duration-150',
              {
                'hover:bg-primary-light-50':
                  !location.pathname.includes('/jobs'),
                'bg-primary': location.pathname.includes('/jobs'),
              }
            )}
          >
            <img className="h-5 w-12" src="human-icon.svg" alt="cart icon" />
            <span>Jobs</span>
          </Link>
        </div>
        <div>
          <div className="flex w-full items-center space-x-1.5">
            <img className="h-5" src="search-icon.svg" alt="cart icon" />
            <span className="h-8 w-40 rounded-md border-2 border-black px-2">
              Product Search
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
