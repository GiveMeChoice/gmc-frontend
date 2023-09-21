import React, { ReactFragment } from 'react';

const ShopLayout: React.FC = ({ children }) => {
  return (
    <div className="mt-[46px] flex h-full w-full flex-col items-center">
      <div className="flex h-full w-full max-w-[1550px] flex-col">
        <div
          id="content-container"
          className="flex min-h-screen  w-full divide-x-1.5 divide-zinc-700 overflow-x-hidden border-x-1.5 border-t-1.5 border-zinc-700"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default ShopLayout;
