import { toDateString } from '@root/helpers/to-date-string';
import cn from 'classnames';
import React from 'react';

interface Props {
  lastRunAt: Date;
  runIntervalHours: number;
  active: boolean;
}

const ChannelLastRunDate: React.FC<Props> = ({
  lastRunAt,
  runIntervalHours,
  active,
}) => {
  return (
    <div className="flex w-full flex-col items-center gap-y-2 text-xs">
      <div className="flex w-56 flex-col items-center justify-center gap-y-1">
        {lastRunAt ? (
          <>
            <span className="mr-2 font-bold text-zinc-700">Last Run At</span>
            <span className="">{toDateString(lastRunAt)}</span>
          </>
        ) : (
          <span className="pt-2 text-secondary-dark-40">NO RUNS</span>
        )}
      </div>
      {active && runIntervalHours > 0 && (
        <span
          className={cn('w-full text-center text-gmc-ocean', {
            'font-bold text-gmc-berry':
              getDueHours(lastRunAt, runIntervalHours) < 0,
            italic: getDueHours(lastRunAt, runIntervalHours) >= 0,
          })}
        >
          {getDueString(lastRunAt, runIntervalHours)}
        </span>
      )}
    </div>
  );
};

export default ChannelLastRunDate;

function getDueString(lastRunDate: Date, runIntervalHours: number): string {
  const hours = getDueHours(lastRunDate, runIntervalHours);
  if (hours > 0) {
    return `Due ${hours} hrs`;
  } else if (hours === 0) {
    return `Due < 1 hr`;
  } else {
    return 'Due';
  }
}

function getDueHours(lastRunDate: Date, runIntervalHours: number): number {
  const msInHour = 1000 * 60 * 60;
  const hoursDiff = Math.round(
    (new Date(lastRunDate).getTime() +
      runIntervalHours * msInHour -
      new Date().getTime()) /
      msInHour
  );
  return hoursDiff;
}
