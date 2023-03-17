import { SearchFunctionFacetsDto, SearchFunctionFiltersDto } from 'gmc-types';
import React from 'react';
import cn from 'classnames';

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
  return (
    <div id="choice-bar-facets" className="flex flex-col">
      {facets.stores.length > 0 && (
        <>
          <span className="pt-3 text-lg font-bold">Stores</span>
          <div className="flex flex-col px-2">
            {facets.stores.map((store) => (
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
                      activeFilters.store === store.value ? null : store.value,
                  })
                }
              >{`${store.value} [${store.count}]`}</span>
            ))}
          </div>
        </>
      )}
      {facets.categories.length > 0 && (
        <>
          <span className="pt-3 text-lg font-bold">Categories</span>
          <div className="flex flex-col px-2">
            {facets.categories.map((category) => (
              <>
                <span
                  className={cn(
                    'cursor-pointer hover:underline active:text-primary-dark-10',
                    {
                      'font-bold': activeFilters.category === category.value,
                    }
                  )}
                  onClick={() =>
                    onFilterChange({
                      category:
                        activeFilters.category === category.value &&
                        activeFilters.subcategory1 === null
                          ? null
                          : category.value,
                      subcategory1: null,
                      subcategory2: null,
                    })
                  }
                >{`${category.value} [${category.count}]`}</span>
                {/* SUBCATEGORY 1 */}
                {activeFilters.category === category.value &&
                  category.subfacets.length > 0 && (
                    <div className="flex flex-col px-2 text-sm">
                      {category.subfacets.map((subcategory1) => (
                        <span
                          className={cn(
                            'cursor-pointer hover:underline active:text-primary-dark-10',
                            {
                              'font-bold':
                                activeFilters.subcategory1 ===
                                subcategory1.value,
                            }
                          )}
                          onClick={() =>
                            onFilterChange({
                              subcategory1:
                                activeFilters.subcategory1 ===
                                subcategory1.value
                                  ? null
                                  : subcategory1.value,
                              subcategory2: null,
                            })
                          }
                        >{`${subcategory1.value} [${subcategory1.count}]`}</span>
                      ))}
                    </div>
                  )}
              </>
            ))}
          </div>
        </>
      )}
      {facets.labels.length > 0 && (
        <>
          <span className="pt-3 text-lg font-bold">Labels</span>
          <div className="flex flex-col px-2">
            {facets.labels.map((label) => (
              <span
                className={cn(
                  'cursor-pointer hover:underline active:text-primary-dark-10',
                  {}
                )}
              >{`${label.value} [${label.count}]`}</span>
            ))}
          </div>
        </>
      )}
      {facets.brands.length > 0 && (
        <>
          <span className="pt-3 text-lg font-bold">Brands</span>
          <div className="flex flex-col px-2">
            {facets.brands.map((brand) => (
              <span
                className={cn(
                  'cursor-pointer hover:underline active:text-primary-dark-10',
                  {
                    'font-bold': activeFilters.brand === brand.value,
                  }
                )}
                onClick={() =>
                  onFilterChange({
                    brand:
                      activeFilters.brand === brand.value ? null : brand.value,
                  })
                }
              >{`${brand.value} [${brand.count}]`}</span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchChoiceBarFacets;
