import { IProvider } from '@root/services/providers.service';
import React from 'react';
import CopyIdButton from '../copy-id-button';
import ScreenSectionCell from '../screen/screen-section-cell';
import ScreenSectionRow from '../screen/screen-section-row';
import ActivationSwitch from '../activation-switch';
import ViewSourcesLink from './view-sources-link';
import ViewRunsLink from '../sources-screen/view-runs-link';
import ViewProductsLink from '../sources-screen/view-products-link';
import RemapProductsButton from './remap-products-button';

interface Props {
  provider: IProvider;
  index: number;
}

const ProvidersListRow: React.FC<Props> = ({ provider, index }) => {
  return (
    <ScreenSectionRow>
      <ScreenSectionCell styles="w-2/5 flex flex-col justify-center">
        <div className="flex items-center space-x-1">
          <h2 className="text-lg font-bold">{provider.key}</h2>
          <CopyIdButton id={provider.id} />
        </div>
        <div className="px-0.5">
          <span className="text-gmc-soil">{provider.description}</span>
        </div>
      </ScreenSectionCell>
      <ScreenSectionCell styles="w-1/5">
        <ActivationSwitch active={provider.active} id={provider.id} />
      </ScreenSectionCell>
      <ScreenSectionCell styles="w-2/5 flex flex-col items-center justify-center space-y-1.5 h-full">
        <div className="flex w-full justify-center">
          <ViewSourcesLink providerId={provider.id} />
        </div>
        <div className="flex w-full justify-center">
          <ViewRunsLink providerId={provider.id} />
        </div>
        <div className="flex w-full justify-center">
          <ViewProductsLink providerId={provider.id} />
        </div>
      </ScreenSectionCell>
      <ScreenSectionCell styles="flex items-center justify-center">
        <RemapProductsButton providerKey={provider.key} />
      </ScreenSectionCell>
    </ScreenSectionRow>
  );
};

export default ProvidersListRow;
