import React from 'react';

interface Props {
  price: number;
  shippingPrice: number;
  currency: string;
}

const BuyBoxPrice: React.FC<Props> = ({ price, shippingPrice, currency }) => {
  return (
    <div className="flex flex-col items-center whitespace-nowrap">
      <span className="text-[41px] text-zinc-900">
        <span className="text-[38px]">{currency === 'GBP' ? '£' : '$'}</span>{' '}
        {price}
      </span>
      {/* <span className="text-sm">
        (+ {currency === 'GBP' ? '£' : '$'} {shippingPrice} Shipping Fee)
      </span> */}
    </div>
  );
};

export default BuyBoxPrice;
