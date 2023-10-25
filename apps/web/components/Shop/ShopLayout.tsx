import React from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';

const ShopLayout: React.FC = ({ children }) => {
  const router = useRouter();
  return (
    <div
      className={cn('flex w-screen justify-center ', {
        'mt-[166px] sm:mt-[126px] md:mt-[134px] lg:mt-[158px]':
          router.route.includes('/shop/search'),
        'mt-[108px] sm:mt-[126px] md:mt-[134px] lg:mt-[158px]':
          !router.route.includes('/shop/search'),
      })}
    >
      <div
        id="content-container"
        className="flex min-h-screen w-full max-w-[1200px] flex-col justify-start divide-x-1.5 divide-zinc-700 overflow-y-auto overflow-x-hidden border-t-1.5 border-zinc-700 md:flex-row lg:border-x-1.5"
      >
        {children}
      </div>
    </div>
  );
};

export default ShopLayout;
