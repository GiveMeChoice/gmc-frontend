import React from 'react';

const ScreenContainer: React.FC = ({ children }) => {
  return (
    <div
      id="screen-container"
      className="h-full w-full space-y-6 overflow-y-auto px-8 py-8 xl:px-10"
    >
      {children}
    </div>
  );
};

export default ScreenContainer;
