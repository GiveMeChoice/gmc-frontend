import {
  SearchFunctionFiltersDto,
  SearchFunctionKeyedFilterDto,
  TermFacetDto,
} from 'gmc-types';
import React from 'react';
import GenericFacetItem from './FacetItems/GenericFacetItem';

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
    <div className="flex w-full flex-col divide-y divide-secondary-dark-10">
      <span className="pl-1.5 text-lg font-bold">BRANDS</span>
      <div className="text-md flex flex-col px-2 pl-2.5 pt-0.5">
        {brandFacets.map((brandFacet) => (
          <GenericFacetItem
            value={brandFacet.value}
            selected={
              activeBrandFilter && activeBrandFilter.key === brandFacet.key
            }
            count={brandFacet.count}
            onClick={() =>
              onFilterChange({
                brand:
                  activeBrandFilter && activeBrandFilter.key === brandFacet.key
                    ? null
                    : {
                        key: brandFacet.key,
                        value: brandFacet.value,
                      },
              })
            }
          />
        ))}
      </div>
    </div>
  );
};

export default SearchChoiceBarBrandFacets;
