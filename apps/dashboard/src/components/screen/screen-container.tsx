import React from 'react';

const ScreenContainer: React.FC = ({ children }) => {
  return (
    <div className="h-full w-full space-y-6 px-4 py-4 xl:px-10">{children}</div>
  );
};

export default ScreenContainer;
