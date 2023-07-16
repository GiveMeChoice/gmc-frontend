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
      className={cn(
        'ml-6 flex aspect-square h-10 w-10 cursor-pointer items-center justify-center rounded-full border-1.5 duration-150 hover:bg-zinc-800 active:bg-opacity-50',
        {
          'border-primary': filterBarVisible,
          'border-secondary-dark-10': !filterBarVisible,
        }
      )}
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
