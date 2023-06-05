import {
  useScreenData,
  useScreenDataDispatch,
} from '@root/context-providers/screen-data.provider';
import { useFilters } from '@root/context-providers/filters.provider';
import { toDateString } from '@root/helpers/to-date-string';
import runsService from '@root/services/runs.service';
import React, { useEffect, useState } from 'react';
import ScreenSectionCell from './shared/screen-section-cell';
import ScreenSectionRow from './shared/screen-section-row';
import SourceIdCell from '../shared/source-id-cell';
import cn from 'classnames';
import ScreenSection from './shared/screen-section';

const RunsScreen: React.FC = () => {
  const { runs, runsMeta } = useScreenData();
  const dataDispatch = useScreenDataDispatch();
  const { activeFilters } = useFilters();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!runs.length) {
      setLoading(true);
      runsService
        .find(activeFilters, runsMeta)
        .then((runs) => {
          dataDispatch({ type: 'SCREEN_REFRESH_RUNS', value: runs });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  return (
    <ScreenSection
      title={'Run List'}
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
          name: 'foundCount',
          title: 'Found',
        },
        {
          name: 'refreshSignalCount',
          title: 'Refresh Sig',
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
              width="w-44"
              providerId={r.source.providerId}
              sourceIdentifier={r.source.identifier}
              sourceDescription={r.source.description}
              showLink
            />

            {/* RUN INFO CELL */}
            <ScreenSectionCell styles="flex flex-col divide-y divide-zinc-300 text-sm space-y-1 w-full">
              <div className="flex flex-col justify-center">
                <div className="flex w-full flex-row flex-wrap justify-evenly pb-1.5 [&>div]:pt-2">
                  <div className="flex w-64 items-center justify-center">
                    <span className="mr-2 text-sm font-bold text-zinc-700">
                      Run At:
                    </span>
                    <span className="text-base">
                      {toDateString(r.runAt)}
                      <span className="ml-1 text-center text-xs">
                        ({r.runTime} s)
                      </span>
                    </span>
                  </div>
                </div>
                {r.errorMessage && (
                  <span className="pb-1 text-center text-sm font-bold text-gmc-heart">
                    {r.errorMessage}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center justify-evenly pt-1.5">
                <div>
                  Found: <span className="font-bold">{r.foundCount}</span>
                </div>
                <div>
                  Refresh Sig:{' '}
                  <span
                    className={cn({
                      'font-bold': r.refreshSignalCount > 0,
                    })}
                  >
                    {r.refreshSignalCount}
                  </span>
                </div>
                {r.failureCount > 0 && (
                  <span className="text-base">
                    FAILURES:{' '}
                    <span className="text-base font-bold text-gmc-heart">
                      {r.failureCount}
                    </span>
                  </span>
                )}
              </div>

              {/* 
              
                DETAIL COUNTS

              */}
              <div className="flex flex-wrap justify-center text-sm">
                <div className="mx-4 my-1 flex flex-col justify-evenly">
                  <span className="pb-1">
                    Owned: <span>{r.ownedCount}</span>
                  </span>
                  <ul className="ml-7 list-disc text-xs">
                    <li>
                      Stale: <span>{r.staleCount}</span>
                    </li>
                    <li>
                      Pending: <span>{r.pendingCount}</span>
                    </li>
                    <li>
                      Keep Alives: <span>{r.keepAliveSignalCount}</span>
                    </li>
                  </ul>
                </div>

                <div className="mx-4 my-1 flex flex-col justify-evenly">
                  <span className="pb-1">
                    Unknown: <span>{r.foundCount - r.ownedCount}</span>
                  </span>
                  <ul className="ml-7 list-disc text-xs">
                    <li>
                      Created: <span>{r.createdCount}</span>
                    </li>
                    <li>
                      Foreign: <span>{r.foreignCount}</span>
                    </li>
                    <li>
                      Adopted: <span>{r.adoptedCount}</span>
                    </li>
                  </ul>
                </div>
                <div className="flex w-full flex-row flex-wrap justify-evenly pb-1.5 [&>div]:pt-2">
                  <div className="flex w-56 items-center justify-center">
                    <span className="mr-2 text-sm text-zinc-700">
                      Source Date:
                    </span>
                    <span className="">{toDateString(r.sourceDate)}</span>
                  </div>
                </div>
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

export default RunsScreen;
