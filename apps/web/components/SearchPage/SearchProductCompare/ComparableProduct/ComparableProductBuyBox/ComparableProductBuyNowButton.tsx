import { ProductDocument } from 'gmc-types';
import Image from 'next/image';
import React from 'react';
import cn from 'classnames';

interface Props {
  product: ProductDocument;
}

const ComaprableProductBuyNowButton: React.FC<Props> = ({ product }) => {
  return (
    <a
      href={product.offerUrl}
      target="_blank"
      rel="noreferrer"
      className="flex select-none items-center gap-x-2 rounded-sm border border-black bg-zinc-800 py-3 px-4 text-base text-white shadow-md transition-shadow duration-200 hover:scale-[1.02] hover:text-primary hover:shadow-2xl"
    >
      <span className="">Buy Now at {product.merchant.name}</span>
      <div
        className={cn('flex h-6 w-6 items-center justify-center rounded-full')}
      >
        <Image
          className=""
          draggable={false}
          src="/img/external-link.svg"
          alt="give me"
          width="30"
          height="30"
        />
      </div>
    </a>
  );
};

export default ComaprableProductBuyNowButton;
