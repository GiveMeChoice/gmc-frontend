/* eslint-disable @next/next/no-img-element */
import { IMerchantBrand } from '@root/services/merchant-brands.service';
import cn from 'classnames';
import React from 'react';

interface Props {
  merchantBrand: IMerchantBrand;
}

const MerchantBrandChip: React.FC<Props> = ({ merchantBrand }) => {
  return (
    <a
      className={cn(
        'flex h-12 w-fit cursor-pointer items-center gap-x-1 rounded-sm border border-zinc-600 bg-white pl-1',
        {
          // 'bg-primary-light-20': merchantLabel.gmcLabelId != null,
          // 'bg-white': merchantLabel.gmcLabelId == null,
        }
      )}
      href={merchantBrand.url}
      target="_blank"
      rel="noopener noreferrer"
      title={merchantBrand.description}
    >
      <img
        src={merchantBrand.logo}
        title="Merchant Logo"
        className="h-9 w-9 rounded-sm border border-zinc-600"
        alt="LOGO"
      />
      <span className="text-ellipsis whitespace-nowrap px-2.5 text-sm">
        {merchantBrand.name}
      </span>
    </a>
  );
};

export default MerchantBrandChip;
