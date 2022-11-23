import { IProvider } from '@root/services/providers.service';
import React from 'react';
import CopyIdButton from '../copy-id-button';
import ScreenSectionRow from '../screen/screen-section-row';
import ProviderActiveCell from './provider-active-cell';
import ProviderSourcesCell from './provider-sources-cell';

interface Props {
  provider: IProvider;
  index: number;
}

const ProvidersListRow: React.FC<Props> = ({ provider, index }) => {
  return (
    <ScreenSectionRow>
      <div className="w-1/3">
        <div className="flex items-center space-x-1">
          <h2 className="text-xl font-bold">{provider.key}</h2>
          <CopyIdButton index={index} id={provider.id} />
        </div>
        <span>{provider.description}</span>
      </div>
      <ProviderActiveCell provider={provider} />
      <ProviderSourcesCell />
    </ScreenSectionRow>
  );
};

export default ProvidersListRow;
