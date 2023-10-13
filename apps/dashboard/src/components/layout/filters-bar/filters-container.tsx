import {
  useFilters,
  useFiltersDispatch,
} from '@root/context-providers/filters.provider';
import cn from 'classnames';
import React from 'react';
import BrandFilters from './filters-container/brand-filters';
import CategoryFilters from './filters-container/category-filters';
import ChannelFilters from './filters-container/channel-filters';
import LabelFilters from './filters-container/label-filters';
import MerchantFilters from './filters-container/merchant-filters';
import ProductFilters from './filters-container/product-filters';
import ProviderFilters from './filters-container/provider-filters';

const FiltersContainer: React.FC = () => {
  const { activeFilters, filterBarVisible } = useFilters();
  const filtersDispatch = useFiltersDispatch();

  const handleFieldChange = (e) => {
    const updatedFilters = {
      ...activeFilters,
      [e.target.id]: e.target.value,
    };
    filtersDispatch({
      type: 'FILTERS_SAVE',
      value: updatedFilters,
    });
  };

  return (
    <div
      id="filters-container"
      className={cn(
        'flex h-full min-h-screen w-full flex-col items-center gap-y-3 overflow-y-auto px-3 py-4 pb-36',
        { hidden: !filterBarVisible }
      )}
    >
      <MerchantFilters onFieldChange={handleFieldChange} />
      <hr className="w-full border-zinc-500" />
      <ProviderFilters onFieldChange={handleFieldChange} />
      <hr className="w-full border-zinc-500" />
      <ChannelFilters onFieldChange={handleFieldChange} />
      <hr className="w-full border-zinc-500" />
      <ProductFilters onFieldChange={handleFieldChange} />
      <hr className="w-full border-zinc-500" />
      <BrandFilters onFieldChange={handleFieldChange} />
      <hr className="w-full border-zinc-500" />
      <CategoryFilters onFieldChange={handleFieldChange} />
      <hr className="w-full border-zinc-500" />
      <LabelFilters onFieldChange={handleFieldChange} />
    </div>
  );
};

export default FiltersContainer;
