import React, { useEffect } from 'react';

const NavMenu: React.FC = () => {
  const handleClickaway = () => {
    console.log('clickaway detected!!');
  };
  useEffect(() => {
    console.log('registering listener....');

    const body = document.getElementsByTagName('main')[0];
    body.addEventListener('click', handleClickaway);
    return () => {
      console.log('removing listener....');
      body.removeEventListener('click', handleClickaway);
    };
  }, []);
  return (
    <div className="absolute top-16 mx-4 flex w-72 max-w-full  -translate-x-1/2 flex-col rounded-sm bg-secondary shadow-sm duration-200">
      <div className="h-10">The menu is open for business</div>
      <div className="h-10">The menu is open for business</div>
      <div className="h-10">The menu is open for business</div>
      <div className="h-10">The menu is open for business</div>
      <div className="h-10">The menu is open for business</div>
      <div className="h-10">The menu is open for business</div>
    </div>
  );
};

export default NavMenu;
