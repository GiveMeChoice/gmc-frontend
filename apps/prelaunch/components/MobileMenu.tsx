import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { toggleNavMenu } from '../helpers/toggle-nav-menu';
import cn from 'classnames';
import { matchesPath } from '../helpers/matches-path';

const MobileMenu: React.FC = () => {
  const router = useRouter();
  return (
    <div
      id="menu"
      className="fixed -right-full top-0 z-10 flex h-screen w-screen flex-col justify-between self-end overflow-y-auto bg-white p-12 text-black duration-300 md:max-w-sm"
    >
      {/* <div className="px-12 pt-10 pb-16 md:pb-0 xl:px-36"> */}
      <a href="/" className="z-30 flex w-fit justify-start">
        <svg
          className="h-12 fill-black"
          viewBox="0 0 680 721"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M669.109 310.121H255.009L274.559 362.851H488.039C550.599 511.021 567.219 650.651 484.399 660.291C393.809 670.841 307.809 582.531 227.929 417.151C148.049 251.771 115.299 79.7213 197.349 62.2713C285.309 43.5613 365.199 123.561 437.329 257.391H659.229C657.529 250.151 655.819 242.871 653.049 235.881C578.499 47.5813 369.979 -42.1187 194.329 19.0713C6.73892 84.4313 -46.6511 306.981 41.1889 493.141C129.029 679.301 342.379 768.881 512.439 693.221C657.279 628.781 698.799 475.621 671.919 310.121H669.099H669.109Z" />
        </svg>
      </a>
      {/* </div> */}
      <div className="mt-16 flex h-full flex-grow flex-col items-start space-y-1 text-5xl decoration-4 duration-300 hover:underline-offset-8 [&>a]:pb-1.5">
        <a
          className={cn('hover:underline', {
            // underline: matchesPath('/blog', router.pathname),
          })}
          href="/blog"
          onClick={toggleNavMenu}
        >
          Blog
        </a>
        <a
          className={cn('hover:underline', {})}
          href="mailto:hello@givemechoice.com?subject=Hello"
          target="_blank"
          rel="noreferrer"
          onClick={toggleNavMenu}
        >
          Contact
        </a>
        <a
          className={cn('hover:underline', {
            // underline: matchesPath('/#subscribe', router.pathname),
          })}
          href="/#subscribe"
          onClick={toggleNavMenu}
        >
          Subscribe
        </a>
      </div>
      <div className="flex w-full justify-end pb-4">
        <a
          href="https://www.instagram.com/giveme.choice/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <Image
            src="/img/icon-instagram.svg"
            alt="GMC Logo"
            height="40"
            width="40"
          />
        </a>
      </div>
    </div>
  );
};

export default MobileMenu;
