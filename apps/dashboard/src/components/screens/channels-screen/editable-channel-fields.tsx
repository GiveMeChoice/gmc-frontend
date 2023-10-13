import ActivationSwitch from '@root/components/shared/activation-switch';
import EditableField from '@root/components/shared/editable-field';
import { useScreenDataDispatch } from '@root/context-providers/screen-data.provider';
import React, { useState } from 'react';
import ChannelLastRunDate from './channel-last-run-date';
import channelsService from '@root/services/channels.service';
import { IChannel } from 'gmc-types';

interface Props {
  channel: IChannel;
}

const EditableChannelFields: React.FC<Props> = ({ channel }) => {
  const screenDataDispatch = useScreenDataDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const handleFieldSave = (updates: Partial<IChannel>) => {
    setLoading(true);
    channelsService
      .update(channel.id, updates)
      .then((updatedChannel) => {
        screenDataDispatch({
          type: 'SCREEN_UPDATE_CHANNEL',
          value: updatedChannel,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex w-full divide-x divide-zinc-500 border-t border-zinc-500">
      <div className="flex w-3/12 flex-col items-center justify-evenly p-4 px-6">
        <EditableField
          title="Run Interval (hrs)"
          initialValue={channel.runIntervalHours}
          fieldType="number"
          onSave={(runIntervalHours) => handleFieldSave({ runIntervalHours })}
          loading={loading}
          width="w-16"
        />
        <EditableField
          title="Exprtn. (hrs)"
          initialValue={channel.expirationHours}
          fieldType="number"
          onSave={(expirationHours) => handleFieldSave({ expirationHours })}
          loading={loading}
          width="w-16"
        />
        <EditableField
          title="Retry Limit"
          initialValue={channel.retryLimit}
          fieldType="number"
          onSave={(retryLimit) => handleFieldSave({ retryLimit })}
          loading={loading}
          width="w-16"
        />
      </div>
      <div className="flex w-7/12 flex-col items-center border-r border-zinc-500 px-2 py-6">
        <EditableField
          title="ETL 1"
          initialValue={channel.etlCode1}
          fieldType="text"
          onSave={(etlCode1) => handleFieldSave({ etlCode1 })}
          loading={loading}
          width="w-full"
        />
        <EditableField
          title="ETL 2"
          initialValue={channel.etlCode2}
          fieldType="text"
          onSave={(etlCode2) => handleFieldSave({ etlCode2 })}
          loading={loading}
          width="w-full"
        />
        <EditableField
          title="ETL 3"
          initialValue={channel.etlCode3}
          fieldType="text"
          onSave={(etlCode3) => handleFieldSave({ etlCode3 })}
          loading={loading}
          width="w-full"
        />
        <EditableField
          title="ETL 4"
          initialValue={channel.etlCode4}
          fieldType="text"
          onSave={(etlCode4) => handleFieldSave({ etlCode4 })}
          loading={loading}
          width="w-full"
        />
      </div>
      <div className="w-2/12 divide-y divide-zinc-500">
        <div className="flex h-1/2 items-center justify-center">
          <ActivationSwitch active={channel.active} id={channel.id} />
        </div>
        <div className="flex h-1/2 items-center justify-center">
          <ChannelLastRunDate
            lastRunAt={channel.lastRunAt}
            active={channel.active}
            runIntervalHours={
              channel.runIntervalHours
                ? channel.runIntervalHours
                : channel.provider!.runIntervalHours
            }
          />
        </div>
      </div>
    </div>
  );
};

export default EditableChannelFields;
