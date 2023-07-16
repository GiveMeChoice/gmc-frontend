import React, { useEffect, useState } from 'react';
import cn from 'classnames';

interface Props {
  title: string;
  disabled?: boolean;
  count?: number;
  color?: string;
  onClick: () => void;
}

const FramedButton: React.FC<Props> = ({ title, disabled, count, onClick }) => {
  if (count === 0) {
    disabled = true;
  }
  useEffect(() => {
    if (count) {
      setDisplayedCount(count);
    }
  }, [count]);
  const [displayedCount, setDisplayedCount] = useState(0);
  return (
    <div
      className={cn('group h-full w-full rounded-md border p-1 text-zinc-900', {
        'rounded-md border-zinc-700 bg-secondary-light-10 hover:bg-primary-light-50 active:bg-primary-light-10':
          !disabled,
        'rounded-none border-secondary-dark-40 bg-secondary-dark-10': disabled,
      })}
    >
      <button
        className={cn(
          `flex h-full w-full flex-col items-center justify-center gap-y-1 rounded-sm p-2`,
          {
            'border border-zinc-700 bg-gmc-glacier-light-50 group-hover:bg-gmc-glacier-light-40 group-active:bg-gmc-glacier-light-30':
              !disabled,
            'bg-secondary-dark-10 bg-opacity-40 text-zinc-600': disabled,
          }
        )}
        onClick={onClick}
        disabled={disabled}
      >
        <span className="text-xs">{title}</span>
        {count && <span className="text-sm">{displayedCount}</span>}
      </button>
    </div>
  );
};

export default FramedButton;
