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
    setMinimized(false);
    if (router.query.slug) {
      const slugComponent = (router as any).components['/blog/[slug]'];
      if (slugComponent) {
        setPostTitle(slugComponent.props.pageProps.data.post.title);
      }
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
        if (navContainer && window.pageYOffset !== 0) {
          navContainer.style.top = '-88px';
          setMinimized(true);
        }
      }
      prevScrollpos = currentScrollPos;
    };
    window.addEventListener('scroll', handleScrollUp);

    const handleScrollProgress = () => {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      document.getElementById('scroll-progress-bar').style.width =
        scrolled + '%';
    };
    if (router.query.slug) {
      window.addEventListener('scroll', handleScrollProgress);
    }

    return () => {
      window.removeEventListener('scroll', handleScrollUp);
      window.removeEventListener('scroll', handleScrollProgress);
    };
  }, [router.asPath]);

  return (
    <>
      <div className="flex h-[52px] w-full justify-between border-t-1.5 border-secondary-dark-10 text-sm">
        <div className="flex h-full w-full divide-x-1.5 divide-secondary-dark-10">
          <Link href="/blog">
            <div
              className={cn(
                'flex h-full w-[220px] cursor-pointer items-center justify-center bg-white transition-width duration-500 hover:bg-secondary',
                {
                  // 'w-0': !minmized,
                  // 'w-[200px]': minmized,
                }
              )}
            >
              {/* {minmized && ( */}
              <div className="flex items-center gap-x-0.5">
                <div className="flex aspect-square h-[40px] items-center justify-center rounded-full bg-black p-[7px]">
                  <Image
                    src="/img/GMC_G_white.svg"
                    className={cn('transition-none', {
                      // 'w-0': !minmized,
                    })}
                    alt="GMC Logo"
                    height="34"
                    width="34"
                  />
                </div>
                <span
                  className={cn(
                    'pb-1 pl-0.5 text-[24px] underline underline-offset-2',
                    {
                      // hidden: !minmized,
                    }
                  )}
                >
                  Blog
                </span>
              </div>
              {/* )} */}
            </div>
          </Link>
          <div
            className={cn(
              'group float-left flex w-32 flex-col overflow-hidden bg-secondary transition-width duration-500 hover:bg-zinc-800 hover:text-white',
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
              'group float-left flex w-32 flex-col overflow-hidden bg-secondary transition-width duration-500 hover:bg-zinc-800 hover:text-white',
              {}
            )}
          >
            <Link className="h-full w-full" href="/blog/posts">
              <div className="flex h-full w-full cursor-pointer items-center justify-center ">
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
              'group float-left flex w-32 flex-col overflow-hidden bg-secondary transition-width duration-500 hover:bg-zinc-800 hover:text-white',
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
      <div className="relative z-0 w-full">
        <div
          id="scroll-progress-bar"
          className="absolute top-[1.5px] h-[8px] bg-gmc-sunset"
        ></div>
      </div>
    </>
  );
};

export default BlogNavbar;
