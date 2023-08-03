import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface Props {}

const GiveMeBarNav: React.FC<Props> = () => {
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
      document.getElementById('gmc-search-bar').focus();
    }
  };

  return (
    <div
      id="give-me-bar"
      className={cn(
        'z-0 flex h-[46px] w-full flex-wrap items-end justify-start gap-y-2.5 md:flex-nowrap'
      )}
    >
      <button
        className={cn(
          'flex h-11 w-44 cursor-pointer items-end rounded-full duration-200 hover:bg-zinc-900 hover:shadow-md active:bg-transparent active:shadow-sm'
        )}
        onClick={handleSearch}
      >
        <span
          className={cn(
            'z-20 flex h-11 w-44 cursor-pointer select-none items-center justify-center rounded-full border-zinc-700 bg-primary transition-transform duration-200 ease-in-out hover:-translate-y-[5px]  active:translate-y-0 active:border-zinc-700'
          )}
        >
          <Image
            className="h-fit select-none rounded-full"
            draggable={false}
            src="/img/GIVE_ME.svg"
            alt="give me"
            width="152"
            height="40"
          />
        </span>
      </button>

      <input
        id="gmc-search-bar"
        className={cn(
          'peer h-full w-32 border-b-3 border-black bg-inherit pl-2 text-center outline-none transition-width duration-700 ease-in-out placeholder:pb-0 placeholder:text-4xl placeholder:text-zinc-900 focus:w-full focus:text-[31px] focus:placeholder-transparent md:text-left',
          {
            'w-full pr-6 text-[31px]': query,
            'text-4xl': !query,
          }
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
          'asbolute text-secondary-zinc-900 flex aspect-square h-5 w-5 items-center justify-center rounded-full border-1.5  border-zinc-800 pb-1 opacity-0 transition-colors',
          {
            '-translate-x-6 -translate-y-2.5 bg-secondary duration-100 hover:border-zinc-800 hover:text-zinc-800 hover:opacity-90 active:bg-secondary-dark-10 peer-hover:opacity-90 peer-focus:opacity-90':
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
    </div>
  );
};

export default GiveMeBarNav;
