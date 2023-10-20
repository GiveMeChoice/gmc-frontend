import cn from 'classnames';
import { IGmcCategory } from 'gmc-types';
import Link from 'next/link';
import React, { ReactFragment, useState } from 'react';

interface Props {
  category: IGmcCategory;
  navigating: boolean;
  setNavigating: (navigating: boolean) => void;
}

const ShopNavbarItem: React.FC<Props> = ({
  category,
  navigating,
  setNavigating,
}) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="group flex h-full bg-secondary"
      onMouseEnter={() => setNavigating(false)}
    >
      <Link className="h-full w-full" href={`/shop/category/${category.slug}`}>
        <div
          style={{ backgroundColor: hover ? category.color : '#f0f0f5' }}
          className={`group flex h-full min-w-[110px] cursor-pointer items-center justify-center overflow-hidden bg-secondary px-6 font-bold  tracking-wider hover:text-black`}
          onClick={() => setNavigating(true)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {category.name.toUpperCase()}
        </div>
      </Link>
      {/* <div
        className={cn(
          'pointer-events-none absolute left-0 z-50 float-right hidden h-full min-h-[400px] w-screen translate-y-[45px] bg-white',
          {
            'group-hover:block': !navigating,
          }
        )}
      >
        <div className="pointer-events-auto flex h-full w-full divide-x-1.5 divide-zinc-700 border-y-1.5 border-zinc-700">
          <div className="h-full w-1/4">img</div>
          <div className="flex h-full w-3/4 justify-evenly p-8">
            {category.children.map((subcat1) => (
              <div className="flex flex-col flex-wrap gap-y-1">
                <CategoryLink path="">
                  <span className="w-[200px] cursor-pointer pb-2 text-[17px] font-bold">
                    {subcat1.name}
                  </span>
                </CategoryLink>
                {subcat1.children.slice(0, 10).map((subcat2) => (
                  <CategoryLink path="">
                    <span className=" cursor-pointer  text-[16px] tracking-tight text-secondary-dark-50 hover:text-black">
                      {subcat2.name}
                    </span>
                  </CategoryLink>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
};

interface ICategoryLinkProps {
  path: string;
}

const CategoryLink: React.FC<ICategoryLinkProps> = ({ path, children }) => (
  <Link href={`/shop/category/${path}`}>{children}</Link>
);

export default ShopNavbarItem;
