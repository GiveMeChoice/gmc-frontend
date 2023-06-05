import {
  useScreenData,
  useScreenDataDispatch,
} from '@root/context-providers/screen-data.provider';
import { useFilters } from '@root/context-providers/filters.provider';
import merchantsService from '@root/services/merchants.service';
import React, { useEffect, useState } from 'react';
import MerchantListRow from './merchants-screen/merchant-list-row';
import ScreenSection from './shared/screen-section';
import ScreenSectionRow from './shared/screen-section-row';

const MerchantsScreen: React.FC = () => {
  const { merchants, merchantsMeta } = useScreenData();
  const dispatch = useScreenDataDispatch();
  const { activeFilters } = useFilters();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!merchants.length) {
      setLoading(true);
      merchantsService
        .find(activeFilters)
        .then((merchants) => {
          dispatch({ type: 'SCREEN_REFRESH_MERCHANTS', value: merchants });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  return (
    <ScreenSection title={'Merchant List'} meta={merchantsMeta}>
      {merchants.length ? (
        merchants.map((m, i) => (
          <MerchantListRow key={i} merchant={m} index={i} />
        ))
      ) : (
        <ScreenSectionRow>
          <span className="m-3">
            {loading ? 'Loading...' : 'No Merchants Found'}
          </span>
        </ScreenSectionRow>
      )}
    </ScreenSection>
  );
};

export default MerchantsScreen;
