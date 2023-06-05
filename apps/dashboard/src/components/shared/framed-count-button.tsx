import React, { useEffect, useState } from 'react';

interface Props {
  title: string;
  count: number;
  color?: string;
  onClick: () => void;
}

const FramedCountButton: React.FC<Props> = ({
  title,
  count,
  color,
  onClick,
}) => {
  useEffect(() => {
    setDisplayedCount(count);
  }, [count]);
  const [displayedCount, setDisplayedCount] = useState(0);
  return (
    <div className="rounded-sm border border-black bg-white p-0.5 hover:bg-secondary-dark-10 active:bg-primary-light-20">
      <button
        className={`flex w-24 flex-col items-center justify-center rounded-sm border border-zinc-900 bg-${
          color ? color : 'gmc-soil-light-30'
        } px-3 py-2 hover:bg-opacity-90 active:bg-opacity-100`}
        onClick={onClick}
      >
        <span className="text-xs">{title}</span>
        <span className="text-base">{displayedCount}</span>
      </button>
    </div>
  );
};

export default FramedCountButton;
