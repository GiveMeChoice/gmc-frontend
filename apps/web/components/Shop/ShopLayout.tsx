import React from 'react';

const ShopLayout: React.FC = ({ children }) => {
  return (
    <div className="mt-[20px] flex w-screen justify-center lg:mt-[70px]">
      <div
        id="content-container"
        className="flex min-h-screen w-full max-w-[1200px] justify-start divide-x-1.5 divide-zinc-700 overflow-y-auto overflow-x-hidden border-t-1.5 border-zinc-700 lg:border-x-1.5"
      >
        {children}
      </div>
    </div>
  );
};

export default ShopLayout;
