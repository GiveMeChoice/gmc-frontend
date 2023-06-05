import { IProvider } from '@root/services/providers.service';
import React from 'react';
import ScreenSectionRow from '../shared/screen-section-row';
import EditableProviderFields from './editable-provider-fields';
import ProviderButtonPanel from './provider-button-panel';
import ProviderHeader from './provider-header';

interface Props {
  provider: IProvider;
  index: number;
}

const ProviderListRow: React.FC<Props> = ({ provider, index }) => {
  return (
    <ScreenSectionRow>
      <div className="flex h-full w-3/4 flex-col border-r border-zinc-500">
        <ProviderHeader provider={provider} />
        <EditableProviderFields provider={provider} />
      </div>
      <div className="flex h-full w-1/4 items-center justify-center pt-4">
        <ProviderButtonPanel provider={provider} />
      </div>
    </ScreenSectionRow>
  );
};

export default ProviderListRow;
