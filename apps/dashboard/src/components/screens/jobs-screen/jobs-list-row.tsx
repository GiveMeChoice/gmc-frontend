import { useScreenDataDispatch } from '@root/context-providers/screen-data.provider';
import { toDateString } from '@root/helpers/to-date-string';
import jobsService, { IJobStatus } from '@root/services/jobs.service';
import React, { useState } from 'react';
import ActivationSwitch from '../../shared/activation-switch';
import LoadingWheel from '../../shared/loading-wheel';
import ScreenSectionCell from '../shared/screen-section-cell';
import ScreenSectionRow from '../shared/screen-section-row';
import ExecuteJobButton from './execute-job-button';
import JobScheduleField from './job-schedule-field';
import LastJobsCell from './last-jobs-cell';

interface Props {
  job: IJobStatus;
}

const JobsListRow: React.FC<Props> = ({ job }) => {
  return (
    <ScreenSectionRow>
      <ScreenSectionCell styles="w-2/12 flex items-center justify-center font-bold">
        {job.name}
      </ScreenSectionCell>
      <ScreenSectionCell styles="w-3/12 flex flex-col items-center justify-center space-y-0.5">
        <JobScheduleField jobName={job.name} schedule={job.schedule} />
        <span className="text-sm  text-gmc-ocean">
          {toDateString(job.next[0])}
        </span>
        <span className="text-sm  text-gmc-ocean">
          {toDateString(job.next[1])}
        </span>
        <span className="text-sm  text-gmc-ocean">
          {toDateString(job.next[2])}
        </span>
      </ScreenSectionCell>
      <ScreenSectionCell styles="w-2/12">
        <ActivationSwitch active={job.running} id={job.name} />
      </ScreenSectionCell>
      {job.last.length ? (
        <LastJobsCell name={job.name} last={job.last} />
      ) : (
        <ScreenSectionCell styles="w-3/12 flex items-center justify-center text-lg">
          <span className="text-gmc-glacier">No Runs</span>
        </ScreenSectionCell>
      )}
      <ScreenSectionCell styles="w-2/12 flex items-center">
        <ExecuteJobButton jobName={job.name} />
      </ScreenSectionCell>
    </ScreenSectionRow>
  );
};

export default JobsListRow;
