import {
  SearchFunctionFiltersDto,
  SearchFunctionNestedFilterDto,
  TermFacetDto,
} from 'gmc-types';
import React from 'react';
import cn from 'classnames';
import * as deepEqual from 'deep-equal';

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
      <span className="pl-1.5 text-lg font-bold">Categories</span>
      <div className="text-md flex flex-col px-2 pl-2.5 pt-0.5">
        {categoryFacets
          .sort((a, b) => (a.value > b.value ? 1 : -1))
          .map((categoryFacet) => (
            <>
              <div className="flex items-center gap-x-1">
                {activeCategoryFilter &&
                  activeCategoryFilter.value === categoryFacet.value &&
                  !activeCategoryFilter.subfilter && (
                    <div className="h-2.5 w-2.5 rounded-full border border-zinc-900 bg-zinc-900" />
                  )}
                <span
                  className={cn(
                    'cursor-pointer hover:underline active:text-primary-dark-10',
                    {
                      'font-bold':
                        activeCategoryFilter &&
                        activeCategoryFilter.value === categoryFacet.value,
                    }
                  )}
                  onClick={() =>
                    onCategoryFacetClick({ value: categoryFacet.value })
                  }
                >
                  {`${categoryFacet.value}`}&nbsp;&nbsp;
                  <span className="text-sm">({`${categoryFacet.count}`})</span>
                </span>
              </div>
              {/* 
                    SUBCATEGORY 1 
                */}
              {activeCategoryFilter &&
                activeCategoryFilter.value === categoryFacet.value &&
                categoryFacet.subfacets.length > 0 && (
                  <div className="flex flex-col px-5 text-sm">
                    {categoryFacet.subfacets.map((subcategory1Facet) => (
                      <>
                        <div className="flex items-center gap-x-1">
                          {activeCategoryFilter.subfilter &&
                            activeCategoryFilter.subfilter.value ===
                              subcategory1Facet.value &&
                            !activeCategoryFilter.subfilter.subfilter && (
                              <div className="h-2.5 w-2.5 rounded-full border border-zinc-900 bg-zinc-900" />
                            )}
                          <span
                            className={cn(
                              'cursor-pointer hover:underline active:text-primary-dark-10',
                              {
                                'font-bold':
                                  activeCategoryFilter.subfilter &&
                                  activeCategoryFilter.subfilter.value ===
                                    subcategory1Facet.value,
                              }
                            )}
                            onClick={() =>
                              onCategoryFacetClick({
                                value: categoryFacet.value,
                                subfilter: {
                                  value: subcategory1Facet.value,
                                },
                              })
                            }
                          >
                            {`${subcategory1Facet.value}`}&nbsp;&nbsp;
                            <span className="text-sm">
                              ({`${subcategory1Facet.count}`})
                            </span>
                          </span>
                        </div>
                        {/* 
                              SUBCATEGORY 2
                          */}
                        {activeCategoryFilter.subfilter &&
                          activeCategoryFilter.subfilter.value ===
                            subcategory1Facet.value &&
                          subcategory1Facet.subfacets.length > 0 && (
                            <div className="flex flex-col px-5 text-sm">
                              {subcategory1Facet.subfacets.map(
                                (subcategory2Facet) => (
                                  <div className="flex items-center gap-x-1">
                                    {activeCategoryFilter.subfilter.subfilter &&
                                      activeCategoryFilter.subfilter.subfilter
                                        .value === subcategory2Facet.value && (
                                        <div className="h-2.5 w-2.5 rounded-full border border-zinc-900 bg-white" />
                                      )}
                                    <span
                                      className={cn(
                                        'cursor-pointer hover:underline active:text-primary-dark-10',
                                        {
                                          'font-bold':
                                            activeCategoryFilter.subfilter
                                              .subfilter &&
                                            activeCategoryFilter.subfilter
                                              .subfilter.value ===
                                              subcategory2Facet.value,
                                        }
                                      )}
                                      onClick={() =>
                                        onCategoryFacetClick({
                                          value: categoryFacet.value,
                                          subfilter: {
                                            value: subcategory1Facet.value,
                                            subfilter: {
                                              value: subcategory2Facet.value,
                                            },
                                          },
                                        })
                                      }
                                    >
                                      {`${subcategory2Facet.value}`}
                                      &nbsp;&nbsp;
                                      <span className="text-sm">
                                        ({`${subcategory2Facet.count}`})
                                      </span>
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          )}
                      </>
                    ))}
                  </div>
                )}
            </>
          ))}
      </div>
    </div>
  );
};

export default SearchChoiceBarCategoryFacets;
