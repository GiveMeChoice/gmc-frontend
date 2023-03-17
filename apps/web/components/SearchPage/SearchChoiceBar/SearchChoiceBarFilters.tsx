/* eslint-disable @next/next/no-img-element */
import cn from 'classnames';
import { SearchFunctionFiltersDto } from 'gmc-types';
import React, { useEffect, useState } from 'react';

interface Props {
  filters: SearchFunctionFiltersDto;
  compareModeOn: boolean;
  onFilterChange: (updated: SearchFunctionFiltersDto) => void;
}

const SearchChoiceBarFilters: React.FC<Props> = ({
  filters,
  compareModeOn,
  onFilterChange,
}) => {
  const [displayFilters, setDisplayFilters] =
    useState<SearchFunctionFiltersDto>({});

  useEffect(() => {
    let category = null;
    if (filters.category) {
      category = filters.category;
      if (filters.subcategory1) category += ` > ${filters.subcategory1}`;
      if (filters.subcategory2) category += ` > ${filters.subcategory2}`;
    }
    let label = null;
    if (filters.label) {
      label = filters.label;
      if (filters.sublabel1) label += ` > ${filters.sublabel1}`;
      if (filters.sublabel2) label += ` > ${filters.sublabel2}`;
    }
    const displayed = {
      ...filters,
      category,
      label,
    };
    delete displayed.region;
    delete displayed.subcategory1;
    delete displayed.subcategory2;
    delete displayed.sublabel1;
    delete displayed.sublabel2;
    console.log('To Display: ', displayed);
    setDisplayFilters(displayed);
  }, [filters]);

  const handleRemoveFilter = (e) => {
    {
      delete filters[e.target.id];
      if (e.target.id === 'category') {
        delete filters.subcategory1;
        delete filters.subcategory2;
      }
      if (e.target.id === 'label') {
        delete filters.sublabel1;
        delete filters.sublabel2;
      }
      onFilterChange(filters);
    }
  };

  return (
    <div id="choice-bar-filters" className="flex flex-col gap-4">
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
      <div className="flex flex-wrap gap-x-3 gap-y-2 text-sm">
        {Object.keys(displayFilters).map((key) => (
          <>
            {key !== 'region' && filters[key] && (
              <div className="">
                <span
                  id={key}
                  className={cn(
                    'peer cursor-pointer rounded-full border border-zinc-800 px-2.5 py-1.5 shadow-sm',
                    {
                      'bg-gmc-berry-light-30 hover:bg-gmc-berry-light-20':
                        key === 'category',
                      'bg-gmc-forest-light-40 hover:bg-gmc-forest-light-30':
                        key === 'store',
                      'bg-gmc-surf-light-30 hover:bg-gmc-surf-light-10':
                        key === 'brand',
                    }
                  )}
                  title={key}
                  onClick={handleRemoveFilter}
                >
                  {displayFilters[key]}
                </span>
                <div className="relative bottom-3/4 right-2 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full border border-black bg-primary text-center text-xs opacity-0 peer-hover:opacity-100 peer-active:bg-primary-dark-10">
                  X
                </div>
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default SearchChoiceBarFilters;
