import cn from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

interface Props {}

const LinkChips: React.FC<Props> = () => {
  const router = useRouter();
  return (
    <div className="hidden items-center gap-x-4 text-[14px] xl:flex">
      <a
        href="/search"
        className={cn(
          'flex h-9 cursor-pointer items-center rounded-full duration-150 hover:bg-zinc-900 hover:shadow-md active:bg-zinc-900 active:bg-transparent active:shadow-sm',
          {}
        )}
      >
        <div
          className={cn(
            'z-20 flex h-9 cursor-pointer select-none items-center justify-center rounded-full border border-zinc-700 pl-1.5 pr-2 shadow-sm transition-transform duration-150 ease-in-out  hover:-translate-y-1 hover:bg-gmc-beach-light-20 active:translate-y-0 active:border-zinc-700 active:bg-gmc-beach',
            {
              'border-secondary-dark-40 bg-gmc-beach':
                router.pathname.includes('/search'),
              'bg-white': !router.pathname.includes('/search'),
            }
          )}
        >
          <div
            className={cn(
              'flex h-6 w-6 items-center justify-center rounded-full border border-zinc-600 bg-secondary'
            )}
          >
            <Image
              className="select-none rounded-full"
              draggable={false}
              src="/img/search.svg"
              alt="give me"
              width="17"
              height="17"
            />
          </div>
          <span className="px-2">Search</span>
        </div>
      </a>
      <a
        href="/discover"
        className={cn(
          'flex h-9 cursor-pointer items-center rounded-full duration-150 hover:bg-zinc-900 hover:shadow-md active:bg-zinc-900 active:bg-transparent active:shadow-sm',
          {}
        )}
      >
        <div
          className={cn(
            'z-20 flex h-9 cursor-pointer select-none items-center justify-center rounded-full border border-zinc-700 pl-1.5 pr-2 shadow-sm transition-transform duration-150 ease-in-out  hover:-translate-y-1 hover:bg-gmc-surf-light-20 active:translate-y-0 active:border-zinc-700 active:bg-gmc-surf',
            {
              'border-secondary-dark-40 bg-gmc-surf':
                router.pathname.includes('/discover'),
              'bg-white': !router.pathname.includes('/discover'),
            }
          )}
        >
          <div
            className={cn(
              'flex h-6 w-6 items-center justify-center rounded-full border border-zinc-600 bg-secondary'
            )}
          >
            <Image
              className="select-none rounded-full"
              draggable={false}
              src="/img/tree.svg"
              alt="give me"
              width="17"
              height="17"
            />
          </div>
          <span className="px-2">Discover</span>
        </div>
      </a>

      <a
        href="/blog"
        className={cn(
          'flex h-9 cursor-pointer items-center rounded-full duration-150 hover:bg-zinc-900 hover:shadow-md active:bg-zinc-900 active:bg-transparent active:shadow-sm',
          {}
        )}
      >
        <div
          className={cn(
            'z-20 flex h-9 cursor-pointer select-none items-center justify-center rounded-full border border-zinc-700 pl-1.5 pr-2 shadow-sm transition-transform duration-150 ease-in-out  hover:-translate-y-1 hover:bg-gmc-sunset-light-20 active:translate-y-0 active:border-zinc-700 active:bg-gmc-sunset',
            {
              'border-secondary-dark-40 bg-gmc-sunset':
                router.pathname.includes('/blog'),
              'bg-white': !router.pathname.includes('/blog'),
            }
          )}
        >
          <div
            className={cn(
              'flex h-6 w-6 items-center justify-center rounded-full border border-zinc-600 bg-secondary'
            )}
          >
            <Image
              className="select-none rounded-full"
              draggable={false}
              src="/img/bananas.svg"
              alt="give me"
              width="17"
              height="17"
            />
          </div>
          <span className="px-4">Blog</span>
        </div>
      </a>
    </div>
  );
};

export default LinkChips;
