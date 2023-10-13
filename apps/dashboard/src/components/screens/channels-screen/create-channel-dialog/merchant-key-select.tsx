import { useMasterData } from '@root/context-providers/master-data.provider';
import React from 'react';
import cn from 'classnames';

interface Props {
  currentValue: string;
  onValueChange: (e) => void;
}

const MerchantKeySelect: React.FC<Props> = ({
  currentValue,
  onValueChange,
}) => {
  const { merchantKeys } = useMasterData();

  return (
    <div className="w-full">
      <label
        // htmlFor="merchantId"
        className="ml-1 mb-1 block font-medium text-gray-900 "
      >
        MERCHANT
      </label>
      <select
        id="merchantId"
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
        {merchantKeys.map((m, i) => (
          <option key={i} value={m.key}>
            {m.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MerchantKeySelect;
