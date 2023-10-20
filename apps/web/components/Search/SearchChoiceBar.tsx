/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useShop } from '../Context/ShopProvider';
import SearchChoiceBarFacetList from './SearchChoiceBar/SearchChoiceBarFacetList';
import SearchChoiceBarFilterBox from './SearchChoiceBar/SearchChoiceBarFilterBox';
import SearchChoiceBarSummary from './SearchChoiceBar/SearchChoiceBarSummary';

interface Props {
  summaryOn?: boolean;
}

const SearchChoiceBar: React.FC<Props> = ({ summaryOn }) => {
  const search = useShop();
  return (
    <div className={`flex h-full w-full flex-col`}>
      {summaryOn && <SearchChoiceBarSummary />}
      {search.response && <SearchChoiceBarFilterBox />}
      {search.searching || !search.response.facets ? (
        <div />
      ) : (
        <SearchChoiceBarFacetList />
      )}
    </div>
  );
};

export default SearchChoiceBar;
