import React from 'react';
import cn from 'classnames';

interface Props {
  filtersVisible: boolean;
  setFiltersVisible: (visible: boolean) => void;
}

const FiltersClickTab: React.FC<Props> = ({
  filtersVisible,
  setFiltersVisible,
}) => {
  return (
    <div
      className={cn(
        'bg-divide-zinc-900 absolute right-0 top-44 flex h-14 cursor-pointer flex-col justify-center rounded-l-md bg-zinc-900 pl-1.5 outline outline-secondary duration-500 lg:top-32 ',
        {
          'w-7': !filtersVisible,
          'w-0': filtersVisible,
        }
      )}
      onClick={() => setFiltersVisible(!filtersVisible)}
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
