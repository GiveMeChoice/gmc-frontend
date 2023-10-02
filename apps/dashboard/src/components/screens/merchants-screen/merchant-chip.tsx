/* eslint-disable @next/next/no-img-element */
import {
  initialFilters,
  useFiltersDispatch,
} from '@root/context-providers/filters.provider';
import { useScreenDataDispatch } from '@root/context-providers/screen-data.provider';
import merchantsService, { IMerchant } from '@root/services/merchants.service';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

interface Props {
  merchant: IMerchant;
  clickable?: boolean;
}

const MerchantChip: React.FC<Props> = ({ merchant, clickable }) => {
  const filtersDispatch = useFiltersDispatch();
  const screenDataDispatch = useScreenDataDispatch();
  const navigate = useNavigate();

  const handleMerchantClick = () => {
    if (clickable) {
      filtersDispatch({
        type: 'FILTERS_SAVE',
        value: {
          ...initialFilters,
          merchantId: merchant.id,
        },
      });
      screenDataDispatch({
        type: 'SCREEN_REFRESH_MERCHANTS',
        value: { data: [], meta: {} },
      });
      navigate(merchantsService.merchantsScreenControl.pathname);
    }
  };

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      title={merchant.description}
      onClick={handleMerchantClick}
      className="group h-9 w-fit rounded-full bg-black"
    >
      <div
        className={cn(
          'flex h-9 w-fit  cursor-pointer items-center gap-x-1 rounded-full border-zinc-600 bg-white pl-1 pr-2.5 transition-transform duration-150',
          {
            'cursor-default border': !clickable,
            'translate-x-[1px] -translate-y-[2px] border-1.5 group-hover:translate-x-[3px] group-hover:-translate-y-[5px] group-active:translate-x-[1px] group-active:-translate-y-[2px]':
              clickable,
          }
        )}
      >
        <img
          src={merchant.logo}
          title="Merchant Logo"
          className="h-7 w-7 rounded-full border border-zinc-600 bg-secondary"
          alt="LOGO"
        />
        <span className="text-ellipsis whitespace-nowrap px-0.5 text-xs font-bold">
          {merchant.name}
        </span>
      </div>
    </a>
  );
};

export default MerchantChip;
