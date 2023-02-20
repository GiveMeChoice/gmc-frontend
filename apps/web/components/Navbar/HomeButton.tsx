import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HomeButton: React.FC = () => {
  return (
    <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-zinc-700 pb-0.5 hover:shadow-sm active:bg-secondary">
      <Link href="/" title="Home">
        <Image
          draggable={false}
          src="/img/home.svg"
          alt="User Icon"
          height={24}
          width={24}
        />
      </Link>
    </div>
  );
};

export default HomeButton;
