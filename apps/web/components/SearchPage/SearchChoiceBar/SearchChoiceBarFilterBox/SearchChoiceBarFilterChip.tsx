import cn from 'classnames';
import React from 'react';

interface Props {
  name: string;
  display?: string;
  value: string;
  invert?: boolean;
  onClick: (name: string) => void;
}

const SearchChoiceBarFilterChip: React.FC<Props> = ({
  name,
  display,
  value,
  invert,
  onClick,
}) => {
  return (
    <div className="group flex items-center justify-center text-sm">
      <div
        onClick={() => onClick(name)}
        className="relative bottom-3.5 left-2 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full border border-zinc-900 bg-secondary pb-0.5  text-center text-xs text-zinc-900 opacity-0 hover:opacity-100 active:bg-secondary-dark-10  group-hover:opacity-100 group-active:bg-secondary-dark-10"
      >
        &times;
      </div>
      <div
        onClick={() => onClick(name)}
        title={name}
        className={cn(
          'cursor-pointer rounded-sm border-1.5 border-zinc-900 px-2 py-1 shadow-sm',
          {
            'bg-zinc-900 text-white': true,
            // 'bg-white text-black': invert,
          }
        )}
      >
        {(display ? display : value).toLocaleUpperCase()}
      </div>
    </div>
  );
};

export default SearchChoiceBarFilterChip;
