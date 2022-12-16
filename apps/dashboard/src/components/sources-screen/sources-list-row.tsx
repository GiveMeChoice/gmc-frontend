import { toDateString } from '@root/helpers/to-date-string';
import { ISource } from '@root/services/sources.service';
import cn from 'classnames';
import React from 'react';
import ActivationSwitch from '../activation-switch';
import ScreenSectionCell from '../screen/screen-section-cell';
import ScreenSectionRow from '../screen/screen-section-row';
import SourceIdCell from '../source-id-cell';
import ExecuteRunButton from './execute-run-button';
import IntervalHoursField from './interval-hours-field';
import RetryLimitField from './retry-limit-field';
import ViewProductsLink from './view-products-link';
import ViewRunsLink from './view-runs-link';

interface Props {
  providerKey: string;
  source: ISource;
  index: number;
}

const SourcesListRow: React.FC<Props> = ({ providerKey, source, index }) => {
  return (
    <ScreenSectionRow key={index}>
      <SourceIdCell
        width="w-40"
        providerId={source.providerId}
        sourceIdentifier={source.identifier}
        sourceDescription={source.description}
      />
      <ScreenSectionCell styles="flex flex-col flex-grow items-center justify-center space-y-1.5 divide-y divide-zinc-300">
        <div className="flex w-full flex-row flex-wrap-reverse justify-evenly pb-1.5 [&>div]:pt-2">
          <div className="flex w-32 items-start justify-center">
            <ActivationSwitch active={source.active} id={source.id} />
          </div>
          <div className="flex w-20 items-center justify-center">
            <span
              className={cn(
                'rounded-full border border-secondary-dark-50 bg-opacity-40 px-2.5 py-1 text-xs font-bold',
                {
                  'bg-gmc-forest': source.status === 'READY',
                  'bg-gmc-beach': source.status === 'BUSY',
                  'bg-gmc-heart': source.status === 'DOWN',
                }
              )}
            >
              {source.status}
            </span>
          </div>
          <div className="flex w-24 items-center justify-center">
            <span
              className={cn(
                'w-fit rounded-lg border border-zinc-300 p-1 px-1.5 text-sm',
                {
                  'text-secondary-dark-40': source.ownedCount === 0,
                  'font-bold text-zinc-700': source.ownedCount > 0,
                }
              )}
            >
              {source.ownedCount} <span className="font-normal">OWNED</span>
            </span>
          </div>
        </div>
        <div className="flex w-full flex-wrap justify-evenly divide-zinc-300 text-sm [&>div]:pt-1.5">
          <div className="flex w-28 items-center justify-center">
            <span
              className={cn('', {
                'text-secondary-dark-40': source.retryCount === 0,
                'font-bold text-gmc-heart': source.retryCount > 0,
              })}
            >
              {source.retryCount} RETRIES
            </span>
          </div>
          <div className="flex flex-wrap justify-center">
            <IntervalHoursField
              hours={source.runIntervalHours}
              sourceId={source.id}
            />
            <RetryLimitField limit={source.retryLimit} sourceId={source.id} />
          </div>
        </div>
        <div className="flex w-full flex-row flex-wrap items-center justify-evenly pb-1.5">
          <div className="flex w-56 items-center justify-center pt-2">
            {source.lastRunAt ? (
              <>
                <span className="mr-2 text-sm font-bold text-zinc-700">
                  Last Run:
                </span>
                <span className="">{toDateString(source.lastRunAt)}</span>
              </>
            ) : (
              <span className="text-secondary-dark-40">NO RUNS</span>
            )}
          </div>
          {source.runIntervalHours > 0 && (
            <span
              className={cn('w-20 pt-2 text-left text-sm text-gmc-ocean', {
                'font-bold text-gmc-berry':
                  getDueHours(source.lastRunAt, source.runIntervalHours) <= 0,
              })}
            >
              {getDueString(source.lastRunAt, source.runIntervalHours)}
            </span>
          )}
        </div>
      </ScreenSectionCell>
      <ScreenSectionCell styles="flex w-44 flex-col items-center justify-center space-y-2 divide-y divide-zinc-300">
        <div className="flex justify-center">
          <ViewRunsLink
            providerId={source.providerId}
            sourceIdentifier={source.identifier}
          />
        </div>
        <div className="flex w-full justify-center">
          <ViewProductsLink
            providerId={source.providerId}
            sourceIdentifier={source.identifier}
          />
        </div>
        <div className="flex w-full items-center justify-center">
          <ExecuteRunButton sourceId={source.id} />
        </div>
      </ScreenSectionCell>
    </ScreenSectionRow>
  );
};

export default SourcesListRow;

function getDueString(lastRunDate: Date, runIntervalHours: number): string {
  const hours = getDueHours(lastRunDate, runIntervalHours);
  if (hours > 0) {
    return `Due ${hours} hrs`;
  } else if (hours === 0) {
    return `< 1 HR`;
  } else {
    return 'Due Now';
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
