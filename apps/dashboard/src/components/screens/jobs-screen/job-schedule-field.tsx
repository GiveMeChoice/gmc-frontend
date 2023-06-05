import React, { useEffect, useState } from 'react';
import FieldControlButtons from '../../shared/field-control-buttons';
import cn from 'classnames';
import channelsService from '@root/services/channels.service';
import { useScreenDataDispatch } from '@root/context-providers/screen-data.provider';
import { useFilters } from '@root/context-providers/filters.provider';
import jobsService from '@root/services/jobs.service';
import { useMasterData } from '@root/context-providers/master-data.provider';

interface Props {
  jobName: string;
  schedule: string;
}

const JobScheduleField: React.FC<Props> = ({ jobName, schedule }) => {
  const dataDispatch = useScreenDataDispatch();
  const { jobSchedules } = useMasterData();
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
      dataDispatch({ type: 'SCREEN_UPDATE_JOB', value: updated });
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
          {jobSchedules.map((s) => (
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
    </div>
  );
};

export default JobScheduleField;
