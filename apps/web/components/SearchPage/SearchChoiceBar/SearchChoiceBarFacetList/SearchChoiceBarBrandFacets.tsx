import {
  SearchFunctionFiltersDto,
  KeyedFilterDto,
  NestedFacetDto,
} from 'gmc-types';
import React from 'react';
import GenericFacetItem from './FacetItems/GenericFacetItem';
import { useSearch } from '../../../SearchProvider';

interface Props {}

const SearchChoiceBarBrandFacets: React.FC<Props> = ({}) => {
  const search = useSearch();
  return (
    <div className="flex w-full flex-col divide-y divide-secondary-dark-10">
      <span className="pl-1.5 text-lg font-bold">BRANDS</span>
      <div className="text-md flex flex-col px-2 pl-2.5 pt-0.5">
        {search.response.facets.brands.map((brandFacet) => (
          <GenericFacetItem
            value={brandFacet.value}
            selected={
              search.request.filters.brand &&
              search.request.filters.brand.key === brandFacet.value
            }
            count={brandFacet.count}
            onClick={() =>
              search.execute({
                filterUpdates: {
                  brand:
                    search.request.filters.brand &&
                    search.request.filters.brand.key === brandFacet.value
                      ? null
                      : {
                          key: brandFacet.value,
                          name: brandFacet.name,
                          value: brandFacet.value,
                        },
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
