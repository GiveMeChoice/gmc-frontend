import {
  useData,
  useDataDispatch,
} from '@root/context-providers/data.provider';
import { useFilters } from '@root/context-providers/filters.provider';
import providersService from '@root/services/providers.service';
import React, { useEffect } from 'react';
import ScreenSection from '../screen/screen-section';
import ScreenSectionRow from '../screen/screen-section-row';
import ProvidersListRow from './providers-list-row';

const Providers: React.FC = () => {
  const { providers, providersMeta } = useData();
  const dispatch = useDataDispatch();
  const { activeFilters: filters } = useFilters();
  useEffect(() => {
    if (!providers.length) {
      refreshData();
    }
  }, []);

  const refreshData = () => {
    providersService.search(filters).then((providers) => {
      dispatch({ type: 'REFRESH_PROVIDERS', value: providers });
    });
  };

  return (
    <ScreenSection title={'Providers List'} meta={providersMeta}>
      {providers.length ? (
        providers.map((p, i) => (
          <ProvidersListRow key={i} provider={p} index={i} />
        ))
      ) : (
        <ScreenSectionRow>
          <h1>Loading...</h1>
        </ScreenSectionRow>
      )}
    </ScreenSection>
  );
};

export default Providers;
