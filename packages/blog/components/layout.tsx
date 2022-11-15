import React from 'react';
import { Meta } from '../components/meta';

interface Props {
  preview: any;
}

export const Layout: React.FC<Props> = ({ preview, children }) => {
  return (
    <>
      <Meta />
      {children}
    </>
  );
};
