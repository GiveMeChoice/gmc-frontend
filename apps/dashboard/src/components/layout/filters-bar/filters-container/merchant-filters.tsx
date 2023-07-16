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
    <div className="flex w-full items-center">
      <div className="mr-2 w-2/3">
        <label
          htmlFor="merchantId"
          className="ml-1 mb-1 block text-xs font-medium text-gray-900 dark:text-white"
        >
          Merchant Key
        </label>
        <select
          id="merchantId"
          className={cn(
            'block h-9 w-full rounded-md border border-secondary-dark-10 bg-zinc-600 p-2 text-xs text-secondary placeholder-secondary focus:border-primary focus:ring-primary',
            {
              'text-secondary-dark-20': !activeFilters.merchantId,
            }
          )}
          value={activeFilters.merchantId}
          onChange={onFieldChange}
        >
          <option className="focus:ring-primary" value="">
            {'-----'}
          </option>
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
          className="ml-1 mb-1 block w-full text-xs font-medium text-gray-900 dark:text-white"
        >
          Region
        </label>
        <select
          id="merchantRegion"
          className={cn(
            'block h-9 w-full rounded-md border border-secondary-dark-10 bg-zinc-600 p-1 pl-2 text-xs text-white placeholder-gray-400 focus:border-primary focus:ring-primary',
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
