import CopyIdButton from '@root/components/shared/copy-id-button';
import {
  useFiltersDispatch,
  initialFilters,
} from '@root/context-providers/filters.provider';
import { useMasterData } from '@root/context-providers/master-data.provider';
import { useScreenDataDispatch } from '@root/context-providers/screen-data.provider';
import providersService from '@root/services/providers.service';
import { IChannel } from 'gmc-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  channel: IChannel;
}

const ChannelBanner: React.FC<Props> = ({ channel }) => {
  const { readProviderKey } = useMasterData();
  const filtersDispatch = useFiltersDispatch();
  const screenDataDispatch = useScreenDataDispatch();
  const navigate = useNavigate();

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
    <div className="flex items-center space-x-1">
      <h2
        className="cursor-pointer text-sm font-bold underline-offset-1 hover:underline active:text-primary"
        onClick={handleProviderClick}
      >
        {readProviderKey(channel.providerId)}
      </h2>
      <span>{' > '}</span>
      <h2 className="text-sm font-bold text-gmc-soil">{channel.name}</h2>
      <CopyIdButton id={channel.id} />
    </div>
  );
};

export default ChannelBanner;
