import React from 'react';

export const Intro: React.FC = () => {
  return (
    <section className="my-14 flex flex-col-reverse items-center md:mb-20 md:flex-row md:items-end md:justify-between">
      <h4 className="mb-6 text-center text-2xl md:mb-0 md:max-w-xl md:text-3xl">
        Stuff we love. Things we think are important. Updated weekly.
      </h4>
      <h1 className="mb-8 text-right text-7xl font-bold md:mr-8 md:mb-0">
        <span className="inline-block rounded-xl border-2 border-gmc-ocean px-2 pb-4 tracking-normal">
          bl<span className="text-gmc-surf">o</span>g
        </span>
      </h1>
    </section>
  );
};
