import FramedCountButton from '@root/components/shared/framed-count-button';
import {
  IFilters,
  initialFilters,
  useFiltersDispatch,
} from '@root/context-providers/filters.provider';
import { useScreenDataDispatch } from '@root/context-providers/screen-data.provider';
import channelsService from '@root/services/channels.service';
import { IMerchant } from '@root/services/merchants.service';
import productsService from '@root/services/products.service';
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

  return (
    <>
      <div className="flex h-full w-1/2 flex-col items-center justify-center gap-y-3 border-r border-zinc-500">
        <FramedCountButton
          title="Channels"
          count={merchant.channelCount}
          onClick={handleChannelsClick}
        />
        <FramedCountButton
          title="Products"
          count={merchant.productCount}
          onClick={handleProductsClick}
          color="gmc-beach"
        />
        {/* <div className="flex cursor-pointer items-center justify-center bg-gmc-heart-light-50 px-4 text-center text-sm hover:bg-gmc-heart-light-40">
          Reindex Products
        </div> */}
      </div>
      <div className="flex h-full w-1/2 flex-col items-center justify-center gap-y-2">
        <FramedCountButton
          title="Categories"
          count={merchant.categoryCount}
          color="gmc-berry-light-30"
          onClick={() => alert('categories!')}
        />
        <FramedCountButton
          title="Labels"
          count={merchant.labelCount}
          color="gmc-berry-light-30"
          onClick={() => alert('categories!')}
        />
        <FramedCountButton
          title="Brands"
          count={merchant.brandCount}
          color="gmc-berry-light-30"
          onClick={() => alert('categories!')}
        />
      </div>
    </>
  );
};

export default MerchantButtonPanel;
