/* eslint-disable @next/next/no-img-element */
import React from 'react';
import cn from 'classnames';
import { IMerchantLabel } from 'gmc-types';

interface Props {
  merchantLabel: IMerchantLabel;
}

const MerchantLabelChip: React.FC<Props> = ({ merchantLabel }) => {
  return (
    <a
      className={cn(
        'flex h-9 w-fit cursor-pointer items-center gap-x-1 rounded-full border border-zinc-600 bg-white pl-1 pr-2.5',
        {}
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
