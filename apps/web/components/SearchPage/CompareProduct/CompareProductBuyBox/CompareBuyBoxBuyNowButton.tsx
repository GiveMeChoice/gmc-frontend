import { ProductDocument } from 'gmc-types';
import Image from 'next/image';
import React from 'react';
import cn from 'classnames';

interface Props {
  product: ProductDocument;
}

const CompareBuyBoxBuyNowButton: React.FC<Props> = ({ product }) => {
  return (
    <div className="active:bg-transarent z-0 w-full  bg-black hover:shadow-md active:shadow-sm">
      <a
        href={product.offerUrl}
        target="_blank"
        rel="noreferrer"
        className="-gradient-to-l font-bd z-20 flex w-full items-center
      justify-between gap-x-4  border border-primary bg-primary from-primary-light-50 to-gmc-surf-light-50 py-3.5 px-8 text-[18px] text-zinc-900 transition-transform duration-200 ease-in-out hover:-translate-y-[6px] hover:translate-x-[4px] hover:border-secondary-dark-50 active:translate-y-0 active:translate-x-0
      "
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-500 bg-secondary">
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
        className="h-8 w-8 rounded-full borde border-zinc-800"
        alt="LOGO"
      /> */}
        <span className="text-center tracking-wide">
          <span className="text-[22px] font-bold">
            <span className="text-[20px]">£</span> {product.price}
          </span>{' '}
          at {product.brand.name}
        </span>
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

export default CompareBuyBoxBuyNowButton;
