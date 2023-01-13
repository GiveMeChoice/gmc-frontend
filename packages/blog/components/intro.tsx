import React from 'react';

interface Props {
  title?: string;
  subtitle?: string;
}

export const Intro: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <section className="mt-10 mb-14 flex w-full justify-start px-1.5 text-4xl md:mt-12 md:mb-20 md:text-5xl">
      <div className="flex w-full flex-col">
        <h1 className="pl-1.5">{title ? title : 'Stuff we love.'}</h1>
        <hr className="border-accent-2 mt-1 h-0.5 w-full border-black bg-black" />
        <h3 className="pl-1.5 text-xl text-zinc-600 md:text-2xl lg:pl-1.5">
          {subtitle ? subtitle : 'The Give Me Choice Blog.'}
        </h3>
      </div>
    </section>
  );
};
