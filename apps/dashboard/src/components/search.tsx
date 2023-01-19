/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import ScreenSection from './screen/screen-section';
import cn from 'classnames';
import {
  useData,
  useDataDispatch,
} from '@root/context-providers/data.provider';
import productsService from '@root/services/products.service';
import LoadingWheel from './loading-wheel';
import ListProduct from './search-screen/list-product';
const GiveMeLogo = require('../assets/images/GIVE_ME.svg');

const SearchScreen: React.FC = () => {
  const [query, setQuery] = useState('');
  const { searchQuery, searchResults } = useData();
  const dataDispatch = useDataDispatch();

  const handleSearch = () => {
    dataDispatch({
      type: 'START_SEARCH',
      value: query,
    });
    productsService
      .search(query)
      .then((results) => {
        dataDispatch({
          type: 'SET_SEARCH_RESULTS',
          value: results,
        });
      })
      .catch((e) => {
        console.error(e);
        dataDispatch({
          type: 'SET_SEARCH_RESULTS',
          value: [],
        });
      });
    setQuery('');
  };

  const getResultsTitle = () => {
    if (!searchResults) {
      return `Searching for "${searchQuery}" ...`;
    } else if (!searchQuery) {
      return 'Search to Get Choices';
    } else {
      return searchResults.length
        ? `Top Choices for "${searchQuery}"`
        : `No Choices Currently Available for "${searchQuery}"`;
    }
  };

  return (
    <>
      <ScreenSection>
        <div className="flex p-3 pt-5">
          <button
            id="search-button"
            className={cn(
              'max-w flex w-1/3 cursor-pointer rounded-full bg-primary shadow-md shadow-slate-800 duration-100 active:shadow-sm active:shadow-slate-800'
            )}
            disabled={!query}
            onClick={handleSearch}
          >
            <img
              className="h-fit p-3 "
              draggable={false}
              src={GiveMeLogo}
              alt="give me"
            />
          </button>
          <div id="query-input" className="ml-2 flex w-full pr-8">
            <input
              id="gmc-search-bar"
              className="w-full border-b-2 border-black bg-inherit pl-2.5 text-3xl outline-none"
              value={query}
              autoComplete="off"
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  if (query) {
                    handleSearch();
                  }
                }
              }}
            />
          </div>
        </div>
      </ScreenSection>
      <ScreenSection>
        <div className="w-full pt-2">
          <div className="mt-5 mb-7 flex items-center">
            <span className="px-6 text-lg font-bold">{getResultsTitle()}</span>
            {!searchResults && <LoadingWheel size="h-8" />}
          </div>
          {searchResults && (
            <div className="flex h-full w-full flex-wrap items-center justify-center">
              {searchResults.map((product, i) => (
                <ListProduct product={product} key={i} />
              ))}
            </div>
          )}
        </div>
      </ScreenSection>
    </>
  );
};

export default SearchScreen;
