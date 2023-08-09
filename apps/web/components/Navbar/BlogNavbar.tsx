import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import LoginButton from './LoginButton';
import SideMenuButton from './SideMenuButton';
import { useUser } from '../UserProvider';
import ProfileButton from './ProfileButton';
import { useRouter } from 'next/router';

const BlogNavbar: React.FC = () => {
  const [minmized, setMinimized] = useState(false);
  const [postTitle, setPostTitle] = useState(null);
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (router.query.slug) {
      setPostTitle(
        (router as any).components['/blog/[slug]'].props.pageProps.data.post
          .title
      );
    } else {
      setPostTitle(null);
    }

    var prevScrollpos = window.pageYOffset;
    const handleScrollUp = () => {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        const navContainer = document.getElementById('navbar-container');
        if (navContainer) {
          navContainer.style.top = '0';
          setMinimized(false);
        }
      } else {
        const navContainer = document.getElementById('navbar-container');
        if (navContainer) {
          navContainer.style.top = '-88px';
          setMinimized(true);
        }
      }
      prevScrollpos = currentScrollPos;
    };
    window.addEventListener('scroll', handleScrollUp);
    return () => {
      window.removeEventListener('scroll', handleScrollUp);
    };
  }, [router.asPath]);

  return (
    <div className="flex h-[51px] w-full justify-between border-t-1.5 border-secondary-dark-10 text-sm">
      <div className="flex h-full w-full divide-x-1.5 divide-secondary-dark-10">
        <Link href="/blog">
          <div
            className={cn(
              'flex h-full cursor-pointer items-center justify-center bg-secondary transition-width duration-500',
              {
                'w-0': !minmized,
                'w-[200px]': minmized,
              }
            )}
          >
            {minmized && (
              <div className="flex items-center">
                <div className="aspect-square h-[36px] rounded-full border border-secondary-dark-20">
                  <Image
                    src="/img/G_LOGO_GREEN.svg"
                    className={cn('transition-none', {
                      'w-0': !minmized,
                    })}
                    alt="GMC Logo"
                    height="36"
                    width="36"
                  />
                </div>
                <span
                  className={cn(
                    'pb-1 pl-0.5 text-[23px] underline underline-offset-2',
                    {
                      hidden: !minmized,
                    }
                  )}
                >
                  Blog
                </span>
              </div>
            )}
          </div>
        </Link>
        <div
          className={cn(
            'group float-left flex w-32 flex-col overflow-hidden transition-width duration-500 hover:bg-zinc-800 hover:text-white',
            {}
          )}
        >
          <Link className="h-full w-full" href="/blog">
            <div className="flex h-full w-full cursor-pointer items-center justify-center">
              Latest
            </div>
          </Link>
          <div className="pointer-events-none absolute left-0 z-10 float-right hidden h-screen w-screen translate-y-[49px] group-hover:block">
            <div className="pointer-events-auto flex h-1/3 w-full divide-x-1.5 divide-secondary-dark-10 border-y-1.5 border-secondary-dark-10 bg-white">
              <div className="h-full w-1/4 text-black">LATEST POST 1</div>
              <div className="h-full w-1/4 text-black">LATEST POST 2</div>
              <div className="h-full w-1/4 text-black">LATEST POST 3</div>
              <div className="h-full w-1/4 text-black">LATEST POST 4</div>
            </div>
          </div>
        </div>
        <div
          className={cn(
            'group float-left flex w-32 flex-col overflow-hidden transition-width duration-500 hover:bg-zinc-800 hover:text-white',
            {}
          )}
        >
          <Link className="h-full w-full" href="/blog/posts">
            <div className="flex h-full w-full cursor-pointer items-center justify-center">
              All Posts
            </div>
          </Link>
          <div className="pointer-events-none absolute left-0 z-10 float-right hidden h-screen w-screen translate-y-[49px] group-hover:block">
            <div className="pointer-events-auto flex h-1/3 w-full divide-x-1.5 divide-secondary-dark-10 border-y-1.5 border-secondary-dark-10 bg-white">
              <div className="h-full w-1/4 text-black">POST 1</div>
              <div className="h-full w-1/4 text-black">POST 2</div>
              <div className="h-full w-1/4 text-black">POST 3</div>
              <div className="h-full w-1/4 text-black">POST 4</div>
            </div>
          </div>
        </div>
        <div
          className={cn(
            'group float-left flex w-32 flex-col overflow-hidden transition-width duration-500 hover:bg-zinc-800 hover:text-white',
            {}
          )}
        >
          <Link className="h-full w-full" href="/blog/tags">
            <div className="flex h-full w-full cursor-pointer items-center justify-center">
              Tags
            </div>
          </Link>
          <div className="pointer-events-none absolute left-0 z-10 float-right hidden h-screen w-screen translate-y-[49px] group-hover:block">
            <div className="pointer-events-auto flex h-1/3 w-full divide-x-1.5 divide-secondary-dark-10 border-y-1.5 border-secondary-dark-10 bg-white">
              <div className="h-full w-1/4 text-black">TAG 1</div>
              <div className="h-full w-1/4 text-black">TAG 2</div>
              <div className="h-full w-1/4 text-black">TAG 3</div>
              <div className="h-full w-1/4 text-black">TAG 4</div>
            </div>
          </div>
        </div>
        <div className="flex h-full flex-grow items-center justify-center">
          <span className="w-4/5 overflow-hidden text-ellipsis whitespace-nowrap text-center text-[16px] font-bold">
            {postTitle}
          </span>
        </div>
      </div>
      <div
        className={cn(
          'mr-12 flex items-center  bg-white transition-width duration-500',
          {
            'w-0': !minmized,
            'w-32': minmized,
          }
        )}
      >
        <div
          className={cn('flex items-center gap-x-6', {
            hidden: !minmized,
            block: minmized,
          })}
        >
          {user.user ? <ProfileButton /> : <LoginButton />}
          <SideMenuButton />
        </div>
      </div>
    </div>
  );
};

export default BlogNavbar;
