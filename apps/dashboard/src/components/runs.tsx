import {
  useData,
  useDataDispatch,
} from '@root/context-providers/data.provider';
import { useFilters } from '@root/context-providers/filters.provider';
import { toDateString } from '@root/helpers/to-date-string';
import runsService from '@root/services/runs.service';
import React, { useEffect, useState } from 'react';
import ScreenSection from './screen/screen-section';
import ScreenSectionCell from './screen/screen-section-cell';
import ScreenSectionRow from './screen/screen-section-row';
import SourceIdCell from './source-id-cell';
import cn from 'classnames';

const Runs: React.FC = () => {
  const { runs, runsMeta } = useData();
  const dataDispatch = useDataDispatch();
  const { activeFilters } = useFilters();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!runs.length) {
      setLoading(true);
      runsService
        .search(activeFilters, runsMeta)
        .then((runs) => {
          dataDispatch({ type: 'REFRESH_RUNS', value: runs });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  return (
    <ScreenSection
      title={'Product Runs'}
      sortFields={[
        {
          name: 'runAt',
          title: 'Run At',
        },
        {
          name: 'sourceId',
          title: 'Source',
        },
        {
          name: 'runTime',
          title: 'Duration',
        },
        {
          name: 'foundCount',
          title: 'Found',
        },
        {
          name: 'createdCount',
          title: 'Created',
        },
      ]}
      meta={runsMeta}
    >
      {runs.length ? (
        runs.map((r, i) => (
          <ScreenSectionRow key={i}>
            <SourceIdCell
              width="w-3/12"
              providerId={r.source.providerId}
              sourceIdentifier={r.source.identifier}
              sourceDescription={r.source.description}
              showLink
            />

            <ScreenSectionCell styles="w-2/12 flex flex-col items-center justify-between py-5">
              <div className="flex w-full flex-col items-center justify-center space-y-2">
                <span className="text-xs font-bold">Run At:</span>
                <span className="">{toDateString(r.runAt)}</span>
                <span className="text-xs">Duration: {r.runTime} (s)</span>
              </div>
              <div className="flex w-full flex-col items-center justify-center space-y-1">
                <span className="text-xs font-bold">Source Date:</span>
                <span className="text-sm">{toDateString(r.sourceDate)}</span>
              </div>
            </ScreenSectionCell>
            {/* RUN INFO CELL */}
            <ScreenSectionCell styles="w-7/12 flex flex-col divide-y divide-zinc-300 text-sm space-y-1">
              <div className="flex flex-col space-x-3 px-2 text-base">
                {r.errorMessage && (
                  <span className="pb-1 text-center text-sm font-bold text-gmc-heart">
                    {r.errorMessage}
                  </span>
                )}
                <div>
                  Found:{' '}
                  <span className={cn({ 'font-bold': r.foundCount > 0 })}>
                    {r.foundCount}
                  </span>
                </div>
              </div>
              {/* detail counts */}
              <div className="flex h-full justify-evenly py-1.5">
                <div className="flex h-full flex-col justify-evenly">
                  <span className="pb-1">
                    Owned:{' '}
                    <span
                      className={cn('text-base', {
                        'font-bold': r.ownedCount > 0,
                      })}
                    >
                      {r.ownedCount}
                    </span>
                  </span>
                  <ul className="ml-7 list-disc">
                    <li>
                      Stale:{' '}
                      <span
                        className={cn('text-base', {
                          'font-bold': r.staleCount > 0,
                        })}
                      >
                        {r.staleCount}
                      </span>
                    </li>
                    <li>
                      Pending:{' '}
                      <span
                        className={cn('text-base', {
                          'font-bold': r.pendingCount > 0,
                        })}
                      >
                        {r.pendingCount}
                      </span>
                    </li>
                    <li>
                      Keep Alives:{' '}
                      <span
                        className={cn('text-base', {
                          'font-bold': r.keepAliveSignalCount > 0,
                        })}
                      >
                        {r.keepAliveSignalCount}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="flex h-full flex-col justify-evenly">
                  <span className="pb-1">
                    Unknown:{' '}
                    <span
                      className={cn('text-base', {
                        'font-bold': r.foundCount - r.ownedCount > 0,
                      })}
                    >
                      {r.foundCount - r.ownedCount}
                    </span>
                  </span>
                  <ul className="ml-7 list-disc">
                    <li>
                      Created:{' '}
                      <span
                        className={cn('text-base', {
                          'font-bold': r.createdCount > 0,
                        })}
                      >
                        {r.createdCount}
                      </span>
                    </li>
                    <li>
                      Foreign:{' '}
                      <span
                        className={cn('text-base', {
                          'font-bold': r.foreignCount > 0,
                        })}
                      >
                        {r.foreignCount}
                      </span>
                    </li>
                    <li>
                      Adopted:{' '}
                      <span
                        className={cn('text-base', {
                          'font-bold': r.adoptedCount > 0,
                        })}
                      >
                        {r.adoptedCount}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex h-full flex-col items-center justify-evenly pt-1.5">
                <span className="text-base">
                  Refresh Signals:{' '}
                  <span
                    className={cn({
                      'font-bold': r.refreshSignalCount > 0,
                    })}
                  >
                    {r.refreshSignalCount}
                  </span>
                </span>
                {r.failureCount > 0 && (
                  <span className="text-base">
                    FAILURES:{' '}
                    <span className="text-base font-bold text-gmc-heart">
                      {r.failureCount}
                    </span>
                  </span>
                )}
              </div>
            </ScreenSectionCell>
          </ScreenSectionRow>
        ))
      ) : (
        <ScreenSectionRow>
          <span className="m-3">
            {loading ? 'Loading...' : 'No Runs Found'}
          </span>
        </ScreenSectionRow>
      )}
    </ScreenSection>
  );
};

export default Runs;
