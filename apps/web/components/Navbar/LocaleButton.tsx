import React from 'react';

const LocaleButton: React.FC = () => {
  return (
    <button className="black flex h-9 items-center justify-center rounded border border-zinc-700 px-2 text-sm hover:bg-secondary hover:bg-opacity-70 hover:shadow-sm active:bg-opacity-100">
      <span>ENG - GBP</span>
    </button>
  );
};

export default LocaleButton;
