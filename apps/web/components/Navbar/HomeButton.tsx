import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HomeButton: React.FC = () => {
  return (
    <Link href="/" title="Home">
      <div className="flex h-10 w-10 cursor-pointer select-none items-center justify-center rounded-full border border-black pb-0.5 hover:bg-secondary hover:shadow-sm active:bg-secondary-dark-10 dark:border-white">
        <Image
          draggable={false}
          src="/img/home.svg"
          alt="User Icon"
          height={24}
          width={24}
        />
      </div>
    </Link>
  );
};

export default HomeButton;
