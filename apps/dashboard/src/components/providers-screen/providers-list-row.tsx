import { IProvider } from '@root/services/providers.service';
import React from 'react';
import CopyIdButton from '../copy-id-button';
import ScreenSectionCell from '../screen/screen-section-cell';
import ScreenSectionRow from '../screen/screen-section-row';
import ActivationSwitch from '../activation-switch';
import ViewProviderSourcesCell from './view-provider-sources-cell';

interface Props {
  provider: IProvider;
  index: number;
}

const ProvidersListRow: React.FC<Props> = ({ provider, index }) => {
  return (
    <ScreenSectionRow>
      <ScreenSectionCell styles="w-1/3">
        <div className="flex items-center space-x-1">
          <h2 className="text-lg font-bold">{provider.key}</h2>
          <CopyIdButton index={index} id={provider.id} />
        </div>
        <span>{provider.description}</span>
      </ScreenSectionCell>
      <ScreenSectionCell styles="w-1/5">
        <ActivationSwitch active={provider.active} id={provider.id} />
      </ScreenSectionCell>
      <ViewProviderSourcesCell providerId={provider.id} />
    </ScreenSectionRow>
  );
};

export default ProvidersListRow;
