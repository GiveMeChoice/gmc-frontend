import { MerchantDocument } from 'gmc-types';
import React from 'react';

interface Props {
  merchant: MerchantDocument;
}

const MerchantChip: React.FC<Props> = ({ merchant }) => {
  return (
    // <a
    //   className="flex h-9 w-fit cursor-pointer items-center gap-x-1 rounded-full border border-zinc-600 bg-secondary pl-1 pr-2 shadow-sm"
    //   target="_blank"
    //   rel="noopener noreferrer"
    //   title={merchant.description}
    //   // onClick={handleMerchantClick}
    // >
    //   <img
    //     src={merchant.logo}
    //     title="Merchant Logo"
    //     className="h-7 w-7 rounded-full border border-zinc-600 bg-secondary"
    //     alt="LOGO"
    //   />
    //   <span className="text-ellipsis whitespace-nowrap px-0.5 text-sm">
    //     {merchant.name}
    //   </span>
    // </a>
    <div className="flex items-center gap-x-2 pl-1">
      <img
        src={merchant.logo}
        title="Merchant Logo"
        className="h-9 w-9 rounded-full border border-zinc-600 bg-secondary"
        alt="LOGO"
      />
      <span className="text- text-ellipsis whitespace-nowrap px-0.5">
        {merchant.name}
      </span>
    </div>
  );
};

export default MerchantChip;
