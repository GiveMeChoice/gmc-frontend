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
import cn from 'classnames';

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
        <div
          className={cn(
            'absolute bottom-20 z-50 cursor-pointer rounded-md border-1.5 border-black bg-opacity-90 p-4 px-4 transition-all duration-300',
            {
              '-left-[40%]': !data.toast,
              'right-[40%]': data.toast,
              'bg-gmc-ocean-light-50':
                data.toast && data.toast.level === 'INFO',
              'bg-gmc-heart-light-30':
                data.toast && data.toast.level === 'ERROR',
              'bg-gmc-forest-light-50':
                data.toast && data.toast.level === 'SUCCESS',
            }
          )}
          onClick={handleToastDismiss}
        >
          {data.toast && <p className="">{data.toast.message}</p>}
        </div>
      </div>
      {!location.pathname.includes('mapping-assistant') && <FiltersBar />}
    </div>
  );
};

export default Layout;
