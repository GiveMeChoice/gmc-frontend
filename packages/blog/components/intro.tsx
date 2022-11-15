import React from 'react';

export const Intro: React.FC = () => {
  return (
    <section className="mt-16 mb-12 flex flex-col-reverse items-center md:flex-row md:justify-between">
      <h4 className="my-5 text-center text-2xl md:max-w-md md:pl-8 md:align-text-bottom">
        New stuff we love. Things we think are important. Updated weekly.
      </h4>
      <h1 className="text-left text-6xl font-bold tracking-tight md:pr-8 md:text-8xl">
        <span className="mt-2 inline-block rounded-xl border-2 border-black px-2 pb-3 tracking-normal md:pb-5">
          The Bl<span className="text-gmc-heart">o</span>g.
        </span>
      </h1>
    </section>
  );
};
