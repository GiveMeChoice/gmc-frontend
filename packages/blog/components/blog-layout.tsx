import React from 'react';
import { Meta } from './meta';

interface Props {
  preview: any;
}

export const BlogLayout: React.FC<Props> = ({ preview, children }) => {
  return (
    <div className={'mt-[68px] flex w-screen justify-center md:mt-[88px]'}>
      <Meta />
      {children}
    </div>
  );
};
