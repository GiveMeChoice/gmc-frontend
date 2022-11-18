import React from 'react';
import Link from 'next/link';

export const Header: React.FC = () => {
  return (
    <h2 className="my-2 text-right text-2xl leading-tight tracking-tight md:text-3xl md:tracking-tighter ">
      <Link href="/blog" className="">
        <span className="inline-block rounded-3xl border-2 border-black bg-white  px-3 pb-1.5 tracking-normal duration-100 hover:cursor-pointer hover:bg-gmc-sunset">
          bl<span className="text-primar">o</span>g
        </span>
      </Link>
    </h2>
  );
};
