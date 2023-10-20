import Image from 'next/image';
import React, { useState } from 'react';
import EntryModal from './EntryModal';

const LoginButton: React.FC = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setLoginModalOpen(true)}
        title="Log In / Sign-Up"
        className="h-9 w-9 rounded-full border-1.5 border-zinc-700 bg-secondary pr-0.5 pt-0.5 hover:scale-[1.03]  hover:shadow-sm active:bg-secondary-dark-10"
      >
        <Image
          draggable={false}
          src="/img/user.svg"
          alt="User Icon"
          height="23px"
          width="13px"
        />
      </button>
      <EntryModal
        open={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </>
  );
};

export default LoginButton;
