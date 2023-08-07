import {
  SearchFunctionFiltersDto,
  SearchFunctionNestedFilterDto,
  TermFacetDto,
} from 'gmc-types';
import React from 'react';
import cn from 'classnames';
import * as deepEqual from 'deep-equal';
import { getLabelColor } from '../../../../lib/labels';
import LabelFacetItem from './FacetItems/LabelFacetItem';

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
        // updatedLabels = [...activeLabelFilters].filter(
        //   (f) => f.value !== labelFilter.value
        // );
        updatedLabels = [...activeLabelFilters];
      }
      updatedLabels.push(labelFilter);
    }
    console.log(updatedLabels);
    onFilterChange({
      labels: updatedLabels,
    });
  };

  return (
    <div className="flex w-full flex-col divide-y divide-secondary-dark-20">
      <span className="pl-2.5 text-lg font-bold">LABELS</span>
      <div className="flex flex-col px-2 pl-3 pt-0.5 text-[17px]">
        {labelFacets
          .sort((a, b) => (a.value > b.value ? 1 : -1))
          .map((labelFacet) => (
            <>
              <LabelFacetItem
                value={labelFacet.value}
                selected={
                  !!activeLabelFilters.find((f) =>
                    deepEqual(
                      f,
                      {
                        value: labelFacet.value,
                      },
                      { strict: true }
                    )
                  )
                }
                count={labelFacet.subfacets.length ? null : labelFacet.count}
                onClick={() =>
                  onLabelFacetClick({
                    value: labelFacet.value,
                  })
                }
              />
              {/* 
                SUBLABEL 1
              */}
              <div className="flex flex-col pl-6 text-base">
                {labelFacet.subfacets.map((sublabel1Facet) => (
                  <>
                    <LabelFacetItem
                      value={sublabel1Facet.value}
                      category={labelFacet.value}
                      count={sublabel1Facet.count}
                      selected={
                        !!activeLabelFilters.find((f) =>
                          deepEqual(
                            f,
                            {
                              value: labelFacet.value,
                              subfilter: {
                                value: sublabel1Facet.value,
                              },
                            },
                            { strict: true }
                          )
                        )
                      }
                      onClick={() =>
                        onLabelFacetClick({
                          value: labelFacet.value,
                          subfilter: {
                            value: sublabel1Facet.value,
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

export default SearchChoiceBarLabelFacets;
