import React from 'react';

const ShopContentContainer: React.FC = ({ children }) => {
  return (
    <div className="flex h-full w-full flex-grow flex-col items-center divide-y-1.5 divide-zinc-700">
      {children}
    </div>
  );
};

export default ShopContentContainer;
