import {
  SearchFunctionFiltersDto,
  SearchFunctionNestedFilterDto,
  TermFacetDto,
} from 'gmc-types';
import React from 'react';
import cn from 'classnames';
import * as deepEqual from 'deep-equal';
import GenericFacetItem from './FacetItems/GenericFacetItem';

interface Props {
  activeCategoryFilter?: SearchFunctionNestedFilterDto;
  categoryFacets: TermFacetDto[];
  onFilterChange: (updated: SearchFunctionFiltersDto) => void;
}

const SearchChoiceBarCategoryFacets: React.FC<Props> = ({
  activeCategoryFilter,
  categoryFacets,
  onFilterChange,
}) => {
  const onCategoryFacetClick = (
    categoryFilter: SearchFunctionNestedFilterDto
  ) => {
    onFilterChange({
      category: deepEqual(activeCategoryFilter, categoryFilter)
        ? null
        : categoryFilter,
    });
  };

  return (
    <div className="flex w-full flex-col divide-y divide-secondary-dark-10">
      <span className="pl-1.5 text-lg font-bold">CATEGORIES</span>
      <div className="flex flex-col px-2 pl-3 pt-0.5 text-[17px]">
        {categoryFacets
          .sort((a, b) => (a.value > b.value ? 1 : -1))
          .map((categoryFacet) => (
            <>
              <GenericFacetItem
                value={categoryFacet.value}
                selected={deepEqual(activeCategoryFilter, {
                  value: categoryFacet.value,
                })}
                count={categoryFacet.count}
                onClick={() =>
                  onCategoryFacetClick({ value: categoryFacet.value })
                }
              />
              {/* 
                SUBCATEGORY 1
              */}
              <div className="flex flex-col pl-6 text-base">
                {categoryFacet.subfacets.map((subcategory1Facet) => (
                  <>
                    <GenericFacetItem
                      value={subcategory1Facet.value}
                      count={subcategory1Facet.count}
                      selected={deepEqual(
                        activeCategoryFilter,
                        {
                          value: categoryFacet.value,
                          subfilter: {
                            value: subcategory1Facet.value,
                          },
                        },
                        { strict: true }
                      )}
                      onClick={() =>
                        onCategoryFacetClick({
                          value: categoryFacet.value,
                          subfilter: {
                            value: subcategory1Facet.value,
                          },
                        })
                      }
                    />
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
