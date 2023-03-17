import React from 'react';
import { SearchProductDto } from 'gmc-types';
import { getUserTheme } from '../../../lib/theme';
import { useUser } from '../../UserProvider';

interface Props {
  product: SearchProductDto;
}

const ProductInfoBox: React.FC<Props> = ({ product }) => {
  const { profile } = useUser();

  return (
    <div className={`h-full w-full bg-${getUserTheme(profile).base} py-2`}>
      <div className="flex h-full flex-col justify-evenly gap-3 p-4 transition-transform duration-300 group-hover:scale-105">
        {product.description && (
          <span className="text-base">
            {`${product.description.substring(0, 100).trim()}${
              product.description.length > 100 ? '...' : ''
            }`}
          </span>
        )}
        <div className="flex items-center gap-4">
          <span className="font-bold">{product.brand}</span>
          <span className="text-sm">{product.price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfoBox;
