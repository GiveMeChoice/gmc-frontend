import {
  SearchFunctionFiltersDto,
  SearchFunctionKeyedFilterDto,
  TermFacetDto,
} from 'gmc-types';
import React from 'react';
import cn from 'classnames';

interface Props {
  activeBrandFilter?: SearchFunctionKeyedFilterDto;
  brandFacets: TermFacetDto[];
  onFilterChange: (updated: SearchFunctionFiltersDto) => void;
}

const SearchChoiceBarBrandFacets: React.FC<Props> = ({
  activeBrandFilter,
  brandFacets,
  onFilterChange,
}) => {
  return (
    <div className="flex w-full flex-col divide-y divide-secondary-dark-30">
      <span className="pl-1.5 text-lg font-bold">Brands</span>
      <div className="text-md flex flex-col px-2 pl-2.5 pt-0.5">
        {brandFacets.map((brand) => (
          <div className="flex items-center gap-x-1">
            {activeBrandFilter && activeBrandFilter.key === brand.key && (
              <div className="h-2.5 w-2.5 rounded-full border border-zinc-900 bg-zinc-900" />
            )}
            <span
              className={cn(
                'cursor-pointer hover:underline active:text-primary-dark-10',
                {
                  'font-bold':
                    activeBrandFilter && activeBrandFilter.key === brand.key,
                }
              )}
              onClick={() =>
                onFilterChange({
                  brand:
                    activeBrandFilter && activeBrandFilter.key === brand.key
                      ? null
                      : {
                          key: brand.key,
                          value: brand.value,
                        },
                })
              }
            >
              {`${brand.value}`}&nbsp;&nbsp;
              <span className="text-sm">({`${brand.count}`})</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchChoiceBarBrandFacets;
