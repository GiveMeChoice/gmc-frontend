import cn from 'classnames';
import { RangeFacetDto, SearchFunctionFiltersDto } from 'gmc-types';
import React from 'react';

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
    <div className="flex w-full flex-col divide-y divide-secondary-dark-30">
      <span className="pl-1.5 text-lg font-bold">Price</span>
      <div className="text-md flex flex-col px-2 pl-2.5 pt-0.5">
        {priceFacets.find(
          (pr) => pr.count > 0 && pr.priceRange === 'cheap'
        ) && (
          <div className="flex items-center gap-x-1">
            {activePriceFilter === 'cheap' && (
              <div className="h-2.5 w-2.5 rounded-full border border-zinc-900 bg-zinc-900" />
            )}
            <span
              className={cn(
                'cursor-pointer hover:underline active:text-primary-dark-10',
                {
                  'font-bold': activePriceFilter === 'cheap',
                }
              )}
              onClick={() =>
                onFilterChange({
                  priceRange:
                    activePriceFilter && activePriceFilter === 'cheap'
                      ? null
                      : 'cheap',
                })
              }
            >
              £ 0 - £ 15&nbsp;&nbsp;
              <span className="text-sm">
                ({priceFacets.find((pr) => pr.priceRange === 'cheap').count})
              </span>
            </span>
          </div>
        )}
        {priceFacets.find(
          (pr) => pr.count > 0 && pr.priceRange === 'average'
        ) && (
          <div className="flex items-center gap-x-1">
            {activePriceFilter === 'average' && (
              <div className="h-2.5 w-2.5 rounded-full border border-zinc-900 bg-zinc-900" />
            )}
            <span
              className={cn(
                'cursor-pointer hover:underline active:text-primary-dark-10',
                {
                  'font-bold': activePriceFilter === 'average',
                }
              )}
              onClick={() =>
                onFilterChange({
                  priceRange:
                    activePriceFilter && activePriceFilter === 'average'
                      ? null
                      : 'average',
                })
              }
            >
              £ 15 - £ 100&nbsp;&nbsp;
              <span className="text-sm">
                ({priceFacets.find((pr) => pr.priceRange === 'average').count})
              </span>
            </span>
          </div>
        )}
        {priceFacets.find(
          (pr) => pr.count > 0 && pr.priceRange === 'expensive'
        ) && (
          <div className="flex items-center gap-x-1">
            {activePriceFilter === 'expensive' && (
              <div className="h-2.5 w-2.5 rounded-full border border-zinc-900 bg-zinc-900" />
            )}
            <span
              className={cn(
                'cursor-pointer hover:underline active:text-primary-dark-10',
                {
                  'font-bold': activePriceFilter === 'expensive',
                }
              )}
              onClick={() =>
                onFilterChange({
                  priceRange:
                    activePriceFilter && activePriceFilter === 'expensive'
                      ? null
                      : 'expensive',
                })
              }
            >
              £ 100 +&nbsp;&nbsp;
              <span className="text-sm">
                ({priceFacets.find((pr) => pr.priceRange === 'expensive').count}
                )
              </span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchChoiceBarPriceFacets;
