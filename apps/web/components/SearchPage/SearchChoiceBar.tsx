/* eslint-disable @next/next/no-img-element */
import { SearchFunctionFacetsDto, SearchFunctionFiltersDto } from 'gmc-types';
import React from 'react';
import { getUserTheme } from '../../lib/theme';
import { useUser } from '../UserProvider';
import SearchChoiceBarFacets from './SearchChoiceBar/SearchChoiceBarFacets';
import SearchChoiceBarFilters from './SearchChoiceBar/SearchChoiceBarFilters';
import SearchChoiceBarSummary from './SearchChoiceBar/SearchChoiceBarSummary';

interface Props {
  loading: boolean;
  hits: number;
  filters: SearchFunctionFiltersDto;
  facets: SearchFunctionFacetsDto;
  sort: string;
  compareModeOn: boolean;
  onFilterChange: (filters: SearchFunctionFiltersDto) => void;
  onCompareModeChange: (on: boolean) => void;
  onSortChange: (sort: string) => void;
}

const SearchChoiceBar: React.FC<Props> = ({
  loading,
  hits,
  filters,
  facets,
  sort,
  compareModeOn,
  onFilterChange,
  onCompareModeChange,
  onSortChange,
}) => {
  const { profile } = useUser();

  return (
    <div
      className={`flex flex-col border-black bg-${
        getUserTheme(profile).modal
      } h-full  dark:border-white md:w-1/3  md:border-r-1.5 xl:w-1/4`}
      id="choice-bar-container"
    >
      <SearchChoiceBarSummary
        loading={loading}
        hits={hits}
        sort={sort}
        compareModeOn={compareModeOn}
        onCompareModeChange={onCompareModeChange}
        onSortChange={onSortChange}
      />
      <SearchChoiceBarFilters
        filters={filters}
        compareModeOn={compareModeOn}
        onFilterChange={onFilterChange}
      />
      {!loading && (
        <SearchChoiceBarFacets
          facets={facets}
          activeFilters={filters}
          onFilterChange={onFilterChange}
        />
      )}
    </div>
  );
};

export default SearchChoiceBar;
