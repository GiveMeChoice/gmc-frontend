import {
  useScreenData,
  useScreenDataDispatch,
} from '@root/context-providers/screen-data.provider';
import { useFilters } from '@root/context-providers/filters.provider';
import providersService from '@root/services/providers.service';
import React, { useEffect, useState } from 'react';
import ScreenSection from './shared/screen-section';
import ScreenSectionRow from './shared/screen-section-row';
import ProviderListRow from './providers-screen/provider-list-row';

const ProvidersScreen: React.FC = () => {
  const { providers, providersMeta } = useScreenData();
  const dispatch = useScreenDataDispatch();
  const { activeFilters } = useFilters();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!providers.length) {
      setLoading(true);
      providersService
        .find(activeFilters)
        .then((providers) => {
          dispatch({ type: 'SCREEN_REFRESH_PROVIDERS', value: providers });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  return (
    <ScreenSection title={'Provider List'} meta={providersMeta}>
      {providers.length ? (
        providers.map((p, i) => (
          <ProviderListRow key={i} provider={p} index={i} />
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

export default ProvidersScreen;
