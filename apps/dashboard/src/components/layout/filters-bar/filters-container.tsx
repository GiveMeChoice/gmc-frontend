import {
  useFilters,
  useFiltersDispatch,
} from '@root/context-providers/filters.provider';
import { useMasterData } from '@root/context-providers/master-data.provider';
import cn from 'classnames';
import React from 'react';
import MerchantFilters from './merchant-filters';
import ProviderFilters from './provider-filters';
import ChannelFilters from './channel-filters';

const FiltersContainer: React.FC = () => {
  const {
    channelStatuses,
    productStatuses,
    gmcCategorySelect,
    gmcLabelSelect,
  } = useMasterData();
  const { activeFilters, filterBarVisible } = useFilters();
  const filtersDispatch = useFiltersDispatch();

  const handleFieldChange = (e) => {
    const updatedFilters = {
      ...activeFilters,
      [e.target.id]: e.target.value,
    };
    filtersDispatch({
      type: 'FILTERS_SAVE',
      value: updatedFilters,
    });
  };

  return (
    <>
      <div
        id="filters-container"
        className={cn(
          'flex h-5/6 w-full flex-col items-center divide-y divide-zinc-300 overflow-y-auto px-3',
          { hidden: !filterBarVisible }
        )}
      >
        <MerchantFilters onFieldChange={handleFieldChange} />
        <ProviderFilters onFieldChange={handleFieldChange} />
        <ChannelFilters onFieldChange={handleFieldChange} />

        <div className="flex w-full flex-col py-3 ">
          <div className="flex w-full gap-2 ">
            <div className="w-1/2">
              <label
                htmlFor="productShortId"
                className="my-1.5 block text-base font-medium text-gray-900 dark:text-white"
              >
                Short ID
              </label>
              <input
                id="productShortId"
                type="search"
                className="block h-10 w-full rounded-md border border-gray-300 bg-gray-50 p-1 pl-3 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-secondary-dark-10 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={activeFilters.productShortId}
                onChange={handleFieldChange}
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="productProviderId"
                className="my-1.5 block text-base font-medium text-gray-900 dark:text-white"
              >
                SKU
              </label>
              <input
                id="productProviderId"
                type="search"
                className="block h-10 w-full rounded-md border border-gray-300 bg-gray-50 p-1 pl-3 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-secondary-dark-10 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                value={activeFilters.productProviderId}
                onChange={handleFieldChange}
              />
            </div>
          </div>
          <div className="flex w-full">
            <div className="mr-2 w-2/3">
              <label
                htmlFor="productStatus"
                className="my-1.5 block text-base font-medium text-gray-900 dark:text-white"
              >
                Product Status
              </label>
              <select
                id="productStatus"
                className={cn(
                  'block h-10 w-full rounded-md border border-secondary-dark-10 bg-gray-700 p-1 pl-2 text-base text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500',
                  {
                    'text-gray-400': !activeFilters.productStatus,
                  }
                )}
                value={activeFilters.productStatus}
                onChange={handleFieldChange}
              >
                <option value="">-----</option>
                {productStatuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-2 flex h-full w-1/3 flex-col items-center justify-center">
              <label
                htmlFor="productIntegrationError"
                className="ml-1.5 w-full text-center text-base font-medium text-gray-900 dark:text-gray-300"
              >
                Error?
              </label>
              <input
                type="checkbox"
                id="productIntegrationError"
                checked={activeFilters.productIntegrationError}
                onChange={() => {
                  filtersDispatch({
                    type: 'SAVE_FILTERS',
                    value: {
                      ...activeFilters,
                      productIntegrationError:
                        !activeFilters.productIntegrationError,
                    },
                  });
                }}
                className="h-4 rounded border-gray-300 bg-gray-100 text-primary focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col py-3 ">
          <div className="w-full">
            <label
              htmlFor="categoryGroupId"
              className="my-1.5 block text-base font-medium text-gray-900 dark:text-white"
            >
              GMC Category
            </label>
            <select
              id="categoryId"
              className={cn(
                'block h-10 w-full rounded-md border border-secondary-dark-10 bg-gray-700 p-1 pl-2 text-base text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500',
                {
                  'text-gray-400': !activeFilters.categoryId,
                }
              )}
              value={activeFilters.categoryId}
              onChange={handleFieldChange}
            >
              <option value="">-----</option>
              {gmcCategorySelect}
            </select>
          </div>
          <div className="w-full">
            <label
              htmlFor="providerCategoryCode"
              className="my-1.5 block text-base font-medium text-gray-900 dark:text-white"
            >
              Provider Category Code
            </label>
            <input
              id="providerCategoryCode"
              type="search"
              className="block h-10 w-full rounded-md border border-gray-300 bg-gray-50 p-1 pl-3 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-secondary-dark-10 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              value={activeFilters.providerCategoryCode}
              onChange={handleFieldChange}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="labelGroupId"
              className="my-1.5 block text-base font-medium text-gray-900 dark:text-white"
            >
              GMC Label
            </label>
            <select
              id="labelGroupId"
              className={cn(
                'block h-10 w-full rounded-md border border-secondary-dark-10 bg-gray-700 p-1 pl-2 text-base text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500',
                {
                  'text-gray-400': !activeFilters.labelGroupId,
                }
              )}
              value={activeFilters.labelGroupId}
              onChange={handleFieldChange}
            >
              <option value="">-----</option>
              {gmcLabelSelect.map((gmcLabel, i) => (
                <option key={i} value={gmcLabel}>
                  {gmcLabel.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mr-2 w-full">
            <label
              htmlFor="providerLabelCode"
              className="my-1.5 block text-base font-medium text-gray-900 dark:text-white"
            >
              Provider Label Code
            </label>
            <input
              id="providerLabelCode"
              type="search"
              className="block h-10 w-full rounded-md border border-gray-300 bg-gray-50 p-1 pl-3 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-secondary-dark-10 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              value={activeFilters.providerLabelCode}
              onChange={handleFieldChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FiltersContainer;
