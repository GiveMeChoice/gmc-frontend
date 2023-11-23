import Link from 'next/link';
import React from 'react';
import cn from 'classnames';
import Image from 'next/image';

const HomeSidebar: React.FC = () => {
  return (
    <div className="flex h-full w-full flex-col justify-between border-r-1.5 border-zinc-700 bg-primary p-12 px-[72px]">
      <div className="flex w-full items-start justify-between">
        <Link href={'/'}>
          <div
            className={cn(
              'flex w-fit justify-start transition-none duration-500 md:transition-all'
            )}
          >
            <svg
              className="h-14 fill-black"
              viewBox="0 0 680 721"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M669.109 310.121H255.009L274.559 362.851H488.039C550.599 511.021 567.219 650.651 484.399 660.291C393.809 670.841 307.809 582.531 227.929 417.151C148.049 251.771 115.299 79.7213 197.349 62.2713C305.309 43.5613 365.199 123.561 437.329 257.391H659.229C657.529 250.151 655.819 242.871 653.049 235.881C578.499 47.5813 369.979 -42.1187 194.329 19.0713C6.73892 84.4313 -46.6511 306.981 41.1889 493.141C129.029 679.301 342.379 768.881 512.439 693.221C657.279 630.781 698.799 475.621 671.919 310.121H669.099H669.109Z" />
            </svg>
            {/* <Image
              src="/img/GMC_LOGO_black.svg"
              priority
              draggable={false}
              layout="fixed"
              width="300"
              height="50"
              alt="hero"
            /> */}
          </div>
        </Link>
      </div>
      <div className="flex w-full flex-col">
        <Link href={'/shop'}>
          <div
            className={cn(
              'group flex w-full cursor-pointer items-center gap-x-[20px] pl-7 transition-none duration-500 md:pl-0 md:transition-all'
            )}
          >
            <span className="whitespace-nowrap text-[72px] leading-[1.1] decoration-5 underline-offset-[6px] md:group-hover:underline">
              Shop
            </span>
          </div>
        </Link>
        <Link href={'/blog'}>
          <div
            className={cn(
              'group flex w-full cursor-pointer items-center gap-x-[20px] pl-7 transition-none duration-500 md:pl-0 md:transition-all'
            )}
          >
            <span className="whitespace-nowrap text-[72px] leading-[1.1] decoration-5 underline-offset-[6px] md:group-hover:underline">
              Blog
            </span>
          </div>
        </Link>
        <Link href={'/blog'}>
          <div
            className={cn(
              'group flex w-full cursor-pointer items-center gap-x-[20px] pl-7 transition-none duration-500 md:pl-0 md:transition-all'
            )}
          >
            <span className="whitespace-nowrap text-[72px] leading-[1.1] decoration-5 underline-offset-[6px] md:group-hover:underline">
              Contact
            </span>
          </div>
        </Link>
        <Link href={'/blog'}>
          <div
            className={cn(
              'group flex w-full cursor-pointer items-center gap-x-[20px] pl-7 transition-none duration-500 md:pl-0 md:transition-all'
            )}
          >
            <span className="whitespace-nowrap text-[72px] leading-[1.1] decoration-5 underline-offset-[6px] md:group-hover:underline">
              Subscribe
            </span>
          </div>
        </Link>
      </div>

      <div className={cn('flex h-[50px] justify-end')}>
        <Link
          href="https://www.instagram.com/giveme_choice/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <div className={cn('cursor-pointer', {})}>
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
  );
};

export default HomeSidebar;
