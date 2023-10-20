import { INestedFilter } from 'gmc-types';
import React from 'react';
import { filterDeepEqual } from '../../../../lib/filter-helpers';
import { useShop } from '../../../Context/ShopProvider';
import NestedFacetItem from './FacetItems/NestedFacetItem';
import { useRouter } from 'next/router';

interface Props {}

const SearchChoiceBarLabelFacets: React.FC<Props> = () => {
  const shop = useShop();
  const router = useRouter();

  const handleSelectLabel = (selectedLabelFilter: INestedFilter) => {
    shop.search({
      // filterUpdates: {
      //   labels: [selectedLabelFilter, ...shop.request.filters.labels],
      // },
      addLabelFilter: selectedLabelFilter,
      noScroll: true,
    });
  };

  const handleRemoveLabel = (removedLabelFilter: INestedFilter) => {
    console.log('removing ' + JSON.stringify(removedLabelFilter));
    shop.search({
      filterUpdates: {
        labels: shop.request.filters.labels.filter(
          (l) => !filterDeepEqual(l, removedLabelFilter)
        ),
      },
      noScroll: true,
    });
  };

  return (
    <div className="flex w-full flex-col divide-y divide-secondary-dark-20">
      <span className="pl-2.5 text-lg font-bold">
        {router.query.labels ? 'ADDITIONAL LABELS' : 'LABELS'}
      </span>
      <div className="flex flex-col px-2 pl-3 pt-0.5 text-[17px]">
        {shop.response.facets.labels
          .filter(
            (l) => !router.query.labels || l.value !== router.query.labels[0]
          )
          .sort((a, b) => (a.value > b.value ? 1 : -1))
          .map((lab) => (
            <>
              <NestedFacetItem
                facetFilter={{
                  value: lab.value,
                  name: lab.name,
                }}
                activeFilters={shop.request.filters.labels}
                count={lab.count}
                color={shop.readBaseLabel(lab.value).color}
                onSelectFacet={handleSelectLabel}
                onClearFacet={handleRemoveLabel}
              />
              {/* 
                SUBLABEL 1
              */}
              <div className="flex flex-col pl-6 text-base">
                {lab.subfacets.map((sub1) => (
                  <>
                    <NestedFacetItem
                      facetFilter={{
                        value: lab.value,
                        name: lab.name,
                        subfilter: {
                          value: sub1.value,
                          name: sub1.name,
                        },
                      }}
                      activeFilters={shop.request.filters.labels}
                      count={sub1.count}
                      color={shop.readBaseLabel(lab.value).color}
                      onSelectFacet={handleSelectLabel}
                      onClearFacet={handleRemoveLabel}
                    />
                    {/* 
                      SUBLABEL 2
                    */}
                    <div className="flex flex-col pl-6 text-base">
                      {sub1.subfacets.map((sub2) => (
                        <NestedFacetItem
                          facetFilter={{
                            value: lab.value,
                            name: lab.name,
                            subfilter: {
                              value: sub1.value,
                              name: sub1.name,
                              subfilter: {
                                value: sub2.value,
                                name: sub2.name,
                              },
                            },
                          }}
                          activeFilters={shop.request.filters.labels}
                          count={sub1.count}
                          color={shop.readBaseLabel(lab.value).color}
                          onSelectFacet={handleSelectLabel}
                          onClearFacet={handleRemoveLabel}
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

export default SearchChoiceBarLabelFacets;
