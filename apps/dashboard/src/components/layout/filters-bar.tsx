import {
  useFilters,
  useFiltersDispatch,
} from '@root/context-providers/filters.provider';
import {
  useScreenData,
  useScreenDataDispatch,
} from '@root/context-providers/screen-data.provider';
import screensService from '@root/services/screens.service';
import cn from 'classnames';
import React from 'react';
import LoadingWheel from '../shared/loading-wheel';
import FiltersContainer from './filters-bar/filters-container';

interface Props {}

const FiltersBar: React.FC<Props> = () => {
  const { activeFilters, filterBarVisible } = useFilters();
  const filtersDispatch = useFiltersDispatch();
  const screenDataDispatch = useScreenDataDispatch();
  const screenData = useScreenData();

  const refreshData = async () => {
    try {
      screenDataDispatch({ type: 'SCREEN_START_LOADING' });
      const action = await screensService.refreshData(
        activeFilters,
        screenData
      );
      if (action) screenDataDispatch(action);
    } catch (err) {
      console.error(err);
    } finally {
      screenDataDispatch({ type: 'SCREEN_END_LOADING' });
    }
  };

  return (
    <div
      className={cn('z-10 h-full overflow-hidden  bg-zinc-900 duration-300', {
        'w-0 border-0': !filterBarVisible,
        'w-128 border-l-2': filterBarVisible,
      })}
    >
      <div
        className={cn(
          'flex h-20 flex-col justify-between border-b-2 border-secondary',
          {
            flex: filterBarVisible,
            hidden: !filterBarVisible,
          }
        )}
      >
        <div className="flex h-full w-full flex-col items-center justify-center whitespace-nowrap">
          {screenData.loading ? (
            <LoadingWheel size="w-9 h-9" />
          ) : (
            <div className="flex w-full justify-evenly gap-2 px-2">
              <button
                title="ctrl + c"
                className="flex h-9 w-2/5 flex-col items-center justify-center rounded-full border-2 border-gmc-heart bg-secondary py-0.5 text-xs hover:bg-secondary-dark-10 active:bg-secondary-dark-20"
                onClick={() => {
                  filtersDispatch({
                    type: 'FILTERS_CLEAR',
                  });
                }}
              >
                <span>Clear Filters</span>
              </button>
              <button
                title="ctrl + r"
                className={cn(
                  'flex h-9 w-2/5 flex-col items-center justify-center rounded-full border-2 border-gmc-forest-light-20 bg-secondary py-0.5 text-xs hover:bg-secondary-dark-10 active:bg-secondary-dark-20',
                  {}
                )}
                onClick={refreshData}
              >
                <span>Refresh Data</span>
              </button>
            </div>
          )}
        </div>
      </div>
      <FiltersContainer />
    </div>
  );
};

export default FiltersBar;
