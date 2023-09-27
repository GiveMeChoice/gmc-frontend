import cn from 'classnames';
import { RangeFacetDto, SearchFunctionFiltersDto } from 'gmc-types';
import React from 'react';
import GenericFacetItem from './FacetItems/GenericFacetItem';

interface Props {
  activePriceFilter?: string;
  priceFacets: RangeFacetDto[];
  onFilterChange: (updated: SearchFunctionFiltersDto) => void;
}

const SearchChoiceBarPriceFacets: React.FC<Props> = ({
  activePriceFilter,
  priceFacets,
  onFilterChange,
}) => {
  return (
    <div className="flex w-full flex-col divide-y divide-secondary-dark-10">
      <span className="pl-1.5 text-lg font-bold">PRICE</span>
      <div className="flex flex-col px-2 pl-3 pt-0.5 text-[17px]">
        {priceFacets.find(
          (pr) => pr.count > 0 && pr.priceRange === 'cheap'
        ) && (
          <GenericFacetItem
            value="£ 0 - £ 15"
            selected={activePriceFilter === 'cheap'}
            count={
              priceFacets.find(
                (priceFacet) => priceFacet.priceRange === 'cheap'
              ).count
            }
            onClick={() =>
              onFilterChange({
                priceRange:
                  activePriceFilter && activePriceFilter === 'cheap'
                    ? null
                    : 'cheap',
              })
            }
          />
        )}
        {priceFacets.find(
          (pr) => pr.count > 0 && pr.priceRange === 'average'
        ) && (
          <GenericFacetItem
            value="£ 15 - £ 100"
            selected={activePriceFilter === 'average'}
            count={
              priceFacets.find(
                (priceFacet) => priceFacet.priceRange === 'average'
              ).count
            }
            onClick={() =>
              onFilterChange({
                priceRange:
                  activePriceFilter && activePriceFilter === 'average'
                    ? null
                    : 'average',
              })
            }
          />
        )}
        {priceFacets.find(
          (pr) => pr.count > 0 && pr.priceRange === 'expensive'
        ) && (
          <GenericFacetItem
            value="£ 100 +"
            selected={activePriceFilter === 'expensive'}
            count={
              priceFacets.find(
                (priceFacet) => priceFacet.priceRange === 'expensive'
              ).count
            }
            onClick={() =>
              onFilterChange({
                priceRange:
                  activePriceFilter && activePriceFilter === 'expensive'
                    ? null
                    : 'expensive',
              })
            }
          />
        )}
      </div>
    </div>
  );
};

export default SearchChoiceBarPriceFacets;
