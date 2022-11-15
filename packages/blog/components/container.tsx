import React from 'react';

export const Container: React.FC = ({ children }) => {
  return <div className="container mx-auto px-5 xl:px-36">{children}</div>;
};
