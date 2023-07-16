import {
  IFilters,
  initialFilters,
  useFilters,
  useFiltersDispatch,
} from '@root/context-providers/filters.provider';
import { useMasterData } from '@root/context-providers/master-data.provider';
import {
  useScreenData,
  useScreenDataDispatch,
} from '@root/context-providers/screen-data.provider';
import merchantCategoriesService from '@root/services/merchant-categories.service';
import { IMerchant } from '@root/services/merchants.service';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GmcCategorySelect from '../shared/gmc-category-select';
import CopyIdButton from '../shared/copy-id-button';
import FramedButton from '../shared/framed-button';
import MerchantChip from './merchants-screen/merchant-chip';
import ScreenSection from './shared/screen-section';
import ScreenSectionRow from './shared/screen-section-row';
import productsService from '@root/services/products.service';

const MerchantCategoriesScreen: React.FC = () => {
  const {
    merchantCategories: categories,
    merchantCategoriesMeta: categoriesMeta,
  } = useScreenData();
  const dataDispatch = useScreenDataDispatch();
  const filtersDispatch = useFiltersDispatch();
  const { activeFilters } = useFilters();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!categories.length) {
      setLoading(true);
      merchantCategoriesService
        .find(activeFilters, categoriesMeta)
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

  const onViewProducts = (merchantId, merchantCategoryCode) => {
    const sourceFilters: IFilters = {
      ...initialFilters,
      merchantId,
      merchantCategoryCode,
    };
    filtersDispatch({ type: 'FILTERS_SAVE', value: sourceFilters });
    dataDispatch({
      type: 'SCREEN_REFRESH_PRODUCTS',
      value: { data: [], meta: {} },
    });
    navigate(productsService.productsScreenControl.pathname);
  };

  return (
    <ScreenSection
      title={'Merchant Categories'}
      sortFields={[
        { name: 'merchantCategoryCode', title: 'Merchant Category' },
        { name: 'gmcCategoryId', title: 'GMC Category' },
      ]}
      meta={categoriesMeta}
    >
      {categories.length ? (
        categories.map((category, i) => (
          <ScreenSectionRow key={i}>
            <div className="flex w-full divide-x divide-zinc-400">
              <div className="flex w-2/12 items-center justify-center p-4">
                <MerchantChip
                  merchant={category.merchant as IMerchant}
                  clickable={true}
                />
              </div>
              <div className="flex w-8/12 flex-col divide-y divide-zinc-400">
                <div className="flex w-full items-center justify-center gap-x-1.5 py-4">
                  <span className="text-sm italic">{category.name}</span>
                  <CopyIdButton id={category.merchantCategoryCode} />
                </div>
                <div className="py-2">
                  <GmcCategorySelect category={category} />
                </div>
              </div>
              <div className="flex h-full w-2/12 items-center justify-center p-4">
                <div className="h-full w-2/3">
                  <FramedButton
                    title={`Products:`}
                    count={category.productCount}
                    disabled={category.productCount === 0}
                    onClick={() =>
                      onViewProducts(
                        category.merchantId,
                        category.merchantCategoryCode
                      )
                    }
                  />
                </div>
              </div>
            </div>
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

export default MerchantCategoriesScreen;
