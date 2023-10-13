import React from 'react';

const ShopContentContainer: React.FC = ({ children }) => {
  return (
    <div className="flex h-full w-full flex-grow flex-col items-center">
      {children}
    </div>
  );
};

export default ShopContentContainer;
