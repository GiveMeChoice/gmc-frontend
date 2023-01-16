import { PreviewAlert } from 'blog';
import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import cn from 'classnames';

const Layout = ({ preview = false, children }) => {
  return (
    <div id="screen" className="flex min-h-screen flex-col justify-between">
      <div id="content-container">
        {preview && <PreviewAlert />}
        <Navbar />
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
