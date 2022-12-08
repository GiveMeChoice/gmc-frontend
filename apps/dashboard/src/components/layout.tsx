import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import FiltersBar from './layout/filters-bar';
import Navbar from './layout/navbar';
import Sidebar from './layout/sidebar';
import ScreenContainer from './screen/screen-container';

const Layout: React.FC = () => {
  const location = useLocation();
  return (
    <div className="flex h-screen bg-zinc-900 ">
      {!location.pathname.includes('mapping-assistant') && <Sidebar />}
      <div className="flex h-full w-full flex-col">
        <Navbar />
        <div className="flex overflow-y-auto">
          {location.pathname.includes('mapping-assistant') ? (
            <Outlet />
          ) : (
            <>
              <ScreenContainer>
                <Outlet />
              </ScreenContainer>
              <FiltersBar />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;
