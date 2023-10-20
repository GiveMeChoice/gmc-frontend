import cn from 'classnames';
import React from 'react';

interface Props {
  filterName: string;
  display?: string;
  color?: string;
  value: string;
  onChipClick: (filterName: string) => void;
}

const SearchChoiceBarFilterChip: React.FC<Props> = ({
  filterName,
  display,
  value,
  color,
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
        style={{
          backgroundColor: color ? color : 'black',
          color: color ? 'black' : 'white',
        }}
        onClick={() => onChipClick(filterName)}
        className={cn(
          'cursor-pointer rounded-none border-1.5 border-zinc-900 shadow-sm',
          {
            'bg-zinc-900 text-white': true,
            // 'bg-white text-black': invert,
          }
        )}
      >
        <div
          className={cn('h-fit w-fit bg-white px-2 py-1 text-center ', {
            'bg-opacity-0': !color,
            'bg-opacity-20': color,
          })}
        >
          {(display ? display : value).toLocaleUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default SearchChoiceBarFilterChip;
