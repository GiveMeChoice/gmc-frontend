import { ProductDocument } from 'gmc-types';
import React from 'react';
import BuyBoxBrand from './ComparableProductBuyBox/BuyBoxBrand';
import BuyBoxBuyNowButton from './ComparableProductBuyBox/BuyBoxBuyNowButton';
import BuyBoxHeart from './ComparableProductBuyBox/BuyBoxHeart';
import BuyBoxLink from './ComparableProductBuyBox/BuyBoxLink';
import BuyBoxPrice from './ComparableProductBuyBox/BuyBoxPrice';

interface Props {
  product: ProductDocument;
}

const ComparableProductBuyBox: React.FC<Props> = ({ product }) => {
  return (
    <div className="flex h-full w-full flex-col justify-between p-12 px-14">
      <div className="items flex w-full items-center justify-between gap-5 pr-1.5">
        <div className="flex flex-wrap">
          <BuyBoxBrand brand={product.brand} />
        </div>
        <BuyBoxPrice
          price={product.price}
          shippingPrice={product.shippingPrice}
          currency={product.currency}
        />
      </div>
      <div className="flex w-full items-center justify-between gap-x-6 px-2.5">
        <div className="flex items-center gap-x-6">
          <BuyBoxLink product={product} />
          {/* <BuyBoxShare product={product} /> */}
        </div>
        <BuyBoxHeart product={product} />
      </div>
      {/* <div className="flex w-full items-center justify-start"> */}
      {/* <BuyBoxMerchant merchant={product.merchant} /> */}
      {/* <BuyBoxRating rating={product.rating} /> */}
      <div className="w-full">
        <BuyBoxBuyNowButton product={product} />
      </div>
      {/* <div className="flex w-full justify-start">
        <BuyBoxCategory category={product.category} />
      </div> */}
    </div>
  );
};

export default ComparableProductBuyBox;
