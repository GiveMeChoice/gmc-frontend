import React, { useState } from 'react';
import SideMenu from '../SideMenu/SideMenu';

const SideMenuButtonMobile: React.FC = () => {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  const handleSideMenuToggle = () => {
    setSideMenuOpen(!sideMenuOpen);
    const screen = document.getElementsByTagName('body')[0];
    screen.classList.toggle('overflow-hidden');
  };

  return (
    <>
      <button
        className="bgsecondary flex h-[36px] w-[36px] flex-col items-center justify-center gap-y-[3px] rounded-full  hover:scale-[1.03] active:bg-secondary"
        onClick={handleSideMenuToggle}
      >
        <div className="w-[19px] border-b-2 border-zinc-900" />
        <div className="my-[1px] w-[19px] border-b-2 border-zinc-900" />
        <div className="w-[19px] border-b-2 border-zinc-900" />
      </button>
      <SideMenu open={sideMenuOpen} close={handleSideMenuToggle} />
    </>
  );
};

export default SideMenuButtonMobile;
