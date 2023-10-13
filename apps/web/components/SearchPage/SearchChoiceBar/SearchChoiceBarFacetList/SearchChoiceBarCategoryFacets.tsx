import {
  SearchFunctionFiltersDto,
  NestedFilterDto,
  NestedFacetDto,
} from 'gmc-types';
import React, { useEffect } from 'react';
import FacetItem from './FacetItems/FacetItem';
import { useSearch } from '../../../SearchProvider';
import { baseCategories } from '../../../../lib/categories';
import { getBaseCategorySlug } from 'helpers';

interface Props {}

const SearchChoiceBarCategoryFacets: React.FC<Props> = ({}) => {
  const search = useSearch();

  const handleSelectCategory = (categoryFilter: NestedFilterDto) => {
    search.execute({
      filterUpdates: {
        category: categoryFilter,
      },
      noScroll: true,
    });
  };

  const handleRemoveCategory = () => {
    search.execute({
      filterUpdates: {
        category: null,
      },
      noScroll: true,
    });
  };

  return (
    <div className="flex w-full flex-col divide-y divide-secondary-dark-10">
      <span className="pl-1.5 text-lg font-bold">CATEGORIES</span>
      <div className="flex flex-col px-2 pl-3 pt-0.5 text-[17px]">
        {search.response.facets.categories
          .sort((a, b) => (a.value > b.value ? 1 : -1))
          .map((cat) => (
            <>
              <FacetItem
                facetFilter={{
                  value: cat.value,
                  name: cat.name,
                }}
                color={baseCategories.find((bc) => bc.slug === cat.value).color}
                activeFilters={[search.request.filters.category]}
                count={cat.count}
                onSelectFacet={handleSelectCategory}
                onClearFacet={handleRemoveCategory}
              />
              {/* 
                SUBCATEGORY 1
              */}
              <div className="flex flex-col pl-6 text-base">
                {cat.subfacets.map((sub1) => (
                  <>
                    <FacetItem
                      facetFilter={{
                        value: cat.value,
                        name: cat.name,
                        subfilter: {
                          value: sub1.value,
                          name: sub1.name,
                        },
                      }}
                      color={
                        baseCategories.find((bc) => bc.slug === cat.value).color
                      }
                      activeFilters={[search.request.filters.category]}
                      count={sub1.count}
                      onSelectFacet={handleSelectCategory}
                      onClearFacet={handleRemoveCategory}
                    />
                    {/* 
                SUBCATEGORY 2
              */}
                    <div className="flex flex-col pl-6 text-base">
                      {sub1.subfacets.map((sub2) => (
                        <FacetItem
                          facetFilter={{
                            value: cat.value,
                            name: cat.name,
                            subfilter: {
                              value: sub1.value,
                              name: sub1.name,
                              subfilter: {
                                value: sub2.value,
                                name: sub2.name,
                              },
                            },
                          }}
                          color={
                            baseCategories.find((bc) => bc.slug === cat.value)
                              .color
                          }
                          activeFilters={[search.request.filters.category]}
                          count={sub1.count}
                          onSelectFacet={handleSelectCategory}
                          onClearFacet={handleRemoveCategory}
                        />
                      ))}
                    </div>
                  </>
                ))}
              </div>
            </>
          ))}
      </div>
    </div>
  );
};

export default SearchChoiceBarCategoryFacets;
