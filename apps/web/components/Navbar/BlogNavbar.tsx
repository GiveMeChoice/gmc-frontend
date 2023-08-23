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
    document.getElementById('scroll-progress-bar').style.width = '0';

    var prevScrollpos = window.scrollY;
    const handleScrollUp = () => {
      var currentScrollPos = window.scrollY;
      if (prevScrollpos > currentScrollPos) {
        const navContainer = document.getElementById('navbar-container');
        if (navContainer) {
          navContainer.style.top = '0';
          setMinimized(false);
        }
      } else {
        const navContainer = document.getElementById('navbar-container');
        if (navContainer && window.scrollY > 10) {
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
      <div className="bg-seondary flex h-[48px] w-full justify-between border-t-1.5 border-secondary-dark-10 text-[14px]">
        <div className="flex h-full w-full divide-x-1.5 divide-secondary-dark-10">
          <div className="h-full w-[40px]"></div>
          {/* <Link href="/blog">
            <div
              className={cn(
                'group flex h-full w-[120px] cursor-pointer items-center justify-center transition-width duration-300 hover:bg-black',
                {}
              )}
            >
              <div className="flex aspect-square h-[34px] items-center justify-center rounded-full bg-black p-[7px] group-hover:bg-white group-active:bg-primary">
                <svg
                  className="h-6 w-6 fill-white group-hover:fill-black"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 679.6 720.09"
                >
                  <g>
                    <path
                      d="M669.11,310.12H255.01l19.55,52.73h213.48c62.56,148.17,79.18,287.8-3.64,297.44-90.59,10.55-176.59-77.76-256.47-243.14C148.05,251.77,115.3,79.72,197.35,62.27c87.96-18.71,167.85,61.29,239.98,195.12h221.9c-1.7-7.24-3.41-14.52-6.18-21.51C578.5,47.58,369.98-42.12,194.33,19.07,6.74,84.43-46.65,306.98,41.19,493.14c87.84,186.16,301.19,275.74,471.25,200.08,144.84-64.44,186.36-217.6,159.48-383.1h-2.82Z"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </Link> */}
          <div
            className={cn(
              'group float-left flex w-[110px] flex-col overflow-hidden bg-white transition-width duration-300 hover:bg-black hover:text-white active:text-primary',
              {}
            )}
          >
            <Link className="h-full w-full" href="/blog">
              <div className="flex h-full w-full cursor-pointer items-center justify-center text-[14px] tracking-wide">
                WELLNESS
              </div>
            </Link>
            <div className="pointer-events-none absolute left-0 z-10 float-right hidden h-screen w-screen translate-y-[45px] group-hover:block">
              <div className="pointer-events-auto flex h-1/2 w-full divide-x-1.5 divide-secondary-dark-10 border-y-1.5 border-secondary-dark-10 bg-white">
                <div className="h-full w-1/4 text-black">LATEST POST 1</div>
                <div className="h-full w-1/4 text-black">LATEST POST 2</div>
                <div className="h-full w-1/4 text-black">LATEST POST 3</div>
                <div className="h-full w-1/4 text-black">LATEST POST 4</div>
              </div>
            </div>
          </div>
          <div
            className={cn(
              'group float-left flex w-[110px] flex-col overflow-hidden bg-white transition-width duration-300 hover:bg-black hover:text-white active:text-primary',
              {}
            )}
          >
            <Link className="h-full w-full" href="/blog/posts">
              <div className="flex h-full w-full cursor-pointer items-center justify-center text-[14px] tracking-wide">
                INDOOR
              </div>
            </Link>
            <div className="pointer-events-none absolute left-0 z-10 float-right hidden h-screen w-screen translate-y-[45px] group-hover:block">
              <div className="pointer-events-auto flex h-1/2 w-full divide-x-1.5 divide-secondary-dark-10 border-y-1.5 border-secondary-dark-10 bg-white">
                <div className="h-full w-1/4 text-black">POST 1</div>
                <div className="h-full w-1/4 text-black">POST 2</div>
                <div className="h-full w-1/4 text-black">POST 3</div>
                <div className="h-full w-1/4 text-black">POST 4</div>
              </div>
            </div>
          </div>
          <div
            className={cn(
              'bg- group float-left flex w-[110px] flex-col overflow-hidden bg-white transition-width duration-300 hover:bg-black hover:text-white active:text-primary',
              {}
            )}
          >
            <Link className="h-full w-full" href="/blog/tags">
              <div className="flex h-full w-full cursor-pointer items-center justify-center text-[14px] tracking-wide">
                OUTDOOR
              </div>
            </Link>
            <div className="pointer-events-none absolute left-0 z-10 float-right hidden h-screen w-screen translate-y-[45px] group-hover:block">
              <div className="pointer-events-auto flex h-1/2 w-full divide-x-1.5 divide-secondary-dark-10 border-y-1.5 border-secondary-dark-10 bg-white">
                <div className="h-full w-1/4 text-black">TAG 1</div>
                <div className="h-full w-1/4 text-black">TAG 2</div>
                <div className="h-full w-1/4 text-black">TAG 3</div>
                <div className="h-full w-1/4 text-black">TAG 4</div>
              </div>
            </div>
          </div>
          <div
            className={cn(
              'bg- group float-left flex w-[110px] flex-col overflow-hidden bg-white transition-width duration-300 hover:bg-black hover:text-white active:text-primary',
              {}
            )}
          >
            <Link className="h-full w-full" href="/blog/tags">
              <div className="flex h-full w-full cursor-pointer items-center justify-center text-[14px] tracking-wide">
                JOY
              </div>
            </Link>
            <div className="pointer-events-none absolute left-0 z-10 float-right hidden h-screen w-screen translate-y-[45px] group-hover:block">
              <div className="pointer-events-auto flex h-1/2 w-full divide-x-1.5 divide-secondary-dark-10 border-y-1.5 border-secondary-dark-10 bg-white">
                <div className="h-full w-1/4 text-black">TAG 1</div>
                <div className="h-full w-1/4 text-black">TAG 2</div>
                <div className="h-full w-1/4 text-black">TAG 3</div>
                <div className="h-full w-1/4 text-black">TAG 4</div>
              </div>
            </div>
          </div>
          <div
            className={cn(
              'bg- group float-left flex w-[110px] flex-col overflow-hidden bg-white transition-width duration-300 hover:bg-black hover:text-white active:text-primary',
              {}
            )}
          >
            <Link className="h-full w-full" href="/blog/tags">
              <div className="flex h-full w-full cursor-pointer items-center justify-center text-[14px] tracking-wide">
                COMMUNITY
              </div>
            </Link>
            <div className="pointer-events-none absolute left-0 z-10 float-right hidden h-screen w-screen translate-y-[45px] group-hover:block">
              <div className="pointer-events-auto flex h-1/2 w-full divide-x-1.5 divide-secondary-dark-10 border-y-1.5 border-secondary-dark-10 bg-white">
                <div className="h-full w-1/4 text-black">TAG 1</div>
                <div className="h-full w-1/4 text-black">TAG 2</div>
                <div className="h-full w-1/4 text-black">TAG 3</div>
                <div className="h-full w-1/4 text-black">TAG 4</div>
              </div>
            </div>
          </div>
          <div className="flex h-full flex-grow items-center justify-center">
            <span className="w-4/5 overflow-hidden text-ellipsis whitespace-nowrap text-center text-[16px]">
              {postTitle}
            </span>
          </div>
        </div>
        <div
          className={cn(
            'mr-12 flex items-center transition-width duration-300',
            {
              'w-0': !minmized,
              'w-32': minmized,
            }
          )}
        >
          <div
            className={cn('flex items-center gap-x-5', {
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
          className={cn('absolute top-[1.5px] h-[8px] bg-primary', {
            block: postTitle,
            hidden: !postTitle,
          })}
        />
      </div>
    </>
  );
};

export default BlogNavbar;
