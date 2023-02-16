import Image from 'next/image';
import React, { useState } from 'react';
import { auth } from '../../lib/firebase';
import NavMenu from './NavMenu';

const ProfileButton: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <button
        // onClick={() => setLoginModalOpen(true)}
        title="Profile Menu"
        className="h-10 w-10 rounded-full border border-zinc-800 bg-primary-light-50 pr-0.5 pt-0.5 shadow-sm active:bg-secondary"
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      >
        <Image
          className="cursor-pointer"
          draggable={false}
          src="/img/user.svg"
          alt="User Icon"
          height="26px"
          width="14px"
        />
      </button>
      {menuOpen && <NavMenu />}
    </>
  );
};

export default ProfileButton;
