import { ProductDocument } from 'gmc-types';
import React from 'react';
import ComparableProductBuyBoxCategory from './ComparableProductBuyBox/ComparableProductBuyBoxCategory';
import ComparableBuyBoxHeart from './ComparableProductBuyBox/ComparableProductBuyBoxHeart';
import MerchantChip from '../../Shared/MerchantChip';
import ComaprableProductBuyNowButton from './ComparableProductBuyBox/ComparableProductBuyNowButton';

interface Props {
  product: ProductDocument;
}

const ComparableProductBuyBox: React.FC<Props> = ({ product }) => {
  return (
    <div className="pr-18 flex h-full w-full flex-col justify-between px-8 py-4">
      <div className="flex w-full flex-col">
        <ComparableProductBuyBoxCategory category={product.category} />

        {/*  */}
        <div className="items flex w-full flex-wrap items-center justify-between gap-y-4 pt-6">
          <div className="flex items-center space-x-4">
            <img
              src={
                'https://images.ethicalsuperstore.com/images/resize120/Dalit-new-Logo.jpg'
              }
              title="Merchant Logo"
              className="h-11 w-11 rounded-full border border-zinc-800 shadow-sm"
              alt="LOGO"
            />
            <div className="cursor-pointer text-xl hover:underline">
              {product.brand.name}
            </div>
          </div>
          <div className="flex items-center gap-x-10">
            <div className="flex flex-col items-end">
              <span className="text-4xl">£ {product.price}</span>
              <span className="text-">
                (+ £ {product.shippingPrice} Shipping Fee)
              </span>
            </div>
            <ComparableBuyBoxHeart product={product} />
          </div>
        </div>
        {/*  */}
        <div className="flex w-full flex-wrap items-end justify-between gap-y-4 px-1 pt-8">
          <div className="flex flex-col items-start gap-y-1.5">
            <span className="text-sm font-bold text-zinc-800">Offered By:</span>
            <MerchantChip merchant={product.merchant} />
          </div>
          <ComaprableProductBuyNowButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default ComparableProductBuyBox;
