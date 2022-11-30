import {
  useData,
  useDataDispatch,
} from '@root/context-providers/data.provider';
import {
  ProviderSelectType,
  useFilters,
} from '@root/context-providers/filters.provider';
import { toDateString } from '@root/helpers/to-date-string';
import runsService from '@root/services/runs.service';
import React, { useEffect, useState } from 'react';
import CopyIdButton from './copy-id-button';
import ScreenSection from './screen/screen-section';
import ScreenSectionCell from './screen/screen-section-cell';
import ScreenSectionRow from './screen/screen-section-row';

const Runs: React.FC = () => {
  const { runs, runsMeta } = useData();
  const dispatch = useDataDispatch();
  const { activeFilters, options } = useFilters();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!runs.length) {
      setLoading(true);
      runsService
        .search(activeFilters, runsMeta)
        .then((runs) => {
          dispatch({ type: 'REFRESH_RUNS', value: runs });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  const getProviderKey = (providerId: string) => {
    let match: ProviderSelectType = null;
    if (options.providerSelect.length) {
      match = options.providerSelect.find((s) => s.id === providerId);
    }
    return match ? match.key : 'unknown';
  };

  return (
    <ScreenSection
      title={'Product Runs'}
      sortFields={[
        {
          name: 'startedAt',
          title: 'Started At',
        },
        {
          name: 'foundCount',
          title: 'Found',
        },
        {
          name: 'ownedCount',
          title: 'Owned',
        },
        {
          name: 'createdCount',
          title: 'Created',
        },
        {
          name: 'adoptedCount',
          title: 'Adopted',
        },
        {
          name: 'failureCount',
          title: 'Failures',
        },
        {
          name: 'errorMessage',
          title: 'Error Msg',
        },
      ]}
      meta={runsMeta}
    >
      {runs.length ? (
        runs.map((r, i) => (
          <ScreenSectionRow>
            <ScreenSectionCell styles="w-3/12 flex flex-col justify-center space-y-1  pr-2">
              <h2 className="mb-1 text-sm">
                {getProviderKey(r.source.providerId)}
              </h2>
              <div className="flex items-center">
                <span className="text-sm font-bold">{r.source.identifier}</span>
                <CopyIdButton id={r.source.identifier} index={i} />
              </div>
              <span className="text-sm">{r.source.description}</span>
            </ScreenSectionCell>

            <ScreenSectionCell>
              Started: {toDateString(r.startedAt)}
            </ScreenSectionCell>
            <ScreenSectionCell>
              Completed: {toDateString(r.completedAt)}
            </ScreenSectionCell>
            <ScreenSectionCell>Found: {r.foundCount}</ScreenSectionCell>
            <ScreenSectionCell>Owned: {r.ownedCount}</ScreenSectionCell>
            <ScreenSectionCell>Adopted: {r.adoptedCount}</ScreenSectionCell>
            <ScreenSectionCell>Stale: {r.staleCount}</ScreenSectionCell>
            <ScreenSectionCell>KAS: {r.keepAliveSignalCount}</ScreenSectionCell>
            <ScreenSectionCell>
              Refresh: {r.refreshSignalCount}
            </ScreenSectionCell>
            <ScreenSectionCell>Failure: {r.failureCount}</ScreenSectionCell>
            <ScreenSectionCell>Error: {r.errorMessage}</ScreenSectionCell>
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
