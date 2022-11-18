/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';

const Sidebar: React.FC = () => {
  const location = useLocation();
  return (
    <div className="hidden h-screen flex-col bg-gmc-glacier py-8 lg:flex">
      <div className="mx-5 w-48">
        <img src="GMC_logo.svg" />
      </div>
      <div className="mx-6 mt-16 flex h-full flex-col justify-between">
        <div className="flex flex-col space-y-2.5">
          <a
            href="/providers"
            className={cn(
              'flex rounded-lg py-2 text-sm font-bold duration-75 hover:bg-primary-light-50',
              {
                'bg-primary': location.pathname.includes('/providers'),
              }
            )}
          >
            <img className="h-5 w-12" src="person.svg" alt="person icon" />
            <span>Providers</span>
          </a>
          <a
            href="/product-sources"
            className={cn(
              'flex rounded-lg py-2 text-sm font-bold duration-75 hover:bg-primary-light-50',
              {
                'bg-primary': location.pathname.includes('/product-sources'),
              }
            )}
          >
            <img className="h-5 w-12" src="bananas.svg" alt="bananas icon" />
            <span>Product Sources</span>
          </a>
          <a
            href="/source-runs"
            className={cn(
              'flex rounded-lg py-2 text-sm font-bold duration-75 hover:bg-primary-light-50',
              {
                'bg-primary': location.pathname.includes('/source-runs'),
              }
            )}
          >
            <img className="h-5 w-12" src="cart.svg" alt="cart icon" />
            <span>Source Runs</span>
          </a>
        </div>
        <div className="h-10 rounded-md border-2 border-black">OPTIONS</div>
      </div>
    </div>
  );
};

export default Sidebar;
