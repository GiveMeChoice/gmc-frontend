import { useFilters } from '@root/context-providers/filters.provider';
import cn from 'classnames';
import React from 'react';
import FiltersContainer from './filters-bar/filters-container';

interface Props {}

const FiltersBar: React.FC<Props> = () => {
  const { filterBarVisible } = useFilters();
  return (
    <>
      <div
        className={cn(
          'z-10 h-full overflow-hidden  border-l-secondary bg-zinc-900 duration-300',
          {
            'w-0 border-0': !filterBarVisible,
            'w-96 border-l-2': filterBarVisible,
          }
        )}
      >
        <div
          className={cn('justify-between', {
            flex: filterBarVisible,
            hidden: !filterBarVisible,
          })}
        >
          <h2 className="pt-5 pl-4 text-3xl text-white">Filters</h2>
        </div>
        <FiltersContainer />
      </div>
    </>
  );
};

export default FiltersBar;
