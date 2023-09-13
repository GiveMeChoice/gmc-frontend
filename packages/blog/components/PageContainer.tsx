import React from 'react';

export const PageContainer: React.FC = ({ children }) => {
  return <div className="flex w-full flex-col items-center">{children}</div>;
};
