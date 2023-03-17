import { useData } from '@root/context-providers/data.provider';
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import FiltersBar from './layout/filters-bar';
import Navbar from './layout/navbar';
import Sidebar from './layout/sidebar';
import ProductPreview from './product-preview/product-preview';
import ScreenContainer from './screen/screen-container';

const Layout: React.FC = () => {
  const location = useLocation();
  const data = useData();
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
                <Outlet />
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
