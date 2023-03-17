import React from 'react';

const ScreenSectionRow: React.FC = ({ children }) => {
  return <div className="flex h-full divide-x divide-zinc-800">{children}</div>;
};

export default ScreenSectionRow;
