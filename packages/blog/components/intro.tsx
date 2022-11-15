import React from 'react';

export const Intro: React.FC = () => {
  return (
    <section className="mt-8 mb-12 flex flex-col-reverse items-center md:flex-row md:justify-between">
      <h4 className="my-5 text-center text-2xl md:max-w-md md:pl-8 md:align-text-bottom">
        Stuff we love. Things we think are important. Updated weekly.
      </h4>
      <h1 className="text-right text-6xl font-bold tracking-tight md:pr-8 md:text-8xl">
        <span className="mr-2">The</span>
        <br />
        <span className="mt-2 inline-block rounded-xl border-2 border-black px-2 pb-3 tracking-normal md:pb-5">
          Bl<span className="text-gmc-heart">o</span>g.
        </span>
      </h1>
    </section>
  );
};
