import {
  useData,
  useDataDispatch,
} from '@root/context-providers/data.provider';
import {
  ProviderSelectType,
  useFilters,
} from '@root/context-providers/filters.provider';
import sourcesService from '@root/services/sources.service';
import React, { useEffect, useState } from 'react';
import ScreenSection from '../screen/screen-section';
import ScreenSectionRow from '../screen/screen-section-row';
import SourcesListRow from './sources-list-row';

const Sources: React.FC = () => {
  const { sources, sourcesMeta } = useData();
  const dispatch = useDataDispatch();
  const { activeFilters, options } = useFilters();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!sources.length) {
      setLoading(true);
      sourcesService
        .search(activeFilters, sourcesMeta)
        .then((sources) => {
          dispatch({ type: 'REFRESH_SOURCES', value: sources });
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
      title={'Product Sources'}
      sortFields={[
        {
          name: 'identifier',
          title: 'Identifier',
        },
        {
          name: 'status',
          title: 'Status',
        },
        {
          name: 'retryCount',
          title: 'Retries',
        },
        {
          name: 'lastRunAt',
          title: 'Last Run Date',
        },
        {
          name: 'ownedCount',
          title: 'Owned',
        },
      ]}
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
          <span className="m-3">
            {loading ? 'Loading...' : 'No Sources Found'}
          </span>
        </ScreenSectionRow>
      )}
    </ScreenSection>
  );
};

export default Sources;
