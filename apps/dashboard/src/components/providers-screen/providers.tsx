import {
  useData,
  useDataDispatch,
} from '@root/context-providers/data.provider';
import { useFilters } from '@root/context-providers/filters.provider';
import providersService from '@root/services/providers.service';
import React, { useEffect, useState } from 'react';
import ScreenSection from '../screen/screen-section';
import ScreenSectionRow from '../screen/screen-section-row';
import ProvidersListRow from './providers-list-row';

const Providers: React.FC = () => {
  const { providers, providersMeta } = useData();
  const dispatch = useDataDispatch();
  const { activeFilters } = useFilters();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!providers.length) {
      setLoading(true);
      providersService
        .find(activeFilters)
        .then((providers) => {
          dispatch({ type: 'REFRESH_PROVIDERS', value: providers });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  return (
    <ScreenSection title={'Providers List'} meta={providersMeta}>
      {providers.length ? (
        providers.map((p, i) => (
          <ProvidersListRow key={i} provider={p} index={i} />
        ))
      ) : (
        <ScreenSectionRow>
          <span className="m-3">
            {loading ? 'Loading...' : 'No Providers Found'}
          </span>
        </ScreenSectionRow>
      )}
    </ScreenSection>
  );
};

export default Providers;
