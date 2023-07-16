import React from 'react';
import cn from 'classnames';
import { useUser } from '../../UserProvider';
import { getUserTheme } from '../../../lib/theme';

interface Props {
  name: string;
  display?: string;
  value: string;
  onClick: (name: string) => void;
}

const SearchChoiceBarFilterChip: React.FC<Props> = ({
  name,
  display,
  value,
  onClick,
}) => {
  const { profile } = useUser();

  return (
    <div key={name} className="h-10">
      <div
        onClick={() => onClick(name)}
        title={name}
        className={cn(
          'peer cursor-pointer rounded-full border border-zinc-900 px-2.5 py-1 shadow-none',
          {
            'bg-gmc-berry-light-50 bg-opacity-80': name === 'category',
            'bg-gmc-dune-light-50 bg-opacity-80': name === 'store',
            'bg-gmc-surf-light-50 bg-opacity-80': name === 'brand',
            'bg-gmc-sunset-light-50 bg-opacity-80': name === 'priceRange',
          }
        )}
      >
        {display ? display : value}
      </div>
      <div
        id={name}
        onClick={() => onClick(name)}
        className="relative bottom-9 right-1.5 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full border border-zinc-900 bg-secondary pb-0.5  text-center text-xs text-zinc-900 opacity-0 hover:opacity-100 active:bg-secondary-dark-10  peer-hover:opacity-100 peer-active:bg-secondary-dark-10"
      >
        x
      </div>
    </div>
  );
};

export default SearchChoiceBarFilterChip;
