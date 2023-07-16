import { useFilters } from '@root/context-providers/filters.provider';
import {
  useScreenData,
  useScreenDataDispatch,
} from '@root/context-providers/screen-data.provider';
import runsService from '@root/services/runs.service';
import React, { useEffect, useState } from 'react';
import RunListRow from './runs-screen/run-list-row';
import ScreenSection from './shared/screen-section';
import ScreenSectionRow from './shared/screen-section-row';

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
        runs.map((run, i) => <RunListRow key={i} run={run} />)
      ) : (
        <ScreenSectionRow>
          <span className="m-3 ml-6 text-sm italic">
            {loading ? 'Loading...' : 'No Runs Found'}
          </span>
        </ScreenSectionRow>
      )}
    </ScreenSection>
  );
};

export default RunsScreen;
