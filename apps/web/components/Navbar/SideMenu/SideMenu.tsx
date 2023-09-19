import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';

interface Props {
  open: boolean;
  close: () => void;
}

const SideMenu: React.FC<Props> = ({ open, close }) => {
  const handleClickaway = (e: PointerEvent) => {
    const menuContainer = (e.target as any).closest('#side-menu');
    if (!menuContainer) {
      close();
    }
  };
  const handleEscapeKey = (e) => {
    if (e.key === 'Escape') {
      close();
    }
  };
  const handleLinkClick = () => {
    close();
  };

  useEffect(() => {
    if (open) {
      const body = document.getElementsByTagName('body')[0];
      body.addEventListener('click', handleClickaway);
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
        body.removeEventListener('click', handleClickaway);
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [open]);

  return (
    <div
      id="side-menu"
      className={cn(
        'fixed left-0 top-0 z-50 h-full border-r-1.5 border-zinc-700 bg-white font-normal tracking-wide text-black transition-width duration-500',
        {
          'w-0': !open,
          'w-96': open,
        }
      )}
    >
      <div
        className={cn(
          'float-right flex h-screen w-full flex-col justify-between overflow-hidden p-12 transition-all duration-500',
          {
            'w-0': !open,
            'w-96': open,
          }
        )}
      >
        <div className="flex flex-col">
          <div className="flex w-full items-start justify-between pb-[100px]">
            <a
              href="/"
              className={cn(
                'flex w-fit justify-start transition-all duration-500',
                {
                  '-translate-x-44': !open,
                }
              )}
              onClick={handleLinkClick}
            >
              <svg
                className="h-12 fill-black"
                viewBox="0 0 680 721"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M669.109 310.121H255.009L274.559 362.851H488.039C550.599 511.021 567.219 650.651 484.399 660.291C393.809 670.841 307.809 582.531 227.929 417.151C148.049 251.771 115.299 79.7213 197.349 62.2713C285.309 43.5613 365.199 123.561 437.329 257.391H659.229C657.529 250.151 655.819 242.871 653.049 235.881C578.499 47.5813 369.979 -42.1187 194.329 19.0713C6.73892 84.4313 -46.6511 306.981 41.1889 493.141C129.029 679.301 342.379 768.881 512.439 693.221C657.279 628.781 698.799 475.621 671.919 310.121H669.099H669.109Z" />
              </svg>
            </a>
            <button
              className={cn(
                'aspect-square h-9 flex-col items-center justify-center rounded-full border border-black pt-0.5 hover:scale-[1.03] hover:bg-primary',
                {
                  flex: open,
                  hidden: !open,
                }
              )}
              onClick={close}
            >
              <div className="w-7 -translate-x-[0px] rotate-45 border-b-1.5 border-black" />
              <div className="w-7 translate-x-[0px] -translate-y-[2px] -rotate-45 border-b-1.5 border-black" />
            </button>
          </div>
          <div
            className={cn('flex w-full flex-col transition-all duration-500', {
              '-translate-x-44': !open,
            })}
          >
            {/* <Link href="/">
              <div
                className="group flex cursor-pointer items-center gap-x-6"
                onClick={handleLinkClick}
              >
                <div 
                style={{lineHeight: 1.3}}
                className="text-[54px] decoration-4 underline-offset-4 group-hover:underline">
                  Home
                </div>
              </div>
            </Link> */}
            <Link href="/shop">
              <div
                className="group flex cursor-pointer items-center gap-x-6"
                onClick={handleLinkClick}
              >
                {/* <Image src="/img/search.svg" alt="Home" height="34" width="34" /> */}
                <div
                  style={{ lineHeight: 1.3 }}
                  className="text-[54px] decoration-4 underline-offset-4 group-hover:underline"
                >
                  Shop
                </div>
              </div>
            </Link>
            <Link href="/discover">
              <div
                className="group flex cursor-pointer items-center gap-x-6"
                onClick={handleLinkClick}
              >
                {/* <Image src="/img/tree.svg" alt="Home" height="34" width="34" /> */}
                <div
                  style={{ lineHeight: 1.3 }}
                  className="text-[54px] decoration-4 underline-offset-4 group-hover:underline"
                >
                  Discover
                </div>
              </div>
            </Link>
            <Link href="/blog">
              <div
                className="group flex cursor-pointer items-center gap-x-6"
                onClick={handleLinkClick}
              >
                {/* <Image src="/img/bananas.svg" alt="Home" height="34" width="34" /> */}
                <div
                  style={{ lineHeight: 1.3 }}
                  className="text-[54px] decoration-4 underline-offset-4 group-hover:underline"
                >
                  Blog
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div
          className={cn('flex justify-end pb-4', {
            'w-0': !open,
            'w-full': open,
          })}
        >
          <Link
            href="https://www.instagram.com/giveme_choice/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <div
              className={cn('cursor-pointer', {
                block: open,
                hidden: !open,
              })}
              onClick={handleLinkClick}
            >
              <Image
                src="/img/icon-instagram.svg"
                alt="GMC Logo"
                height="44"
                width="44"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
