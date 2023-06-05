import { useScreenData } from '@root/context-providers/screen-data.provider';
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import FiltersBar from './filters-bar';
import Navbar from './navbar';
import ProductPreview from '../product-preview/product-preview';
import ScreenContainer from '../screens/shared/screen-container';
import Sidebar from './sidebar';
import { useMasterData } from '@root/context-providers/master-data.provider';
import LoadingWheel from '../shared/loading-wheel';

const Layout: React.FC = () => {
  const location = useLocation();
  const data = useScreenData();
  const { initialized } = useMasterData();
  return (
    <div className="flex h-screen bg-zinc-900">
      <ProductPreview product={data.previewProduct} />
      <Sidebar />
      <div className="flex h-full w-full flex-col">
        <Navbar />
        <div className="flex overflow-y-auto">
          {location.pathname.includes('mapping-assistant') ||
          location.pathname === '/' ? (
            <Outlet />
          ) : (
            <>
              <ScreenContainer>
                {initialized ? (
                  <Outlet />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center space-y-8">
                    <h1 className="italic text-white">INITIALIZING</h1>
                    <LoadingWheel size="h-16" />
                  </div>
                )}
              </ScreenContainer>
            </>
          )}
        </div>
      </div>
      {!location.pathname.includes('mapping-assistant') && <FiltersBar />}
    </div>
  );
};

export default Layout;
