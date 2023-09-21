import cn from 'classnames';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useBlogNav } from '../BlogNavProvider';
import { useUser } from '../UserProvider';
import BlogNavbarItem from './BlogNavbar/BlogNavbarItem';
import LoginButton from './LoginButton';
import ProfileButton from './ProfileButton';
import SideMenu from './SideMenu/SideMenu';
import Link from 'next/link';
import Image from 'next/image';

const ShopNavbar: React.FC = () => {
  const [minmized, setMinimized] = useState(false);
  const [postTitle, setPostTitle] = useState(null);
  const user = useUser();
  const router = useRouter();
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [navigating, setNavigating] = useState(false);

  useEffect(() => {
    setNavigating(true);
    // cycleNavigate();
    setMinimized(false);
    setPostTitle(null);
    if (router.query.slug && !router.pathname.includes('/tags/')) {
      const slugComponent = (router as any).components['/blog/[slug]'];
      if (slugComponent) {
        setPostTitle(slugComponent.props.pageProps.data.post.title);
      }
    }
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

    return () => {
      window.removeEventListener('scroll', handleScrollUp);
    };
  }, [router.asPath]);

  const cycleNavigate = () => {
    setNavigating(true);
    setTimeout(() => {
      setNavigating(false);
    }, 1000);
  };

  return (
    <div className="bg-seondary flex h-[48px] w-full justify-between border-y-1.5 border-zinc-700 bg-white text-[13px] tracking-wider text-zinc-700">
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
          <Link href="/shop">
            <div className="flex h-full w-[74px] cursor-pointer flex-col items-center justify-center overflow-hidden bg-secondary hover:bg-gmc-surf hover:text-black">
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
        <div
          onClick={() => setNavigating(true)}
          className="flex h-full min-w-[110px]  cursor-pointer flex-col items-center justify-center overflow-hidden bg-secondary px-6 font-bold hover:bg-black hover:text-white"
        >
          LABELS
        </div>
        <div
          className="group h-full w-fit"
          onMouseEnter={() => setNavigating(false)}
        >
          <Link href="/shop/category/apparel">
            <div
              onClick={() => setNavigating(true)}
              className="flex h-full min-w-[110px] cursor-pointer flex-col items-center justify-center overflow-hidden bg-secondary px-6 font-bold hover:bg-gmc-ocean-light-40 hover:text-black"
            >
              APPAREL
            </div>
          </Link>
          <div
            className={cn(
              'pointer-events-none absolute left-0 z-10 float-right hidden h-fit min-h-[400px] w-screen border-1.5 border-zinc-700 bg-white',
              {
                'group-hover:block': !navigating,
              }
            )}
          ></div>
        </div>
        <div
          className="group h-full w-fit"
          onMouseEnter={() => setNavigating(false)}
        >
          <Link href="/shop/category/home & kitchen">
            <div
              onClick={() => setNavigating(true)}
              className="flex h-full min-w-[110px] cursor-pointer flex-col items-center justify-center overflow-hidden bg-secondary px-6 font-bold hover:bg-gmc-berry hover:text-black"
            >
              HOME & KITCHEN
            </div>
          </Link>
          <div
            className={cn(
              'pointer-events-none absolute left-0 z-10 float-right hidden h-fit min-h-[400px] w-screen border-1.5 border-zinc-700 bg-white',
              {
                'group-hover:block': !navigating,
              }
            )}
          >
            <div className="pointer-events-auto h-full w-full">h+k</div>
          </div>
        </div>
        <div
          className="group h-full w-fit"
          onMouseEnter={() => setNavigating(false)}
        >
          <Link href="/shop/category/bath & beauty">
            <div
              onClick={() => setNavigating(true)}
              className="flex h-full min-w-[110px]  cursor-pointer flex-col items-center justify-center overflow-hidden bg-secondary px-6 font-bold hover:bg-gmc-jungle hover:text-black"
            >
              BATH & BEAUTY
            </div>
          </Link>
          <div
            className={cn(
              'pointer-events-none absolute left-0 z-10 float-right hidden h-fit min-h-[400px] w-screen border-1.5 border-zinc-700 bg-white',
              {
                'group-hover:block': !navigating,
              }
            )}
          ></div>
        </div>
        <div
          className="group h-full w-fit"
          onMouseEnter={() => setNavigating(false)}
        >
          <Link href="/shop/category/baby">
            <div
              onClick={() => setNavigating(true)}
              className="flex h-full min-w-[110px] cursor-pointer flex-col items-center justify-center overflow-hidden bg-secondary px-6 font-bold hover:bg-gmc-dune hover:text-black"
            >
              BABY
            </div>
          </Link>
          <div
            className={cn(
              'pointer-events-none absolute left-0 z-10 float-right hidden h-fit min-h-[400px] w-screen border-1.5 border-zinc-700 bg-white',
              {
                'group-hover:block': !navigating,
              }
            )}
          ></div>
        </div>
        <div
          className="group h-full w-fit"
          onMouseEnter={() => setNavigating(false)}
        >
          <Link href="/shop/category/pets">
            <div
              onClick={() => setNavigating(true)}
              className="flex h-full min-w-[110px] cursor-pointer flex-col items-center justify-center overflow-hidden bg-secondary px-6 font-bold hover:bg-gmc-beach hover:text-black"
            >
              PETS
            </div>
          </Link>
          <div
            className={cn(
              'pointer-events-none absolute left-0 z-10 float-right hidden h-fit min-h-[400px] w-screen border-1.5 border-zinc-700 bg-white',
              {
                'group-hover:block': !navigating,
              }
            )}
          ></div>
        </div>
        <div
          className={cn(
            'flex h-full w-[74px] cursor-pointer flex-col items-center justify-center overflow-hidden bg-secondary  hover:text-white',
            {
              'hover:bg-gmc-surf': !navigating,
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
        <div className=""></div>
      </div>
      <div
        className={cn('flex items-center', {
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
  );
};

export default ShopNavbar;
