import { SearchFunctionFacetsDto, SearchFunctionFiltersDto } from 'gmc-types';
import React from 'react';
import SearchChoiceBarBrandFacets from './SearchChoiceBarFacetList/SearchChoiceBarBrandFacets';
import SearchChoiceBarCategoryFacets from './SearchChoiceBarFacetList/SearchChoiceBarCategoryFacets';
import SearchChoiceBarLabelFacets from './SearchChoiceBarFacetList/SearchChoiceBarLabelFacets';
import SearchChoiceBarMerchantFacets from './SearchChoiceBarFacetList/SearchChoiceBarMerchantFacets';
import SearchChoiceBarPriceFacets from './SearchChoiceBarFacetList/SearchChoiceBarPriceFacets';

interface Props {
  facets: SearchFunctionFacetsDto;
  activeFilters: SearchFunctionFiltersDto;
  onFilterChange: (updated: SearchFunctionFiltersDto) => void;
}

const SearchChoiceBarFacetList: React.FC<Props> = ({
  facets,
  activeFilters,
  onFilterChange,
}) => {
  return (
    <div
      id="choice-bar-facets"
      className="flex h-full flex-col gap-y-5 bg-white px-7 pt-5 pb-10"
    >
      {facets.labels.length > 0 && (
        <SearchChoiceBarLabelFacets
          activeLabelFilters={activeFilters.labels}
          labelFacets={facets.labels}
          onFilterChange={onFilterChange}
        />
      )}
      {facets.categories.length > 0 && (
        <SearchChoiceBarCategoryFacets
          categoryFacets={facets.categories}
          activeCategoryFilter={activeFilters.category}
          onFilterChange={onFilterChange}
        />
      )}
      {facets.merchants && facets.merchants.length > 0 && (
        <SearchChoiceBarMerchantFacets
          activeMerchantFilter={activeFilters.merchant}
          merchantFacets={facets.merchants}
          onFilterChange={onFilterChange}
        />
      )}
      {facets.priceRanges.length &&
        facets.priceRanges.find((pr) => pr.count > 0) && (
          <SearchChoiceBarPriceFacets
            activePriceFilter={activeFilters.priceRange}
            priceFacets={facets.priceRanges}
            onFilterChange={onFilterChange}
          />
        )}
      {facets.brands.length > 0 && (
        <SearchChoiceBarBrandFacets
          activeBrandFilter={activeFilters.brand}
          brandFacets={facets.brands}
          onFilterChange={onFilterChange}
        />
      )}
    </div>
  );
};

export default SearchChoiceBarFacetList;
