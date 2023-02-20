import React from 'react';

const LocaleButton: React.FC = () => {
  return (
    <button className="black flex h-9 items-center justify-center rounded border  border-white px-2 text-sm hover:border-zinc-700 hover:bg-secondary  hover:bg-opacity-70 hover:underline hover:shadow-sm active:bg-opacity-100">
      <span>ENG - GBP</span>
    </button>
  );
};

export default LocaleButton;
