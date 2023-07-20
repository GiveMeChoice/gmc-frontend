import { ProductDocument } from 'gmc-types';
import React from 'react';
import ComparableProductBuyBoxCategory from './ComparableProductBuyBox/ComparableProductBuyBoxCategory';
import ComparableBuyBoxHeart from './ComparableProductBuyBox/ComparableProductBuyBoxHeart';
import MerchantChip from '../../../Shared/MerchantChip';
import ComaprableProductBuyNowButton from './ComparableProductBuyBox/ComparableProductBuyNowButton';

interface Props {
  product: ProductDocument;
}

const ComparableProductBuyBox: React.FC<Props> = ({ product }) => {
  return (
    <div className="flex h-full w-full flex-col justify-between p-8 pr-12">
      <div className="flex w-full flex-col">
        {/*  */}
        <div className="items flex w-full items-start justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={
                'https://images.ethicalsuperstore.com/images/resize120/Dalit-new-Logo.jpg'
              }
              title="Merchant Logo"
              className="h-12 w-12 rounded-full border border-zinc-700"
              alt="LOGO"
            />
            <div className="cursor-pointer text-2xl hover:underline">
              {product.brand.name}
            </div>
          </div>
          <div className="flex items-start gap-x-10">
            <div className="flex flex-col items-end">
              <span className="text-3xl">£ {product.price}</span>
              <span className="text-">
                (+ £ {product.shippingPrice} Shipping Fee)
              </span>
            </div>
            <ComparableBuyBoxHeart product={product} />
          </div>
        </div>
        {/*  */}
        <div className="flex w-full flex-wrap items-end justify-between gap-y-4 py-9 px-1">
          <div className="flex flex-col items-start gap-y-1.5">
            <span className="text-sm font-bold text-zinc-800">Offered By:</span>
            <MerchantChip merchant={product.merchant} />
          </div>
          <ComaprableProductBuyNowButton product={product} />
        </div>
      </div>
      <ComparableProductBuyBoxCategory category={product.category} />
    </div>
  );
};

export default ComparableProductBuyBox;
