import { ProductDocument } from 'gmc-types';
import Image from 'next/image';
import React from 'react';
import cn from 'classnames';

interface Props {
  product: ProductDocument;
}

const BuyBoxBuyNowButton: React.FC<Props> = ({ product }) => {
  return (
    <a
      href={product.offerUrl}
      target="_blank"
      rel="noreferrer"
      className="hover:sale-[1.01] gradient-to-r group flex select-none items-center gap-x-6 rounded-sm border-1.5 border-zinc-600 bg-gmc-berry-light-50 from-gmc-surf-light-50 to-primary-light-20  py-2.5 px-6 pl-7 text-[16px] text-zinc-800  shadow-sm transition-all duration-300 hover:shadow-xl active:shadow-sm"
    >
      {/* <img
        src={product.merchant.logo}
        title="Merchant Logo"
        className="h-8 w-8 rounded-full border border-zinc-800"
        alt="LOGO"
      /> */}
      <span className="text-center">Buy Now at {product.brand.name}</span>
      <div
        className={cn('flex h-7 w-7 items-center justify-center rounded-full')}
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
  );
};

export default BuyBoxBuyNowButton;
