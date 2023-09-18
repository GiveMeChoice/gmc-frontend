import { ProductDocument } from 'gmc-types';
import React from 'react';
import CompareBuyBoxBrand from './CompareProductBuyBox/CompareBuyBoxBrand';
import CompareBuyBoxPrice from './CompareProductBuyBox/CompareBuyBoxPrice';

interface Props {
  product: ProductDocument;
}

const CompareProductBuyBox: React.FC<Props> = ({ product }) => {
  return (
    <div className="flex w-full flex-col justify-between px-9 py-3">
      <div className="items flex w-full items-center justify-between ">
        <CompareBuyBoxPrice
          price={product.price}
          shippingPrice={product.shippingPrice}
          currency={product.currency}
        />
        <CompareBuyBoxBrand brand={product.brand} />
      </div>
      <div className="flex w-full items-center justify-between gap-x-6 px-2.5">
        {/* <div className="flex items-center gap-x-6">
          <CompareBuyBoxLink product={product} />
          <BuyBoxShare product={product} />
        </div>
        <CompareBuyBoxHeart product={product} /> */}
      </div>
      {/* <div className="flex w-full items-center justify-start"> */}
      {/* <BuyBoxMerchant merchant={product.merchant} /> */}
      {/* <BuyBoxRating rating={product.rating} /> */}
      <div className="w-full">
        {/* <CompareBuyBoxBuyNowButton product={product} /> */}
      </div>
      {/* <div className="flex w-full justify-start">
        <BuyBoxCategory category={product.category} />
      </div> */}
    </div>
  );
};

export default CompareProductBuyBox;
