import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HomeButton: React.FC = () => {
  return (
    <Link href="/" title="Home">
      <div className="flex h-9 w-9 cursor-pointer items-end rounded-full duration-200 hover:bg-zinc-900 hover:shadow-md active:bg-transparent active:shadow-sm">
        <span
          className={
            'z-20 flex h-9 w-9 cursor-pointer select-none items-center justify-center rounded-full border border-zinc-700 bg-white pb-0.5 shadow-sm transition-transform duration-200 ease-in-out  hover:-translate-y-0.5 hover:bg-gmc-glacier-light-30 active:translate-y-0 active:border-zinc-700 active:bg-gmc-glacier-light-10'
          }
        >
          <Image
            draggable={false}
            src="/img/home.svg"
            alt="User Icon"
            height={24}
            width={24}
          />
        </span>
      </div>
    </Link>
  );
};

export default HomeButton;
