import { useDataDispatch } from '@root/context-providers/data.provider';
import { toDateString } from '@root/helpers/to-date-string';
import jobsService, { IJobStatus } from '@root/services/jobs.service';
import React, { useState } from 'react';
import ActivationSwitch from '../activation-switch';
import LoadingWheel from '../loading-wheel';
import ScreenSectionCell from '../screen/screen-section-cell';
import ScreenSectionRow from '../screen/screen-section-row';
import LastJobsCell from './last-jobs-cell';

interface Props {
  job: IJobStatus;
}

const JobsListRow: React.FC<Props> = ({ job }) => {
  const dispatch = useDataDispatch();
  const [loading, setLoading] = useState(false);

  const handleExecute = async () => {
    setLoading(true);
    try {
      await jobsService.execute(job.name);
      dispatch({
        type: 'UPDATE_JOB',
        value: await jobsService.getOne(job.name),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenSectionRow>
      <ScreenSectionCell styles="w-3/12 flex items-center justify-center font-bold">
        {job.name}
      </ScreenSectionCell>
      <ScreenSectionCell styles="w-2/12 flex flex-col items-center justify-center space-y-1">
        <span className="pb-1 text-gmc-ocean">{job.schedule}</span>
        <span className="text-xs font-bold text-gmc-soil">
          {toDateString(job.next[0])}
        </span>
        <span className="text-xs font-bold text-gmc-soil">
          {toDateString(job.next[1])}
        </span>
        <span className="text-xs font-bold text-gmc-soil">
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
      {loading ? (
        <div className="flex w-1/12 items-center pl-5">
          <LoadingWheel size="w-11 h-11" />
        </div>
      ) : (
        <ScreenSectionCell styles="w-1/12 flex items-center">
          <button
            className="rounded-md border-2 border-black bg-zinc-200 p-1.5 px-3 text-sm  hover:bg-opacity-50 active:bg-gmc-beach active:bg-opacity-40"
            onClick={handleExecute}
          >
            EXECUTE
          </button>
        </ScreenSectionCell>
      )}
    </ScreenSectionRow>
  );
};

export default JobsListRow;
