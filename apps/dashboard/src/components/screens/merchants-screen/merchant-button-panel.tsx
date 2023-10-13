import FramedButton from '@root/components/shared/framed-button';
import {
  IFilters,
  initialFilters,
  useFiltersDispatch,
} from '@root/context-providers/filters.provider';
import { useScreenDataDispatch } from '@root/context-providers/screen-data.provider';
import channelsService from '@root/services/channels.service';
import merchantBrandsService from '@root/services/merchant-brands.service';
import merchantCategoriesService from '@root/services/merchant-categories.service';
import merchantLabelsService from '@root/services/merchant-labels.service';
import productsService from '@root/services/products.service';
import { IMerchant } from 'gmc-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  merchant: IMerchant;
}

const MerchantButtonPanel: React.FC<Props> = ({ merchant }) => {
  const filtersDispatch = useFiltersDispatch();
  const screenDataDispatch = useScreenDataDispatch();
  const navigate = useNavigate();

  const setMerchantFilter = () => {
    const merchantFilter: IFilters = {
      ...initialFilters,
      merchantId: merchant.id,
    };
    filtersDispatch({ type: 'FILTERS_SAVE', value: merchantFilter });
  };

  const handleChannelsClick = () => {
    setMerchantFilter();
    screenDataDispatch({
      type: 'SCREEN_REFRESH_CHANNELS',
      value: { data: [], meta: {} },
    });
    navigate(channelsService.channelsScreenControl.pathname);
  };

  const handleProductsClick = () => {
    setMerchantFilter();
    screenDataDispatch({
      type: 'SCREEN_REFRESH_PRODUCTS',
      value: { data: [], meta: {} },
    });
    navigate(productsService.productsScreenControl.pathname);
  };

  const handleCategoriesClick = () => {
    setMerchantFilter();
    screenDataDispatch({
      type: 'SCREEN_REFRESH_MERCHANT_CATEGORIES',
      value: { data: [], meta: {} },
    });
    navigate(merchantCategoriesService.categoriesScreenControl.pathname);
  };

  const handleLabelsClick = () => {
    setMerchantFilter();
    screenDataDispatch({
      type: 'SCREEN_REFRESH_MERCHANT_LABELS',
      value: { data: [], meta: {} },
    });
    navigate(merchantLabelsService.labelsScreenControl.pathname);
  };

  const handleBrandsClick = () => {
    setMerchantFilter();
    screenDataDispatch({
      type: 'SCREEN_REFRESH_MERCHANT_BRANDS',
      value: { data: [], meta: {} },
    });
    navigate(merchantBrandsService.brandsScreenControl.pathname);
  };

  return (
    <>
      <div className="flex h-full w-1/2 flex-col items-center justify-center gap-y-3 border-r border-zinc-300">
        <div className="h-20 w-3/4">
          <FramedButton
            title="Channels"
            count={merchant.channelCount}
            onClick={handleChannelsClick}
          />
        </div>
        <div className="h-20 w-3/4">
          <FramedButton
            title="Products"
            count={merchant.productCount}
            onClick={handleProductsClick}
            color="gmc-beach"
          />
        </div>
        {/* <div className="flex cursor-pointer items-center justify-center bg-gmc-heart-light-50 px-4 text-center text-sm hover:bg-gmc-heart-light-40">
          Reindex Products
        </div> */}
      </div>
      <div className="flex h-full w-1/2 flex-col items-center justify-center gap-y-2">
        <div className="h-16 w-3/4">
          <FramedButton
            title="Categories"
            count={merchant.categoryCount}
            onClick={handleCategoriesClick}
          />
        </div>
        <div className="h-16 w-3/4">
          <FramedButton
            title="Labels"
            count={merchant.labelCount}
            onClick={handleLabelsClick}
          />
        </div>
        <div className="h-16 w-3/4">
          <FramedButton
            title="Brands"
            count={merchant.brandCount}
            onClick={handleBrandsClick}
          />
        </div>
      </div>
    </>
  );
};

export default MerchantButtonPanel;
