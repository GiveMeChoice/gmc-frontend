import {
  useData,
  useDataDispatch,
} from '@root/context-providers/data.provider';
import {
  ProviderSelectType,
  useFilters,
} from '@root/context-providers/filters.provider';
import sourcesService from '@root/services/sources.service';
import React, { useEffect } from 'react';
import ScreenSection from '../screen/screen-section';
import ScreenSectionRow from '../screen/screen-section-row';
import SourcesListRow from './sources-list-row';

const Sources: React.FC = () => {
  const { sources, sourcesMeta } = useData();
  const dispatch = useDataDispatch();
  const { activeFilters: filters, options } = useFilters();
  useEffect(() => {
    if (!sources.length) {
      refreshData();
    }
  }, []);

  const refreshData = () => {
    sourcesService.search(filters).then((sources) => {
      dispatch({ type: 'REFRESH_SOURCES', value: sources });
    });
  };

  const getProviderKey = (providerId: string) => {
    let match: ProviderSelectType = null;
    if (options.providerSelect.length) {
      match = options.providerSelect.find((s) => s.id === providerId);
    }
    return match ? match.key : 'unknown';
  };

  return (
    <ScreenSection
      title={'Product Sources'}
      sortFields={['identifier', 'status', 'lastRunAt', 'active']}
      meta={sourcesMeta}
    >
      {sources.length ? (
        sources.map((s, i) => (
          <SourcesListRow
            key={i}
            source={s}
            providerKey={getProviderKey(s.providerId)}
            index={i}
          />
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
