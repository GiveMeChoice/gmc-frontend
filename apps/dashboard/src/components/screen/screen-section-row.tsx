import React from 'react';

const ScreenSectionRow: React.FC = ({ children }) => {
  return (
    <div className="flex space-x-4 divide-x divide-zinc-800 pt-2 [&>*]:pl-4">
      {children}
    </div>
  );
};

export default ScreenSectionRow;
