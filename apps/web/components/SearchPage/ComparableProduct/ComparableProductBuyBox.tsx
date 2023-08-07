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
      <div className="items flex w-full items-center justify-between gap-5 pb-6 pr-8">
        <div className="flex flex-wrap">
          <BuyBoxBrand brand={product.brand} />
        </div>
        <div className="mb-1 flex items-center justify-end gap-x-5">
          <BuyBoxHeart product={product} />
          <BuyBoxPrice
            price={product.price}
            shippingPrice={product.shippingPrice}
            currency={product.currency}
          />
        </div>
      </div>
      {/* <div className="flex w-full items-center justify-start"> */}
      {/* <BuyBoxMerchant merchant={product.merchant} /> */}
      {/* <BuyBoxRating rating={product.rating} /> */}
      <div className="w-full pr-8 pl-1">
        <BuyBoxBuyNowButton product={product} />
      </div>
      <div className="flex w-full justify-start">
        <BuyBoxCategory category={product.category} />
      </div>
    </div>
  );
};

export default ComparableProductBuyBox;
