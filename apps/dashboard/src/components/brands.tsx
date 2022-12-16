import {
  useData,
  useDataDispatch,
} from '@root/context-providers/data.provider';
import {
  ProviderSelectType,
  useFilters,
} from '@root/context-providers/filters.provider';
import brandsService from '@root/services/brands.service';
import React, { useEffect, useState } from 'react';
import ScreenSection from './screen/screen-section';
import ScreenSectionCell from './screen/screen-section-cell';
import ScreenSectionRow from './screen/screen-section-row';

const BrandsScreen: React.FC = () => {
  const { brands, brandsMeta } = useData();
  const dataDispatch = useDataDispatch();
  const { activeFilters, options } = useFilters();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!brands.length) {
      setLoading(true);
      brandsService
        .find(activeFilters, brandsMeta)
        .then((labels) => {
          dataDispatch({ type: 'REFRESH_BRANDS', value: labels });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  const readProviderKey = (providerId: string) => {
    let match: ProviderSelectType = null;
    if (options.providerSelect.length) {
      match = options.providerSelect.find((s) => s.id === providerId);
    }
    return match ? match.key : 'unknown';
  };

  return (
    <ScreenSection
      title={'Brands'}
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
                {readProviderKey(b.providerId)}
              </div>
            </ScreenSectionCell>
            <ScreenSectionCell>
              <div className="flex h-full items-center">
                <div className="flex h-full w-56 flex-col items-center justify-center break-words pr-2">
                  <span className="text-center">{b.description}</span>
                  <span className="mt-2 text-center text-sm font-bold">
                    {b.code}
                  </span>
                </div>
                <img className="h-10" src={b.icon} alt="brand img" />
              </div>
            </ScreenSectionCell>
          </ScreenSectionRow>
        ))
      ) : (
        <ScreenSectionRow>
          <span className="m-3">
            {loading ? 'Loading...' : 'No Categories Found'}
          </span>
        </ScreenSectionRow>
      )}
    </ScreenSection>
  );
};

export default BrandsScreen;
