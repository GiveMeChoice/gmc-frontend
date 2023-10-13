import React from 'react';

const ShopChoiceBarContainer: React.FC = ({ children }) => {
  return (
    <div className="flex w-[340px] min-w-[340px] max-w-[340px] flex-col">
      {children}
    </div>
  );
};

export default ShopChoiceBarContainer;
