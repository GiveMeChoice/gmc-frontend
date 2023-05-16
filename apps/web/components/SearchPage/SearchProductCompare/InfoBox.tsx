import { SearchProductDto } from 'gmc-types';
import React from 'react';
import { getUserTheme } from '../../../lib/theme';
import { useUser } from '../../UserProvider';
import cn from 'classnames';

interface Props {
  product: SearchProductDto;
}

const ProductInfoBox: React.FC<Props> = ({ product }) => {
  const { profile } = useUser();

  return (
    <div
      className={`h-full w-full bg-${
        getUserTheme(profile).base
      } flex flex-col gap-4 px-5 pt-4 pb-6`}
    >
      <div className="flex items-center justify-between gap-4 pr-2 font-bold">
        <div className="flex items-center gap-2">
          {product.brand.logoUrl && (
            <img
              src={product.brand.logoUrl}
              className="h-12 w-12 rounded-full border border-zinc-500"
            />
          )}
          <span className="font-bold">{product.brand.name}</span>
        </div>
        <span className="text-lg">£ {product.price}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-zinc-800">
          {product.description
            ? `${product.description.substring(0, 250).trim()}${
                product.description.length > 250 ? '...' : ''
              }`
            : ''}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <span className="pr-1 text-sm">Sold by:</span>
        <img
          src={product.merchant.logoUrl}
          className="h-8 w-8 rounded-full border border-zinc-500"
        />
        <span className="text-sm font-bold">{product.merchant.name}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {product.labels.map((label) => (
          // <div className="rounded-full border border-zinc-800">
          //   <div className="rounded-full border-1.5 ">
          <div className="bg-opacity flex items-center gap-1.5 rounded-full border border-zinc-700 px-1.5 py-1 pr-3 text-sm shadow-sm">
            <img
              src={
                label.merchantLabel.logoUrl || label.merchantLabel.description
              }
              className="h-6 w-6 rounded-full border border-zinc-500 bg-secondary p-0.5"
            />
            {label.merchantLabel.name}
            {/* </div>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductInfoBox;
