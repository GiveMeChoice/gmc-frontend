import { useFilters } from '@root/context-providers/filters.provider';
import { useMasterData } from '@root/context-providers/master-data.provider';
import cn from 'classnames';
import React from 'react';

interface Props {
  onFieldChange: (e) => void;
}

const ChannelFilters: React.FC<Props> = ({ onFieldChange }) => {
  const { activeFilters } = useFilters();
  const { channelStatuses } = useMasterData();

  return (
    <div className="flex w-full flex-col gap-y-1.5">
      <div className="flex w-full">
        <div className="mr-2 w-2/3">
          <label
            htmlFor="channelStatus"
            className="ml-1 mb-1 text-xs font-medium text-gray-900 dark:text-white"
          >
            Channel Status
          </label>
          <select
            id="channelStatus"
            className={cn(
              'h-9 w-full rounded-md border border-secondary-dark-10 bg-zinc-600 p-1 pl-2 text-xs text-white placeholder-gray-400 focus:border-primary focus:ring-primary',
              {
                'text-gray-400': !activeFilters.channelStatus,
              }
            )}
            value={activeFilters.channelStatus}
            onChange={onFieldChange}
          >
            <option value="">-----</option>
            {channelStatuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="w-1/3">
          <label
            htmlFor="channelActivation"
            className="ml-1 mb-1 w-full text-center text-xs font-medium text-gray-900 dark:text-white"
          >
            Active
          </label>
          <select
            id="channelActivation"
            className={cn(
              'h-9 w-full rounded-md border border-secondary-dark-10 bg-zinc-600 p-1 pl-2 text-xs text-white placeholder-gray-400 focus:border-primary focus:ring-primary',
              {
                'text-gray-400': !activeFilters.channelActivation,
              }
            )}
            value={activeFilters.channelActivation}
            onChange={onFieldChange}
          >
            <option value="">-----</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
      <div className="w-54">
        <label
          htmlFor="channelId"
          className="ml-1 mb-1 text-xs font-medium text-white"
        >
          Channel ID
        </label>
        <input
          id="channelId"
          type="search"
          className="h-9 w-full rounded-md border border-gray-300 bg-zinc-600 p-1 pl-3 text-xs text-gray-900 focus:border-primary focus:ring-primary dark:border-secondary-dark-10 dark:bg-zinc-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary dark:focus:ring-primary"
          value={activeFilters.channelId}
          onChange={onFieldChange}
        />
      </div>
    </div>
  );
};

export default ChannelFilters;
