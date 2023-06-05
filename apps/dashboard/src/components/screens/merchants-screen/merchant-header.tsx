/* eslint-disable @next/next/no-img-element */
import CopyIdButton from '@root/components/shared/copy-id-button';
import { IMerchant } from '@root/services/merchants.service';
import React from 'react';
import MerchantChip from './merchant-chip';
const FlagIconUK = require('../../../assets/images/uk-flag-icon.svg');

interface Props {
  merchant: IMerchant;
}

const MerchantHeader: React.FC<Props> = ({ merchant }) => {
  return (
    <div className="flex w-full items-center justify-between border-zinc-500 p-4 pr-12 pl-10">
      <MerchantChip merchant={merchant} />
      <div className="flex items-center space-x-1">
        <h2 className="text-lg font-bold">{merchant.key}</h2>
        <CopyIdButton id={merchant.id} />
      </div>
      <img
        src={FlagIconUK}
        className="aspect-square h-6 w-6 rounded-full ring-2 ring-zinc-500"
        height={96}
        width={96}
        alt="region"
      />
    </div>
  );
};

export default MerchantHeader;
