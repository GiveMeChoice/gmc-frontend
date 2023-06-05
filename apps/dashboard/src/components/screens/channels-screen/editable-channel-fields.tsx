import ActivationSwitch from '@root/components/shared/activation-switch';
import EditableField from '@root/components/shared/editableField';
import { useScreenDataDispatch } from '@root/context-providers/screen-data.provider';
import { toDateString } from '@root/helpers/to-date-string';
import channelsService, { IChannel } from '@root/services/channels.service';
import React, { useState } from 'react';
import ChannelLastRunDate from './channel-last-run-date';

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
    <div className="flex w-full border-t border-zinc-500">
      <div className="flex w-10/12 items-center">
        <div className="flex h-full w-1/3 flex-col items-center justify-evenly border-r border-zinc-500 px-2 py-6">
          <div>
            <EditableField
              title="Run Interval (hrs)"
              initialValue={channel.runIntervalHours}
              fieldType="number"
              onSave={(runIntervalHours) =>
                handleFieldSave({ runIntervalHours })
              }
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
        </div>
        <div className="flex h-full w-2/3 flex-col items-center border-r border-zinc-500 px-2 py-6">
          <EditableField
            title="Code 1"
            initialValue={channel.etlCode1}
            fieldType="text"
            onSave={(etlCode1) => handleFieldSave({ etlCode1 })}
            loading={loading}
            width="w-full"
          />
          <EditableField
            title="Code 2"
            initialValue={channel.etlCode2}
            fieldType="text"
            onSave={(etlCode2) => handleFieldSave({ etlCode2 })}
            loading={loading}
            width="w-full"
          />
          <EditableField
            title="Code 3"
            initialValue={channel.etlCode3}
            fieldType="text"
            onSave={(etlCode3) => handleFieldSave({ etlCode3 })}
            loading={loading}
            width="w-full"
          />
          <EditableField
            title="Code 4"
            initialValue={channel.etlCode4}
            fieldType="text"
            onSave={(etlCode4) => handleFieldSave({ etlCode4 })}
            loading={loading}
            width="w-full"
          />
        </div>
      </div>
      <div className="h-24 w-2/12">
        <ActivationSwitch active={channel.active} id={channel.id} />
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
  );
};

export default EditableChannelFields;
