import { useFilters } from '@root/context-providers/filters.provider';
import { useMasterData } from '@root/context-providers/master-data.provider';
import React from 'react';
import cn from 'classnames';

interface Props {
  onFieldChange: (e) => void;
}

const ProviderFilters: React.FC<Props> = ({ onFieldChange }) => {
  const { activeFilters } = useFilters();
  const { providerKeys } = useMasterData();

  return (
    <div className="flex w-full items-center py-4 ">
      <div className="mr-2 w-2/3">
        <label
          htmlFor="providerId"
          className="mb-0.5 ml-1 block text-base font-medium text-gray-900 dark:text-white"
        >
          Provider Key
        </label>
        <select
          id="providerId"
          className={cn(
            'block h-10 w-full rounded-md border border-secondary-dark-10 bg-gray-700 p-1 pl-2 text-base text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500',
            {
              'text-gray-400': !activeFilters.providerId,
            }
          )}
          value={activeFilters.providerId}
          onChange={onFieldChange}
        >
          <option value="">{'-----'}</option>
          {providerKeys.map((p, i) => (
            <option key={i} value={p.id}>
              {p.key}
            </option>
          ))}
        </select>
      </div>

      <div className="w-1/3">
        <label
          htmlFor="providerActivation"
          className="mb-0.5 ml-1 block w-full text-base font-medium text-gray-900 dark:text-white"
        >
          Active
        </label>
        <select
          id="providerActivation"
          className={cn(
            'block h-10 w-full rounded-md border border-secondary-dark-10 bg-gray-700 p-1 pl-2 text-base text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500',
            {
              'text-gray-400': !activeFilters.providerActivation,
            }
          )}
          value={activeFilters.providerActivation}
          onChange={onFieldChange}
        >
          <option value="">-----</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    </div>
  );
};

export default ProviderFilters;
