import cn from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

interface Props {}

const LinkChips: React.FC<Props> = () => {
  const router = useRouter();
  return (
    <div className="flex items-center gap-x-4 pr-4 text-[14px]">
      <a
        href="/shop"
        className={cn(
          'flex h-9 cursor-pointer items-center rounded-full bg-zinc-900 duration-150',
          {}
        )}
      >
        <div
          className={cn(
            'z-20 flex h-9 translate-x-[1px] -translate-y-[1px] cursor-pointer select-none items-center justify-center rounded-full border border-zinc-900 pl-1  pr-2 transition-transform duration-150 ease-in-out hover:translate-x-[4px] hover:-translate-y-[4px] hover:bg-gmc-surf active:-translate-y-[1px] active:translate-x-[1px] active:border-zinc-900',
            {
              'border-zinc-900 bg-gmc-surf': router.pathname.includes('/shop'),
              'bg-white': !router.pathname.includes('/shop'),
            }
          )}
        >
          <div
            className={cn(
              'flex aspect-square h-7 items-center justify-center rounded-full border border-zinc-900 bg-white'
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
          <span className="px-3.5 pr-4">SHOP</span>
        </div>
      </a>

      <a
        href="/blog"
        className={cn(
          'flex h-9 cursor-pointer items-center rounded-full bg-zinc-900',
          {}
        )}
      >
        <div
          className={cn(
            'z-20 flex h-9 translate-x-[1px] -translate-y-[1px] cursor-pointer select-none items-center justify-center rounded-full border border-zinc-900 pl-1 pr-2 transition-transform duration-150 ease-in-out hover:translate-x-[4px] hover:-translate-y-[4px] hover:bg-gmc-sunset active:-translate-y-[1px] active:translate-x-[1px] active:border-zinc-900',
            {
              'border-zinc-900 bg-gmc-sunset':
                router.pathname.includes('/blog'),
              'bg-white': !router.pathname.includes('/blog'),
            }
          )}
        >
          <div
            className={cn(
              'flex aspect-square h-7 items-center justify-center rounded-full border border-zinc-900 bg-white',
              {
                // 'bg-gmc-sunset': router.pathname.includes('/blog'),
              }
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
          <span className="pl-3.5 pr-4">BLOG</span>
        </div>
      </a>
    </div>
  );
};

export default LinkChips;
