import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import Image from 'next/image';
import SearchSuggestions from './GiveMeBarNav/SearchSuggestions';
import { useShop } from '../../Context/ShopProvider';

const GiveMeBarNav: React.FC = () => {
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
    if (router.isReady) {
      setQuery(router.query.q ? (router.query.q as string) : '');
    }
    if (router.pathname === '/shop/search' && !router.query.q) {
      document.getElementById('gmc-search-bar').focus();
    } else {
      document.getElementById('gmc-search-bar').blur();
    }
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
    if (q) {
      shop.search({
        q: q,
        searchPageRequest: true,
        basePath: '/shop/search/',
      });
    } else {
      document.getElementById('gmc-search-bar').focus();
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
      id="give-me-bar-nav"
      className={cn(
        'z-20 hidden h-[46px] w-full flex-wrap items-end justify-start gap-y-2.5 md:flex md:flex-nowrap'
      )}
    >
      <button
        className={cn(
          'flex h-fit w-fit cursor-pointer items-end rounded-full bg-zinc-900 duration-200'
        )}
        onClick={() => handleSearch(query)}
      >
        <span
          className={cn(
            'z-20 flex h-[44px] w-[182px] -translate-y-[1px] translate-x-[1px] cursor-pointer select-none items-center justify-center rounded-full border  border-black bg-primary transition-transform duration-200 ease-in-out hover:-translate-y-[4px] hover:translate-x-[4px] active:-translate-y-[1px] active:translate-x-[1px]',
            {}
          )}
        >
          <Image
            className="h-fit select-none rounded-full"
            draggable={false}
            src="/img/GIVE_ME.svg"
            alt="give me"
            width="162"
            height="40"
            priority
          />
        </span>
      </button>

      <div className="flex h-full w-full flex-col items-center">
        <div className="flex h-full w-full flex-col items-start">
          <input
            id="gmc-search-bar"
            className={cn(
              'peer min-h-[46px] border-b-[3px] border-black bg-inherit text-center outline-none transition-width duration-700 ease-in-out placeholder:pb-0 placeholder:text-[38px] placeholder:text-zinc-900 focus:w-full focus:pl-2.5 focus:text-[31px] focus:placeholder-transparent md:text-left',
              {
                'w-full pr-6 pl-2.5 text-[31px]': query,
                'w-[132px] pl-[6px] text-4xl focus:pl-2.5 focus:text-[31px]':
                  !query,
              }
            )}
            value={query}
            autoComplete="off"
            placeholder={router.route !== '/' ? 'Choice' : null}
            onChange={(e) => {
              setSuggestionIndex(null);
              setLastTypedQuery(e.target.value);
              setQuery(e.target.value);
              updateSuggestions(e.target.value);
            }}
            onFocus={() => {
              setSuggestionIndex(null);
            }}
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
                document.getElementById('gmc-search-bar').blur();
              }
            }}
          />
          <button
            className={cn(
              'text-secondary-zinc-900 relative left-full -top-9 flex aspect-square h-6 w-6 items-center justify-center rounded-full border-1.5  border-zinc-800 pb-1 opacity-0 transition-colors',
              {
                '-translate-x-6 bg-secondary duration-100 hover:border-zinc-800 hover:text-zinc-800 hover:opacity-90 active:bg-secondary-dark-10 peer-hover:opacity-90 peer-focus:opacity-90':
                  query,
                'opacity-0': !query,
              }
            )}
            onClick={() => {
              setQuery('');
              document.getElementById('gmc-search-bar').focus();
            }}
          >
            <span>&times;</span>
          </button>
          <div
            id="suggestions-box"
            className={cn(
              'z-10 hidden w-[102%] -translate-x-[8px] -translate-y-3.5 flex-col rounded-2xl border-1.5 border-zinc-700 bg-white bg-opacity-[1] pr-5 pb-3.5 pt-1.5 text-zinc-600 shadow-sm peer-focus:flex',
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
        </div>
      </div>
    </div>
  );
};

export default GiveMeBarNav;
