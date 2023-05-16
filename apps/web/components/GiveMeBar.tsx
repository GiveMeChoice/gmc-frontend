import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface Props {}

const GiveMeBar: React.FC<Props> = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      setQuery(router.query.q ? (router.query.q as string) : '');
    }
  }, [router.isReady, router.pathname]);

  const handleSearch = () => {
    router.push(
      `/search?q=${encodeURIComponent(query.trim()).replace(/[%20]+/g, '+')}`
    );
  };

  return (
    <div
      id="give-me-bar"
      className={cn(
        'z-0 flex flex-grow flex-wrap items-end justify-center md:flex-nowrap',
        {
          'max-w-4xl gap-y-6': router.route === '/',
          'max-w-2xl gap-y-2.5': router.route !== '/',
        }
      )}
    >
      <button
        className={cn(
          'flex h-12 w-48 cursor-pointer rounded-full duration-100 hover:bg-zinc-900 hover:shadow-md active:bg-transparent active:shadow-sm',
          {
            'bg-zinc-900': !!query,
          }
        )}
        disabled={!query}
        onClick={handleSearch}
      >
        <span
          className={cn(
            'z-20 flex h-12 w-48 cursor-pointer select-none items-center justify-center rounded-full border-zinc-700 bg-primary transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:border active:translate-y-0 active:border-zinc-700',
            {
              '-translate-y-1 border': !!query,
            }
          )}
        >
          <Image
            className="h-fit select-none rounded-full px-3"
            draggable={false}
            src="/img/GIVE_ME.svg"
            alt="give me"
            width="175"
            height="50"
          />
        </span>
      </button>

      <div
        id="query-input"
        className={cn('ml-2 flex w-full border-black', {
          'border-b-4': router.route === '/',
          'border-b-3': router.route !== '/',
        })}
      >
        <input
          id="gmc-search-bar"
          className={cn(
            'h-full w-full bg-inherit text-center text-3xl outline-none  md:text-left',
            {
              'pb-1 md:pl-3.5': router.route === '/',
              'pb-1 md:pl-3': router.route !== '/',
            }
          )}
          value={query}
          defaultValue=""
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

export default GiveMeBar;
