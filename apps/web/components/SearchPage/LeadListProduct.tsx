import { ProductDocument } from 'gmc-types';
import React, { useEffect, useState } from 'react';
import ProductInfoBox from './LeadListProduct/InfoBox';

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
    <div
      className="group flex max-h-96 w-1/2 cursor-pointer flex-col divide-y-1.5 divide-black border-r-1.5 border-b-1.5 border-black"
      onClick={() => selectProduct(index)}
    >
      <div className={'flex divide-x-1.5 divide-black'}>
        <div
          className={`flex aspect-4/3 w-20 items-center justify-center bg-secondary
              text-3xl duration-100 group-hover:bg-primary`}
        >
          {index + 1}
        </div>
        <p className="flex max-w-full flex-grow items-center justify-center overflow-ellipsis p-3 px-5 group-hover:underline">
          {product.title}
        </p>
      </div>
      <div className="flex h-full w-full divide-x-1.5 divide-black">
        <div className="w-2/3">
          <ProductInfoBox product={product} />
        </div>
        <div
          className={`group relative flex max-h-full w-1/3  flex-col items-start justify-center  bg-white`}
        >
          <div className="flex h-full w-full items-center justify-center">
            <div className="p-2">
              <img
                src={imgSrc.startsWith('http') ? imgSrc : `http://${imgSrc}`}
                className="transition-transform duration-300 group-hover:scale-[1.035]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadListProduct;
