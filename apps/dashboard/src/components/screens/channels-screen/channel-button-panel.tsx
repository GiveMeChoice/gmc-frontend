import ConfirmableButton from '@root/components/shared/confirmable-button';
import FramedCountButton from '@root/components/shared/framed-count-button';
import {
  IFilters,
  initialFilters,
  useFiltersDispatch,
} from '@root/context-providers/filters.provider';
import { useScreenDataDispatch } from '@root/context-providers/screen-data.provider';
import { formatErrorMessage } from '@root/helpers/format-error-message';
import channelsService, { IChannel } from '@root/services/channels.service';
import integrationService from '@root/services/integration.service';
import productsService from '@root/services/products.service';
import runsService from '@root/services/runs.service';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  channel: IChannel;
}

const ChannelButtonPanel: React.FC<Props> = ({ channel }) => {
  const filtersDispatch = useFiltersDispatch();
  const screenDataDispatch = useScreenDataDispatch();
  const navigate = useNavigate();

  const setChannelFilter = () => {
    const channelFilter: IFilters = {
      ...initialFilters,
      channelId: channel.id,
    };
    filtersDispatch({ type: 'FILTERS_SAVE', value: channelFilter });
  };

  const handleRunsClick = () => {
    setChannelFilter();
    screenDataDispatch({
      type: 'SCREEN_REFRESH_RUNS',
      value: { data: [], meta: {} },
    });
    navigate(runsService.runsScreenControl.pathname);
  };

  const handleProductsClick = () => {
    setChannelFilter();
    screenDataDispatch({
      type: 'SCREEN_REFRESH_PRODUCTS',
      value: { data: [], meta: {} },
    });
    navigate(productsService.productsScreenControl.pathname);
  };

  const handleExecuteRun = async (channelId: string) => {
    try {
      await integrationService.integrateChannel(channelId);
      const updated = await channelsService.getOne(channelId);
      console.log('updated: ' + JSON.stringify(updated));
      screenDataDispatch({
        type: 'SCREEN_UPDATE_CHANNEL',
        value: updated,
      });
    } catch (e) {
      console.error('integration failed');
      console.error(formatErrorMessage(e));
    }
  };

  return (
    <div className="bg-gmc flex h-full flex-col items-center justify-center gap-y-4">
      <FramedCountButton
        title="Runs"
        count={channel.runCount}
        onClick={handleRunsClick}
      />
      <FramedCountButton
        title="Products"
        count={channel.productCount}
        onClick={handleProductsClick}
        color="gmc-beach"
      />
      <ConfirmableButton
        title="Execute Run"
        disabled={!channel.active}
        onConfirm={() => handleExecuteRun(channel.id)}
      />
    </div>
  );
};

export default ChannelButtonPanel;
