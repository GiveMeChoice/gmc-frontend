import React from 'react';
import ScreenSectionRow from '../shared/screen-section-row';
import EditableMerchantFields from './editable-merchant-fields';
import MerchantButtonPanel from './merchant-button-panel';
import MerchantHeader from './merchant-header';
import { IMerchant } from 'gmc-types';

interface Props {
  merchant: IMerchant;
  index: number;
}

const MerchantListRow: React.FC<Props> = ({ merchant, index }) => {
  return (
    <ScreenSectionRow>
      <div className="flex h-full w-3/5 flex-col border-r border-zinc-500">
        <MerchantHeader merchant={merchant} />
        <EditableMerchantFields merchant={merchant} />
      </div>
      <div className="flex h-full w-2/5 items-center justify-center pt-4">
        <MerchantButtonPanel merchant={merchant} />
      </div>
    </ScreenSectionRow>
  );
};

export default MerchantListRow;
