import { ProductDocument } from 'gmc-types';
import React, { useEffect, useState } from 'react';
import { getUserTheme } from '../../../lib/theme';
import ProductInfoBox from '../SearchProductCompare/InfoBox';
import { useUser } from '../../UserProvider';

interface Props {
  index: number;
  product: ProductDocument;
  selectProduct: (i: number) => void;
}

const LeadListProduct: React.FC<Props> = ({
  index,
  product,
  selectProduct,
}) => {
  const { profile } = useUser();
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
    <div className="group flex h-fit w-full flex-col">
      <div
        className="flex h-full w-full cursor-pointer"
        onClick={() => selectProduct(index)}
      >
        {/* info */}
        <div className="flex h-full w-3/5 flex-col">
          {/* product title box */}
          <div
            className={`hidden h-fit w-full border-b-1.5 border-black  dark:border-white md:flex bg-${
              getUserTheme(profile).base
            }`}
          >
            <div
              className={`flex aspect-square h-24 max-h-full items-center justify-center border-r-1.5 border-black bg-${
                getUserTheme(profile).modal
              } text-4xl duration-100 group-hover:bg-primary`}
            >
              {index + 1}
            </div>
            <p className="flex h-24 max-w-full flex-grow items-center justify-center overflow-ellipsis p-3 px-5 text-lg group-hover:underline">
              {product.title}
              {/* {`${product.title.substring(0, 80)}${
                product.title.length > 80 ? '...' : ''
              }`} */}
            </p>
          </div>
          {/* info box */}
          <ProductInfoBox product={product} />
        </div>

        {/* image */}
        <div
          className={`group relative flex max-h-full w-2/5  flex-col items-start justify-center border-l-1.5 border-black bg-white`}
        >
          <div className="flex h-full items-center py-2">
            <img
              src={imgSrc.startsWith('http') ? imgSrc : `http://${imgSrc}`}
              className="absolute h-auto max-h-full w-auto transition-transform duration-500"
            />
          </div>
          <span
            className={`relative top-full  flex h-1/4 w-full -translate-y-full items-center justify-center opacity-0 group-hover:opacity-100 bg-${
              getUserTheme(profile).modal
            } border-t border-zinc-200 bg-opacity-80 duration-200`}
          >
            <img
              draggable={false}
              src="/img/search.svg"
              alt="Magnify Icon"
              className="h-1/2"
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default LeadListProduct;
