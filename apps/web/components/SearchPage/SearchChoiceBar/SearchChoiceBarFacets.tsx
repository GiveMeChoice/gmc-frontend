import {
  SearchFunctionFacetsDto,
  SearchFunctionFiltersDto,
  SearchFunctionNestedFilterDto,
} from 'gmc-types';
import React from 'react';
import cn from 'classnames';
import * as deepEqual from 'deep-equal';

interface Props {
  facets: SearchFunctionFacetsDto;
  activeFilters: SearchFunctionFiltersDto;
  onFilterChange: (updated: SearchFunctionFiltersDto) => void;
}

const SearchChoiceBarFacets: React.FC<Props> = ({
  facets,
  activeFilters,
  onFilterChange,
}) => {
  const onLabelFacetClick = (labelFilter: SearchFunctionNestedFilterDto) => {
    let updatedLabels = [];
    if (
      activeFilters.labels.find((f) =>
        deepEqual(f, labelFilter, { strict: true })
      )
    ) {
      updatedLabels = [...activeFilters.labels].filter(
        (f) => !deepEqual(f, labelFilter)
      );
    } else {
      // remove any parent label from list before adding new child
      updatedLabels = [...activeFilters.labels].filter(
        (f) => f.value !== labelFilter.value
      );
      updatedLabels.push(labelFilter);
    }
    onFilterChange({
      labels: updatedLabels,
    });
  };

  const onCategoryFacetClick = (
    categoryFilter: SearchFunctionNestedFilterDto
  ) => {
    onFilterChange({
      category: deepEqual(activeFilters.category, categoryFilter)
        ? null
        : categoryFilter,
    });
  };

  return (
    <div className="h-full overflow-y-auto">
      {facets && (
        <div id="choice-bar-facets" className="flex h-full flex-col px-5 pb-32">
          {facets.stores && facets.stores.length > 0 && (
            <>
              {/* 
            STORES
        */}
              <span className="pt-3 text-lg font-bold">Stores</span>
              <div className="text-md flex flex-col px-2">
                {facets.stores.map((store) => (
                  <div className="flex items-center gap-x-1">
                    {activeFilters.store === store.value && (
                      <div className="h-3 w-3 rounded-full border border-black bg-gmc-dune  " />
                    )}
                    <span
                      className={cn(
                        'cursor-pointer hover:underline active:text-primary-dark-10',
                        {
                          'font-bold': activeFilters.store === store.value,
                        }
                      )}
                      onClick={() =>
                        onFilterChange({
                          store:
                            activeFilters.store === store.value
                              ? null
                              : store.value,
                        })
                      }
                    >
                      {`${store.value}`}&nbsp;&nbsp;
                      <span className="text-sm">({`${store.count}`})</span>
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
          {facets.categories.length > 0 && (
            <>
              {/* 
            CATEGORIES
        */}
              <span className="pt-3 text-lg font-bold">Categories</span>
              <div className="text-md flex flex-col px-2">
                {facets.categories
                  .sort((a, b) => (a.value > b.value ? 1 : -1))
                  .map((categoryFacet) => (
                    <>
                      <div className="flex items-center gap-x-1">
                        {activeFilters.category &&
                          activeFilters.category.value ===
                            categoryFacet.value &&
                          !activeFilters.category.subfilter && (
                            <div className="h-3 w-3 rounded-full border border-black bg-gmc-berry" />
                          )}
                        <span
                          className={cn(
                            'cursor-pointer hover:underline active:text-primary-dark-10',
                            {
                              'font-bold':
                                activeFilters.category &&
                                activeFilters.category.value ===
                                  categoryFacet.value,
                            }
                          )}
                          onClick={() =>
                            onCategoryFacetClick({ value: categoryFacet.value })
                          }
                        >
                          {`${categoryFacet.value}`}&nbsp;&nbsp;
                          <span className="text-sm">
                            ({`${categoryFacet.count}`})
                          </span>
                        </span>
                      </div>
                      {/* 
                    SUBCATEGORY 1 
                */}
                      {activeFilters.category &&
                        activeFilters.category.value === categoryFacet.value &&
                        categoryFacet.subfacets.length > 0 && (
                          <div className="flex flex-col px-5 text-sm">
                            {categoryFacet.subfacets.map(
                              (subcategory1Facet) => (
                                <>
                                  <div className="flex items-center gap-x-1">
                                    {activeFilters.category.subfilter &&
                                      activeFilters.category.subfilter.value ===
                                        subcategory1Facet.value &&
                                      !activeFilters.category.subfilter
                                        .subfilter && (
                                        <div className="h-3 w-3 rounded-full border border-black bg-gmc-berry" />
                                      )}
                                    <span
                                      className={cn(
                                        'cursor-pointer hover:underline active:text-primary-dark-10',
                                        {
                                          'font-bold':
                                            activeFilters.category.subfilter &&
                                            activeFilters.category.subfilter
                                              .value ===
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
                                  {activeFilters.category.subfilter &&
                                    activeFilters.category.subfilter.value ===
                                      subcategory1Facet.value &&
                                    subcategory1Facet.subfacets.length > 0 && (
                                      <div className="flex flex-col px-5 text-sm">
                                        {subcategory1Facet.subfacets.map(
                                          (subcategory2Facet) => (
                                            <div className="flex items-center gap-x-1">
                                              {activeFilters.category.subfilter
                                                .subfilter &&
                                                activeFilters.category.subfilter
                                                  .subfilter.value ===
                                                  subcategory2Facet.value && (
                                                  <div className="h-3 w-3 rounded-full border border-black bg-gmc-berry" />
                                                )}
                                              <span
                                                className={cn(
                                                  'cursor-pointer hover:underline active:text-primary-dark-10',
                                                  {
                                                    'font-bold':
                                                      activeFilters.category
                                                        .subfilter.subfilter &&
                                                      activeFilters.category
                                                        .subfilter.subfilter
                                                        .value ===
                                                        subcategory2Facet.value,
                                                  }
                                                )}
                                                onClick={() =>
                                                  onCategoryFacetClick({
                                                    value: categoryFacet.value,
                                                    subfilter: {
                                                      value:
                                                        subcategory1Facet.value,
                                                      subfilter: {
                                                        value:
                                                          subcategory2Facet.value,
                                                      },
                                                    },
                                                  })
                                                }
                                              >
                                                {`${subcategory2Facet.value}`}
                                                &nbsp;&nbsp;
                                                <span className="text-sm">
                                                  (
                                                  {`${subcategory2Facet.count}`}
                                                  )
                                                </span>
                                              </span>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    )}
                                </>
                              )
                            )}
                          </div>
                        )}
                    </>
                  ))}
              </div>
            </>
          )}
          {facets.labels.length > 0 && (
            <>
              {/* 
            LABELS
        */}
              <span className="pt-3 text-lg font-bold">Labels</span>
              <div className="text-md flex flex-col px-2">
                {facets.labels
                  .sort((a, b) => (a.value > b.value ? 1 : -1))
                  .map((labelFacet) => (
                    <>
                      <div className="flex items-center gap-x-1">
                        {activeFilters.labels.find((labelFilter) =>
                          deepEqual(labelFilter, {
                            value: labelFacet.value,
                          })
                        ) && (
                          <div className="h-3 w-3 rounded-full border border-black bg-primary" />
                        )}
                        <span
                          className={cn(
                            'cursor-pointer hover:underline active:text-primary-dark-10',
                            {}
                          )}
                          onClick={() =>
                            onLabelFacetClick({
                              value: labelFacet.value,
                            })
                          }
                        >
                          {`${labelFacet.value}`}&nbsp;
                          <span className="text-sm">
                            {' '}
                            ({`${labelFacet.count}`})
                          </span>
                        </span>
                      </div>
                      {/* 
                      SUBLABEL 1
                    */}
                      {activeFilters.labels.find(
                        (f) => f.value === labelFacet.value
                      ) && (
                        <div className="flex flex-col px-5 text-sm">
                          {labelFacet.subfacets.map((sublabel1Facet) => (
                            <>
                              <div className="flex items-center gap-x-1">
                                {activeFilters.labels.find((labelFilter) =>
                                  deepEqual(labelFilter, {
                                    value: labelFacet.value,
                                    subfilter: {
                                      value: sublabel1Facet.value,
                                    },
                                  } as SearchFunctionNestedFilterDto)
                                ) && (
                                  <div className="h-3 w-3 rounded-full border border-black bg-primary" />
                                )}
                                <span
                                  className={cn(
                                    'cursor-pointer hover:underline active:text-primary-dark-10',
                                    {}
                                  )}
                                  onClick={() =>
                                    onLabelFacetClick({
                                      value: labelFacet.value,
                                      subfilter: {
                                        value: sublabel1Facet.value,
                                      },
                                    })
                                  }
                                >
                                  {`${sublabel1Facet.value}`}&nbsp;&nbsp;
                                  <span className="text-sm">
                                    ({`${sublabel1Facet.count}`})
                                  </span>
                                </span>
                              </div>
                            </>
                          ))}
                        </div>
                      )}
                    </>
                  ))}
              </div>
            </>
          )}
          {facets.priceRanges.length &&
            facets.priceRanges.find((pr) => pr.count > 0) && (
              <>
                <span className="pt-3 text-lg font-bold">Price</span>
                <div className="text-md flex flex-col px-2">
                  {facets.priceRanges.find(
                    (pr) => pr.count > 0 && pr.priceRange === 'cheap'
                  ) && (
                    <div className="flex items-center gap-x-1">
                      {activeFilters.priceRange === 'cheap' && (
                        <div className="h-3 w-3 rounded-full border border-black bg-gmc-sunset" />
                      )}
                      <span
                        className={cn(
                          'cursor-pointer hover:underline active:text-primary-dark-10',
                          {
                            'font-bold': activeFilters.priceRange === 'cheap',
                          }
                        )}
                        onClick={() =>
                          onFilterChange({
                            priceRange:
                              activeFilters.priceRange &&
                              activeFilters.priceRange === 'cheap'
                                ? null
                                : 'cheap',
                          })
                        }
                      >
                        £ 0 - £ 15&nbsp;&nbsp;
                        <span className="text-sm">
                          (
                          {
                            facets.priceRanges.find(
                              (pr) => pr.priceRange === 'cheap'
                            ).count
                          }
                          )
                        </span>
                      </span>
                    </div>
                  )}
                  {facets.priceRanges.find(
                    (pr) => pr.count > 0 && pr.priceRange === 'average'
                  ) && (
                    <div className="flex items-center gap-x-1">
                      {activeFilters.priceRange === 'average' && (
                        <div className="h-3 w-3 rounded-full border border-black bg-gmc-sunset" />
                      )}
                      <span
                        className={cn(
                          'cursor-pointer hover:underline active:text-primary-dark-10',
                          {
                            'font-bold': activeFilters.priceRange === 'average',
                          }
                        )}
                        onClick={() =>
                          onFilterChange({
                            priceRange:
                              activeFilters.priceRange &&
                              activeFilters.priceRange === 'average'
                                ? null
                                : 'average',
                          })
                        }
                      >
                        £ 15 - £ 100&nbsp;&nbsp;
                        <span className="text-sm">
                          (
                          {
                            facets.priceRanges.find(
                              (pr) => pr.priceRange === 'average'
                            ).count
                          }
                          )
                        </span>
                      </span>
                    </div>
                  )}
                  {facets.priceRanges.find(
                    (pr) => pr.count > 0 && pr.priceRange === 'expensive'
                  ) && (
                    <div className="flex items-center gap-x-1">
                      {activeFilters.priceRange === 'expensive' && (
                        <div className="h-3 w-3 rounded-full border border-black bg-gmc-sunset" />
                      )}
                      <span
                        className={cn(
                          'cursor-pointer hover:underline active:text-primary-dark-10',
                          {
                            'font-bold':
                              activeFilters.priceRange === 'expensive',
                          }
                        )}
                        onClick={() =>
                          onFilterChange({
                            priceRange:
                              activeFilters.priceRange &&
                              activeFilters.priceRange === 'expensive'
                                ? null
                                : 'expensive',
                          })
                        }
                      >
                        £ 100 +&nbsp;&nbsp;
                        <span className="text-sm">
                          (
                          {
                            facets.priceRanges.find(
                              (pr) => pr.priceRange === 'expensive'
                            ).count
                          }
                          )
                        </span>
                      </span>
                    </div>
                  )}
                </div>
              </>
            )}
          {facets.brands.length > 0 && (
            <>
              {/* 
            BRANDS
        */}
              <span className="pt-3 text-lg font-bold">Brands</span>
              <div className="text-md flex flex-col px-2">
                {facets.brands.map((brand) => (
                  <div className="flex items-center gap-x-1">
                    {activeFilters.brand &&
                      activeFilters.brand.key === brand.key && (
                        <div className="h-3 w-3 rounded-full border border-black bg-gmc-surf" />
                      )}
                    <span
                      className={cn(
                        'cursor-pointer hover:underline active:text-primary-dark-10',
                        {
                          'font-bold':
                            activeFilters.brand &&
                            activeFilters.brand.key === brand.key,
                        }
                      )}
                      onClick={() =>
                        onFilterChange({
                          brand:
                            activeFilters.brand &&
                            activeFilters.brand.key === brand.key
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
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchChoiceBarFacets;
