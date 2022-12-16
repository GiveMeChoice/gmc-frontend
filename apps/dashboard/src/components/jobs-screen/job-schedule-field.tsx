import React, { useEffect, useState } from 'react';
import FieldControlButtons from '../field-control-buttons';
import cn from 'classnames';
import sourcesService from '@root/services/sources.service';
import { useDataDispatch } from '@root/context-providers/data.provider';
import { useFilters } from '@root/context-providers/filters.provider';
import jobsService from '@root/services/jobs.service';

interface Props {
  jobName: string;
  schedule: string;
}

const JobScheduleField: React.FC<Props> = ({ jobName, schedule }) => {
  const dataDispatch = useDataDispatch();
  const { options } = useFilters();
  const [editing, setEditing] = useState(false);
  const [updatedSchedule, setUpdatedSchedule] = useState(schedule);

  useEffect(() => {
    setUpdatedSchedule(schedule);
  }, [jobName, schedule]);

  const onEdit = () => {
    setEditing(true);
  };
  const onCancel = () => {
    setEditing(false);
    setUpdatedSchedule(schedule);
  };
  const onSave = () => {
    setEditing(false);
    jobsService.reschedule(jobName, updatedSchedule).then((updated) => {
      dataDispatch({ type: 'UPDATE_JOB', value: updated });
    });
  };

  return (
    <div className="flex flex-col items-center space-x-1">
      <label
        htmlFor="schedule"
        className="mb-1 block text-xs font-medium text-gray-900"
      >
        JOB SCHEDULE
      </label>

      <div className="mb-1 flex items-center space-x-1">
        <select
          id="schedule"
          className={cn(
            'block w-full rounded-lg border border-gray-600 bg-gray-700 p-2 text-center text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500',
            {
              // 'text-gray-400': !filters.providerActivation,
            }
          )}
          disabled={!editing}
          value={updatedSchedule}
          onChange={(e) => setUpdatedSchedule(e.target.value)}
        >
          <option value="DEFAULT">-----</option>
          {options.jobScheduleSelect.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <FieldControlButtons
          active={editing}
          onEdit={onEdit}
          onCancel={onCancel}
          onSave={onSave}
        />
      </div>
      {/* <input
        className={cn('h-6 w-14 rounded-md border pl-1.5 text-lg', {
          'border-zinc-800 bg-primary-light-40 text-zinc-800': editing,
          'border-zinc-400 text-zinc-500': !editing,
        })}
        type="number"
        title="Run Interval (hours)"
        disabled={!editing}
        value={updatedSchedule}
        onChange={(e) => setUpdatedSchedule(e.target.value)}
        min={0}
        max={10000}
      />
      <FieldControlButtons
        active={editing}
        onEdit={onEdit}
        onCancel={onCancel}
        onSave={onSave}
        styles="w-1/3 justify-center"
      /> */}
    </div>
  );
};

export default JobScheduleField;
