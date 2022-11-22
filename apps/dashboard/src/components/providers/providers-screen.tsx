/* eslint-disable @next/next/no-img-element */
import providersService, { IProvider } from '@root/services/providers.service';
import React, { useEffect, useState } from 'react';
import CopyIdButton from '../copy-id-button';
import ScreenSection from '../screen/screen-section';
import ScreenSectionRow from '../screen/screen-section-row';
import ProviderActiveCell from './provider-active-cell';
import ProvidersListRow from './providers-list-row';

const ProvidersScreen: React.FC = () => {
  const [providers, setProviders] = useState<IProvider[]>(null);
  useEffect(() => {
    providersService.getProviders().then((providers) => {
      setProviders(providers);
    });
  }, []);
  return (
    <>
      <ScreenSection title={'Providers List'}>
        {providers === null ? (
          <ScreenSectionRow>
            <h1>Loading...</h1>
          </ScreenSectionRow>
        ) : (
          providers.map((p, i) => <ProvidersListRow provider={p} index={i} />)
        )}
      </ScreenSection>
    </>
  );
};

export default ProvidersScreen;
