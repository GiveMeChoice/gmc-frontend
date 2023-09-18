import React from 'react';

interface Props {
  price: number;
  shippingPrice: number;
  currency: string;
}

const CompareBuyBoxPrice: React.FC<Props> = ({
  price,
  shippingPrice,
  currency,
}) => {
  return (
    <div className="flex flex-col items-center whitespace-nowrap">
      <span className="text-[32px] text-zinc-800">
        <span className="text-[28px]">{currency === 'GBP' ? '£' : '$'}</span>{' '}
        {price}
      </span>
      {/* <span className="text-sm">
        (+ {currency === 'GBP' ? '£' : '$'} {shippingPrice} Shipping Fee)
      </span> */}
    </div>
  );
};

export default CompareBuyBoxPrice;
