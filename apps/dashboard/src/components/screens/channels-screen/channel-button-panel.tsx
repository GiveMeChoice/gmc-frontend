import ConfirmableButton from '@root/components/shared/confirmable-button';
import FramedButton from '@root/components/shared/framed-button';
import {
  IFilters,
  initialFilters,
  useFiltersDispatch,
} from '@root/context-providers/filters.provider';
import { useScreenDataDispatch } from '@root/context-providers/screen-data.provider';
import { formatErrorMessage } from '@root/helpers/format-error-message';
import channelsService from '@root/services/channels.service';
import integrationService from '@root/services/integration.service';
import productsService from '@root/services/products.service';
import runsService from '@root/services/runs.service';
import { toastService } from '@root/services/toast.service';
import { IChannel } from 'gmc-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';
const DeleteIcon = require('../../../assets/images/delete-icon.svg');

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

  const handleDelete = async (id: string) => {
    channelsService
      .deleteOne(id)
      .then(() => {
        screenDataDispatch({
          type: 'SCREEN_REMOVE_CHANNEL',
          value: id,
        });
        toastService.setToast(
          { level: 'SUCCESS', message: 'Channel Deleted Successfully' },
          screenDataDispatch
        );
      })
      .catch((e) => {
        toastService.setToast(
          {
            level: 'ERROR',
            message: formatErrorMessage(e),
          },
          screenDataDispatch
        );
      });
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
      <div className="flex h-1/3 w-full items-center justify-center gap-x-1.5">
        <ConfirmableButton
          important
          title="Execute Run"
          disabled={!channel.active}
          onConfirm={() => handleExecuteRun(channel.id)}
        />
        {!channel.productCount && (
          <div className="flex h-full justify-end">
            <ConfirmableButton
              onConfirm={() => handleDelete(channel.id)}
              title={
                <>
                  <img className="h-4 pr-2.5" src={DeleteIcon} alt="delete" />
                  <span>Delete</span>
                </>
              }
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ChannelButtonPanel;
