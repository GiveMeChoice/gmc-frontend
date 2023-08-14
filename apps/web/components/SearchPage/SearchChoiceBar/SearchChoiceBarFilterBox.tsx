/* eslint-disable @next/next/no-img-element */
import {
  SearchFunctionFiltersDto,
  SearchFunctionKeyedFilterDto,
} from 'gmc-types';
import React, { useEffect, useState } from 'react';
import { useUser } from '../../UserProvider';
import SearchChoiceBarFilterChip from './SearchChoiceBarFilterBox/SearchChoiceBarFilterChip';
import SearchChoiceBarLabelChip from './SearchChoiceBarFilterBox/SearchChoiceBarLabelChip';

interface Props {
  filters: SearchFunctionFiltersDto;
  compareModeOn: boolean;
  onFilterChange: (updated: SearchFunctionFiltersDto) => void;
}

type DisplayFilters = {
  merchant?: string;
  brand?: SearchFunctionKeyedFilterDto;
  category?: string;
  priceRange?: string;
  // labels?: string[];
};

const SearchChoiceBarFilterBox: React.FC<Props> = ({
  filters,
  compareModeOn,
  onFilterChange,
}) => {
  const { profile } = useUser();
  const [displayFilters, setDisplayFilters] = useState<DisplayFilters>({});

  useEffect(() => {
    setDisplayFilters(convertFiltersToDisplay(filters));
  }, [filters]);

  const convertFiltersToDisplay = (
    filters: SearchFunctionFiltersDto
  ): DisplayFilters => {
    const display: DisplayFilters = {};
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
    if (filters.merchant) {
      display.merchant = filters.merchant;
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
    <div className="flex flex-col  bg-white py-7">
      <div className="flex items-center justify-between gap-x-4 px-7">
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
        {(Object.keys(displayFilters).length > 0 ||
          (filters.labels && Object.keys(filters.labels).length > 0)) && (
          <div
            className={`cursor-pointer rounded-sm border border-zinc-800 px-2 py-0.5 text-xs text-zinc-800 shadow-sm hover:bg-primary active:bg-primary-light-10`}
            onClick={() => {
              onFilterChange({
                brand: null,
                labels: [],
                category: null,
                priceRange: null,
                region: null,
                merchant: null,
              });
            }}
          >
            Clear All
          </div>
        )}
      </div>
      {(displayFilters.merchant ||
        displayFilters.category ||
        displayFilters.brand ||
        displayFilters.priceRange) && (
        <div className="flex flex-wrap items-center gap-y-3 pr-7 pl-2.5 pt-5">
          {displayFilters.merchant && (
            <SearchChoiceBarFilterChip
              onClick={handleFilterChipClick}
              name={'merchant'}
              value={displayFilters.merchant}
            />
          )}
          {displayFilters.category && (
            <SearchChoiceBarFilterChip
              onClick={handleFilterChipClick}
              name={'category'}
              value={displayFilters.category}
              invert={true}
            />
          )}
          {displayFilters.brand && (
            <SearchChoiceBarFilterChip
              onClick={handleFilterChipClick}
              name={'brand'}
              key={displayFilters.brand.key}
              value={displayFilters.brand.value}
              invert
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
        </div>
      )}
      {filters.labels && filters.labels.length > 0 && (
        <div className="flex flex-wrap items-center gap-y-3 pr-7 pl-2.5 pt-5 text-sm">
          {filters.labels.map((label, i) => (
            <SearchChoiceBarLabelChip
              onClick={handleLabelChipClick}
              index={i}
              label={label}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchChoiceBarFilterBox;
