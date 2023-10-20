import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HomeButton: React.FC = () => {
  return (
    <Link href="/" title="Home">
      <div className="mr-1 flex h-[36px] w-[36px] cursor-pointer items-end rounded-full duration-200 hover:bg-zinc-900 hover:shadow-md active:bg-transparent active:shadow-sm">
        <span
          className={
            'active:bg-secondary-dark-01 z-20 flex h-[36px] w-[36px] cursor-pointer select-none items-center justify-center rounded-full border border-zinc-700 bg-white pb-0.5 shadow-sm transition-transform duration-200  ease-in-out hover:-translate-y-1 hover:bg-secondary active:translate-y-0 active:border-zinc-700'
          }
        >
          <Image
            draggable={false}
            src="/img/home.svg"
            alt="User Icon"
            height={20}
            width={20}
          />
        </span>
      </div>
    </Link>
  );
};

export default HomeButton;
