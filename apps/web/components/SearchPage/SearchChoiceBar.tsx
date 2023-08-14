/* eslint-disable @next/next/no-img-element */
import {
  SearchFunctionFiltersDto,
  SearchFunctionRequestDto,
  SearchFunctionResponseDto,
} from 'gmc-types';
import React from 'react';
import SearchChoiceBarFacetList from './SearchChoiceBar/SearchChoiceBarFacetList';
import SearchChoiceBarFilterBox from './SearchChoiceBar/SearchChoiceBarFilterBox';
import SearchChoiceBarSummary from './SearchChoiceBar/SearchChoiceBarSummary';

interface Props {
  loading: boolean;
  searchResponse: SearchFunctionResponseDto;
  compareModeOn: boolean;
  removeCompareMode: () => void;
  activeFilters: SearchFunctionFiltersDto;
  setActiveFilters: (filters: SearchFunctionFiltersDto) => void;
  onSearch: (
    req: SearchFunctionRequestDto
  ) => Promise<SearchFunctionResponseDto>;
}

const SearchChoiceBar: React.FC<Props> = ({
  loading,
  searchResponse,
  compareModeOn,
  activeFilters,
  setActiveFilters,
  onSearch,
  removeCompareMode,
}) => {
  const handleFilterChange = async (
    changedFilters: SearchFunctionFiltersDto
  ) => {
    const updatedFilters = {
      ...activeFilters,
      ...changedFilters,
    };
    onSearch({
      query: searchResponse.query,
      sort: searchResponse.sort,
      page: 0,
      pageSize: searchResponse.pageSize,
      filters: updatedFilters,
    });
    setActiveFilters(updatedFilters);
  };

  const handleSortChange = async (updatedSort: string) => {
    onSearch({
      query: searchResponse.query,
      sort: updatedSort,
      page: 0,
      pageSize: searchResponse.pageSize,
      filters: activeFilters,
    });
  };

  return (
    <div
      className={`flex h-full w-full flex-col divide-secondary-dark-10 border-b-1.5 border-secondary-dark-10`}
    >
      <SearchChoiceBarSummary
        loading={loading}
        searchResponse={searchResponse}
        compareModeOn={compareModeOn}
        removeCompareMode={removeCompareMode}
        onSortChange={handleSortChange}
      />
      {searchResponse && (
        <SearchChoiceBarFilterBox
          filters={activeFilters}
          compareModeOn={compareModeOn}
          onFilterChange={handleFilterChange}
        />
      )}
      {loading || !searchResponse.facets ? (
        <div />
      ) : (
        <SearchChoiceBarFacetList
          facets={searchResponse.facets}
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
        />
      )}
    </div>
  );
};

export default SearchChoiceBar;
