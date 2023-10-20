import cn from 'classnames';
import { ProductDocument } from 'gmc-types';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ShopProductInfoBox from './ShopProduct/ShopProductInfoBox';

interface Props {
  index: number;
  product: ProductDocument;
}

const ShopProduct: React.FC<Props> = ({ product, index }) => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string>('');
  useEffect(() => {
    let images = product.images.filter((img) => img.type === 'LIST');
    if (images.length === 0) {
      images = product.images;
    }
    if (images.length > 0) {
      const primary = images.find((img) => img.primary);
      setImageUrl(primary ? primary.url : images[0].url);
    }
  }, [product]);

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
      <p className="flex h-[60px] max-w-full items-center justify-center overflow-ellipsis bg-white px-6 text-center text-[14px] leading-[1.3] group-hover:bg-primary">
        {product.title.replace(/\uFFFD/g, '').toUpperCase()}
      </p>
      <div className="flex h-[320px] w-full flex-col">
        <div className="flex h-full w-full divide-x-1.5 divide-zinc-700">
          <div className="h-full w-1/2">
            <ShopProductInfoBox product={product} />
          </div>
          <div
            className={`relative flex max-h-full w-1/2 flex-col items-start justify-center bg-white`}
            onClick={(e) => null}
          >
            <div className="flex h-full w-full items-center justify-center">
              <div className="overflow-hidden border-y-1.5 border-secondary">
                <Image
                  src={imageUrl}
                  priority
                  draggable={false}
                  layout="fill"
                  objectFit="cover"
                  alt="hero"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopProduct;
