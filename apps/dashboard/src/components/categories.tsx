import {
  useData,
  useDataDispatch,
} from '@root/context-providers/data.provider';
import {
  ProviderSelectType,
  useFilters,
} from '@root/context-providers/filters.provider';
import categoriesService from '@root/services/categories.service';
import React, { useEffect, useState } from 'react';
import CategoryGroupSelectField from './category-group-select-field';
import ScreenSection from './screen/screen-section';
import ScreenSectionCell from './screen/screen-section-cell';
import ScreenSectionRow from './screen/screen-section-row';

const CategoriesScreen: React.FC = () => {
  const { categories, categoriesMeta } = useData();
  const dataDispatch = useDataDispatch();
  const { activeFilters, options } = useFilters();
  const [loading, setLoading] = useState(false);
  // some unused test linen

  useEffect(() => {
    if (!categories.length) {
      setLoading(true);
      categoriesService
        .find(activeFilters, categoriesMeta)
        .then((labels) => {
          dataDispatch({ type: 'REFRESH_CATEGORIES', value: labels });
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
      title={'Categories'}
      sortFields={[
        { name: 'code', title: 'Code' },
        { name: 'createdAt', title: 'Created At' },
      ]}
      meta={categoriesMeta}
    >
      {categories.length ? (
        categories.map((c, i) => (
          <ScreenSectionRow key={i}>
            <ScreenSectionCell>
              <div className="flex h-full w-28 items-center justify-center break-words px-1 text-sm font-medium">
                {readProviderKey(c.providerId)}
              </div>
            </ScreenSectionCell>
            <ScreenSectionCell>
              <CategoryGroupSelectField category={c} />
            </ScreenSectionCell>
            <ScreenSectionCell>
              <div className="flex h-full w-44 flex-col items-center justify-center break-words py-2">
                <span className="text-center">{c.description}</span>
                <span className="mt-2 text-center text-sm font-bold">
                  {c.code}
                </span>
              </div>
            </ScreenSectionCell>
            <ScreenSectionCell>Products: {c.productCount}</ScreenSectionCell>
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

export default CategoriesScreen;
