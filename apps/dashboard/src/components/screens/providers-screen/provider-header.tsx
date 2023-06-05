import CopyIdButton from '@root/components/shared/copy-id-button';
import { IProvider } from '@root/services/providers.service';
import React from 'react';

interface Props {
  provider: IProvider;
}

const ProviderHeader: React.FC<Props> = ({ provider }) => {
  return (
    <div className="flex w-full items-center justify-between border-zinc-500 p-4 pr-12 pl-10">
      <div className="flex items-center space-x-1">
        <h2 className="text-base font-bold">{provider.key}</h2>
        <CopyIdButton id={provider.id} />
      </div>
      <div className="flex flex-grow justify-center">
        <span className="text-sm text-gmc-soil">{provider.description}</span>
      </div>
    </div>
  );
};

export default ProviderHeader;
