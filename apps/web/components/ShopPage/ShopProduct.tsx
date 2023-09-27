import { ProductDocument } from 'gmc-types';
import React, { useEffect, useState } from 'react';
import ListProductInfoBox from '../SearchPage/ListProduct/ListProductInfoBox';
import Link from 'next/link';

interface Props {
  product: ProductDocument;
}

const ShopProduct: React.FC<Props> = ({ product }) => {
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
      <div className=" group relative z-0 flex min-h-[371px] w-full cursor-pointer flex-col divide-y-1.5 divide-zinc-700 border-r-1.5 border-t-1.5 border-zinc-700 bg-white xl:w-1/2">
        <p className="flex h-16 max-w-full flex-grow items-center justify-center overflow-ellipsis bg-secondary px-6 text-[18px] group-hover:bg-primary">
          {product.title.replace(/\uFFFD/g, '')}
        </p>
        <div className="flex h-[350px] w-full divide-x-1.5 divide-zinc-700">
          <div className="w-1/2">
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
              <div className="p-2 py-4">
                <img
                  src={imgSrc.startsWith('http') ? imgSrc : `http://${imgSrc}`}
                  className="transition-transform duration-150 group-hover:scale-[1.035]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ShopProduct;
