import React, { useState } from 'react';
import SideMenu from './SideMenu/SideMenu';

const SideMenuButton: React.FC = () => {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  const handleSideMenuToggle = () => {
    setSideMenuOpen(!sideMenuOpen);
    const screen = document.getElementsByTagName('body')[0];
    screen.classList.toggle('overflow-hidden');
  };

  return (
    <>
      <button
        className="flex h-10 w-10 flex-col items-center justify-center gap-y-1 rounded-full border border-black p-1 hover:scale-[1.03] hover:bg-secondary active:bg-primary"
        onClick={handleSideMenuToggle}
      >
        <div className="w-5 border-b-2 border-black" />
        <div className="my-[1px] w-[19px] border-b-2 border-black" />
        <div className="w-5 border-b-2 border-black" />
      </button>
      <SideMenu open={sideMenuOpen} close={handleSideMenuToggle} />
    </>
  );
};

export default SideMenuButton;
