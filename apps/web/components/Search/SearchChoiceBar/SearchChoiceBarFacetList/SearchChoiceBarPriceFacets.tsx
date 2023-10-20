import React from 'react';
import { useShop } from '../../../Context/ShopProvider';
import GenericFacetItem from './FacetItems/GenericFacetItem';

interface Props {}

const SearchChoiceBarPriceFacets: React.FC<Props> = ({}) => {
  const shop = useShop();
  return (
    <div className="flex w-full flex-col divide-y divide-secondary-dark-10">
      <span className="pl-1.5 text-lg font-bold">PRICE</span>
      <div className="flex flex-col px-2 pl-3 pt-0.5 text-[17px]">
        {shop.response.facets.priceRanges.find(
          (pr) => pr.count > 0 && pr.priceRange === 'low'
        ) && (
          <GenericFacetItem
            value="£ 0 - £ 15"
            selected={shop.request.filters.priceRange === 'low'}
            count={
              shop.response.facets.priceRanges.find(
                (priceFacet) => priceFacet.priceRange === 'low'
              ).count
            }
            onClick={() =>
              shop.search({
                filterUpdates: {
                  priceRange:
                    shop.request.filters.priceRange &&
                    shop.request.filters.priceRange === 'low'
                      ? null
                      : 'low',
                },
              })
            }
          />
        )}
        {shop.response.facets.priceRanges.find(
          (pr) => pr.count > 0 && pr.priceRange === 'mid'
        ) && (
          <GenericFacetItem
            value="£ 15 - £ 100"
            selected={shop.request.filters.priceRange === 'mid'}
            count={
              shop.response.facets.priceRanges.find(
                (priceFacet) => priceFacet.priceRange === 'mid'
              ).count
            }
            onClick={() =>
              shop.search({
                filterUpdates: {
                  priceRange:
                    shop.request.filters.priceRange &&
                    shop.request.filters.priceRange === 'mid'
                      ? null
                      : 'mid',
                },
              })
            }
          />
        )}
        {shop.response.facets.priceRanges.find(
          (pr) => pr.count > 0 && pr.priceRange === 'high'
        ) && (
          <GenericFacetItem
            value="£ 100 +"
            selected={shop.request.filters.priceRange === 'high'}
            count={
              shop.response.facets.priceRanges.find(
                (priceFacet) => priceFacet.priceRange === 'high'
              ).count
            }
            onClick={() =>
              shop.search({
                filterUpdates: {
                  priceRange:
                    shop.request.filters.priceRange &&
                    shop.request.filters.priceRange === 'high'
                      ? null
                      : 'high',
                },
              })
            }
          />
        )}
      </div>
    </div>
  );
};

export default SearchChoiceBarPriceFacets;
