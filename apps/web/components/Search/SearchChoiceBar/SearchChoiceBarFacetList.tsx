import { useRouter } from 'next/router';
import React from 'react';
import { useShop } from '../../Context/ShopProvider';
import SearchChoiceBarCategoryFacets from './SearchChoiceBarFacetList/SearchChoiceBarCategoryFacets';
import SearchChoiceBarLabelFacets from './SearchChoiceBarFacetList/SearchChoiceBarLabelFacets';
import SearchChoiceBarPriceFacets from './SearchChoiceBarFacetList/SearchChoiceBarPriceFacets';
import SearchChoiceBarBrandFacets from './SearchChoiceBarFacetList/SearchChoiceBarBrandFacets';

interface Props {}

const SearchChoiceBarFacetList: React.FC<Props> = () => {
  const router = useRouter();
  const search = useShop();
  return (
    <div
      id="choice-bar-facets"
      className="flex h-full flex-col gap-y-5 bg-white px-7 py-5"
    >
      {!router.pathname.includes('/shop/category') &&
        search.response.facets.categories.length > 0 && (
          <SearchChoiceBarCategoryFacets />
        )}
      {search.response.facets.labels.length > 0 && (
        <SearchChoiceBarLabelFacets />
      )}
      {search.response.facets.priceRanges.length &&
        search.response.facets.priceRanges.find((pr) => pr.count > 0) && (
          <SearchChoiceBarPriceFacets />
        )}
      {search.response.facets.brands.length > 0 && (
        <SearchChoiceBarBrandFacets />
      )}
      <hr />
    </div>
  );
};

export default SearchChoiceBarFacetList;
