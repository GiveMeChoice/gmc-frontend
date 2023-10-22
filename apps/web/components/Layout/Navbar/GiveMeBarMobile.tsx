import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import Image from 'next/image';
import SearchSuggestions from './GiveMeBarNav/SearchSuggestions';
import { useShop } from '../../Context/ShopProvider';

const GiveMeBarMobile: React.FC = () => {
  const [searchModeOn, setSearchModeOn] = useState(false);
  const [query, setQuery] = useState('');
  const shop = useShop();
  const router = useRouter();
  const [suggestions, setSuggestions] = useState<string[]>([
    'Something',
    'Something else',
    'Something I havent',
    'Something I havent even',
    'Something I havent even thought',
    'Something else I havent thought of',
  ]);
  const [suggestionIndex, setSuggestionIndex] = useState(null);
  const [lastTypedQuery, setLastTypedQuery] = useState('');

  useEffect(() => {
    // if (router.isReady) {
    //   setQuery(router.query.q ? (router.query.q as string) : '');
    // }
    // if (router.pathname === '/shop/search' && !router.query.q) {
    //   document.getElementById('gmc-search-bar-mobile').focus();
    // } else {
    // }
    document.getElementById('gmc-search-bar-mobile').blur();
    const suggestionClickHandler = (e) => {
      e.preventDefault();
    };
    const suggestionsBox = document.getElementById('suggestions-box');
    suggestionsBox.addEventListener('mousedown', suggestionClickHandler);
    return () => {
      suggestionsBox.removeEventListener('mousedown', suggestionClickHandler);
    };
  }, [router.isReady, router.pathname, router]);

  const handleSearch = (q?: string) => {
    setQuery('');
    setSearchModeOn(false);
    if (q) {
      shop.search({
        q: q,
        searchPageRequest: true,
        basePath: '/shop/search/',
      });
    } else {
      document.getElementById('gmc-search-bar-mobile').focus();
    }
  };

  const handleAdoptSuggestion = (index: number) => {
    setSuggestionIndex(index);
    setQuery(suggestions[index]);
    return suggestions[index];
  };

  const handleSelectSuggestion = (index: number) => {
    const suggestion = handleAdoptSuggestion(index);
    handleSearch(suggestion);
  };

  const startSearchMode = () => {
    if (!searchModeOn) {
      setSearchModeOn(true);
      document.getElementById('gmc-search-bar-mobile').focus();
    }
  };

  const stopSearchMode = () => {
    setQuery('');
    setSearchModeOn(false);
  };

  const updateSuggestions = (q: string) => {
    setSuggestions([
      q + 'a',
      q + 'abc',
      q + ' sustainable',
      q + 'abcde',
      'organic ' + q,
      q + q,
      q + 'abcdefg',
      q + 'abcdefg',
      q + 'abcdefg',
      q + 'abcdefg',
    ]);
  };

  return (
    <div
      className={cn('z-20 h-fit w-fit', {
        'fixed top-0 left-0 flex h-screen w-screen flex-col justify-start overflow-hidden bg-white':
          searchModeOn,
      })}
    >
      <div
        id="give-me-bar"
        className={cn(
          'z-20 flex h-[46px] items-center justify-start gap-y-1 md:hidden md:flex-nowrap',
          {
            'w-fit': !searchModeOn,
            'w-full flex-col py-5 px-9 sm:px-20': searchModeOn,
          }
        )}
      >
        <button
          className={cn(
            'flex h-fit w-fit cursor-pointer items-end rounded-full bg-zinc-900 duration-200'
          )}
          onClick={startSearchMode}
        >
          <span
            className={cn(
              'z-20 flex h-[37px] w-[145px] -translate-y-[1px] translate-x-[1px] cursor-pointer select-none items-center justify-center rounded-full border  border-black bg-primary transition-transform duration-200 ease-in-out hover:-translate-y-[4px] hover:translate-x-[3px] active:-translate-y-[1px] active:translate-x-[1px]',
              {
                '-translate-y-[4px] translate-x-[3px]': searchModeOn,
              }
            )}
          >
            <Image
              className="h-fit select-none rounded-full"
              draggable={false}
              src="/img/GIVE_ME.svg"
              alt="give me"
              width="128"
              height="33"
              priority
            />
          </span>
        </button>

        <div className="flex h-full w-full flex-col items-center">
          <div className="flex h-full w-full flex-col items-start">
            <input
              id="gmc-search-bar-mobile"
              style={{ WebkitAppearance: 'none' }}
              className={cn(
                'peer min-h-[44px] w-full flex-wrap border-b-[3px] border-black bg-inherit text-center outline-none transition-width duration-500 ease-in-out placeholder:pb-0 placeholder:text-[33px] placeholder:text-zinc-900  focus:text-[27px] focus:placeholder-transparent md:text-left',
                {
                  'w-full px-4 text-[27px]': query || searchModeOn,
                  'w-[108px] pl-1 text-4xl focus:pl-2.5 focus:text-[27px]':
                    !query && !searchModeOn,
                }
              )}
              value={query}
              autoComplete="off"
              placeholder={
                router.route !== '/' && !searchModeOn ? 'Choice' : null
              }
              onFocusCapture={() => setSearchModeOn(true)}
              onChange={(e) => {
                setSuggestionIndex(null);
                setLastTypedQuery(e.target.value);
                setQuery(e.target.value);
                updateSuggestions(e.target.value);
              }}
              onFocus={startSearchMode}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  if (query) {
                    handleSearch(query);
                  }
                } else if (e.key === 'ArrowUp') {
                  e.preventDefault();
                  if (suggestionIndex > 0) {
                    handleAdoptSuggestion(suggestionIndex - 1);
                  } else if (suggestionIndex === 0) {
                    setSuggestionIndex(null);
                    setQuery(lastTypedQuery);
                  }
                } else if (e.key === 'ArrowDown') {
                  // if (query) {
                  if (suggestionIndex === null) {
                    handleAdoptSuggestion(0);
                  } else if (suggestionIndex < suggestions.length - 1) {
                    handleAdoptSuggestion(suggestionIndex + 1);
                  }
                  // }
                } else if (e.key === 'Escape') {
                  document.getElementById('gmc-search-bar-mobile').blur();
                }
              }}
            />
            <button
              className={cn(
                'relative left-[102%] -top-[30px] flex aspect-square h-5 w-5 items-center justify-center rounded-full border-1.5 border-zinc-700  pb-1 text-zinc-700 opacity-0 transition-colors',
                {
                  'bg- -translate-x-6 duration-100 hover:border-zinc-800 hover:text-zinc-800 hover:opacity-90 active:bg-secondary-dark-10 peer-hover:opacity-90 peer-focus:opacity-90':
                    query,
                  'opacity-0': !query,
                }
              )}
              onClick={() => {
                setQuery('');
                document.getElementById('gmc-search-bar-mobile').focus();
              }}
            >
              <span>&times;</span>
            </button>
          </div>
        </div>
      </div>
      {searchModeOn && (
        <div
          id="suggestions-box"
          className={cn(
            'w-screen translate-y-[88px] flex-col border-t-1.5 border-black bg-white bg-opacity-[1] pr-5 pb-3.5 pt-1.5 text-zinc-600 shadow-sm peer-focus:flex',
            {
              // 'hidden peer-focus:flex': query,
              // // 'peer-focus:flex': query,
              // hidden: !query,
            }
          )}
        >
          <SearchSuggestions
            suggestions={suggestions}
            activeIndex={suggestionIndex}
            onClick={handleSelectSuggestion}
            onHover={setSuggestionIndex}
          />
        </div>
      )}
      {searchModeOn && (
        <button
          className={cn(
            'absolute left-5 top-4 z-30 flex aspect-square h-8 flex-col items-center justify-center rounded-full border-1.5 border-black bg-secondary pt-0.5 hover:scale-[1.03] hover:bg-secondary',
            {}
          )}
          onClick={stopSearchMode}
        >
          <div className="w-6 -translate-x-[0px] rotate-45 border-b-1.5 border-black" />
          <div className="w-6 translate-x-[0px] -translate-y-[2px] -rotate-45 border-b-1.5 border-black" />
        </button>
      )}
    </div>
  );
};

export default GiveMeBarMobile;
