import {
  SearchFunctionFiltersDto,
  SearchFunctionNestedFilterDto,
  TermFacetDto,
} from 'gmc-types';
import React from 'react';
import cn from 'classnames';
import * as deepEqual from 'deep-equal';

interface Props {
  activeLabelFilters?: SearchFunctionNestedFilterDto[];
  labelFacets: TermFacetDto[];
  onFilterChange: (updated: SearchFunctionFiltersDto) => void;
}

const SearchChoiceBarLabelFacets: React.FC<Props> = ({
  activeLabelFilters,
  labelFacets,
  onFilterChange,
}) => {
  const onLabelFacetClick = (labelFilter: SearchFunctionNestedFilterDto) => {
    let updatedLabels = [];
    if (
      activeLabelFilters &&
      activeLabelFilters.find((f) =>
        deepEqual(f, labelFilter, { strict: true })
      )
    ) {
      updatedLabels = [...activeLabelFilters].filter(
        (f) => !deepEqual(f, labelFilter)
      );
    } else {
      // remove any parent label from list before adding new child
      if (activeLabelFilters) {
        updatedLabels = [...activeLabelFilters].filter(
          (f) => f.value !== labelFilter.value
        );
      }
      updatedLabels.push(labelFilter);
    }
    onFilterChange({
      labels: updatedLabels,
    });
  };

  return (
    <div className="flex w-full flex-col divide-y divide-secondary-dark-30">
      <span className="pl-1.5 text-lg font-bold">Labels</span>
      <div className="text-md flex flex-col px-2 pl-2.5 pt-0.5">
        {labelFacets
          .sort((a, b) => (a.value > b.value ? 1 : -1))
          .map((labelFacet) => (
            <>
              <div className="flex items-center gap-x-1">
                {activeLabelFilters &&
                  activeLabelFilters.find((labelFilter) =>
                    deepEqual(labelFilter, {
                      value: labelFacet.value,
                    })
                  ) && (
                    <div
                      className={cn(
                        'h-3 w-3 rounded-full border border-zinc-900',
                        {
                          'bg-primary': labelFacet.value === 'Certifications',
                          'bg-gmc-beach-light-10':
                            labelFacet.value === 'Origin',
                          'bg-gmc-soil-light-50':
                            labelFacet.value === 'Uncategorized',
                        }
                      )}
                    />
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
                  <span className="text-sm"> ({`${labelFacet.count}`})</span>
                </span>
              </div>
              {/* 
                      SUBLABEL 1
                    */}
              {activeLabelFilters &&
                activeLabelFilters.find(
                  (f) => f.value === labelFacet.value
                ) && (
                  <div className="flex flex-col px-5 text-sm">
                    {labelFacet.subfacets.map((sublabel1Facet) => (
                      <>
                        <div className="flex items-center gap-x-1">
                          {activeLabelFilters.find((labelFilter) =>
                            deepEqual(labelFilter, {
                              value: labelFacet.value,
                              subfilter: {
                                value: sublabel1Facet.value,
                              },
                            } as SearchFunctionNestedFilterDto)
                          ) && (
                            <div
                              className={cn(
                                'h-3 w-3 rounded-full border border-zinc-900',
                                {
                                  'bg-primary':
                                    labelFacet.value === 'Certifications',
                                  'bg-gmc-beach-light-10':
                                    labelFacet.value === 'Origin',
                                  'bg-gmc-soil-light-50':
                                    labelFacet.value === 'Uncategorized',
                                }
                              )}
                            />
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
    </div>
  );
};

export default SearchChoiceBarLabelFacets;
