import LoadingWheel from '@root/components/loading-wheel';
import {
  useData,
  useDataDispatch,
} from '@root/context-providers/data.provider';
import {
  IFilters,
  initialFilters,
  useFilters,
  useFiltersDispatch,
} from '@root/context-providers/filters.provider';
import screenControlsService from '@root/services/screen-controls.service';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';

const FiltersContainer: React.FC = () => {
  const { activeFilters, options, filterBarVisible } = useFilters();
  const filtersDispatch = useFiltersDispatch();
  const dataDispatch = useDataDispatch();
  const data = useData();

  const [filters, setFilters] = useState<IFilters>({ ...activeFilters });

  const [filtersCurrent, setFiltersCurrent] = useState(true);
  const [loading, setLoading] = useState(false);

  const updateFilters = (updatedFilters) => {
    setFilters(updatedFilters);
    setFiltersCurrent(isEqual(activeFilters, updatedFilters));
  };

  useEffect(() => {
    resetFiltersToActive();
  }, [activeFilters]);

  const resetFiltersToActive = () => {
    setFiltersCurrent(true);
    setFilters({ ...activeFilters });
  };

  const handleFieldChange = (e) => {
    const currentFilters = {
      ...filters,
      [e.target.id]: e.target.value,
    };
    updateFilters(currentFilters);
  };

  const refreshData = async () => {
    setLoading(true);
    try {
      filtersDispatch({ type: 'SAVE_FILTERS', value: filters });
      const action = await screenControlsService.refreshFilters(filters, data);
      if (action) dataDispatch(action);
      setFiltersCurrent(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex w-full justify-end px-5 py-2.5">
        <p
          className={cn('text-sm font-bold', {
            'text-primary': filtersCurrent,
            ' text-gmc-surf': !filtersCurrent,
            hidden: !filterBarVisible,
          })}
        >
          {filtersCurrent ? 'Filters Current' : 'Filters Changed'}
        </p>
      </div>
      <div
        id="filters-container"
        className={cn(
          'flex h-5/6 w-full flex-col items-center divide-y divide-zinc-300 overflow-y-auto px-4',
          { hidden: !filterBarVisible }
        )}
      >
        <div className="flex w-full flex-wrap items-center pb-2">
          <div className="mr-2 w-32">
            <label
              htmlFor="providerId"
              className="my-1.5 block text-xs font-medium text-gray-900 dark:text-white"
            >
              Provider Key
            </label>
            <select
              id="providerId"
              className={cn(
                'block h-7 w-full rounded-full border border-gray-600 bg-gray-700 p-1 pl-2 text-xs text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500',
                {
                  'text-gray-400': !filters.providerId,
                }
              )}
              value={filters.providerId}
              onChange={handleFieldChange}
            >
              <option value="">{'-----'}</option>
              {options.providerSelect.map((p, i) => (
                <option key={i} value={p.id}>
                  {p.key}
                </option>
              ))}
            </select>
          </div>

          <div className="w-20">
            <label
              htmlFor="providerActivation"
              className="my-1.5 block text-xs font-medium text-gray-900 dark:text-white"
            >
              Activation
            </label>
            <select
              id="providerActivation"
              className={cn(
                'block h-7 w-full rounded-full border border-gray-600 bg-gray-700 p-1 pl-2 text-xs text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500',
                {
                  'text-gray-400': !filters.providerActivation,
                }
              )}
              value={filters.providerActivation}
              onChange={handleFieldChange}
            >
              <option value="">-----</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="flex w-full flex-col py-2">
          <div className="w-54">
            <label
              htmlFor="sourceIdentifier"
              className="my-1.5 text-xs font-medium text-gray-900 dark:text-white"
            >
              Source Identifier
            </label>
            <input
              id="sourceIdentifier"
              type="search"
              className="h-7 w-full rounded-full border border-gray-300 bg-gray-50 p-1 pl-3 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              value={filters.sourceIdentifier}
              onChange={handleFieldChange}
            />
          </div>

          <div className="flex w-full flex-wrap">
            <div className="mr-2 w-32">
              <label
                htmlFor="sourceStatus"
                className="my-1.5 text-xs font-medium text-gray-900 dark:text-white"
              >
                Source Status
              </label>
              <select
                id="sourceStatus"
                className={cn(
                  'h-7 w-full rounded-full border border-gray-600 bg-gray-700 p-1 pl-2 text-xs text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500',
                  {
                    'text-gray-400': !filters.sourceStatus,
                  }
                )}
                value={filters.sourceStatus}
                onChange={handleFieldChange}
              >
                <option value="">-----</option>
                {options.sourceStatusSelect.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-20">
              <label
                htmlFor="sourceActivation"
                className="my-1.5 text-xs font-medium text-gray-900 dark:text-white"
              >
                Activation
              </label>
              <select
                id="sourceActivation"
                className={cn(
                  'h-7 w-full rounded-full border border-gray-600 bg-gray-700 p-1 pl-2 text-xs text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500',
                  {
                    'text-gray-400': !filters.sourceActivation,
                  }
                )}
                value={filters.sourceActivation}
                onChange={handleFieldChange}
              >
                <option value="">-----</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col py-2">
          <div className="flex w-full flex-wrap">
            <div className="mr-2 w-24">
              <label
                htmlFor="productShortId"
                className="my-1.5 block text-xs font-medium text-gray-900 dark:text-white"
              >
                Product ID
              </label>
              <input
                id="productShortId"
                type="search"
                className="block h-7 w-full rounded-full border border-gray-300 bg-gray-50 p-1 pl-3 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={filters.productShortId}
                onChange={handleFieldChange}
              />
            </div>
            <div className="w-24">
              <label
                htmlFor="productProviderId"
                className="my-1.5 block text-xs font-medium text-gray-900 dark:text-white"
              >
                Provider ID
              </label>
              <input
                id="productProviderId"
                type="search"
                className="block h-7 w-full rounded-full border border-gray-300 bg-gray-50 p-1 pl-3 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={filters.productProviderId}
                onChange={handleFieldChange}
              />
            </div>
          </div>
          <div className="flex w-full flex-wrap">
            <div className="mr-2 w-24">
              <label
                htmlFor="productStatus"
                className="my-1.5 block text-xs font-medium text-gray-900 dark:text-white"
              >
                Product Status
              </label>
              <select
                id="productStatus"
                className={cn(
                  'block h-7 w-full rounded-full border border-gray-600 bg-gray-700 p-1 pl-2 text-xs text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500',
                  {
                    'text-gray-400': !filters.productStatus,
                  }
                )}
                value={filters.productStatus}
                onChange={handleFieldChange}
              >
                <option value="">-----</option>
                {options.productStatusSelect.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4 flex w-24 items-center justify-center">
              <input
                type="checkbox"
                id="productIntegrationError"
                checked={filters.productIntegrationError}
                onChange={() => {
                  updateFilters({
                    ...filters,
                    productIntegrationError: !filters.productIntegrationError,
                  });
                }}
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary focus:ring-2 focus:ring-primary"
              />
              <label
                htmlFor="productIntegrationError"
                className="ml-1.5 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Has Error?
              </label>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col py-2">
          <div className="flex w-full flex-wrap">
            <div className="mr-2 w-24">
              <label
                htmlFor="labelCode"
                className="my-1.5 block text-xs font-medium text-gray-900 dark:text-white"
              >
                Label Code
              </label>
              <input
                id="labelCode"
                type="search"
                className="block h-7 w-full rounded-full border border-gray-300 bg-gray-50 p-1 pl-3 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={filters.labelCode}
                onChange={handleFieldChange}
              />
            </div>
            <div className="w-24">
              <label
                htmlFor="categoryCode"
                className="my-1.5 block text-xs font-medium text-gray-900 dark:text-white"
              >
                Category Code
              </label>
              <input
                id="categoryCode"
                type="search"
                className="block h-7 w-full rounded-full border border-gray-300 bg-gray-50 p-1 pl-3 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={filters.categoryCode}
                onChange={handleFieldChange}
              />
            </div>
          </div>
        </div>

        <div className="flex h-32 w-full flex-col items-center justify-center space-y-4">
          {loading ? (
            <LoadingWheel size="w-14 h-14" />
          ) : (
            <>
              <button
                className={cn(
                  'mt-6 flex h-10 w-48 items-center justify-center rounded-full border-4 py-1.5 px-6 text-sm font-bold hover:bg-secondary-dark-10',
                  {
                    'border-primary bg-secondary': filtersCurrent,
                    ' border-primary bg-secondary': !filtersCurrent,
                  }
                )}
                onClick={refreshData}
              >
                {filtersCurrent ? 'Refresh' : 'Apply'}
              </button>
              <div className="flex w-full justify-center space-x-3">
                <button
                  className="h-10 w-24 rounded-full border-2 border-gmc-surf bg-secondary py-1.5 px-6 text-sm font-bold hover:bg-secondary-dark-10"
                  onClick={() => updateFilters(initialFilters)}
                >
                  Clear
                </button>
                <button
                  disabled={filtersCurrent}
                  className={cn(
                    'h-10 w-24 rounded-full border-2 py-1.5 px-6 text-sm font-bold',
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
