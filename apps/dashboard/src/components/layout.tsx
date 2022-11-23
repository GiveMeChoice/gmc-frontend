import React from 'react';
import { Outlet } from 'react-router-dom';
import FiltersBar from './layout/filters-bar';
import Sidebar from './layout/sidebar';
import Navbar from './layout/navbar';
import ScreenContainer from './screen/screen-container';
import { FiltersProvider } from '@root/context-providers/filters.provider';
import { DataProvider } from '@root/context-providers/data.provider';

const Layout: React.FC = () => {
  return (
    <div className="flex h-screen bg-zinc-900 ">
      <Sidebar />
      <div className="flex h-full w-full flex-col">
        <Navbar />
        <div className="flex overflow-y-auto">
          <DataProvider>
            <FiltersProvider>
              <ScreenContainer>
                <Outlet />
              </ScreenContainer>
              <FiltersBar />
            </FiltersProvider>
          </DataProvider>
        </div>
      </div>
    </div>
  );
};

export default Layout;
