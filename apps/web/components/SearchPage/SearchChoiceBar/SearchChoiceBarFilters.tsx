/* eslint-disable @next/next/no-img-element */
import {
  SearchFunctionFiltersDto,
  SearchFunctionKeyedFilterDto,
} from 'gmc-types';
import React, { useEffect, useState } from 'react';
import { getUserTheme } from '../../../lib/theme';
import { useUser } from '../../UserProvider';
import SearchChoiceBarFilterChip from './SearchChoiceBarFilterChip';
import SearchChoiceBarLabelChip from './SearchChoiceBarLabelChip';

interface Props {
  filters: SearchFunctionFiltersDto;
  compareModeOn: boolean;
  onFilterChange: (updated: SearchFunctionFiltersDto) => void;
}

interface IDisplayFilters {
  store?: string;
  brand?: SearchFunctionKeyedFilterDto;
  category?: string;
  priceRange?: string;
  labels?: string[];
}

const SearchChoiceBarFilters: React.FC<Props> = ({
  filters,
  compareModeOn,
  onFilterChange,
}) => {
  const { profile } = useUser();
  const [displayFilters, setDisplayFilters] = useState<IDisplayFilters>({});

  useEffect(() => {
    setDisplayFilters(convertFiltersToDisplay(filters));
  }, [filters]);

  const convertFiltersToDisplay = (
    filters: SearchFunctionFiltersDto
  ): IDisplayFilters => {
    const display: IDisplayFilters = {};
    if (filters.category) {
      display.category = filters.category.value;
      if (filters.category.subfilter) {
        display.category += ` > ${filters.category.subfilter.value}`;
        if (filters.category.subfilter.subfilter) {
          display.category += ` > ${filters.category.subfilter.subfilter.value}`;
        }
      }
    }
    if (filters.brand) {
      display.brand = filters.brand;
    }
    if (filters.store) {
      display.store = filters.store;
    }
    if (filters.labels.length > 0) {
      display.labels = [];
      filters.labels.forEach((labelFilter) => {
        let labeldisplay = labelFilter.value;
        if (labelFilter.subfilter) {
          labeldisplay += ` > ${labelFilter.subfilter.value}`;
          if (labelFilter.subfilter.subfilter) {
            labeldisplay += ` > ${labelFilter.subfilter.subfilter.value}`;
          }
        }
        display.labels.push(labeldisplay);
      });
    }
    if (filters.priceRange) {
      display.priceRange = filters.priceRange;
    }
    return display;
  };

  const handleFilterChipClick = (name: string) => {
    {
      delete filters[name];
      onFilterChange(filters);
    }
  };

  const handleLabelChipClick = (index: number) => {
    {
      onFilterChange({
        labels: filters.labels.filter((x, i) => i !== index),
      });
    }
  };

  return (
    <div
      id="choice-bar-filters"
      className="flex flex-col gap-4 border-t border-black pt-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            draggable={false}
            src="/img/filters-icon.png"
            alt="Filters Icon"
            height={20}
            width={20}
          />
          <span className="text-xl">Filters</span>
        </div>
        {Object.keys(displayFilters).length > 0 && (
          <div
            className={`cursor-pointer rounded-full border border-zinc-800 bg-${
              getUserTheme(profile).base
            } px-2 py-0.5 text-xs text-zinc-800 shadow-sm hover:bg-zinc-200 active:bg-zinc-300`}
            onClick={() => {
              onFilterChange({
                brand: null,
                labels: [],
                category: null,
                priceRange: null,
                region: null,
                store: null,
              });
            }}
          >
            Clear All
          </div>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-x-2.5 text-sm">
        {displayFilters.store && (
          <SearchChoiceBarFilterChip
            onClick={handleFilterChipClick}
            name={'store'}
            value={displayFilters.store}
          />
        )}
        {displayFilters.category && (
          <SearchChoiceBarFilterChip
            onClick={handleFilterChipClick}
            name={'category'}
            value={displayFilters.category}
          />
        )}
        {displayFilters.brand && (
          <SearchChoiceBarFilterChip
            onClick={handleFilterChipClick}
            name={'brand'}
            key={displayFilters.brand.key}
            value={displayFilters.brand.value}
          />
        )}
        {displayFilters.priceRange && (
          <SearchChoiceBarFilterChip
            onClick={handleFilterChipClick}
            name={'priceRange'}
            key={displayFilters.priceRange}
            value={
              displayFilters.priceRange === 'cheap'
                ? '£ 0 - £ 15'
                : displayFilters.priceRange === 'average'
                ? '£ 15 - £ 100'
                : '£ 100 +'
            }
          />
        )}
        {displayFilters.labels &&
          displayFilters.labels.map((labelName, i) => (
            <SearchChoiceBarLabelChip
              onClick={handleLabelChipClick}
              index={i}
              value={labelName}
            />
          ))}
      </div>
    </div>
  );
};

export default SearchChoiceBarFilters;
