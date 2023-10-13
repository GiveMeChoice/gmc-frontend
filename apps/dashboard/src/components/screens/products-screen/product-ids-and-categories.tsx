import CopyIdButton from '@root/components/shared/copy-id-button';
import { IProduct } from 'gmc-types';
import React from 'react';
import cn from 'classnames';

interface Props {
  product: IProduct;
}

const ProductIdsAndCategories: React.FC<Props> = ({ product }) => {
  return (
    <div className="flex w-full justify-center gap-x-12 py-2.5 text-xs">
      <div className="flex flex-col items-center justify-evenly gap-y-1">
        <div className="flex items-center gap-x-1">
          <span className="font-bold text-zinc-600">GMC ID:</span>
          <span className="">{product.shortId}</span>
          <CopyIdButton id={product.shortId} />
        </div>
        <div className="flex items-center gap-x-1">
          <span className="font-bold text-zinc-600">Merchant ID:</span>
          <span className="">{product.merchantProductCode}</span>
          <CopyIdButton id={product.merchantProductCode} />
        </div>
      </div>
      <div className="flex flex-col items-center justify-evenly gap-y-1">
        <div className="flex items-center gap-x-1">
          <span
            className={cn('font-bold text-gmc-forest', {
              ' text-gmc-heart':
                !product.merchantCategory ||
                !product.merchantCategory.gmcCategoryId,
            })}
          >
            {product.merchantCategory && product.merchantCategory.gmcCategory
              ? product.merchantCategory.gmcCategory.name
              : 'Category Not Assigned'}
          </span>
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
      <div className="flex flex-col items-center justify-evenly gap-y-1">
        <span>
          {
            product.merchantLabels.filter((label) => label.gmcLabelId == null)
              .length
          }{' '}
          Unassigned
        </span>
        <span>{product.merchantLabels.length} Merchant Labels</span>
      </div>
    </div>
  );
};

export default ProductIdsAndCategories;
