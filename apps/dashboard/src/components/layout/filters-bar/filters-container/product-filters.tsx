import {
  useFilters,
  useFiltersDispatch,
} from '@root/context-providers/filters.provider';
import React from 'react';
import cn from 'classnames';
import { useMasterData } from '@root/context-providers/master-data.provider';

interface Props {
  onFieldChange: (e) => void;
}

const ProductFilters: React.FC<Props> = ({ onFieldChange }) => {
  const { activeFilters } = useFilters();
  const filtersDispatch = useFiltersDispatch();
  const { productStatuses } = useMasterData();

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full">
        <div className="mr-2 w-2/3">
          <label
            htmlFor="productStatus"
            className="ml-1 mb-1 block text-xs font-medium text-gray-900 dark:text-white"
          >
            Product Status
          </label>
          <select
            id="productStatus"
            className={cn(
              'block h-9 w-full rounded-md border border-secondary-dark-10 bg-zinc-600 p-1 pl-2 text-xs text-white placeholder-gray-400 focus:border-primary focus:ring-primary',
              {
                'text-gray-400': !activeFilters.productStatus,
              }
            )}
            value={activeFilters.productStatus}
            onChange={onFieldChange}
          >
            <option value="">-----</option>
            {productStatuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="flex h-full w-1/3 flex-col items-center justify-center">
          <label
            htmlFor="productError"
            className="mb-3 w-full text-center text-xs font-medium text-white"
          >
            Product Error
          </label>
          <input
            type="checkbox"
            id="productError"
            checked={activeFilters.productError}
            onChange={() => {
              filtersDispatch({
                type: 'FILTERS_SAVE',
                value: {
                  ...activeFilters,
                  productError: !activeFilters.productError,
                },
              });
            }}
            className="h-4 scale-150 rounded border-gray-300 bg-gray-100 text-primary focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
      <div className="flex w-full gap-2 ">
        <div className="w-1/2">
          <label
            htmlFor="gmcProductId"
            className="ml-1 mb-1 block text-xs font-medium text-gray-900 dark:text-white"
          >
            Product ID
          </label>
          <input
            id="gmcProductId"
            type="search"
            className="block h-9 w-full rounded-md border border-gray-300 bg-zinc-600 p-1 pl-3 text-xs text-white focus:border-primary focus:ring-primary"
            value={activeFilters.gmcProductId}
            onChange={onFieldChange}
          />
        </div>
        <div className="w-1/2">
          <label
            htmlFor="merchantProductCode"
            className="ml-1 mb-1 block text-xs font-medium text-gray-900 dark:text-white"
          >
            Merchant Code
          </label>
          <input
            id="merchantProductCode"
            type="search"
            className="block h-9 w-full rounded-md border border-gray-300 bg-zinc-600 p-1 pl-3 text-xs text-white focus:border-primary focus:ring-primary"
            value={activeFilters.merchantProductCode}
            onChange={onFieldChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
