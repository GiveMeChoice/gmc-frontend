import React from 'react';

const NavbarTop: React.FC = () => {
  return (
    <div className="flex bg-secondary py-5 px-6 lg:bg-black lg:px-7 lg:text-secondary">
      <div className="w-44 lg:hidden">
        <img src="GMC_logo.svg" />
      </div>
      <h2 className="hidden p-3 text-2xl font-bold lg:block">Tab Name</h2>
    </div>
  );
};

export default NavbarTop;
