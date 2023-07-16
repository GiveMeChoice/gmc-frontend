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
    <div className="flex w-full items-center">
      <div className="mr-2 w-2/3">
        <label
          htmlFor="providerId"
          className="ml-1 mb-1 block text-xs font-medium text-gray-900 dark:text-white"
        >
          Provider Key
        </label>
        <select
          id="providerId"
          className={cn(
            'block h-9 w-full rounded-md border border-secondary-dark-10 bg-zinc-600 p-1 pl-2 text-xs text-white placeholder-gray-400 focus:border-primary focus:ring-primary',
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
          className="ml-1 mb-1 block w-full text-xs font-medium text-gray-900 dark:text-white"
        >
          Active
        </label>
        <select
          id="providerActivation"
          className={cn(
            'block h-9 w-full rounded-md border border-secondary-dark-10 bg-zinc-600 p-1 pl-2 text-xs text-white placeholder-gray-400 focus:border-primary focus:ring-primary',
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
