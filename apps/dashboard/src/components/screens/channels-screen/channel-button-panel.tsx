import ConfirmableButton from '@root/components/shared/confirmable-button';
import FramedButton from '@root/components/shared/framed-button';
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
import { toastService } from '@root/services/toast.service';
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
      value: { data: [], meta: { sort: 'runAt', direction: 'DESC' } },
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
      toastService.setToast(
        {
          level: 'INFO',
          message: 'Run Completed Successfully',
        },
        screenDataDispatch
      );
    } catch (e) {
      toastService.setToast(
        {
          level: 'ERROR',
          message: 'Run Failed: ' + formatErrorMessage(e),
        },
        screenDataDispatch
      );
    }
  };

  return (
    <>
      <div className="h-1/3 w-full">
        <FramedButton
          title="Runs"
          count={channel.runCount}
          onClick={handleRunsClick}
        />
      </div>
      <div className="h-1/3 w-full">
        <FramedButton
          title="Products"
          count={channel.productCount}
          onClick={handleProductsClick}
        />
      </div>
      <div className="flex h-1/3 w-full justify-center">
        <ConfirmableButton
          important
          title="Execute Run"
          disabled={!channel.active}
          onConfirm={() => handleExecuteRun(channel.id)}
        />
      </div>
    </>
  );
};

export default ChannelButtonPanel;
