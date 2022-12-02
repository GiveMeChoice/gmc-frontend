import Navigation from '@root/components/navigation';
import React from 'react';
import { Location, useLocation } from 'react-router-dom';

const NavbarTop: React.FC = () => {
  const location = useLocation();
  return (
    <div className="flex items-center justify-between border-secondary bg-secondary py-5 px-6 lg:border-b-2 lg:bg-zinc-900 lg:px-7 lg:text-secondary xl:px-16">
      <div className="w-1/3 lg:hidden">
        <img src="GMC_logo.svg" />
      </div>
      <h2 className="hidden w-1/3 p-3 text-2xl font-bold lg:block">
        {getTitle(location)}
      </h2>
      <div className="flex w-1/2 justify-center lg:w-1/2">
        <Navigation />
      </div>
      <div className="flex w-1/4 justify-end lg:w-1/3">
        <img
          src={
            'https://cdn.sanity.io/images/k9rvr8n5/production/c90731ece25b5ef9c36a41dc9843bd4876125cc6-1203x1410.jpg?rect=0,104,1203,1203&w=96&h=96&fit=crop&auto=format'
          }
          className="mr-3 h-12 w-12 cursor-pointer rounded-full ring-2 ring-black active:ring-primary lg:ring-white"
          height={96}
          width={96}
          alt="asdf"
        />
      </div>
    </div>
  );
};

export default NavbarTop;

const getTitle = (location: Location) => {
  if (location.pathname.includes('/providers')) return 'Providers';
  if (location.pathname.includes('/product-sources')) return 'Product Sources';
  if (location.pathname.includes('/product-runs')) return 'Source Runs';
  return 'Home';
};
