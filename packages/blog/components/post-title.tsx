import React from 'react';

export const PostTitle: React.FC = ({ children }) => (
  <h1 className="my-12 text-center text-5xl font-bold leading-tight tracking-normal sm:text-6xl md:text-left md:text-7xl md:leading-none lg:text-7xl">
    {children}
  </h1>
);
