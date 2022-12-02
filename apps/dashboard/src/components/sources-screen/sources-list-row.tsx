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
    <ScreenSectionRow>
      <SourceIdCell
        width="w-3/12"
        providerId={source.providerId}
        sourceIdentifier={source.identifier}
        sourceDescription={source.description}
      />
      <ScreenSectionCell styles="flex w-6/12 flex-col items-center justify-center space-y-1.5 divide-y divide-zinc-300">
        <div className="flex w-full flex-col items-center space-x-4 pb-1.5 lg:flex-row">
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
          <div className="flex w-1/3 items-center">
            <span
              className={cn('rounded-lg border border-zinc-300 p-1 text-sm', {
                'text-secondary-dark-40': source.ownedCount === 0,
                'font-bold text-zinc-700': source.ownedCount > 0,
              })}
            >
              {source.ownedCount} <span className="font-normal">OWNED</span>
            </span>
          </div>
        </div>
        <div className="flex flex-wrap justify-evenly divide-x divide-zinc-300 pt-1.5 text-sm">
          <div className="flex w-2/12 items-center justify-center">
            <span
              className={cn('', {
                'text-secondary-dark-40': source.retryCount === 0,
                'font-bold text-gmc-heart': source.retryCount > 0,
              })}
            >
              {source.retryCount} RETRIES
            </span>
          </div>
          <div className="w-5/12">
            <IntervalHoursField
              hours={source.runIntervalHours}
              sourceId={source.id}
            />
          </div>
          <div className="w-5/12">
            <RetryLimitField limit={source.retryLimit} sourceId={source.id} />
          </div>
        </div>
      </ScreenSectionCell>
      <ScreenSectionCell styles="w-3/12 flex flex-col items-center justify-center space-y-2 divide-y divide-zinc-300">
        <div className="flex w-full justify-center">
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
