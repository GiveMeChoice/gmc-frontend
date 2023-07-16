/* eslint-disable @next/next/no-img-element */
import { IMerchantLabel } from '@root/services/merchant-labels.service';
import React from 'react';
import cn from 'classnames';

interface Props {
  merchantLabel: IMerchantLabel;
}

const MerchantLabelChip: React.FC<Props> = ({ merchantLabel }) => {
  return (
    <a
      className={cn(
        'flex h-8 w-fit cursor-pointer items-center gap-x-1 rounded-full border border-zinc-600 bg-white pl-0.5 pr-2',
        {
          // 'bg-primary-light-20': merchantLabel.gmcLabelId != null,
          // 'bg-white': merchantLabel.gmcLabelId == null,
        }
      )}
      href={merchantLabel.url}
      target="_blank"
      rel="noopener noreferrer"
      title={merchantLabel.description}
    >
      <img
        src={merchantLabel.logo}
        title="Merchant Logo"
        className="h-7 w-7 rounded-full border border-zinc-600"
        alt="LOGO"
      />
      <span className="text-ellipsis whitespace-nowrap px-0.5 text-xs">
        {merchantLabel.name}
      </span>
    </a>
  );
};

export default MerchantLabelChip;
