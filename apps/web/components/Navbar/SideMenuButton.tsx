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
        className="flex aspect-square h-9 flex-col items-center justify-center gap-y-1 rounded-full border border-zinc-900 bg-white p-1 hover:scale-[1.03] active:bg-secondary"
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
