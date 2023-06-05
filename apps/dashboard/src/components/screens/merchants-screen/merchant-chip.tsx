/* eslint-disable @next/next/no-img-element */
import { IMerchant } from '@root/services/merchants.service';
import React from 'react';

interface Props {
  merchant: IMerchant;
  onClick?: () => void;
}

const MerchantChip: React.FC<Props> = ({ merchant, onClick }) => {
  return (
    <div className="mx-2 flex items-center justify-center">
      <a
        className="flex h-9 cursor-pointer items-center gap-x-2 rounded-full border border-zinc-600 bg-white pl-1 pr-3"
        target="_blank"
        rel="noopener noreferrer"
        title={merchant.description}
        onClick={onClick}
      >
        <img
          src={merchant.logo}
          title="Merchant Logo"
          className="h-7 w-7 rounded-full border border-zinc-600 bg-secondary p-0.5"
          alt="LOGO"
        />
        <span className="text-xs">{merchant.name}</span>
      </a>
    </div>
  );
};

export default MerchantChip;
