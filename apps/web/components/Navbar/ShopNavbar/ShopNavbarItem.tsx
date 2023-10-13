import React, { useState } from 'react';
import { IGmcBaseCategory } from '../../../lib/categories';
import Link from 'next/link';
import cn from 'classnames';
import { IGmcCategory } from 'gmc-types';

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
      className="group h-full w-fit"
      onMouseEnter={() => setNavigating(false)}
    >
      <Link href={`/shop/category/${category.slug}`}>
        <div
          style={{ backgroundColor: hover ? category.color : '#f0f0f5' }}
          onClick={() => setNavigating(true)}
          className={`flex h-full min-w-[110px] cursor-pointer flex-col items-center justify-center overflow-hidden bg-secondary px-6 font-bold hover:bg-[${category.color}] hover:text-black`}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {category.name.toUpperCase()}
        </div>
      </Link>
      {/* <div
        className={cn(
          'pointer-events-none absolute left-0 z-10 float-right hidden h-fit min-h-[400px] w-screen border-1.5 border-zinc-700 bg-white',
          {
            'group-hover:block': !navigating,
          }
        )}
      >
        <div className="pointer-events-auto h-full w-full">hi galaxy</div>
      </div> */}
    </div>
  );
};

export default ShopNavbarItem;
