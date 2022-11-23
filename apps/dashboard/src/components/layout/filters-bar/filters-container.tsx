import {
  IFilters,
  initialFilters,
  useFilters,
  useFiltersDispatch,
} from '@root/context-providers/filters.provider';
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import LoadingWheel from '@root/components/loading-wheel';
import { useDataDispatch } from '@root/context-providers/data.provider';
import providersService from '@root/services/providers.service';
import { useLocation } from 'react-router-dom';
import sourcesService from '@root/services/sources.service';

interface Props {
  visible: boolean;
}

const FiltersContainer: React.FC<Props> = ({ visible }) => {
  const location = useLocation();
  const { activeFilters, options } = useFilters();
  const filtersDispatch = useFiltersDispatch();
  const dataDispatch = useDataDispatch();

  const [filters, setFilters] = useState<IFilters>({ ...activeFilters });

  const [filtersCurrent, setFiltersCurrent] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    resetFiltersToActive();
  }, []);

  const resetFiltersToActive = () => {
    setFiltersCurrent(true);
    setFilters({ ...activeFilters });
  };

  const resetFiltersToInitial = () => {
    setFilters(initialFilters);
    setFiltersCurrent(isEqual(activeFilters, initialFilters));
  };

  const handleFieldChange = (e) => {
    const currentFilters = {
      ...filters,
      [e.target.id]: e.target.value,
    };
    setFilters(currentFilters);
    setFiltersCurrent(isEqual(activeFilters, currentFilters));
  };

  return (
    <>
      <div className="flex w-full justify-end p-5">
        <p
          className={cn('text-sm font-bold', {
            'text-primary': filtersCurrent,
            ' text-gmc-surf': !filtersCurrent,
            hidden: !visible,
          })}
        >
          {filtersCurrent ? 'Filters Current' : 'Filters Changed'}
        </p>
      </div>
      <div
        id="filters-container"
        className={cn(
          'flex h-5/6 flex-col items-center space-y-6 overflow-y-auto px-6 pb-44',
          { hidden: !visible }
        )}
      >
        <div className="w-full">
          <label
            htmlFor="providerId"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Select a Provider
          </label>
          <select
            id="providerId"
            className={cn(
              'block w-full rounded-full border border-gray-600 bg-gray-700 p-2.5 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500',
              {
                'text-gray-400': !filters.providerId,
              }
            )}
            value={filters.providerId}
            onChange={handleFieldChange}
          >
            <option value="">-- Provider Key --</option>
            {options.providerSelect.map((p) => (
              <option value={p.id}>{p.key}</option>
            ))}
          </select>
        </div>

        <div className="w-full">
          <label
            htmlFor="providerActivation"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Provider Activation
          </label>
          <select
            id="providerActivation"
            className={cn(
              'block w-full rounded-full border border-gray-600 bg-gray-700 p-2.5 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500',
              {
                'text-gray-400': !filters.providerActivation,
              }
            )}
            placeholder="this is a test"
            value={filters.providerActivation}
            onChange={handleFieldChange}
          >
            <option value="">-- Active / Inactive --</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="w-full">
          <label
            htmlFor="sourceIdentifier"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Source Identifier
          </label>
          <input
            id="sourceIdentifier"
            className="block w-full rounded-full border border-gray-300 bg-gray-50 p-2.5 pl-5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            value={filters.sourceIdentifier}
            placeholder="-- Identifier --"
            onChange={handleFieldChange}
          />
        </div>

        <div className="flex h-32 w-full flex-col justify-center space-y-4">
          {loading ? (
            <LoadingWheel color="gmc-surf" size={14} />
          ) : (
            <>
              <button
                className={cn(
                  'mt-6 w-full rounded-full border-4 py-1.5 px-6 font-bold hover:bg-secondary-dark-10',
                  {
                    'border-primary bg-secondary': filtersCurrent,
                    ' border-primary bg-secondary': !filtersCurrent,
                  }
                )}
                onClick={() => {
                  setLoading(true);
                  filtersDispatch({ type: 'SAVE_FILTERS', value: filters });
                  if (location.pathname.includes('/providers')) {
                    providersService.search(filters).then((providers) => {
                      dataDispatch({
                        type: 'REFRESH_PROVIDERS',
                        value: providers,
                      });
                      setLoading(false);
                      setFiltersCurrent(true);
                    });
                  } else if (location.pathname.includes('/product-sources')) {
                    sourcesService.search(filters).then((sources) => {
                      dataDispatch({
                        type: 'REFRESH_SOURCES',
                        value: sources,
                      });
                      setLoading(false);
                      setFiltersCurrent(true);
                    });
                  }
                }}
              >
                {filtersCurrent ? 'Refresh' : 'Apply'}
              </button>
              <div className="flex w-full space-x-3">
                <button
                  className="w-full rounded-full border-2 border-gmc-surf bg-secondary py-2 px-6 font-bold hover:bg-secondary-dark-10"
                  onClick={() => resetFiltersToInitial()}
                >
                  Clear All
                </button>
                <button
                  disabled={filtersCurrent}
                  className={cn(
                    'w-full rounded-full border-2 py-2 px-6 font-bold',
                    {
                      'bg-secondary-dark-10 text-secondary-dark-50':
                        filtersCurrent,
                      ' border-gmc-heart bg-secondary hover:bg-secondary-dark-10':
                        !filtersCurrent,
                    }
                  )}
                  onClick={() => resetFiltersToActive()}
                >
                  Revert
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FiltersContainer;

function isEqual(obj1, obj2) {
  var props1 = Object.getOwnPropertyNames(obj1);
  var props2 = Object.getOwnPropertyNames(obj2);
  if (props1.length != props2.length) {
    return false;
  }
  for (var i = 0; i < props1.length; i++) {
    let val1 = obj1[props1[i]];
    let val2 = obj2[props1[i]];
    let isObjects = isObject(val1) && isObject(val2);
    if ((isObjects && !isEqual(val1, val2)) || (!isObjects && val1 !== val2)) {
      return false;
    }
  }
  return true;
}

function isObject(object) {
  return object != null && typeof object === 'object';
}
