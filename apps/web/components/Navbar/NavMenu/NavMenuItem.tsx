import { useRouter } from 'next/router';
import React from 'react';

interface Props {
  title: string;
}

const NavMenuItem: React.FC<Props> = ({ title, children }) => {
  const router = useRouter();
  return (
    <li
      className="flex h-12 w-full cursor-pointer items-center gap-3 rounded-lg px-2 text-sm transition-colors duration-150 ease-in-out hover:bg-secondary hover:bg-opacity-60 active:bg-secondary-dark-10 active:bg-opacity-50"
      // onClick={() => router.push(title.toLowerCase())}
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary-dark-10 bg-opacity-60">
        {children}
      </div>
      {title}
    </li>
  );
};

export default NavMenuItem;
