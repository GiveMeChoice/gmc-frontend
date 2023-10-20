import { IMerchant } from 'gmc-types';
import Image from 'next/image';
import React from 'react';

interface Props {
  merchant: IMerchant;
}

const ProductPageMerchant: React.FC<Props> = ({ merchant }) => {
  return (
    <div className="flex w-full flex-col gap-y-2.5 py-7 px-10 text-[15px] leading-[1.5]">
      <div className="w-full font-bold">Product Sold By</div>
      <div className="flex items-center">
        <div className="rounded- relative aspect-square h-[50px] border-1.5 border-zinc-700">
          <Image
            src={merchant.logo}
            className="rounded-"
            priority
            draggable={false}
            layout="fill"
            objectFit="cover"
            alt="hero"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <div className="text-center">
            <span className="flex-grow text-[16px] font-bold">
              {merchant.name}
            </span>
          </div>
          <span className="py-2 pl-12 text-[14px] leading-[1.4]">
            {merchant.description
              ? merchant.description
              : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porta libero accumsan pulvinar placerat. Mauris eleifend, magna id rutrum ultrices, nisi erat vehicula quam, id mollis ipsum enim at enim.'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductPageMerchant;
