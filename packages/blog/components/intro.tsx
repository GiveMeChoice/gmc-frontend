import React from 'react';

export const Intro: React.FC = () => {
  return (
    <section className="mt-12 mb-16 flex flex-col-reverse items-center md:flex-row md:items-end md:justify-between">
      <div className="flex h-full">
        <h4 className="my-5 text-center text-2xl  md:max-w-xl md:text-3xl">
          Stuff we love. Things we think are important. Updated weekly.
        </h4>
      </div>
      <h1 className="mr-8 text-right text-6xl font-bold md:text-8xl">
        <span className="mt-2 inline-block rounded-xl border-2 border-black px-2 pb-3 tracking-normal md:pb-5">
          Bl<span className="text-gmc-surf">o</span>g
        </span>
      </h1>
    </section>
  );
};
