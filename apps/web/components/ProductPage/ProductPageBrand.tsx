import { IMerchantBrand } from 'gmc-types';
import React from 'react';
import Image from 'next/image';

interface Props {
  merchantBrand: IMerchantBrand;
}

const ProductPageBrand: React.FC<Props> = ({ merchantBrand }) => {
  const logoUrl = merchantBrand.gmcBrand.logo
    ? merchantBrand.gmcBrand.logo
    : merchantBrand.logo;

  return (
    <div className="flex w-full overflow-hidden overflow-ellipsis py-8 px-10 text-[15px] leading-[1.5]">
      <div className="flex flex-col gap-y-2.5">
        <div className="flex items-center justify-start">
          <span className="flex-grow text-center text-[22px] font-bold">
            {merchantBrand.gmcBrand.name}
          </span>
        </div>
        <span className="py-2 pr-8 text-[15px] leading-[1.4]">
          {merchantBrand.gmcBrand.description
            ? merchantBrand.gmcBrand.description
            : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porta libero accumsan pulvinar placerat. Mauris eleifend, magna id rutrum ultrices, nisi erat vehicula quam, id mollis ipsum enim at enim.'}
        </span>
      </div>
      <div className="relative mt-2 aspect-square h-[80px] border-1.5 border-zinc-700">
        <Image
          src={logoUrl}
          priority
          draggable={false}
          layout="fill"
          objectFit="cover"
          alt="hero"
        />
      </div>
    </div>
  );
};

export default ProductPageBrand;
