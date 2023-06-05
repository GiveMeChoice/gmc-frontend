import React, { useEffect, useState } from 'react';
import FieldControlButtons from '../../shared/field-control-buttons';
import cn from 'classnames';
import channelsService from '@root/services/channels.service';
import { useScreenDataDispatch } from '@root/context-providers/screen-data.provider';

interface Props {
  sourceId: string;
  hours: number;
}

const IntervalHoursField: React.FC<Props> = ({ sourceId, hours }) => {
  const dataDispatch = useScreenDataDispatch();
  const [editing, setEditing] = useState(false);
  const [runIntervalHours, setRunIntervalHours] = useState(hours);

  useEffect(() => {
    setRunIntervalHours(hours);
  }, [sourceId, hours]);

  const onEdit = () => {
    setEditing(true);
  };
  const onCancel = () => {
    setEditing(false);
    setRunIntervalHours(hours);
  };
  const onSave = () => {
    setEditing(false);
    channelsService.update(sourceId, { runIntervalHours }).then((updated) => {
      dataDispatch({ type: 'SCREEN_UPDATE_CHANNEL', value: updated });
    });
  };

  return (
    <div className="flex items-center space-x-2 space-y-1 px-4">
      <span className="min-w-fit pr-2 text-center text-xs">Run Interval: </span>
      <input
        className={cn('h-6 w-14 rounded-md border pl-1.5', {
          'border-zinc-800 bg-primary-light-40 text-zinc-800': editing,
          'border-zinc-400 text-zinc-500': !editing,
        })}
        type="number"
        title="Run Interval (hours)"
        disabled={!editing}
        value={runIntervalHours}
        onChange={(e) => setRunIntervalHours(Number(e.target.value))}
        min={0}
        max={10000}
      />
      <FieldControlButtons
        active={editing}
        onEdit={onEdit}
        onCancel={onCancel}
        onSave={onSave}
        styles="w-1/3 justify-center"
      />
    </div>
  );
};

export default IntervalHoursField;
