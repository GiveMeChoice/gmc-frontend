import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface Props {}

const SearchBar: React.FC<Props> = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (router.isReady && router.query.q) {
      setQuery(router.query.q as string);
    }
  }, [router.isReady]);

  const handleSearch = () => {
    router.push(
      `/search?q=${encodeURIComponent(query.trim()).replace(/[%20]+/g, '+')}`
    );
  };

  return (
    <div className="flex w-full max-w-5xl flex-wrap items-end justify-center space-y-6 p-3 md:flex-nowrap">
      <button
        id="search-button"
        className={cn(
          'pushable flex h-12 w-48 cursor-pointer rounded-full bg-zinc-800 duration-100'
        )}
        disabled={!query}
        onClick={handleSearch}
      >
        <span
          className={cn(
            'front flex h-12 w-48 select-none items-center justify-center rounded-full border border-zinc-700 bg-primary duration-100'
          )}
        >
          <Image
            className="h-fit select-none rounded-full px-3"
            draggable={false}
            src="/img/GIVE_ME.svg"
            alt="give me"
            width="173"
            height="48"
          />
        </span>
      </button>

      <div
        id="query-input"
        className="ml-2 flex w-full border-b-4 border-black"
      >
        <input
          id="gmc-search-bar"
          className="h-full w-full bg-inherit pb-1 text-center text-3xl outline-none md:pl-3.5 md:text-left"
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
  );
};

export default SearchBar;
