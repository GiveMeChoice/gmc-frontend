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
        className="aspect-square w-[34px] rounded-full border border-zinc-700 bg-secondary pr-0.5 pt-0.5 hover:scale-[1.03] hover:shadow-sm  active:bg-secondary-dark-10 md:w-[36px]"
      >
        <Image
          draggable={false}
          src="/img/user.svg"
          alt="User Icon"
          height="20px"
          width="12px"
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
