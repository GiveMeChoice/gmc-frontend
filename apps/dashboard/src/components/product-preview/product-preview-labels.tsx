import { IProduct } from 'gmc-types';
import React from 'react';
import MerchantLabelChip from '../screens/merchant-labels-screen/merchant-label-chip';

interface Props {
  product: Partial<IProduct>;
}

const ProductPreviewLabels: React.FC<Props> = ({ product }) => {
  return (
    <div className="flex h-full w-full flex-col space-y-3 rounded-sm border-2 border-black p-4 text-sm">
      <div className="flex w-full justify-between font-bold">
        <span>LABELS</span>
      </div>
      <div className="flex flex-wrap gap-4  overflow-y-auto ">
        {product.merchantLabels && product.merchantLabels.length ? (
          product.merchantLabels.map((label) => (
            <MerchantLabelChip merchantLabel={label} />
          ))
        ) : (
          <span>{'<labels>'}</span>
        )}
      </div>
    </div>
  );
};

export default ProductPreviewLabels;
