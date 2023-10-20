import CopyIdButton from '@root/components/shared/copy-id-button';
import { IProduct } from 'gmc-types';
import React from 'react';
import cn from 'classnames';

interface Props {
  product: IProduct;
}

const ProductAssignmentSummary: React.FC<Props> = ({ product }) => {
  return (
    <div className="flex w-full justify-evenly gap-x-12 py-4 text-[14px]">
      <div className="flex flex-col items-center justify-evenly gap-y-1">
        <span
          className={cn('font-bold text-gmc-forest', {
            'text-gmc-heart':
              !product.merchantBrand || !product.merchantBrand.gmcBrand,
          })}
        >
          {product.merchantBrand && product.merchantBrand.gmcBrand
            ? product.merchantBrand.gmcBrand.name
            : 'Brand Not Assigned'}
        </span>
        <span>
          {product.merchantBrand
            ? product.merchantBrand.name
            : 'No Merchant Brand'}
        </span>
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
              : 'No Merchant Category'}
          </span>
          <CopyIdButton id={product.merchantProductCode} />
        </div>
      </div>
      <div className="flex flex-col items-center justify-evenly gap-y-1">
        <span
          className={cn({
            'font-bold text-gmc-heart':
              product.merchantLabels.filter((label) => label.gmcLabelId == null)
                .length > 0,
          })}
        >
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

export default ProductAssignmentSummary;
