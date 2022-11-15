import React from 'react';

export const PostTitle: React.FC = ({ children }) => (
  <h1 className="my-12 text-center text-6xl font-bold leading-tight tracking-normal md:text-left md:text-7xl md:leading-none lg:text-8xl">
    {children}
  </h1>
);
