import React from 'react';

interface Props {
  title?: string;
  subtitle?: string;
}

export const Intro: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <section className="mx-1 mt-5 mb-10 flex w-full justify-start text-4xl md:mt-12 md:mb-16 md:text-5xl">
      <div className="flex w-full flex-col">
        <h1 className="pl-1.5">{title ? title : 'Stuff we love.'}</h1>
        <hr className="border-accent-2 mt-1 w-full border-secondary-dark-20" />
        <h3 className="pl-1.5 text-xl text-zinc-600 md:text-2xl lg:pl-1.5">
          {subtitle ? subtitle : 'The Give Me Choice Blog.'}
        </h3>
      </div>
    </section>
  );
};
