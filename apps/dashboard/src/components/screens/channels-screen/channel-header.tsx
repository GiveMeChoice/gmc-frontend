import CopyIdButton from '@root/components/shared/copy-id-button';
import { useMasterData } from '@root/context-providers/master-data.provider';
import { IChannel } from '@root/services/channels.service';
import merchantsService, { IMerchant } from '@root/services/merchants.service';
import React from 'react';
import MerchantChip from '../merchants-screen/merchant-chip';
import {
  initialFilters,
  useFiltersDispatch,
} from '@root/context-providers/filters.provider';
import { useScreenDataDispatch } from '@root/context-providers/screen-data.provider';
import { useNavigate } from 'react-router-dom';
import providersService from '@root/services/providers.service';
import ChannelStatusChip from './channel-status-chip';

interface Props {
  channel: IChannel;
}

const ChannelHeader: React.FC<Props> = ({ channel }) => {
  const { readProviderKey } = useMasterData();
  const filtersDispatch = useFiltersDispatch();
  const screenDataDispatch = useScreenDataDispatch();
  const navigate = useNavigate();

  const handleMerchantClick = () => {
    filtersDispatch({
      type: 'FILTERS_SAVE',
      value: {
        ...initialFilters,
        merchantId: channel.merchantId,
      },
    });
    screenDataDispatch({
      type: 'SCREEN_REFRESH_MERCHANTS',
      value: { data: [], meta: {} },
    });
    navigate(merchantsService.merchantsScreenControl.pathname);
  };

  const handleProviderClick = () => {
    filtersDispatch({
      type: 'FILTERS_SAVE',
      value: {
        ...initialFilters,
        providerId: channel.providerId,
      },
    });
    screenDataDispatch({
      type: 'SCREEN_REFRESH_PROVIDERS',
      value: { data: [], meta: {} },
    });
    navigate(providersService.providersScreenControl.pathname);
  };

  return (
    <div className="flex items-center justify-between border-zinc-500 p-3 pr-6">
      <div className="flex w-full items-center gap-x-12">
        <MerchantChip
          merchant={channel.merchant as IMerchant}
          onClick={handleMerchantClick}
        />
        <div className="flex items-center space-x-1">
          <h2
            className="cursor-pointer text-sm font-bold underline-offset-1 hover:underline active:text-primary"
            onClick={handleProviderClick}
          >
            {readProviderKey(channel.providerId)}
          </h2>
          <span>{' > '}</span>
          <h2 className="text-sm font-bold text-gmc-soil">
            {channel.description}
          </h2>
          <CopyIdButton id={channel.id} />
        </div>
      </div>
      <ChannelStatusChip
        status={channel.status}
        retryCount={channel.retryCount}
      />
    </div>
  );
};

export default ChannelHeader;
