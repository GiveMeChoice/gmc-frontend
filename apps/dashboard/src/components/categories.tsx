import {
  useData,
  useDataDispatch,
} from '@root/context-providers/data.provider';
import {
  IFilters,
  initialFilters,
  ProviderSelectType,
  useFilters,
  useFiltersDispatch,
} from '@root/context-providers/filters.provider';
import categoriesService from '@root/services/categories.service';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryGroupSelectField from './category-group-select-field';
import ScreenSection from './screen/screen-section';
import ScreenSectionCell from './screen/screen-section-cell';
import ScreenSectionRow from './screen/screen-section-row';

const CategoriesScreen: React.FC = () => {
  const { categories, categoriesMeta } = useData();
  const dataDispatch = useDataDispatch();
  const filtersDispatch = useFiltersDispatch();
  const { activeFilters, options } = useFilters();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!categories.length) {
      setLoading(true);
      categoriesService
        .findProviderCategories(activeFilters, categoriesMeta)
        .then((labels) => {
          dataDispatch({ type: 'REFRESH_PROVIDER_CATEGORIES', value: labels });
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

  const onViewProducts = (providerId, providerCategoryCode) => {
    const sourceFilters: IFilters = {
      ...initialFilters,
      providerId,
      providerCategoryCode,
    };
    filtersDispatch({ type: 'SAVE_FILTERS', value: sourceFilters });
    dataDispatch({ type: 'REFRESH_PRODUCTS', value: { data: [], meta: {} } });
    navigate('/products');
  };

  return (
    <ScreenSection
      title={'Provider Categories'}
      sortFields={[
        { name: 'code', title: 'Code' },
        { name: 'createdAt', title: 'Created At' },
        { name: 'categoryId', title: 'Category' },
      ]}
      meta={categoriesMeta}
    >
      {categories.length ? (
        categories.map((c, i) => (
          <ScreenSectionRow key={i}>
            <ScreenSectionCell>
              <div className="flex h-full w-28 items-center justify-center break-words px-1 text-sm font-medium">
                {readProviderKey(c.merchantId)}
              </div>
            </ScreenSectionCell>
            <ScreenSectionCell>
              <div className="flex h-full w-72 flex-col items-start justify-center break-words px-2 py-1">
                <span className="font-bold">{c.description}</span>
                <span className="mt-2 text-sm italic">{c.code}</span>
              </div>
            </ScreenSectionCell>
            <ScreenSectionCell styles="flex justify-center items-center">
              <button
                className="flex h-20 w-full flex-col items-center justify-center rounded-md border border-zinc-500 p-2 hover:bg-primary-light-50 active:bg-primary"
                onClick={() => onViewProducts(c.merchantId, c.code)}
              >
                <span className="text-sm">Products:</span>
                <span className="text-sm">{c.productCount}</span>
              </button>
            </ScreenSectionCell>
            <ScreenSectionCell styles="w-1/2">
              <CategoryGroupSelectField category={c} />
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

export default CategoriesScreen;
