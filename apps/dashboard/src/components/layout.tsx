import React from 'react';
import { Outlet } from 'react-router-dom';
import FiltersBar from './layout/filters-bar';
import Navbar from './layout/navbar';
import Sidebar from './layout/sidebar';
import ScreenContainer from './screen/screen-container';

const Layout: React.FC = () => {
  return (
    <div className="flex h-screen bg-zinc-900 ">
      <Sidebar />
      <div className="flex h-full w-full flex-col">
        <Navbar />
        <div className="flex overflow-y-auto">
          <ScreenContainer>
            <Outlet />
          </ScreenContainer>
          <FiltersBar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
