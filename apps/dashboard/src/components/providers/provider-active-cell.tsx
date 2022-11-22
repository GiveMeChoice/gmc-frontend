import React from 'react';
import LoadingWheel from '../loading-wheel';
import cn from 'classnames';
import { IProvider } from '@root/services/providers.service';

interface Props {
  provider: IProvider;
}

const ProviderActiveCell: React.FC<Props> = ({ provider }) => {
  return (
    <div className="flex w-40 items-center justify-evenly space-x-2">
      {/* <p
        className={cn('text-sm font-bold', {
          'text-gmc-forest': provider.active,
          'text-gmc-heart': !provider.active,
        })}
      >
        {provider.active ? 'ACTIVE' : 'INACTIVE'}
      </p> */}
      <LoadingWheel />
      <label className="switch">
        <input type="checkbox" />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default ProviderActiveCell;
