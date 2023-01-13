import { PreviewAlert } from 'blog';
import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import cn from 'classnames';

const Layout = ({ preview = false, children }) => {
  return (
    <div
      id="screen-container"
      className="flex min-h-screen flex-col justify-between"
    >
      {preview && <PreviewAlert />}
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
