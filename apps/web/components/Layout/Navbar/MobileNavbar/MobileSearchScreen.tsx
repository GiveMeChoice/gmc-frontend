import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useShop } from '../../../Context/ShopProvider';
import SearchSuggestions from '../GiveMeBarNav/SearchSuggestions';

interface Props {
  show: boolean;
  onClose: () => void;
}

const MobileSearchScreen: React.FC<Props> = ({ show, onClose }) => {
  const [searchModeOn, setSearchModeOn] = useState(false);
  const [query, setQuery] = useState('');
  const [buttonCoolOff, setButtonCoolOff] = useState(false);
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
    setQuery(shop.request.query ? shop.request.query : '');
    document.getElementById('gmc-search-bar-mobile').focus();
    const suggestionClickHandler = (e) => {
      e.preventDefault();
    };
    const suggestionsBox = document.getElementById('suggestions-box');
    suggestionsBox.addEventListener('mousedown', suggestionClickHandler);
    return () => {
      suggestionsBox.removeEventListener('mousedown', suggestionClickHandler);
    };
  }, [show]);

  const handleSearch = (q?: string) => {
    setQuery('');
    document.body.style.overflow = 'auto';
    if (q) {
      document.getElementById('gmc-search-bar-mobile').blur();
      shop.search({
        q: q,
        searchPageRequest: true,
        basePath: '/shop/search/',
      });
    } else {
      document.getElementById('gmc-search-bar-mobile').focus();
    }
    onClose();
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

  const handleGiveMeButtonClick = () => {
    if (searchModeOn && query && !buttonCoolOff) {
      handleSearch(query);
    } else if (!buttonCoolOff) {
      startSearchMode();
    }
    document.getElementById('gmc-search-bar-mobile').focus();
    setButtonCoolOff(true);
    setTimeout(() => {
      setButtonCoolOff(false);
    }, 150);
  };

  const startSearchMode = () => {
    if (!searchModeOn) {
      document.body.style.overflow = 'hidden';
      setSearchModeOn(true);
      setButtonCoolOff(true);
      setTimeout(() => {
        setButtonCoolOff(false);
      }, 100);
    }
    setTimeout(() => {
      document.getElementById('gmc-search-bar-mobile').focus();
    }, 50);
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
      className={cn(
        'fixed top-0 left-0 z-40 h-screen w-screen overscroll-none bg-white transition-transform duration-300',
        {
          hidden: !show,
          flex: show,
        }
      )}
    >
      <div
        className={cn(
          'static flex h-fit w-full flex-col overflow-y-scroll overscroll-none bg-white',
          {
            'h-full': shop.response.hits,
            'h-fit': !shop.response.hits,
          }
        )}
      >
        <div
          id="give-me-bar-nav-mobile"
          className={cn(
            'fixed top-0 left-0 z-20 flex h-screen w-screen flex-col justify-start overflow-hidden bg-white transition-none md:hidden'
          )}
        >
          <div
            className={cn(
              'z-20 flex h-[46px] w-full flex-col items-center justify-start gap-y-1 py-5 px-9 sm:px-20 md:flex-nowrap'
            )}
          >
            <button
              id="give-me-button-mobile"
              className={cn(
                'flex h-fit w-fit cursor-pointer items-end rounded-full bg-zinc-900 duration-200'
              )}
              onTouchEnd={handleGiveMeButtonClick}
              onClick={handleGiveMeButtonClick}
            >
              <span
                className={cn(
                  'z-20 flex h-[37px] w-[145px] -translate-y-[3px] translate-x-[2px] cursor-pointer select-none items-center justify-center  rounded-full border border-black bg-primary duration-200 ease-in-out'
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
            <div className={cn('flex h-full w-full flex-col items-start', {})}>
              <input
                id="gmc-search-bar-mobile"
                className={cn(
                  'peer min-h-[44px] w-full flex-wrap border-b-[3px] border-black bg-inherit px-4 text-center text-[27px] outline-none duration-500'
                )}
                type="text"
                value={query}
                autoComplete="off"
                onChange={(e) => {
                  setSuggestionIndex(null);
                  setLastTypedQuery(e.target.value);
                  setQuery(e.target.value);
                  updateSuggestions(e.target.value);
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
                    if (suggestionIndex === null) {
                      handleAdoptSuggestion(0);
                    } else if (suggestionIndex < suggestions.length - 1) {
                      handleAdoptSuggestion(suggestionIndex + 1);
                    }
                  } else if (e.key === 'Escape') {
                    document.getElementById('gmc-search-bar-mobile').blur();
                  }
                }}
              />
              <button
                className={cn(
                  'relative left-[102%] -top-[30px] flex aspect-square h-5 w-5 items-center justify-center rounded-full border-1.5 border-zinc-700  pb-0.5 text-zinc-700 opacity-0 transition-colors',
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
          <div
            id="suggestions-box"
            className={cn(
              'w-screen translate-y-[88px] flex-col border-t-1.5 border-black bg-white bg-opacity-[1] pr-5 pb-3.5 pt-1.5 text-zinc-600 shadow-sm peer-focus:flex'
            )}
          >
            <SearchSuggestions
              suggestions={suggestions}
              activeIndex={suggestionIndex}
              onClick={handleSelectSuggestion}
              onHover={setSuggestionIndex}
            />
          </div>
          <button
            className={cn(
              'absolute left-5 top-4 z-30 flex aspect-square h-8 w-8 flex-col items-center justify-center rounded-full border-1.5 border-black bg-white pt-0.5 hover:scale-[1.03] hover:bg-secondary',
              {}
            )}
            onClick={onClose}
          >
            <div className="w-6 -translate-x-[0px] rotate-45 border-b-1.5 border-black" />
            <div className="w-6 translate-x-[0px] -translate-y-[2px] -rotate-45 border-b-1.5 border-black" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileSearchScreen;
