import React from 'react';
import cn from 'classnames';
import {
  useFilters,
  useFiltersDispatch,
} from '@root/context-providers/filters.provider';

const ToggleFilterBarButton: React.FC = () => {
  const { filterBarVisible } = useFilters();
  const filtersDispatch = useFiltersDispatch();

  return (
    <div
      className="ml-6 flex aspect-square h-12 w-12 cursor-pointer items-center justify-center rounded-full  border-secondary duration-150 hover:bg-zinc-800 active:bg-opacity-50"
      onClick={() => {
        filtersDispatch({ type: 'FILTERS_BAR_TOGGLE' });
      }}
    >
      <div
        className={cn('space-y-1', {
          '[&>*]:hover:bg-primary': !filterBarVisible,
          '[&>*]:bg-primary': filterBarVisible,
        })}
      >
        <div className="h-1 w-1 rounded-full bg-secondary-dark-10"></div>
        <div className="h-1 w-1 rounded-full bg-secondary-dark-10"></div>
        <div className="h-1 w-1 rounded-full bg-secondary-dark-10"></div>
      </div>
    </div>
  );
};

export default ToggleFilterBarButton;
