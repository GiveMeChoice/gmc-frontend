import { MerchantDocument } from 'gmc-types';
import React from 'react';

interface Props {
  merchant: MerchantDocument;
}

const BuyBoxMerchant: React.FC<Props> = ({ merchant }) => {
  return (
    <div className="flex flex-col items-start justify-start gap-y-[3px] pb-2.5">
      <span className="pl-1 text-xs text-zinc-700">OFFERED BY:</span>
      <div className="flex items-center justify-center gap-x-2 rounded-sm border-1.5 border-zinc-800 bg-zinc-800 py-1 px-2 text-white">
        <span className="whitespace-nowrap text-sm">
          {merchant.name.toLocaleUpperCase()}
        </span>
      </div>
    </div>
  );
};

export default BuyBoxMerchant;
