import * as React from 'react';

const Button = () => {
  return (
    <div className="rounded-md bg-brandgreen">
      <a href="https://turborepo.org/docs/getting-started">
        <div className="flex w-full items-center justify-center rounded-md border border-transparent bg-brandgreen px-8 py-3 text-base font-medium text-white no-underline hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-red-200 md:py-3 md:px-10 md:text-lg md:leading-6">
          Read the docs
          <span className="ml-2 bg-gradient-to-r from-lime-500 to-gray-300 bg-clip-text text-transparent">
            → asdf something else
          </span>
        </div>
      </a>
    </div>
  );
};

export default Button;
