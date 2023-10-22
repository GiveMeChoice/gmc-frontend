import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useShop } from '../../Context/ShopProvider';
import { useUser } from '../../Context/UserProvider';
import SideMenu from './SideMenu/SideMenu';

const ShopNavbarMobile: React.FC = () => {
  const {
    baseCategories: categories,
    initialized,
    baseLabels: labels,
  } = useShop();
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
          navContainer.style.top = '-70px';
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
    <div className="bg-seondary flex h-[40px] w-full justify-between border-y-1.5 border-zinc-700 bg-white text-[14px] tracking-wide text-zinc-700 md:hidden">
      <div className="flex h-full w-full divide-x-1.5 divide-zinc-700">
        <div
          className={cn(
            'flex w-[15%] items-center justify-center bg-secondary transition-width duration-300',
            {
              // 'w-8': !minmized,
              // 'w-[71px]': minmized,
            }
          )}
        >
          <div
            className={cn(
              'flex h-full w-full cursor-pointer flex-col items-center justify-center gap-y-[4px] transition-all duration-300 hover:bg-primary',
              {}
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
        {/* <div
          className="group h-full w-1/5"
          onMouseEnter={() => setNavigating(false)}
        >
          <Link href="/shop">
            <div className="flex h-full w-full cursor-pointer items-center justify-center gap-x-2 overflow-hidden bg-secondary font-bold hover:bg-primary hover:text-black">
              <Image
                className="select-none rounded-full"
                draggable={false}
                src="/img/bag.svg"
                alt="give me"
                width="20"
                height="20"
              />
            </div>
          </Link>
        </div> */}
        <div
          className="group flex h-full w-[35%] bg-secondary"
          onMouseEnter={() => setNavigating(false)}
        >
          <Link href={`/shop/label`}>
            <div
              // style={{ backgroundColor: hover ? baseCategory.color : '#f0f0f5' }}
              onClick={() => setNavigating(true)}
              className={`flex h-full w-full cursor-pointer flex-col items-center justify-center overflow-hidden bg-secondary px-6 font-bold hover:text-black group-hover:bg-primary`}
            >
              LABELS
            </div>
          </Link>
          <div
            className={cn(
              'pointer-events-none absolute left-0 z-40 float-right hidden h-full min-h-[300px] w-screen translate-y-[45px] bg-white',
              {
                'group-hover:block': !navigating,
              }
            )}
          >
            <div className="pointer-events-auto flex h-fit w-full divide-x-1.5 divide-zinc-700 border-y-1.5 border-zinc-700">
              <div className="flex h-full w-full flex-wrap bg-secondary">
                {labels.map((label) => (
                  <div
                    className={`flex h-[180px] w-1/3 flex-col gap-y-1 border-b-1.5 border-r-1.5
                     border-zinc-400 bg-white py-5 px-7`}
                    // style={{ backgroundColor: label.color }}
                  >
                    <LabelLink path={label.slug}>
                      <div className="flex w-full cursor-pointer items-center gap-x-2 pb-1">
                        <div
                          style={{ backgroundColor: label.color }}
                          className="aspect-square h-3 rounded-full"
                        />
                        <span className="w-full text-[18px] font-bold leading-[1.25]">
                          {label.name}
                        </span>
                      </div>
                    </LabelLink>
                    {label.children.slice(0, 4).map((sublabel) => (
                      <LabelLink path={`${label.slug}/${sublabel.slug}`}>
                        <span className="cursor-pointer pl-3 text-[17px] tracking-tight text-secondary-dark-50 hover:text-black">
                          {sublabel.name}
                        </span>
                      </LabelLink>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div
          className="group flex h-full w-[35%] bg-secondary lg:hidden"
          onMouseEnter={() => setNavigating(false)}
        >
          <Link href={`/shop/category`}>
            <div
              // style={{ backgroundColor: hover ? baseCategory.color : '#f0f0f5' }}
              onClick={() => setNavigating(true)}
              className={`flex h-full w-full cursor-pointer flex-col items-center justify-center overflow-hidden bg-secondary px-6 font-bold hover:text-black group-hover:bg-primary`}
            >
              CATEGORIES
            </div>
          </Link>
          <div
            className={cn(
              'pointer-events-none absolute left-0 z-40 float-right hidden h-full min-h-[300px] w-screen translate-y-[45px] bg-white',
              {
                'group-hover:block': !navigating,
              }
            )}
          >
            <div className="pointer-events-auto flex h-fit w-full divide-x-1.5 divide-zinc-700 border-y-1.5 border-zinc-700">
              <div className="flex h-full w-full flex-wrap bg-secondary">
                {categories.map((category) => (
                  <div
                    className={`flex h-[180px] w-1/3 flex-col gap-y-1 border-b-1.5 border-r-1.5
                     border-zinc-400 bg-white py-5 px-7`}
                    // style={{ backgroundColor: label.color }}
                  >
                    <CategoryLink path={category.slug}>
                      <div className="flex w-full cursor-pointer items-center gap-x-2 pb-1">
                        <div
                          style={{ backgroundColor: category.color }}
                          className="aspect-square h-3 rounded-full"
                        />
                        <span className="w-full text-[18px] font-bold leading-[1.25]">
                          {category.name}
                        </span>
                      </div>
                    </CategoryLink>
                    {category.children.slice(0, 4).map((sublabel) => (
                      <CategoryLink path={`${category.slug}/${sublabel.slug}`}>
                        <span className="cursor-pointer pl-3 text-[17px] tracking-tight text-secondary-dark-50 hover:text-black">
                          {sublabel.name}
                        </span>
                      </CategoryLink>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className={cn(
            'flex h-full w-[15%] cursor-pointer flex-col items-center justify-center overflow-hidden bg-secondary  hover:text-white',
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
            width="20"
            height="20"
          />
        </div>
      </div>
    </div>
  );
};

interface ILabelLinkProps {
  path: string;
}

const LabelLink: React.FC<ILabelLinkProps> = ({ path, children }) => (
  <Link href={`/shop/label/${path}`}>{children}</Link>
);

const CategoryLink: React.FC<ILabelLinkProps> = ({ path, children }) => (
  <Link href={`/shop/category/${path}`}>{children}</Link>
);

export default ShopNavbarMobile;
