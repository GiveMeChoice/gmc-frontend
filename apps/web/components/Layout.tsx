// import { PreviewAlert } from 'blog';
import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
import cn from 'classnames';
import { useUser } from './UserProvider';
import { getUserTheme } from '../lib/theme';

const Layout = ({ preview = false, children }) => {
  const { profile } = useUser();

  return (
    <div
      id="screen"
      className={`min-h-screen bg-${
        getUserTheme(profile).base
      } z-0 transition-colors duration-300 ease-in-out`}
    >
      {/* {preview && <PreviewAlert />} */}
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
