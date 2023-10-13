import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { baseCategories } from '../../lib/categories';
import { useUser } from '../UserProvider';
import LoginButton from './LoginButton';
import ProfileButton from './ProfileButton';
import ShopNavbarItem from './ShopNavbar/ShopNavbarItem';
import SideMenu from './SideMenu/SideMenu';
import { useShopNav } from '../Shop/ShopNavProvider';

const ShopNavbar: React.FC = () => {
  const { categories, initialized: loading } = useShopNav();
  const [minmized, setMinimized] = useState(false);
  const user = useUser();
  const router = useRouter();
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [navigating, setNavigating] = useState(false);

  useEffect(() => {
    setNavigating(true);
    setMinimized(false);
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

  return (
    <div className="bg-seondary flex h-[48px] w-full justify-between border-y-1.5 border-zinc-700 bg-white text-[13px] tracking-wider text-zinc-700">
      <div className="flex h-full w-full divide-x-1.5 divide-zinc-700">
        <div
          className={cn(
            'flex items-center justify-center bg-white transition-width duration-300',
            {
              'w-4': !minmized,
              'w-[71px]': minmized,
            }
          )}
        >
          <div
            className={cn(
              'flex h-full w-full cursor-pointer flex-col items-center justify-center gap-y-[4px] transition-all duration-300 hover:bg-primary',
              {
                '-translate-x-44': !minmized,
              }
            )}
            onClick={() => setSideMenuOpen(!sideMenuOpen)}
          >
            <div className="w-5 border-b-2 border-black" />
            <div className="my-[1px] w-[24px] border-b-2 border-black" />
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
            <div className="flex h-full w-[74px] cursor-pointer flex-col items-center justify-center overflow-hidden bg-secondary hover:bg-primary hover:text-black">
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
        <Link href={`/shop/label`}>
          <div
            // style={{ backgroundColor: hover ? baseCategory.color : '#f0f0f5' }}
            onClick={() => setNavigating(true)}
            className={`flex h-full min-w-[110px] cursor-pointer flex-col items-center justify-center overflow-hidden bg-secondary px-6 font-bold hover:bg-gmc-sunset hover:text-black`}
          >
            LABELS
          </div>
        </Link>
        {!loading &&
          categories
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((category) => (
              <ShopNavbarItem
                category={category}
                navigating={navigating}
                setNavigating={setNavigating}
              />
            ))}

        <div
          className={cn(
            'flex h-full w-[74px] cursor-pointer flex-col items-center justify-center overflow-hidden bg-secondary  hover:text-white',
            {
              'hover:bg-primary': !navigating,
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
