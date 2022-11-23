import {
  useData,
  useDataDispatch,
} from '@root/context-providers/data.provider';
import { useFilters } from '@root/context-providers/filters.provider';
import sourcesService from '@root/services/sources.service';
import React, { useEffect } from 'react';
import ScreenSection from './screen/screen-section';
import ScreenSectionRow from './screen/screen-section-row';

const Sources: React.FC = () => {
  const { sources } = useData();
  const dispatch = useDataDispatch();
  const { activeFilters: filters, options } = useFilters();
  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    sourcesService.search(filters).then((sources) => {
      dispatch({ type: 'REFRESH_SOURCES', value: sources });
    });
  };

  return (
    <ScreenSection title={'Product Sources'}>
      {sources.length ? (
        sources.map((s) => (
          <ScreenSectionRow>
            <h1>{s.id} | </h1>
            <h1>{s.identifier} | </h1>
            <h1>{s.description} | </h1>
          </ScreenSectionRow>
        ))
      ) : (
        <ScreenSectionRow>
          <h1>Loading...</h1>
        </ScreenSectionRow>
      )}
    </ScreenSection>
  );
};

export default Sources;
