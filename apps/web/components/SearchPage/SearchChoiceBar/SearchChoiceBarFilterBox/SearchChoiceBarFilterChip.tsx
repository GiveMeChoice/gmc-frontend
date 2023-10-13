import cn from 'classnames';
import React from 'react';

interface Props {
  filterName: string;
  display?: string;
  value: string;
  invert?: boolean;
  onChipClick: (filterName: string) => void;
}

const SearchChoiceBarFilterChip: React.FC<Props> = ({
  filterName,
  display,
  value,
  invert,
  onChipClick,
}) => {
  return (
    <div className="group flex items-center justify-center text-sm">
      <div
        onClick={() => onChipClick(filterName)}
        className="relative bottom-3.5 left-2 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full border border-zinc-900 bg-secondary pb-0.5 text-xs text-zinc-900 opacity-0 hover:opacity-100 active:bg-secondary-dark-10  group-hover:opacity-100 group-active:bg-secondary-dark-10"
      >
        &times;
      </div>
      <div
        onClick={() => onChipClick(filterName)}
        className={cn(
          'cursor-pointer rounded-none border-1.5 border-zinc-900 px-2 py-1 text-center shadow-sm',
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
