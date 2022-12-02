import { useDataDispatch } from '@root/context-providers/data.provider';
import jobsService from '@root/services/jobs.service';
import React, { useState } from 'react';
import LoadingWheel from '../loading-wheel';
import cn from 'classnames';

interface Props {
  jobName: string;
}

const ExecuteJobButton: React.FC<Props> = ({ jobName }) => {
  const dataDispatch = useDataDispatch();
  const [executable, setExecutable] = useState<NodeJS.Timeout>();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!executable) {
      const timeout = setTimeout(() => {
        setExecutable(null);
      }, 2000);
      setExecutable(timeout);
    } else {
      setLoading(true);
      clearTimeout(executable);
      setExecutable(null);
      try {
        await jobsService.execute(jobName);
        dataDispatch({
          type: 'UPDATE_JOB',
          value: await jobsService.getOne(jobName),
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return loading ? (
    <div className="mt-2">
      <LoadingWheel size="w-8" />
    </div>
  ) : (
    <button
      className={cn(
        'mt-2 w-28 rounded-md border-2 bg-secondary px-2 py-1 text-sm ',
        {
          'border-zinc-500 hover:bg-primary-light-50 active:bg-primary':
            !executable,
          'border-gmc-heart bg-gmc-heart bg-opacity-50': executable,
        }
      )}
      onClick={handleClick}
    >
      {executable ? 'CONFIRM' : 'EXECUTE JOB'}
    </button>
  );
};

export default ExecuteJobButton;
