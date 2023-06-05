import FramedCountButton from '@root/components/shared/framed-count-button';
import {
  IFilters,
  initialFilters,
  useFiltersDispatch,
} from '@root/context-providers/filters.provider';
import { useScreenDataDispatch } from '@root/context-providers/screen-data.provider';
import channelsService from '@root/services/channels.service';
import providersService, { IProvider } from '@root/services/providers.service';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  provider: IProvider;
}

const ProviderButtonPanel: React.FC<Props> = ({ provider }) => {
  const filtersDispatch = useFiltersDispatch();
  const screenDataDispatch = useScreenDataDispatch();
  const navigate = useNavigate();

  const setProviderFilter = () => {
    const providerFilter: IFilters = {
      ...initialFilters,
      providerId: provider.id,
    };
    filtersDispatch({ type: 'FILTERS_SAVE', value: providerFilter });
  };

  const handleChannelsClick = () => {
    setProviderFilter();
    screenDataDispatch({
      type: 'SCREEN_REFRESH_CHANNELS',
      value: { data: [], meta: {} },
    });
    navigate(channelsService.channelsScreenControl.pathname);
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-y-4">
      <FramedCountButton
        title="Channels"
        count={provider.channelCount}
        onClick={handleChannelsClick}
      />
      {/* TOTAL PRODUCT COUNT */}
      <div className="flex flex-col items-center justify-center rounded-sm border border-secondary-dark-40 bg-secondary-dark-10 bg-opacity-40 py-1 px-2 text-zinc-600">
        <span className="text-xs">Total Provider Products</span>
        <span className="text-sm">{provider.productCount}</span>
      </div>
    </div>
  );
};

export default ProviderButtonPanel;
