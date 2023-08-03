import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface Props {}

const GiveMeBarHome: React.FC<Props> = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      setQuery(router.query.q ? (router.query.q as string) : '');
    }
  }, [router.isReady, router.pathname]);

  const handleSearch = () => {
    if (query) {
      router.push(
        `/search?q=${encodeURIComponent(query.trim()).replace(/[%20]+/g, '+')}`
      );
    } else {
      document.getElementById('gmc-search-bar-home').focus();
    }
  };

  return (
    <div
      id="give-me-bar"
      className={cn(
        'z-0 flex w-full flex-wrap items-end justify-center gap-y-6 md:flex-nowrap',
        {}
      )}
    >
      <button
        className={cn(
          'flex h-16 w-64 cursor-pointer items-end rounded-full duration-200 hover:bg-zinc-900 hover:shadow-md active:bg-transparent active:shadow-sm',
          {}
        )}
        disabled={!query}
        onClick={handleSearch}
      >
        <span
          className={cn(
            'z-20 flex h-16 w-64 cursor-pointer select-none items-center justify-center rounded-full border-zinc-700 bg-primary transition-transform duration-200  ease-in-out hover:-translate-y-1.5 active:translate-y-0 active:border-zinc-700',
            {}
          )}
        >
          <Image
            className="h-fit select-none rounded-full"
            draggable={false}
            src="/img/GIVE_ME.svg"
            alt="give me"
            width="223"
            height="60"
          />
        </span>
      </button>

      <input
        id="gmc-search-bar-home"
        className={cn(
          'peer h-full w-full border-b-4 border-black bg-inherit pr-6 pl-3 text-center text-[44px] outline-none transition-width duration-700 ease-in-out md:text-left',
          {}
        )}
        value={query}
        defaultValue=""
        autoComplete="off"
        placeholder={router.route !== '/' ? 'Choice' : null}
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
      <button
        className={cn(
          'asbolute border-zinc-800zz flex aspect-square h-5 w-5 items-center justify-center rounded-full pb-1 text-zinc-800 opacity-0 outline transition-colors',
          {
            '-translate-x-6 -translate-y-3.5 bg-secondary duration-100 hover:border-zinc-800 hover:text-zinc-800 hover:opacity-90 active:bg-secondary-dark-10 peer-hover:opacity-90 peer-focus:opacity-90':
              query,
            'opacity-0': !query,
          }
        )}
        onClick={() => {
          setQuery('');
          document.getElementById('gmc-search-bar-home').focus();
        }}
      >
        <span>&times;</span>
      </button>
    </div>
  );
};

export default GiveMeBarHome;
