import { useMasterData } from '@root/context-providers/master-data.provider';
import {
  useScreenData,
  useScreenDataDispatch,
} from '@root/context-providers/screen-data.provider';
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import ProductPreview from '../product-preview/product-preview';
import ScreenContainer from '../screens/shared/screen-container';
import LoadingWheel from '../shared/loading-wheel';
import FiltersBar from './filters-bar';
import Navbar from './navbar';
import Sidebar from './sidebar';
import Toast from './toast';

const Layout: React.FC = () => {
  const location = useLocation();
  const data = useScreenData();
  const { initialized } = useMasterData();
  const screenDispatch = useScreenDataDispatch();

  const handleToastDismiss = () => {
    screenDispatch({ type: 'REMOVE_TOAST', value: null });
  };

  return (
    <div className="flex h-screen w-screen overflow-y-auto bg-zinc-900">
      <ProductPreview product={data.previewProduct} />
      <Sidebar />
      <div className="flex h-full w-full flex-col overflow-y-auto">
        <Navbar />
        {location.pathname.includes('mapping-assistant') ||
        location.pathname === '/' ? (
          <Outlet />
        ) : (
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
        )}
        <Toast />
      </div>
      {!location.pathname.includes('mapping-assistant') && <FiltersBar />}
    </div>
  );
};

export default Layout;
