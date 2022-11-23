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

const ProvidersScreen: React.FC = () => {
  const { providers } = useData();
  const dispatch = useDataDispatch();
  const { activeFilters: filters } = useFilters();
  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    providersService.search(filters).then((providers) => {
      dispatch({ type: 'REFRESH_PROVIDERS', value: providers });
    });
  };

  return (
    <ScreenSection title={'Providers List'}>
      {providers === null ? (
        <ScreenSectionRow>
          <h1>Loading...</h1>
        </ScreenSectionRow>
      ) : (
        providers.map((p, i) => <ProvidersListRow provider={p} index={i} />)
      )}
    </ScreenSection>
  );
};

export default ProvidersScreen;
