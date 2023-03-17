import { useAuth } from '@root/components/auth/auth.provider';
import Navigation from '@root/components/navigation';
import {
  useFilters,
  useFiltersDispatch,
} from '@root/context-providers/filters.provider';
import screenControlsService from '@root/services/screen-controls.service';
import cn from 'classnames';
import React from 'react';

const NavbarTop: React.FC = () => {
  const { filterBarVisible } = useFilters();
  const filtersDispatch = useFiltersDispatch();
  const auth = useAuth();

  return (
    <div className="flex w-full items-center justify-between border-b-2 border-secondary bg-zinc-900 px-6 py-4 text-secondary lg:px-7 xl:px-16">
      <h2 className="w-1/3 p-3  text-xl font-bold lg:text-2xl">
        {screenControlsService.getCurrentScreenTitle()}
      </h2>
      <div className="flex w-1/2 justify-center lg:w-1/2">
        <Navigation />
      </div>
      <div className="flex w-1/4 items-center justify-end lg:w-1/3">
        <img
          onClick={() => {
            auth.logOut();
          }}
          src={
            'https://cdn.sanity.io/images/k9rvr8n5/production/c90731ece25b5ef9c36a41dc9843bd4876125cc6-1203x1410.jpg?rect=0,104,1203,1203&w=96&h=96&fit=crop&auto=format'
          }
          className="mr-3 h-12 w-12 cursor-pointer rounded-full ring-2 ring-black active:ring-primary lg:ring-white"
          height={96}
          width={96}
          alt="asdf"
        />
        <div
          className="ml-6 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full  border-secondary duration-150 hover:bg-zinc-800 active:bg-opacity-50"
          onClick={() => {
            filtersDispatch({ type: 'TOGGLE_FILTER_BAR' });
          }}
        >
          <div
            className={cn('space-y-1', {
              '[&>*]:hover:bg-primary': !filterBarVisible,
              '[&>*]:bg-primary': filterBarVisible,
            })}
          >
            <div className="h-1 w-1 rounded-full bg-secondary-dark-10"></div>
            <div className="h-1 w-1 rounded-full bg-secondary-dark-10"></div>
            <div className="h-1 w-1 rounded-full bg-secondary-dark-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarTop;
