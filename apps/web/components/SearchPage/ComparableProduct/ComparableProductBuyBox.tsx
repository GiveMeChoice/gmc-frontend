import { ProductDocument } from 'gmc-types';
import React from 'react';
import BuyBoxBrand from './ComparableProductBuyBox/BuyBoxBrand';
import BuyBoxBuyNowButton from './ComparableProductBuyBox/BuyBoxBuyNowButton';
import BuyBoxCategory from './ComparableProductBuyBox/BuyBoxCategory';
import BuyBoxHeart from './ComparableProductBuyBox/BuyBoxHeart';
import BuyBoxPrice from './ComparableProductBuyBox/BuyBoxPrice';

interface Props {
  product: ProductDocument;
}

const ComparableProductBuyBox: React.FC<Props> = ({ product }) => {
  return (
    <div className="flex h-full w-full flex-col justify-between gap-y-6 py-7 pb-10 pr-12 pl-12">
      <div className="items flex w-full items-center justify-between gap-y-4">
        <div className="flex w-1/2 flex-wrap">
          <BuyBoxBrand brand={product.brand} />
        </div>
        <div className="mb-1 flex w-1/3 items-center justify-start gap-x-2">
          <BuyBoxPrice
            price={product.price}
            shippingPrice={product.shippingPrice}
            currency={product.currency}
          />
        </div>
      </div>
      {/*  */}
      <div className="flex w-full items-center justify-between gap-8">
        {/* <BuyBoxMerchant merchant={product.merchant} /> */}
        {/* <BuyBoxRating rating={product.rating} /> */}
        <div className="pl-1">
          <BuyBoxBuyNowButton product={product} />
        </div>
        <div className="pr-16">
          <BuyBoxHeart product={product} />
        </div>
      </div>
      <div className="flex w-full justify-start">
        <BuyBoxCategory category={product.category} />
      </div>
    </div>
  );
};

export default ComparableProductBuyBox;
