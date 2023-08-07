import { ProductDocument } from 'gmc-types';
import React from 'react';
import InfoBoxBrand from './ListProductInfoBox/InfoBoxBrand';
import InfoBoxHeart from './ListProductInfoBox/InfoBoxHeart';

interface Props {
  product: ProductDocument;
}

const ListProductInfoBox: React.FC<Props> = ({ product }) => {
  return (
    <div
      className={`mx-1 flex h-full w-full flex-col justify-between gap-y-6 bg-white px-8 pt-7 pb-9`}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center justify-between text-zinc-800">
          <span className="text-[28px]">£ {product.price}</span>
        </div>
        <div id="list-product-heart" className="">
          <InfoBoxHeart product={product} />
        </div>
      </div>

      <div className="w-full">
        <span className="w-2/3 text-sm text-zinc-700">
          {product.description
            ? `${product.description.substring(0, 75).trim()}${
                product.description.length > 75 ? '...' : ''
              }`
            : ''}
        </span>
      </div>
      <div className="flex w-full items-center justify-start gap-x-3">
        <InfoBoxBrand brand={product.brand} />
        {/* <span className="text-xs text-zinc-700">OFFERED BY:</span> */}
        {/* <div className="flex items-center justify-center gap-1 border-1.5 border-zinc-800 bg-zinc-800 py-1 px-2 text-white">
          <span className="whitespace-nowrap text-xs">
            {product.merchant.name.toLocaleUpperCase()}
          </span>
        </div> */}
      </div>
    </div>
  );
};

export default ListProductInfoBox;
