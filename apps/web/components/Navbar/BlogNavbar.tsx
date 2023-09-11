import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useUser } from '../UserProvider';
import BlogNavbarDropdown from './BlogNavbar/BlogNavbarDropdown';
import LoginButton from './LoginButton';
import ProfileButton from './ProfileButton';
import SideMenu from './SideMenu/SideMenu';
import { useBlogNav } from '../BlogNavProvider';

const BlogNavbar: React.FC = () => {
  const [minmized, setMinimized] = useState(false);
  const [postTitle, setPostTitle] = useState(null);
  const user = useUser();
  const router = useRouter();
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const blogNav = useBlogNav();

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
      <div className="bg-seondary flex h-[48px] w-full justify-between border-t-1.5 border-secondary-dark-10 bg-secondary text-[13px]">
        <div className="flex h-full w-full divide-x-1.5 divide-secondary-dark-10">
          <div
            className={cn(
              'flex items-center justify-center transition-width duration-300',
              {
                'w-9': !minmized,
                'w-24': minmized,
              }
            )}
          >
            <div
              className={cn(
                'flex h-full w-full cursor-pointer flex-col items-center justify-center gap-y-[4px] transition-all duration-300  hover:bg-white',
                {
                  // 'pr-5': minmized,
                  '-translate-x-44': !minmized,
                }
              )}
              onClick={() => setSideMenuOpen(!sideMenuOpen)}
            >
              <div className="w-5 border-b-2 border-black" />
              <div className="my-[1px] w-[23px] border-b-2 border-black" />
              <div className="w-5 border-b-2 border-black" />
            </div>
            <SideMenu
              open={sideMenuOpen}
              close={() => setSideMenuOpen(!sideMenuOpen)}
            />
          </div>
          <div
            className={cn(
              'group float-left flex w-[110px] flex-col overflow-hidden transition-width duration-300 hover:bg-black hover:text-white active:text-primary',
              {}
            )}
          >
            <Link className="h-full w-full" href="/blog">
              <div className="flex h-full w-full cursor-pointer items-center justify-center text-[13px] tracking-wide">
                WELLNESS
              </div>
            </Link>
            <div className="pointer-events-none absolute left-0 z-10 float-right hidden h-fit min-h-[500px] w-screen translate-y-[45px] group-hover:block">
              <BlogNavbarDropdown
                posts={blogNav ? blogNav.wellnessPosts : []}
              />
            </div>
          </div>
          <div
            className={cn(
              'group float-left flex w-[110px] flex-col overflow-hidden  transition-width duration-300 hover:bg-black hover:text-white active:text-primary',
              {}
            )}
          >
            <Link className="h-full w-full" href="/blog/posts">
              <div className="flex h-full w-full cursor-pointer items-center justify-center text-[13px] tracking-wide">
                INDOOR
              </div>
            </Link>
            <div className="pointer-events-none absolute left-0 z-10 float-right hidden h-fit min-h-[500px] w-screen translate-y-[45px] group-hover:block">
              <BlogNavbarDropdown posts={blogNav ? blogNav.indoorPosts : []} />
            </div>
          </div>
          <div
            className={cn(
              'bg- group float-left flex w-[110px] flex-col overflow-hidden  transition-width duration-300 hover:bg-black hover:text-white active:text-primary',
              {}
            )}
          >
            <Link className="h-full w-full" href="/blog/tags">
              <div className="flex h-full w-full cursor-pointer items-center justify-center text-[13px] tracking-wide">
                OUTDOOR
              </div>
            </Link>
            <div className="pointer-events-none absolute left-0 z-10 float-right hidden h-fit min-h-[500px] w-screen translate-y-[45px] group-hover:block">
              <BlogNavbarDropdown posts={blogNav ? blogNav.outdoorPosts : []} />
            </div>
          </div>
          <div
            className={cn(
              'bg- group float-left flex w-[110px] flex-col overflow-hidden  transition-width duration-300 hover:bg-black hover:text-white active:text-primary',
              {}
            )}
          >
            <Link className="h-full w-full" href="/blog/tags">
              <div className="flex h-full w-full cursor-pointer items-center justify-center text-[13px] tracking-wide">
                JOY
              </div>
            </Link>
            <div className="pointer-events-none absolute left-0 z-10 float-right hidden h-fit min-h-[500px] w-screen translate-y-[45px] group-hover:block">
              <BlogNavbarDropdown posts={blogNav ? blogNav.joyPosts : []} />
            </div>
          </div>
          <div
            className={cn(
              'bg- group float-left flex w-[110px] flex-col overflow-hidden  transition-width duration-300 hover:bg-black hover:text-white active:text-primary',
              {}
            )}
          >
            <Link className="h-full w-full" href="/blog/tags">
              <div className="flex h-full w-full cursor-pointer items-center justify-center text-[13px] tracking-wide">
                COMMUNITY
              </div>
            </Link>
            <div className="pointer-events-none absolute left-0 z-10 float-right hidden h-fit min-h-[500px] w-screen translate-y-[45px] group-hover:block">
              <BlogNavbarDropdown
                posts={blogNav ? blogNav.communityPosts : []}
              />
            </div>
          </div>
          <div className="flex h-full flex-grow items-center justify-center">
            <span className="w-4/5 overflow-hidden text-ellipsis whitespace-nowrap text-center text-[16px]">
              {postTitle}
            </span>
          </div>
        </div>
        <div
          className={cn('flex items-center transition-width duration-300', {
            'w-0': !minmized,
            'w-28': minmized,
          })}
        >
          <div
            className={cn('transition-all duration-300', {
              'translate-x-44': !minmized,
              // block: minmized,
            })}
          >
            {user.user ? <ProfileButton /> : <LoginButton />}
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
