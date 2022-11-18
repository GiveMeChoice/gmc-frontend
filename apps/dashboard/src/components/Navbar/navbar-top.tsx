import React from 'react';

const NavbarTop: React.FC = () => {
  return (
    <div className="flex border-b-2 border-b-gmc-glacier py-4 px-6 lg:py-5 lg:px-7">
      <div className="w-40 lg:hidden">
        <img src="GMC_logo.svg" />
      </div>
      <h2 className="hidden p-3 text-2xl font-bold lg:block">Tab Name</h2>
    </div>
  );
};

export default NavbarTop;
