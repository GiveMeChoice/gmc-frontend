import {
  useScreenData,
  useScreenDataDispatch,
} from '@root/context-providers/screen-data.provider';
import {
  ProviderSelectType,
  useFilters,
} from '@root/context-providers/filters.provider';
import merchantBrandsService from '@root/services/merchant-brands.service';
import React, { useEffect, useState } from 'react';
import ScreenSection from './shared/screen-section';
import ScreenSectionCell from './shared/screen-section-cell';
import ScreenSectionRow from './shared/screen-section-row';
import { useMasterData } from '@root/context-providers/master-data.provider';

const MerchantBrandsScreen: React.FC = () => {
  const { merchantBrands: brands, merchantBrandsMeta: brandsMeta } =
    useScreenData();
  const dataDispatch = useScreenDataDispatch();
  const { activeFilters } = useFilters();
  const { readMerchantKey } = useMasterData();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!brands.length) {
      setLoading(true);
      merchantBrandsService
        .find(activeFilters, brandsMeta)
        .then((labels) => {
          dataDispatch({
            type: 'SCREEN_REFRESH_MERCHANT_BRANDS',
            value: labels,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  return (
    <ScreenSection
      title={'Merchant Brands'}
      sortFields={[
        { name: 'code', title: 'Code' },
        { name: 'createdAt', title: 'Created At' },
      ]}
      meta={brandsMeta}
    >
      {brands.length ? (
        brands.map((b, i) => (
          <ScreenSectionRow key={i}>
            <ScreenSectionCell>
              <div className="w-38 flex h-full items-center justify-center px-1 text-sm font-medium">
                {readMerchantKey(b.merchantId)}
              </div>
            </ScreenSectionCell>
            <ScreenSectionCell>
              <div className="flex h-full items-center">
                <div className="flex h-full w-56 flex-col items-center justify-center break-words pr-2">
                  <span className="text-center">{b.description}</span>
                  <span className="mt-2 text-center text-sm font-bold">
                    {b.merchantBrandCode}
                  </span>
                </div>
                <img className="h-10" src={b.logo} alt="brand img" />
              </div>
            </ScreenSectionCell>
          </ScreenSectionRow>
        ))
      ) : (
        <ScreenSectionRow>
          <span className="m-3 ml-6 text-sm italic">
            {loading ? 'Loading...' : 'No Categories Found'}
          </span>
        </ScreenSectionRow>
      )}
    </ScreenSection>
  );
};

export default MerchantBrandsScreen;
