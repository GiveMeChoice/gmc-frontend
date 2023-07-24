import cn from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';

interface Props {}

const LinkChips: React.FC<Props> = () => {
  const router = useRouter();
  return (
    <div className="flex items-center gap-x-4">
      {/* <a
        href="/search"
        className={cn(
          'flex h-9 items-center rounded-full duration-150 hover:bg-zinc-900 hover:shadow-md active:bg-zinc-900 active:bg-transparent active:shadow-sm',
          {
            // 'pointer-events-none': router.pathname.includes('/search'),
          }
        )}
      >
        <div
          className={cn(
            'z-20 flex h-9 cursor-pointer select-none items-center justify-center rounded-full border border-zinc-700 pl-1 pr-2 shadow-sm transition-transform duration-150  ease-in-out hover:-translate-y-0.5 hover:bg-gmc-beach-light-10 active:translate-y-0 active:border-zinc-700 active:bg-gmc-beach',
            {
              'border-secondary-dark-40 bg-gmc-beach':
                router.pathname.includes('/search'),
              'bg-white': !router.pathname.includes('/search'),
            }
          )}
        >
          <div
            className={cn(
              'flex h-7 w-7 items-center justify-center rounded-full border border-zinc-600 bg-white'
            )}
          >
            <Image
              className="select-none rounded-full"
              draggable={false}
              src="/img/search.svg"
              alt="give me"
              width="20"
              height="20"
            />
          </div>
          <span className="px-3">Search</span>
        </div>
      </a> */}
      {/* <a
        href="/discover"
        className={cn(
          'flex h-9 cursor-pointer items-center rounded-full duration-150 hover:bg-zinc-900 hover:shadow-md active:bg-zinc-900 active:bg-transparent active:shadow-sm',
          {}
        )}
      >
        <div
          className={cn(
            'z-20 flex h-9 cursor-pointer select-none items-center justify-center rounded-full border border-zinc-700 pl-1 pr-2 shadow-sm transition-transform duration-150 ease-in-out  hover:-translate-y-0.5 hover:bg-gmc-surf-light-20 active:translate-y-0 active:border-zinc-700 active:bg-gmc-surf',
            {
              'border-secondary-dark-40 bg-gmc-surf':
                router.pathname.includes('/discover'),
              'bg-white': !router.pathname.includes('/discover'),
            }
          )}
        >
          <div
            className={cn(
              'flex h-7 w-7 items-center justify-center rounded-full border border-zinc-600 bg-white'
            )}
          >
            <Image
              className="select-none rounded-full"
              draggable={false}
              src="/img/tree.svg"
              alt="give me"
              width="20"
              height="20"
            />
          </div>
          <span className="px-2">Discover</span>
        </div>
      </a> */}
      <a
        href="/discover"
        className={cn(
          'flex h-9 w-24 cursor-pointer items-end rounded-full duration-150 hover:bg-zinc-900 hover:shadow-md active:bg-zinc-900 active:bg-transparent active:shadow-sm'
        )}
      >
        <span
          className={cn(
            'z-20 flex h-9 w-24 cursor-pointer select-none items-center justify-center rounded-full border border-zinc-700 transition-transform duration-150 ease-in-out  hover:-translate-y-0.5 hover:bg-gmc-surf-light-10 active:translate-y-0 active:border-zinc-700 active:bg-gmc-surf',
            {
              'border-secondary-dark-40 bg-gmc-surf':
                router.pathname.includes('/discover'),
              'bg-white': !router.pathname.includes('/discover'),
            }
          )}
        >
          Discover
        </span>
      </a>
      <a
        href="/blog"
        className={cn(
          'flex h-9 w-24 cursor-pointer items-end rounded-full duration-150 hover:bg-zinc-900 hover:shadow-md active:bg-zinc-900 active:bg-transparent active:shadow-sm'
        )}
      >
        <span
          className={cn(
            'z-20 flex h-9 w-24 cursor-pointer select-none items-center justify-center rounded-full border border-zinc-700 transition-transform duration-150 ease-in-out  hover:-translate-y-0.5 hover:bg-gmc-sunset-light-10 active:translate-y-0 active:border-zinc-700 active:bg-gmc-sunset',
            {
              'border-secondary-dark-40 bg-gmc-sunset':
                router.pathname.includes('/blog'),
              'bg-white': !router.pathname.includes('/blog'),
            }
          )}
        >
          Blog
        </span>
      </a>
    </div>
  );
};

export default LinkChips;
