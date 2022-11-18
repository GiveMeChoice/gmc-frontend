import React from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';

const Layout: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Navbar />
    </div>
  );
};

export default Layout;
