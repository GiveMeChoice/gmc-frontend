import React from 'react';

const ShopLayout: React.FC = ({ children }) => {
  return (
    <div className="mt-[70px] flex w-screen justify-center">
      <div
        id="content-container"
        className="flex min-h-screen w-full max-w-[1300px] justify-start divide-x-1.5 divide-zinc-700 overflow-y-auto overflow-x-hidden border-x-1.5 border-t-1.5 border-zinc-700"
      >
        {children}
      </div>
    </div>
  );
};

export default ShopLayout;
