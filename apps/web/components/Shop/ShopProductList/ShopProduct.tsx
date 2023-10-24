import cn from 'classnames';
import { ProductDocument } from 'gmc-types';
import { useRouter } from 'next/router';
import React from 'react';
import ShopProductImage from './ShopProduct/ShopProductImage';
import ShopProductInfoBox from './ShopProduct/ShopProductInfoBox';

interface Props {
  index: number;
  product: ProductDocument;
}

const ShopProduct: React.FC<Props> = ({ product, index }) => {
  const router = useRouter();

  const handleClick = (e) => {
    if (!!e.target.closest('.shop-product')) {
      router.push(`/shop/product/${product.id}`);
    }
  };

  return (
    <div
      className={cn(
        'shop-product group relative z-0 flex h-[380px] w-full cursor-pointer flex-col divide-y-1.5 divide-zinc-700 overflow-hidden border-b-1.5 border-zinc-700 bg-white lg:w-1/2',
        {
          'lg:border-r-1.5': index % 2 === 0,
        }
      )}
      onClick={handleClick}
    >
      <p className="flex h-[64px] max-w-full items-center justify-center overflow-ellipsis bg-white px-8 text-center text-[14px] leading-[1.4] group-hover:bg-primary">
        {product.title.replace(/\uFFFD/g, '').toUpperCase()}
      </p>
      <div className="flex h-[320px] w-full flex-col">
        <div className="flex h-full w-full">
          <div className="hidden h-full w-[60%] border-r-1.5 border-zinc-700 lg:block">
            <ShopProductImage images={product.images} />
          </div>
          <div className="h-full w-1/2 lg:w-[40%]">
            <ShopProductInfoBox product={product} />
          </div>
          <div className="h-full w-1/2 border-l-1.5 border-zinc-700 lg:hidden">
            <ShopProductImage images={product.images} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopProduct;
