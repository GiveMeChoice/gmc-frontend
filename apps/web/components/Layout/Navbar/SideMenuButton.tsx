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
        className="bgsecondary flex aspect-square h-[30px] w-[40px] flex-col items-center justify-center gap-y-[3px] rounded-md border border-b-1.5 border-l-1.5 border-zinc-700 p-1.5 hover:scale-[1.03] hover:bg-secondary active:bg-primary"
        onClick={handleSideMenuToggle}
      >
        <div className="w-4 border-b-2 border-zinc-900" />
        <div className="my-[1px] w-[19px] border-b-2 border-zinc-900" />
        <div className="w-4 border-b-2 border-zinc-900" />
      </button>
      <SideMenu open={sideMenuOpen} close={handleSideMenuToggle} />
    </>
  );
};

export default SideMenuButton;
