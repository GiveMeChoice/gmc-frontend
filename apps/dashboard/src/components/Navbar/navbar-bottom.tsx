import React from 'react';

const NavbarBottom: React.FC = () => {
  return (
    <div className="flex justify-between border-2 border-black px-6 lg:hidden">
      <div className="flex space-x-8">
        <a href="#">Dashboard</a>
        <a href="#">Assets</a>
        <a href="#">Staking</a>
      </div>
      <div className="cursor-pointer space-y-0.5 py-1.5 px-2">
        <div className="h-1.5 w-1.5 rounded-full bg-black"></div>
        <div className="h-1.5 w-1.5 rounded-full bg-black"></div>
        <div className="h-1.5 w-1.5 rounded-full bg-black"></div>
      </div>
    </div>
  );
};

export default NavbarBottom;
