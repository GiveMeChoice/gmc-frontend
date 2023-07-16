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

const CategoryFilters: React.FC<Props> = ({ onFieldChange }) => {
  const { activeFilters } = useFilters();
  const { gmcCategorySelect } = useMasterData();
  const filtersDispatch = useFiltersDispatch();

  return (
    <div className="flex w-full flex-col gap-y-2">
      <div className="flex w-full">
        <div className="mr-2 w-3/4">
          <label className="ml-1 mb-1 block text-xs font-medium text-gray-900 dark:text-white">
            GMC Category
          </label>
          <select
            id="gmcCategoryId"
            className={cn(
              'block h-10 w-full rounded-md border border-secondary-dark-10 bg-zinc-600 p-1 pl-2 text-xs text-white placeholder-gray-400 focus:border-primary focus:ring-primary',
              {
                'text-gray-400': !activeFilters.gmcCategoryId,
              }
            )}
            disabled={activeFilters.categoryUnassigned}
            value={activeFilters.gmcCategoryId}
            onChange={onFieldChange}
          >
            <option value="">-----</option>
            {gmcCategorySelect}
          </select>
        </div>
        <div className="flex h-full w-1/4 flex-col items-center justify-center">
          <label
            htmlFor="categoryUnassigned"
            className="mb-3 w-full text-center text-xs font-medium text-white"
          >
            Unassigned
          </label>
          <input
            type="checkbox"
            id="categoryUnassigned"
            checked={activeFilters.categoryUnassigned}
            onChange={() => {
              filtersDispatch({
                type: 'FILTERS_SAVE',
                value: {
                  ...activeFilters,
                  gmcCategoryId: '',
                  categoryUnassigned: !activeFilters.categoryUnassigned,
                },
              });
            }}
            className="h-4 scale-150 rounded border-gray-300 bg-gray-100 text-primary focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
      <div className="w-full">
        <label className="ml-1 mb-1 block text-xs font-medium text-gray-900 dark:text-white">
          Merchant Category Code
        </label>
        <input
          id="merchantCategoryCode"
          type="search"
          className="block h-10 w-full rounded-md border border-gray-300 bg-zinc-600 p-1 pl-3 text-xs text-white focus:border-primary focus:ring-primary"
          value={activeFilters.merchantCategoryCode}
          onChange={onFieldChange}
        />
      </div>
    </div>
  );
};

export default CategoryFilters;
