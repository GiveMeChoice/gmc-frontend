/* eslint-disable @next/next/no-img-element */
import {
  SearchFunctionFiltersDto,
  SearchFunctionRequestDto,
  SearchFunctionResponseDto,
} from 'gmc-types';
import React, { useState } from 'react';
import SearchChoiceBarFacetList from './SearchChoiceBar/SearchChoiceBarFacetList';
import SearchChoiceBarFilterBox from './SearchChoiceBar/SearchChoiceBarFilterBox';
import SearchChoiceBarSummary from './SearchChoiceBar/SearchChoiceBarSummary';

interface Props {
  loading: boolean;
  searchResponse: SearchFunctionResponseDto;
  compareModeOn: boolean;
  onCompareModeChange: (on: boolean) => void;
  onSearch: (
    req: SearchFunctionRequestDto
  ) => Promise<SearchFunctionResponseDto>;
}

const SearchChoiceBar: React.FC<Props> = ({
  loading,
  searchResponse,
  compareModeOn,
  onSearch,
  onCompareModeChange,
}) => {
  const [activeFilters, setActiveFilters] = useState<SearchFunctionFiltersDto>(
    {}
  );

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
      page: searchResponse.page,
      pageSize: searchResponse.pageSize,
      filters: updatedFilters,
    });
    setActiveFilters(updatedFilters);
  };

  const handleSortChange = async (updatedSort: string) => {
    onSearch({
      query: searchResponse.query,
      sort: updatedSort,
      page: searchResponse.page,
      pageSize: searchResponse.pageSize,
      filters: activeFilters,
    });
  };

  return (
    <div className={`flex h-full w-full flex-col divide-y-1.5 divide-black`}>
      <SearchChoiceBarSummary
        loading={loading}
        searchResponse={searchResponse}
        compareModeOn={compareModeOn}
        onCompareModeChange={onCompareModeChange}
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
