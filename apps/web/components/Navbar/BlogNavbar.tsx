import cn from 'classnames';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useBlogNav } from '../BlogNavProvider';
import { useUser } from '../UserProvider';
import BlogNavbarItem from './BlogNavbar/BlogNavbarItem';
import LoginButton from './LoginButton';
import ProfileButton from './ProfileButton';
import SideMenu from './SideMenu/SideMenu';
import BlogNavbarPostTitle from './BlogNavbar/BlogNavbarPostTitle';
import Link from 'next/link';
import Image from 'next/image';

const BlogNavbar: React.FC = () => {
  const [minmized, setMinimized] = useState(false);
  const [postTitle, setPostTitle] = useState(null);
  const user = useUser();
  const router = useRouter();
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const blogNav = useBlogNav();
  const [navigating, setNavigating] = useState(false);

  useEffect(() => {
    setNavigating(true);
    setMinimized(false);
    setPostTitle(null);
    if (router.query.slug && !router.pathname.includes('/tags/')) {
      const slugComponent = (router as any).components['/blog/[slug]'];
      if (slugComponent) {
        setPostTitle(slugComponent.props.pageProps.data.post.title);
      }
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
      const scrolled = (winScroll / (height * 0.78)) * 100;
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

  const cycleNavigate = () => {
    setNavigating(true);
    // setTimeout(() => {
    //   setNavigating(false);
    // }, 500);
  };

  return (
    <>
      <div className="bg-seondary flex h-[48px] w-full justify-between border-y-1.5 border-zinc-700 bg-white text-[13px] text-zinc-800">
        <div className="flex h-full w-full divide-x-1.5 divide-zinc-700">
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
            className="group h-full w-fit"
            onMouseEnter={() => setNavigating(false)}
          >
            <Link href="/blog" onClick={cycleNavigate}>
              <div className="flex h-full w-[74px] cursor-pointer flex-col items-center justify-center overflow-hidden bg-secondary hover:bg-gmc-sunset hover:text-black">
                <Image
                  className="select-none rounded-full"
                  draggable={false}
                  src="/img/home.svg"
                  alt="give me"
                  width="24"
                  height="24"
                />
              </div>
            </Link>
          </div>
          {/* <div
            className="group flex bg-secondary hover:bg-black hover:text-white"
            onMouseEnter={() => setNavigating(false)}
          >
            <BlogNavbarItem
              title="the LATEST"
              posts={blogNav ? blogNav.latestPosts : []}
              navigating={navigating}
              onNavigate={cycleNavigate}
            />
          </div> */}
          <div
            className="group flex bg-secondary hover:bg-gmc-berry"
            onMouseEnter={() => setNavigating(false)}
          >
            <BlogNavbarItem
              title="WELLNESS"
              path="/tags/wellness"
              posts={blogNav ? blogNav.wellnessPosts : []}
              navigating={navigating}
              onNavigate={cycleNavigate}
            />
          </div>
          <div
            className="group flex bg-secondary hover:bg-gmc-dune"
            onMouseEnter={() => setNavigating(false)}
          >
            <BlogNavbarItem
              title="INDOOR"
              path="/tags/indoor"
              posts={blogNav ? blogNav.indoorPosts : []}
              navigating={navigating}
              onNavigate={cycleNavigate}
            />
          </div>
          <div
            className="group flex bg-secondary hover:bg-gmc-forest"
            onMouseEnter={() => setNavigating(false)}
          >
            <BlogNavbarItem
              title="OUTDOOR"
              path="/tags/outdoor"
              posts={blogNav ? blogNav.outdoorPosts : []}
              navigating={navigating}
              onNavigate={cycleNavigate}
            />
          </div>
          <div
            className="group flex bg-secondary hover:bg-gmc-beach"
            onMouseEnter={() => setNavigating(false)}
          >
            <BlogNavbarItem
              title="JOY"
              path="/tags/joy"
              posts={blogNav ? blogNav.joyPosts : []}
              navigating={navigating}
              onNavigate={cycleNavigate}
            />
          </div>

          <div
            className="group flex bg-secondary hover:bg-gmc-surf"
            onMouseEnter={() => setNavigating(false)}
          >
            <BlogNavbarItem
              title="COMMUNITY"
              path="/tags/community"
              posts={blogNav ? blogNav.communityPosts : []}
              navigating={navigating}
              onNavigate={cycleNavigate}
            />
          </div>
          <div
            className={cn(
              'flex h-full w-[74px] cursor-pointer flex-col items-center justify-center overflow-hidden bg-secondary  hover:text-white',
              {
                'hover:bg-gmc-sunset': !navigating,
              }
            )}
            onClick={() => {
              setNavigating(true);
              document.getElementById('gmc-search-bar').focus();
              const navContainer = document.getElementById('navbar-container');
              if (navContainer) {
                navContainer.style.top = '0';
                setMinimized(false);
              }
              // window.scrollTo(0, 0);
            }}
            onMouseEnter={() => setNavigating(false)}
          >
            <Image
              className="select-none rounded-full"
              draggable={false}
              src="/img/search.svg"
              alt="give me"
              width="22"
              height="22"
            />
          </div>
          <BlogNavbarPostTitle title={postTitle} />
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
            })}
          >
            {user.user ? <ProfileButton /> : <LoginButton />}
          </div>
        </div>
      </div>
      <div className="relative z-0 w-full">
        <div
          id="scroll-progress-bar"
          className={cn('absolute h-[10px] bg-primary', {
            block: postTitle,
            hidden: !postTitle,
          })}
        />
      </div>
    </>
  );
};

export default BlogNavbar;
