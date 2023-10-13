import { NestedFilterDto } from 'gmc-types';
import React from 'react';
import { filterDeepEqual } from '../../../../lib/deep-equal';
import { useSearch } from '../../../SearchProvider';
import FacetItem from './FacetItems/FacetItem';
import { useRouter } from 'next/router';

interface Props {}

const SearchChoiceBarLabelFacets: React.FC<Props> = () => {
  const search = useSearch();
  const router = useRouter();

  const handleSelectLabel = (selectedLabelFilter: NestedFilterDto) => {
    search.execute({
      filterUpdates: {
        labels: [selectedLabelFilter, ...search.request.filters.labels],
      },
      noScroll: true,
    });
  };

  const handleRemoveLabel = (removedLabelFilter: NestedFilterDto) => {
    console.log('removing ' + JSON.stringify(removedLabelFilter));
    search.execute({
      filterUpdates: {
        labels: search.request.filters.labels.filter(
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
        {search.response.facets.labels
          .filter(
            (l) => !router.query.labels || l.value !== router.query.labels[0]
          )
          .sort((a, b) => (a.value > b.value ? 1 : -1))
          .map((lab) => (
            <>
              <FacetItem
                facetFilter={{
                  value: lab.value,
                  name: lab.name,
                }}
                activeFilters={search.request.filters.labels}
                count={lab.count}
                onSelectFacet={handleSelectLabel}
                onClearFacet={handleRemoveLabel}
              />
              {/* 
                SUBLABEL 1
              */}
              <div className="flex flex-col pl-6 text-base">
                {lab.subfacets.map((sub1) => (
                  <>
                    <FacetItem
                      facetFilter={{
                        value: lab.value,
                        name: lab.name,
                        subfilter: {
                          value: sub1.value,
                          name: sub1.name,
                        },
                      }}
                      activeFilters={search.request.filters.labels}
                      count={sub1.count}
                      onSelectFacet={handleSelectLabel}
                      onClearFacet={handleRemoveLabel}
                    />
                    {/* 
                SUBLABEL 2
              */}
                    <div className="flex flex-col pl-6 text-base">
                      {sub1.subfacets.map((sub2) => (
                        <FacetItem
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
                          activeFilters={search.request.filters.labels}
                          count={sub1.count}
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
