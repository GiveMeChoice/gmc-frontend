import {
  useFilters,
  useFiltersDispatch,
} from '@root/context-providers/filters.provider';
import { useMasterData } from '@root/context-providers/master-data.provider';
import cn from 'classnames';
import React from 'react';

interface Props {
  onFieldChange: (e) => void;
}

const BrandFilters: React.FC<Props> = ({ onFieldChange }) => {
  const { activeFilters } = useFilters();
  const { gmcBrandSelect } = useMasterData();
  const filtersDispatch = useFiltersDispatch();

  return (
    <div className="flex w-full flex-col gap-y-2">
      <div className="flex w-full">
        <div className="mr-2 w-3/4">
          <label className="ml-1 mb-1 block text-xs font-medium text-gray-900 dark:text-white">
            GMC Brand
          </label>
          <select
            id="gmcBrandId"
            className={cn(
              'block h-10 w-full rounded-md border border-secondary-dark-10 bg-zinc-600 p-1 pl-2 text-xs text-white placeholder-gray-400 focus:border-primary focus:ring-primary',
              {
                'text-gray-400': !activeFilters.gmcBrandId,
              }
            )}
            disabled={activeFilters.brandUnassigned}
            value={activeFilters.gmcBrandId}
            onChange={onFieldChange}
          >
            <option value="">-----</option>
            {gmcBrandSelect}
          </select>
        </div>
        <div className="flex h-full w-1/4 flex-col items-center justify-center">
          <label
            htmlFor="brandUnassigned"
            className="mb-3 w-full text-center text-xs font-medium text-white"
          >
            Unassigned
          </label>
          <input
            type="checkbox"
            id="brandUnassigned"
            checked={activeFilters.brandUnassigned}
            onChange={() => {
              filtersDispatch({
                type: 'FILTERS_SAVE',
                value: {
                  ...activeFilters,
                  gmcBrandId: '',
                  brandUnassigned: !activeFilters.brandUnassigned,
                },
              });
            }}
            className="h-4 scale-150 rounded border-gray-300 bg-gray-100 text-primary focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
      <div className="w-full">
        <label className="ml-1 mb-1 block text-xs font-medium text-gray-900 dark:text-white">
          Merchant Brand Code
        </label>
        <input
          id="merchantBrandCode"
          type="search"
          className="block h-10 w-full rounded-md border border-gray-300 bg-zinc-600 p-1 pl-3 text-xs text-white focus:border-primary focus:ring-primary"
          value={activeFilters.merchantBrandCode}
          onChange={onFieldChange}
        />
      </div>
    </div>
  );
};

export default BrandFilters;
