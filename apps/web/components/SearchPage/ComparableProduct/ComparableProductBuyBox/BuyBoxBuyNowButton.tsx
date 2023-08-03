import { ProductDocument } from 'gmc-types';
import Image from 'next/image';
import React from 'react';
import cn from 'classnames';

interface Props {
  product: ProductDocument;
}

const BuyBoxBuyNowButton: React.FC<Props> = ({ product }) => {
  return (
    <div className="active:bg-transarent z-0 w-full rounded-sm bg-zinc-900 hover:bg-zinc-900 hover:shadow-md active:shadow-sm">
      <a
        href={product.offerUrl}
        target="_blank"
        rel="noreferrer"
        className="z-20 flex w-full items-center justify-between gap-x-4
      rounded-sm border border-zinc-800 bg-gradient-to-l from-gmc-surf-light-50 to-primary-light-50 py-2.5 px-8 pl-4 text-[16px] text-zinc-800 transition-transform duration-200 ease-in-out hover:-translate-y-[5px] hover:translate-x-[2px] active:translate-y-0 active:translate-x-0
      "
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 bg-secondary">
          <Image
            draggable={false}
            src="/img/cart.svg"
            alt="Tree Icon"
            height={20}
            width={20}
          />
        </div>
        {/* <img
        src={product.merchant.logo}
        title="Merchant Logo"
        className="h-8 w-8 rounded-full border border-zinc-800"
        alt="LOGO"
      /> */}
        <span className="text-center">Buy Now at {product.brand.name}</span>
        <div
          className={cn(
            'ml-2 flex h-7 w-7 items-center justify-center rounded-full'
          )}
        >
          <Image
            className=""
            draggable={false}
            src="/img/external-link.svg"
            alt="give me"
            width="32"
            height="32"
          />
        </div>
      </a>
    </div>
  );
};

export default BuyBoxBuyNowButton;
