import { toDateString } from '@root/helpers/to-date-string';
import { ISource } from '@root/services/sources.service';
import cn from 'classnames';
import React from 'react';
import ActivationSwitch from '../activation-switch';
import CopyIdButton from '../copy-id-button';
import ScreenSectionCell from '../screen/screen-section-cell';
import ScreenSectionRow from '../screen/screen-section-row';
import IntervalHoursField from './interval-hours-field';
import RetryLimitField from './retry-limit-field';
import ViewSourceRunsCell from './view-source-runs-cell';

interface Props {
  providerKey: string;
  source: ISource;
  index: number;
}

const SourcesListRow: React.FC<Props> = ({ providerKey, source, index }) => {
  source.status = 'READY';
  return (
    <ScreenSectionRow>
      <ScreenSectionCell styles="w-2/12 flex flex-col justify-evenly pr-2">
        <div>
          <h2 className="mb-1 font-bold">{providerKey}</h2>
          <span className="text-sm">{source.description}</span>
        </div>
      </ScreenSectionCell>
      <ScreenSectionCell styles="flex w-8/12 flex-col space-y-1.5 divide-y divide-secondary-dark-20">
        <div className="flex items-center">
          <span className="ml-1.5 mr-1 text-sm font-bold text-zinc-700">
            {source.identifier}
          </span>
          <CopyIdButton index={index} id={source.identifier} />
        </div>
        <div className="flex w-full items-center space-x-4 pt-1.5">
          <div className="flex w-1/3 items-start">
            <ActivationSwitch active={source.active} id={source.id} />
          </div>
          <div className="flex w-1/3 items-center justify-center">
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
          <div className="flex w-1/3 items-center">
            {source.lastRunAt ? (
              <>
                <span className="mr-2 text-sm font-bold text-zinc-700">
                  Last Run:
                </span>
                <span className="text-sm">
                  {toDateString(source.lastRunAt)}
                </span>
              </>
            ) : (
              <span className="text-secondary-dark-40">NO RUNS</span>
            )}
          </div>
        </div>
        <div className="flex justify-between divide-x divide-secondary-dark-20 pt-1.5 text-sm [&>div]:w-1/3 [&>div]:pl-3">
          <div className="flex items-center justify-center">
            <span
              className={cn('', {
                'text-secondary-dark-40': source.retryCount === 0,
                'font-bold text-gmc-heart': source.retryCount > 0,
              })}
            >
              {source.retryCount} RETRIES
            </span>
          </div>
          <IntervalHoursField
            hours={source.runIntervalHours}
            sourceId={source.id}
          />
          <RetryLimitField limit={source.retryLimit} sourceId={source.id} />
        </div>
      </ScreenSectionCell>
      <ViewSourceRunsCell sourceId={source.id} identifier={source.identifier} />
    </ScreenSectionRow>
  );
};

export default SourcesListRow;
