import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="hidden h-screen flex-col bg-gmc-glacier py-8 lg:flex">
      <div className="mx-5 w-48">
        <img src="GMC_logo.svg" />
      </div>
      <div className="mx-6 mt-10 flex flex-col space-y-2">
        <a
          href="#"
          className="rounded-lg bg-primary p-2 text-sm font-bold hover:bg-primary-light-50"
        >
          Providers
        </a>
        <div>Assets</div>
        <div>Dashboard</div>
        <div>Staking</div>
      </div>
    </div>
  );
};

export default Sidebar;
