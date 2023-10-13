import { useMasterData } from '@root/context-providers/master-data.provider';
import React from 'react';
import cn from 'classnames';

interface Props {
  currentValue: string;
  onValueChange: (e) => void;
}

const ProviderKeySelect: React.FC<Props> = ({
  currentValue,
  onValueChange,
}) => {
  const { providerKeys } = useMasterData();

  return (
    <div className="w-full">
      <label
        // htmlFor="currentValue"
        className="ml-1 mb-1 block font-medium text-gray-900 "
      >
        PROVIDER
      </label>
      <select
        id="currentValue"
        className={cn(
          'block w-full rounded-md border border-secondary-dark-10 bg-white p-2 text-black focus:border-primary focus:ring-primary',
          {
            'text-secondary-dark-20': !currentValue,
          }
        )}
        value={currentValue}
        onChange={onValueChange}
      >
        <option className="focus:ring-primary" value="">
          {'-----'}
        </option>
        {providerKeys.map((m, i) => (
          <option key={i} value={m.key}>
            {m.key}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProviderKeySelect;
