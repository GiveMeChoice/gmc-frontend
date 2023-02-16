import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HomeButton: React.FC = () => {
  return (
    <Link
      href="/"
      title="Home"
      className="h-10 w-10 rounded-full border-zinc-800 pr-0.5 pt-0.5 hover:border hover:shadow-sm active:bg-secondary"
    >
      <Image
        className="cursor-pointer fill-primary"
        draggable={false}
        src="/img/home.svg"
        alt="User Icon"
        height={26}
        width={26}
      />
    </Link>
  );
};

export default HomeButton;
