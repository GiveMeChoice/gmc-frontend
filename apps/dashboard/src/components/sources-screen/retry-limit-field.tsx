import React, { useEffect, useState } from 'react';
import FieldControlButtons from '../field-control-buttons';
import cn from 'classnames';
import sourcesService from '@root/services/sources.service';
import { useDataDispatch } from '@root/context-providers/data.provider';

interface Props {
  sourceId: string;
  limit: number;
}

const RetryLimitField: React.FC<Props> = ({ sourceId, limit }) => {
  const dataDispatch = useDataDispatch();
  const [editing, setEditing] = useState(false);
  const [retryLimit, setRetryLimit] = useState(limit);

  useEffect(() => {
    setRetryLimit(limit);
  }, [sourceId, limit]);

  const onEdit = () => {
    setEditing(true);
  };
  const onCancel = () => {
    setEditing(false);
  };
  const onSave = () => {
    setEditing(false);
    sourcesService.update(sourceId, { retryLimit }).then((updated) => {
      dataDispatch({ type: 'UPDATE_SOURCE', value: updated });
    });
  };

  return (
    <div className="flex items-center space-x-1 space-y-1 px-2">
      <span className="pr-2 text-center text-sm">Retry Limit: </span>
      <input
        className={cn('h-6 w-14 rounded-md border pl-1.5 text-lg', {
          'border-zinc-800 bg-primary-light-40 text-zinc-800': editing,
          'border-zinc-400 text-zinc-500': !editing,
        })}
        type="number"
        title="Retry Limit (count)"
        disabled={!editing}
        value={retryLimit}
        onChange={(e) => setRetryLimit(Number(e.target.value))}
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

export default RetryLimitField;
