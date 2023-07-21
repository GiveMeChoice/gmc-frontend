import { MerchantDocument } from 'gmc-types';
import React from 'react';

interface Props {
  merchant: MerchantDocument;
}

const MerchantChip: React.FC<Props> = ({ merchant }) => {
  return (
    <div className="flex items-center gap-x-2">
      <img
        src={merchant.logo}
        title="Merchant Logo"
        className="h-8 w-8 rounded-full border border-zinc-800 bg-secondary shadow-sm"
        alt="LOGO"
      />
      <span className="text- text-ellipsis whitespace-nowrap px-0.5">
        {merchant.name}
      </span>
    </div>
  );
};

export default MerchantChip;
