import { IChannel } from '@root/services/channels.service';
import { IMerchant } from '@root/services/merchants.service';
import React from 'react';
import MerchantChip from '../merchants-screen/merchant-chip';
import ChannelBanner from './channel-banner';
import ChannelStatusChip from './channel-status-chip';

interface Props {
  channel: IChannel;
}

const ChannelHeader: React.FC<Props> = ({ channel }) => {
  return (
    <div className="flex items-center justify-between  p-3 px-6">
      <div className="flex w-full items-center gap-x-12">
        <MerchantChip
          merchant={channel.merchant as IMerchant}
          clickable={true}
        />
        <ChannelBanner channel={channel} />
      </div>
      <ChannelStatusChip
        status={channel.status}
        retryCount={channel.retryCount}
      />
    </div>
  );
};

export default ChannelHeader;
