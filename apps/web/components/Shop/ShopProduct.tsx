import { ProductDocument } from 'gmc-types';
import React, { useEffect, useState } from 'react';
import ListProductInfoBox from '../SearchPage/ListProduct/ListProductInfoBox';
import Link from 'next/link';
import cn from 'classnames';
import Image from 'next/image';

interface Props {
  index: number;
  product: ProductDocument;
  onClick?: (index) => void;
}

const ShopProduct: React.FC<Props> = ({ product, index, onClick }) => {
  const [imgSrc, setImgSrc] = useState<string>('');
  useEffect(() => {
    let images = product.images.filter((img) => img.type === 'LIST');
    if (images.length === 0) {
      images = product.images;
    }
    if (images.length > 0) {
      const primary = images.find((img) => img.primary);
      setImgSrc(primary ? primary.url : images[0].url);
    }
  }, [product]);

  return (
    <Link href={`/shop/product/${product.id}`}>
      <div
        className={cn(
          'group relative z-0 flex h-[380px] w-full cursor-pointer flex-col divide-y-1.5 divide-zinc-700 overflow-hidden border-b-1.5 border-zinc-700 bg-white lg:w-1/2',
          {
            'lg:border-r-1.5': index % 2 === 0,
          }
        )}
        onClick={() => (onClick ? onClick(index) : null)}
      >
        <p className="flex h-[60px] max-w-full items-center justify-center overflow-ellipsis bg-white px-6 text-center text-[14px] leading-[1.3] group-hover:bg-primary">
          {product.title.replace(/\uFFFD/g, '').toUpperCase()}
        </p>
        <div className="flex h-[320px] w-full flex-col">
          <div className="flex h-full w-full divide-x-1.5 divide-zinc-700">
            <div className="h-full w-1/2">
              <ListProductInfoBox
                product={product}
                onSelectProduct={(e) => null}
              />
            </div>
            <div
              className={`relative flex max-h-full w-1/2 flex-col items-start justify-center bg-white`}
              onClick={(e) => null}
            >
              <div className="flex h-full w-full items-center justify-center">
                <div className="overflow-hidden border-y-1.5 border-secondary">
                  <Image
                    src={imgSrc}
                    // src={
                    //   imgSrc.startsWith('http') ? imgSrc : `http://${imgSrc}`
                    // }
                    priority
                    draggable={false}
                    layout="fill"
                    objectFit="cover"
                    alt="hero"
                  />
                  {/* <img
                    src={
                      imgSrc.startsWith('http') ? imgSrc : `http://${imgSrc}`
                    }
                    className="transition-transform duration-500 group-hover:scale-[1.05]"
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div
        className={cn(
          'relative top-full h-0 w-0 bg-white bg-opacity-50 transition-transform  duration-300 group-hover:top-0 group-hover:h-1/2 group-hover:w-full',
          {}
        )}
      >
        <span className="text-lg">COMPARE MODE</span>
      </div> */}
      </div>
    </Link>
  );
};

export default ShopProduct;
