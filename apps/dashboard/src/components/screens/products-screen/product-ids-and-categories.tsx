import CopyIdButton from '@root/components/shared/copy-id-button';
import { IProduct } from '@root/services/products.service';
import React from 'react';

interface Props {
  product: IProduct;
}

const ProductIdsAndCategories: React.FC<Props> = ({ product }) => {
  return (
    <div className="flex w-full justify-center gap-x-12 py-2.5 text-xs">
      <div className="flex flex-col items-center justify-evenly">
        <div className="flex items-center gap-x-1">
          <span className="font-bold text-zinc-600">Merchant ID:</span>
          <span className="">{product.merchantProductCode}</span>
          <CopyIdButton id={product.merchantProductCode} />
        </div>
        <div className="flex items-center gap-x-1">
          <span className="">
            {product.merchantCategory
              ? product.merchantCategory.name
              : 'Unknown'}
          </span>
          <CopyIdButton id={product.merchantProductCode} />
        </div>
      </div>
      <div className="flex flex-col items-center justify-evenly">
        <div className="flex items-center gap-x-1">
          <span className="font-bold text-zinc-600">GMC ID:</span>
          <span className="">{product.shortId}</span>
          <CopyIdButton id={product.shortId} />
        </div>
        <div className="flex items-center gap-x-1">
          <span className="">
            {product.merchantCategory && product.merchantCategory.gmcCategory
              ? product.merchantCategory.gmcCategory.name
              : 'No GMG Category Assigned'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductIdsAndCategories;
