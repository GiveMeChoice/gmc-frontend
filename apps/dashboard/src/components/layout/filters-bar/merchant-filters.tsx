import { useFilters } from '@root/context-providers/filters.provider';
import { useMasterData } from '@root/context-providers/master-data.provider';
import React from 'react';
import cn from 'classnames';

interface Props {
  onFieldChange: (e) => void;
}

const MerchantFilters: React.FC<Props> = ({ onFieldChange }) => {
  const { activeFilters } = useFilters();
  const { merchantKeys, merchantRegions } = useMasterData();

  return (
    <div className="flex w-full items-center py-4 ">
      <div className="mr-2 w-2/3">
        <label
          htmlFor="merchantId"
          className="mb-0.5 ml-1 block text-base font-medium text-gray-900 dark:text-white"
        >
          Merchant Key
        </label>
        <select
          id="merchantId"
          className={cn(
            'block h-10 w-full rounded-md border border-secondary-dark-10 bg-gray-700 p-1 pl-2 text-base text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500',
            {
              'text-gray-400': !activeFilters.merchantId,
            }
          )}
          value={activeFilters.merchantId}
          onChange={onFieldChange}
        >
          <option value="">{'-----'}</option>
          {merchantKeys.map((m, i) => (
            <option key={i} value={m.id}>
              {m.key}
            </option>
          ))}
        </select>
      </div>

      <div className="w-1/3">
        <label
          htmlFor="merchantRegion"
          className="mb-0.5 ml-1 block w-full text-base font-medium text-gray-900 dark:text-white"
        >
          Region
        </label>
        <select
          id="merchantRegion"
          className={cn(
            'block h-10 w-full rounded-md border border-secondary-dark-10 bg-gray-700 p-1 pl-2 text-base text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500',
            {
              'text-gray-400': !activeFilters.merchantRegion,
            }
          )}
          value={activeFilters.merchantRegion}
          onChange={onFieldChange}
        >
          <option value="">-----</option>
          {merchantRegions.map((r, i) => (
            <option key={i} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default MerchantFilters;
