import {
  useScreenData,
  useScreenDataDispatch,
} from '@root/context-providers/screen-data.provider';
import {
  IFilters,
  initialFilters,
  ProviderSelectType,
  useFilters,
  useFiltersDispatch,
} from '@root/context-providers/filters.provider';
import merchantCategoriesService from '@root/services/merchant-categories.service';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryGroupSelectField from '../shared/category-group-select-field';
import ScreenSection from './shared/screen-section';
import ScreenSectionCell from './shared/screen-section-cell';
import ScreenSectionRow from './shared/screen-section-row';
import { useMasterData } from '@root/context-providers/master-data.provider';

const MerchantCategoriesScreen: React.FC = () => {
  const {
    merchantCategories: categories,
    merchantCategoriesMeta: categoriesMeta,
  } = useScreenData();
  const dataDispatch = useScreenDataDispatch();
  const filtersDispatch = useFiltersDispatch();
  const { activeFilters } = useFilters();
  const { readProviderKey } = useMasterData();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!categories.length) {
      setLoading(true);
      merchantCategoriesService
        .findProviderCategories(activeFilters, categoriesMeta)
        .then((labels) => {
          dataDispatch({
            type: 'SCREEN_REFRESH_MERCHANT_CATEGORIES',
            value: labels,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  const onViewProducts = (providerId, providerCategoryCode) => {
    const sourceFilters: IFilters = {
      ...initialFilters,
      providerId,
      providerCategoryCode,
    };
    filtersDispatch({ type: 'FILTERS_SAVE', value: sourceFilters });
    dataDispatch({
      type: 'SCREEN_REFRESH_PRODUCTS',
      value: { data: [], meta: {} },
    });
    navigate('/products');
  };

  return (
    <ScreenSection
      title={'Provider Categories'}
      sortFields={
        [
          // { name: 'code', title: 'Code' },
          // { name: 'createdAt', title: 'Created At' },
          // { name: 'gmcCategoryId', title: 'GMC Category' },
        ]
      }
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
                <span className="mt-2 text-sm italic">
                  {c.merchantCategoryCode}
                </span>
              </div>
            </ScreenSectionCell>
            <ScreenSectionCell styles="flex justify-center items-center">
              <button
                className="flex h-20 w-full flex-col items-center justify-center rounded-md border border-zinc-500 p-2 hover:bg-primary-light-50 active:bg-primary"
                onClick={() =>
                  onViewProducts(c.merchantId, c.merchantCategoryCode)
                }
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

export default MerchantCategoriesScreen;
