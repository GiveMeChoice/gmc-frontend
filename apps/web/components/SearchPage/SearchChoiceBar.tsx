/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useSearch } from '../SearchProvider';
import SearchChoiceBarFacetList from './SearchChoiceBar/SearchChoiceBarFacetList';
import SearchChoiceBarFilterBox from './SearchChoiceBar/SearchChoiceBarFilterBox';
import SearchChoiceBarSummary from './SearchChoiceBar/SearchChoiceBarSummary';

interface Props {}

const SearchChoiceBar: React.FC<Props> = ({}) => {
  const search = useSearch();
  return (
    <div
      className={`border--1.5 flex h-full w-full flex-col divide-secondary-dark-10 border-secondary-dark-10`}
    >
      <SearchChoiceBarSummary />
      {search.response && <SearchChoiceBarFilterBox />}
      {search.loading || !search.response.facets ? (
        <div />
      ) : (
        <SearchChoiceBarFacetList />
      )}
    </div>
  );
};

export default SearchChoiceBar;
