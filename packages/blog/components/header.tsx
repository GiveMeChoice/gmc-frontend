import React from 'react';
import Link from 'next/link';

export const Header: React.FC = () => {
  return (
    <h2 className="my-2 text-right text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter ">
      <Link href="/blog" className="">
        <span className="mr-4 inline-block rounded-lg border-2 border-black px-2 pb-1.5 tracking-normal hover:cursor-pointer md:pb-2">
          Bl<span className="text-primary-dark-10">o</span>g.
        </span>
      </Link>
    </h2>
  );
};
