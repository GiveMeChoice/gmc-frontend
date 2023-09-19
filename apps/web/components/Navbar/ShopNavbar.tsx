import cn from 'classnames';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useBlogNav } from '../BlogNavProvider';
import { useUser } from '../UserProvider';
import BlogNavbarItem from './BlogNavbar/BlogNavbarItem';
import LoginButton from './LoginButton';
import ProfileButton from './ProfileButton';
import SideMenu from './SideMenu/SideMenu';

const ShopNavbar: React.FC = () => {
  const [minmized, setMinimized] = useState(false);
  const [postTitle, setPostTitle] = useState(null);
  const user = useUser();
  const router = useRouter();
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const blogNav = useBlogNav();
  const [navigating, setNavigating] = useState(false);

  useEffect(() => {
    // setNavigating(false);
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
    <div className="bg-seondary flex h-[48px] w-full justify-between border-y-1.5 border-zinc-700 bg-white text-[13px] font-bold tracking-wider text-zinc-700">
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
        <div className="group float-left flex min-w-[110px] cursor-pointer flex-col items-center justify-center overflow-hidden bg-secondary px-6 transition-width duration-300 hover:bg-black hover:text-white">
          APPAREL
        </div>
        <div className="group float-left flex min-w-[110px] cursor-pointer flex-col items-center justify-center overflow-hidden bg-secondary px-6 transition-width duration-300 hover:bg-black hover:text-white">
          HOME & KITCHEN
        </div>
        <div className="group float-left flex min-w-[110px] cursor-pointer flex-col items-center justify-center overflow-hidden bg-secondary px-6 transition-width duration-300 hover:bg-black hover:text-white">
          BATH & BEAUTY
        </div>
        <div className="group float-left flex min-w-[110px] cursor-pointer flex-col items-center justify-center overflow-hidden bg-secondary px-6 transition-width duration-300 hover:bg-black hover:text-white">
          BABY
        </div>
        <div className="group float-left flex min-w-[110px] cursor-pointer flex-col items-center justify-center overflow-hidden bg-secondary px-6 transition-width duration-300 hover:bg-black hover:text-white">
          PETS
        </div>
        <div className="group float-left flex min-w-[110px] cursor-pointer flex-col items-center justify-center overflow-hidden bg-secondary px-6 transition-width duration-300 hover:bg-black hover:text-white">
          by LABEL
        </div>
        <div className=""></div>
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
  );
};

export default ShopNavbar;
