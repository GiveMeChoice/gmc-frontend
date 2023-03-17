import {
  useFilters,
  useFiltersDispatch,
} from '@root/context-providers/filters.provider';
import cn from 'classnames';
import React from 'react';

const FiltersClickTab: React.FC = () => {
  const { filterBarVisible } = useFilters();
  const dispatch = useFiltersDispatch();

  return (
    <div
      className={cn(
        'bg-divide-zinc-900 absolute right-0 top-44 flex h-14 cursor-pointer flex-col justify-center rounded-l-md bg-zinc-900 pl-1.5 outline outline-secondary duration-500 lg:top-32 ',
        {
          'w-8': !filterBarVisible,
          'w-0': filterBarVisible,
        }
      )}
      // onClick={() => dispatch({ type: 'ENTER_FILTER_BAR' })}
    >
      <div className="flex flex-col divide-y-2 divide-primary">
        <div className="h-2" />
        <div className="h-2" />
        <div className="h-2" />
        <div className="h-2" />
      </div>
    </div>
  );
};

export default FiltersClickTab;
