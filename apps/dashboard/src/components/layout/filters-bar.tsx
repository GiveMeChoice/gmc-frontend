import cn from 'classnames';
import React, { useState } from 'react';
import FiltersClickTab from './filters-bar/filters-click-tab';
import FiltersContainer from './filters-bar/filters-container';

interface Props {}

const FiltersBar: React.FC<Props> = () => {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <>
      <FiltersClickTab
        filtersVisible={visible}
        setFiltersVisible={setVisible}
      />
      <div
        className={cn(
          'fixed right-0 h-full overflow-hidden border-l-secondary  bg-zinc-900 duration-300',
          {
            'w-0 border-0': !visible,
            'w-80 border-l-2': visible,
          }
        )}
      >
        <div
          className={cn('justify-between', {
            flex: visible,
            hidden: !visible,
          })}
        >
          <h2 className="pt-6 pl-6 text-4xl text-white">Filters</h2>
          <div
            className="m-5 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-secondary pb-2 text-2xl  text-secondary hover:border-primary hover:text-primary"
            onClick={() => setVisible(!visible)}
          >
            x
          </div>
        </div>
        <FiltersContainer visible={visible} />
      </div>
    </>
  );
};

export default FiltersBar;
