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
    return false;
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
        'fixed left-0 top-0 z-50 h-full border-r-1.5 border-zinc-700 bg-primary font-normal tracking-wide text-black transition-width duration-500',
        {
          'w-0': !open,
          'w-96': open,
        }
      )}
    >
      <div
        className={cn(
          'float-right flex h-screen w-full flex-col justify-between overflow-hidden transition-all duration-500',
          {
            'w-0': !open,
            'w-96': open,
          }
        )}
      >
        <div className="flex w-full flex-col">
          <div className="flex w-full items-start justify-between p-12 pb-[100px]">
            <Link href={'/'}>
              <div
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
              </div>
            </Link>
            <button
              className={cn(
                'aspect-square h-9 flex-col items-center justify-center rounded-full border-1.5 border-black bg-primary pt-0.5 hover:scale-[1.03] hover:bg-secondary',
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
          <div className="flex w-full flex-col px-8">
            <Link href={'/'}>
              <div
                className={cn(
                  'group flex w-full cursor-pointer items-center gap-x-[18px] pl-0 transition-all duration-500',
                  {
                    '-translate-x-36': !open,
                  }
                )}
                onClick={handleLinkClick}
              >
                <img
                  className="h-0 w-[28px] min-w-[28px] group-hover:h-[28px]"
                  src="/img/home.svg"
                  alt="Home"
                  height="28"
                  width="28"
                />
                <span className="whitespace-nowrap text-[52px] decoration-4 underline-offset-4 group-hover:underline">
                  Home
                </span>
              </div>
            </Link>
            <Link href={'/shop'}>
              <div
                className={cn(
                  'group flex w-full cursor-pointer items-center gap-x-[18px] pl-0 transition-all duration-500',
                  {
                    '-translate-x-36': !open,
                  }
                )}
                onClick={handleLinkClick}
              >
                <img
                  className="h-0 w-[28px] min-w-[28px] group-hover:h-[28px]"
                  src="/img/bag.svg"
                  alt="Home"
                  height="28"
                  width="28"
                />
                <span className="whitespace-nowrap text-[52px] decoration-4 underline-offset-4 group-hover:underline">
                  Shop
                </span>
              </div>
            </Link>
            <Link href={'/discover'}>
              <div
                className={cn(
                  'group flex w-full cursor-pointer items-center gap-x-[18px] pl-0 transition-all duration-500',
                  {
                    '-translate-x-36': !open,
                  }
                )}
                onClick={handleLinkClick}
              >
                <img
                  className="h-0 w-[28px] min-w-[28px] group-hover:h-[28px]"
                  src="/img/tree.svg"
                  alt="Home"
                  height="28"
                  width="28"
                />
                <span className="whitespace-nowrap text-[52px] decoration-4 underline-offset-4 group-hover:underline">
                  Discover
                </span>
              </div>
            </Link>
            <Link href={'/blog'}>
              <div
                className={cn(
                  'group flex w-full cursor-pointer items-center gap-x-[18px] pl-0 transition-all duration-500',
                  {
                    '-translate-x-36': !open,
                  }
                )}
                onClick={handleLinkClick}
              >
                <img
                  className="h-0 w-[28px] min-w-[28px] group-hover:h-[28px]"
                  src="/img/bananas.svg"
                  alt="Home"
                  height="28"
                  width="28"
                />
                <span className="whitespace-nowrap text-[52px] decoration-4 underline-offset-4 group-hover:underline">
                  Blog
                </span>
              </div>
            </Link>
          </div>
        </div>

        <div
          className={cn('flex justify-end p-12', {
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
