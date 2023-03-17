import {
  useFilters,
  useFiltersDispatch,
} from '@root/context-providers/filters.provider';
import cn from 'classnames';
import React from 'react';

const FiltersContainer: React.FC = () => {
  const { activeFilters, options, filterBarVisible } = useFilters();
  const filtersDispatch = useFiltersDispatch();

  const handleFieldChange = (e) => {
    const updatedFilters = {
      ...activeFilters,
      [e.target.id]: e.target.value,
    };
    filtersDispatch({
      type: 'SAVE_FILTERS',
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
        <div className="flex w-full items-center py-4 ">
          <div className="mr-2 w-2/3">
            <label
              htmlFor="providerId"
              className="mb-1.5 block text-base font-medium text-gray-900 dark:text-white"
            >
              Provider Key
            </label>
            <select
              id="providerId"
              className={cn(
                'block h-10 w-full rounded-full border border-gray-600 bg-gray-700 p-1 pl-2 text-base text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500',
                {
                  'text-gray-400': !activeFilters.providerId,
                }
              )}
              value={activeFilters.providerId}
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

          <div className="w-1/3">
            <label
              htmlFor="providerActivation"
              className="blcok mb-1.5 w-full text-center text-base font-medium text-gray-900 dark:text-white"
            >
              Active
            </label>
            <select
              id="providerActivation"
              className={cn(
                'block h-10 w-full rounded-full border border-gray-600 bg-gray-700 p-1 pl-2 text-base text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500',
                {
                  'text-gray-400': !activeFilters.providerActivation,
                }
              )}
              value={activeFilters.providerActivation}
              onChange={handleFieldChange}
            >
              <option value="">-----</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="flex w-full flex-col gap-2 py-3 ">
          <div className="w-54">
            <label
              htmlFor="sourceIdentifier"
              className="my-1.5 text-base font-medium text-gray-900 dark:text-white"
            >
              Source Identifier
            </label>
            <input
              id="sourceIdentifier"
              type="search"
              className="h-10 w-full rounded-full border border-gray-300 bg-gray-50 p-1 pl-3 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              value={activeFilters.sourceIdentifier}
              onChange={handleFieldChange}
            />
          </div>

          <div className="flex w-full">
            <div className="mr-2 w-2/3">
              <label
                htmlFor="sourceStatus"
                className="my-1.5 text-base font-medium text-gray-900 dark:text-white"
              >
                Source Status
              </label>
              <select
                id="sourceStatus"
                className={cn(
                  'h-10 w-full rounded-full border border-gray-600 bg-gray-700 p-1 pl-2 text-base text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500',
                  {
                    'text-gray-400': !activeFilters.sourceStatus,
                  }
                )}
                value={activeFilters.sourceStatus}
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
            <div className="w-1/3">
              <label
                htmlFor="sourceActivation"
                className="my-1.5 w-full text-center text-base font-medium text-gray-900 dark:text-white"
              >
                Active
              </label>
              <select
                id="sourceActivation"
                className={cn(
                  'h-10 w-full rounded-full border border-gray-600 bg-gray-700 p-1 pl-2 text-base text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500',
                  {
                    'text-gray-400': !activeFilters.sourceActivation,
                  }
                )}
                value={activeFilters.sourceActivation}
                onChange={handleFieldChange}
              >
                <option value="">-----</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

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
                className="block h-10 w-full rounded-full border border-gray-300 bg-gray-50 p-1 pl-3 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
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
                className="block h-10 w-full rounded-full border border-gray-300 bg-gray-50 p-1 pl-3 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
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
                  'block h-10 w-full rounded-full border border-gray-600 bg-gray-700 p-1 pl-2 text-base text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500',
                  {
                    'text-gray-400': !activeFilters.productStatus,
                  }
                )}
                value={activeFilters.productStatus}
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
                'block h-10 w-full rounded-full border border-gray-600 bg-gray-700 p-1 pl-2 text-base text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500',
                {
                  'text-gray-400': !activeFilters.categoryId,
                }
              )}
              value={activeFilters.categoryId}
              onChange={handleFieldChange}
            >
              <option value="">-----</option>
              {options.categorySelect}
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
              className="block h-10 w-full rounded-full border border-gray-300 bg-gray-50 p-1 pl-3 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
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
                'block h-10 w-full rounded-full border border-gray-600 bg-gray-700 p-1 pl-2 text-base text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500',
                {
                  'text-gray-400': !activeFilters.labelGroupId,
                }
              )}
              value={activeFilters.labelGroupId}
              onChange={handleFieldChange}
            >
              <option value="">-----</option>
              {options.labelGroupSelect.map((group, i) => (
                <option key={i} value={group.id}>
                  {group.name}
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
              className="block h-10 w-full rounded-full border border-gray-300 bg-gray-50 p-1 pl-3 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
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
