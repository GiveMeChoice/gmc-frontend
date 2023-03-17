import {
  useDataDispatch,
  useData,
} from '@root/context-providers/data.provider';
import {
  useFilters,
  useFiltersDispatch,
} from '@root/context-providers/filters.provider';
import screenControlsService from '@root/services/screen-controls.service';
import cn from 'classnames';
import React from 'react';
import LoadingWheel from '../loading-wheel';
import FiltersContainer from './filters-bar/filters-container';

interface Props {}

const FiltersBar: React.FC<Props> = () => {
  const { activeFilters, options, filterBarVisible } = useFilters();
  const filtersDispatch = useFiltersDispatch();
  const dataDispatch = useDataDispatch();
  const data = useData();

  const refreshData = async () => {
    try {
      dataDispatch({ type: 'START_LOADING' });
      const action = await screenControlsService.refreshData(
        activeFilters,
        data
      );
      if (action) dataDispatch(action);
    } catch (err) {
      console.error(err);
    } finally {
      dataDispatch({ type: 'FINISH_LOADING' });
    }
  };

  return (
    <div
      className={cn(
        'z-10 h-full overflow-hidden border-l-secondary bg-zinc-900 duration-300',
        {
          'w-0 border-0': !filterBarVisible,
          'w-128 border-l-2': filterBarVisible,
        }
      )}
    >
      <div
        className={cn('flex flex-col justify-between border-b border-primary', {
          flex: filterBarVisible,
          hidden: !filterBarVisible,
        })}
      >
        <h2 className="pt-5 pl-4 text-3xl text-primary">Filters</h2>
        <div className="flex h-20 w-full flex-col items-center justify-center">
          {data.loading ? (
            <LoadingWheel size="w-14 h-14" />
          ) : (
            <>
              <div className="flex w-full justify-center gap-2 px-2">
                <button
                  className={cn(
                    'flex w-1/2 flex-col items-center justify-center rounded-full border-2 border-primary bg-secondary py-0.5 text-base font-bold hover:bg-secondary-dark-10 active:bg-primary',
                    {}
                  )}
                  onClick={refreshData}
                >
                  <span>Refresh</span>
                  <span className="pb-0.5 text-xs">ctrl + r</span>
                </button>
                <button
                  className="flex w-1/2 flex-col items-center justify-center rounded-full border-2 border-gmc-heart bg-secondary py-0.5 text-base font-bold hover:bg-secondary-dark-10 active:bg-primary"
                  onClick={() => {
                    filtersDispatch({
                      type: 'CLEAR_FILTERS',
                    });
                  }}
                >
                  <span>Clear</span>
                  <span className="pb-0.5 text-xs">ctrl + c</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <FiltersContainer />
    </div>
  );
};

export default FiltersBar;
