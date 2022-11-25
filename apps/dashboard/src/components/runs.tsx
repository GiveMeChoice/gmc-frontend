import {
  useData,
  useDataDispatch,
} from '@root/context-providers/data.provider';
import { useFilters } from '@root/context-providers/filters.provider';
import runsService from '@root/services/runs.service';
import React, { useEffect } from 'react';
import ScreenSection from './screen/screen-section';
import ScreenSectionRow from './screen/screen-section-row';

const Runs: React.FC = () => {
  const { runs, runsMeta } = useData();
  const dispatch = useDataDispatch();
  const { activeFilters } = useFilters();

  useEffect(() => {
    if (!runs.length) {
      runsService.search(activeFilters).then((runs) => {
        dispatch({ type: 'REFRESH_RUNS', value: runs });
      });
    }
  }, []);

  return (
    <ScreenSection
      title={'Product Runs'}
      // sortFields={[
      //   'foundCount',
      //   'createdCount',
      //   'adoptedCount',
      //   'failureCount',
      //   'errorMessage',
      // ]}
      meta={runsMeta}
    >
      {runs.length ? (
        runs.map((r) => <ScreenSectionRow>{r.id}</ScreenSectionRow>)
      ) : (
        <ScreenSectionRow>
          <h1>Loading...</h1>
        </ScreenSectionRow>
      )}
    </ScreenSection>
  );
};

export default Runs;
