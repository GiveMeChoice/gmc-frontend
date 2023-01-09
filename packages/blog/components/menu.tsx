import React from 'react';

const Menu: React.FC = () => {
  return (
    <div className="div text-md border bg-whte mt-5 mb-7 flex w-full justify-evenly rounded-sm border-zinc-700 bg-zinc-900 text-white md:mb-10">
      <a
        href="/blog/posts"
        className="border-r w-1/2 border-secondary text-center underline-offset-2 hover:bg-zinc-800 hover:underline md:py-1"
      >
        Posts
      </a>
      <a
        href="/blog/tags"
        className="w-1/2 text-center underline-offset-2 hover:bg-zinc-800  hover:underline md:py-1"
      >
        Tags
      </a>
    </div>
  );
};

export default Menu;
