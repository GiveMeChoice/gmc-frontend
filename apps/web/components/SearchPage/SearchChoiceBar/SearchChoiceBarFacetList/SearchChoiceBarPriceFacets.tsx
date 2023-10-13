import React from 'react';
import { useSearch } from '../../../SearchProvider';
import GenericFacetItem from './FacetItems/GenericFacetItem';

interface Props {}

const SearchChoiceBarPriceFacets: React.FC<Props> = ({}) => {
  const search = useSearch();
  return (
    <div className="flex w-full flex-col divide-y divide-secondary-dark-10">
      <span className="pl-1.5 text-lg font-bold">PRICE</span>
      <div className="flex flex-col px-2 pl-3 pt-0.5 text-[17px]">
        {search.response.facets.priceRanges.find(
          (pr) => pr.count > 0 && pr.priceRange === 'cheap'
        ) && (
          <GenericFacetItem
            value="£ 0 - £ 15"
            selected={search.request.filters.priceRange === 'cheap'}
            count={
              search.response.facets.priceRanges.find(
                (priceFacet) => priceFacet.priceRange === 'cheap'
              ).count
            }
            onClick={() =>
              search.execute({
                filterUpdates: {
                  priceRange:
                    search.request.filters.priceRange &&
                    search.request.filters.priceRange === 'cheap'
                      ? null
                      : 'cheap',
                },
              })
            }
          />
        )}
        {search.response.facets.priceRanges.find(
          (pr) => pr.count > 0 && pr.priceRange === 'average'
        ) && (
          <GenericFacetItem
            value="£ 15 - £ 100"
            selected={search.request.filters.priceRange === 'average'}
            count={
              search.response.facets.priceRanges.find(
                (priceFacet) => priceFacet.priceRange === 'average'
              ).count
            }
            onClick={() =>
              search.execute({
                filterUpdates: {
                  priceRange:
                    search.request.filters.priceRange &&
                    search.request.filters.priceRange === 'average'
                      ? null
                      : 'average',
                },
              })
            }
          />
        )}
        {search.response.facets.priceRanges.find(
          (pr) => pr.count > 0 && pr.priceRange === 'expensive'
        ) && (
          <GenericFacetItem
            value="£ 100 +"
            selected={search.request.filters.priceRange === 'expensive'}
            count={
              search.response.facets.priceRanges.find(
                (priceFacet) => priceFacet.priceRange === 'expensive'
              ).count
            }
            onClick={() =>
              search.execute({
                filterUpdates: {
                  priceRange:
                    search.request.filters.priceRange &&
                    search.request.filters.priceRange === 'expensive'
                      ? null
                      : 'expensive',
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
