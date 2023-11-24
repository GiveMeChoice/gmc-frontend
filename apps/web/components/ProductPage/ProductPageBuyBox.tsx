import cn from 'classnames';
import { IProduct } from 'gmc-types';
import Image from 'next/image';
import React from 'react';
import InfoBoxHeart from '../Common/InfoBoxHeart';

interface Props {
  product: IProduct;
}

const ProductPageBuyBox: React.FC<Props> = ({ product }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center px-12 pb-12 pt-6">
      <div className="flex w-[420px] items-center justify-between">
        <span className="pb-1.5 text-[19px] font-bold">￡{product.price}</span>
        <div className="flex gap-x-4">
          <InfoBoxHeart product={product} />
          <div
            id="buybox-share"
            className={cn(
              'flex h-[40px] w-[40px] cursor-pointer select-none items-center justify-center rounded-full py-0.5 hover:bg-secondary active:bg-secondary-dark-10'
            )}
          >
            <Image
              src="/img/share.svg"
              alt="Share Product"
              height={34}
              width={34}
            />
          </div>
        </div>
      </div>
      <div className="active:bg-transarent z-0 mt-6  w-[440px] rounded-full bg-primary">
        <a
          href={product.offerUrl}
          target="_blank"
          rel="noreferrer"
          className="hover:-translate-[6px] hover:translate--[4px] group flex h-[63px] w-full
items-center justify-between gap-x-3 rounded-full bg-black px-10 text-[16px] text-white transition-transform duration-200 ease-in-out hover:bg-zinc-700 active:translate-y-0 active:translate-x-0 active:bg-black
"
        >
          <span className="fon-bold w-full text-center text-[17px] leading-tight tracking-wide group-active:text-primary">
            Buy Now at {product.merchant.name}
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
              width="26"
              height="26"
            />
          </div>
        </a>
      </div>
    </div>
  );
};

export default ProductPageBuyBox;
