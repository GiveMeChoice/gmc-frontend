import React from 'react';
import { PreviewAlert } from './preview-alert';
import { Footer } from '../components/footer';
import { Meta } from '../components/meta';

interface Props {
  preview: any;
}

export const Layout: React.FC<Props> = ({ preview, children }) => {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        {preview && <PreviewAlert />}
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};
