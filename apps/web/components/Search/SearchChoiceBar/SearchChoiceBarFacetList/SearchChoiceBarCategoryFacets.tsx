import { INestedFilter } from 'gmc-types';
import React from 'react';
import { useShop } from '../../../Context/ShopProvider';
import NestedFacetItem from './FacetItems/NestedFacetItem';

interface Props {}

const SearchChoiceBarCategoryFacets: React.FC<Props> = ({}) => {
  const shop = useShop();

  const handleSelectCategory = (categoryFilter: INestedFilter) => {
    shop.search({
      filterUpdates: {
        category: categoryFilter,
      },
      noScroll: true,
    });
  };

  const handleRemoveCategory = () => {
    shop.search({
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
        {shop.response.facets.categories
          .sort((a, b) => (a.value > b.value ? 1 : -1))
          .map((cat) => (
            <>
              <NestedFacetItem
                facetFilter={{
                  value: cat.value,
                  name: cat.name,
                }}
                color={shop.readBaseCategory(cat.value).color}
                activeFilters={[shop.request.filters.category]}
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
                    <NestedFacetItem
                      facetFilter={{
                        value: cat.value,
                        name: cat.name,
                        subfilter: {
                          value: sub1.value,
                          name: sub1.name,
                        },
                      }}
                      color={shop.readBaseCategory(cat.value).color}
                      activeFilters={[shop.request.filters.category]}
                      count={sub1.count}
                      onSelectFacet={handleSelectCategory}
                      onClearFacet={handleRemoveCategory}
                    />
                    {/* 
                SUBCATEGORY 2
              */}
                    <div className="flex flex-col pl-6 text-base">
                      {sub1.subfacets.map((sub2) => (
                        <NestedFacetItem
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
                          color={shop.readBaseCategory(cat.value).color}
                          activeFilters={[shop.request.filters.category]}
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
