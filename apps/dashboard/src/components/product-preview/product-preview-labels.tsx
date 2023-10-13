import React from 'react';
import cn from 'classnames';
import { toDateString } from '@root/helpers/to-date-string';
import { IProduct } from 'gmc-types';

interface Props {
  product: Partial<IProduct>;
}

const ProductPreviewLabels: React.FC<Props> = ({ product }) => {
  return (
    <div className="flex h-full flex-col space-y-3 rounded-sm border-2 border-black p-2 text-sm">
      <div className="flex w-full justify-between font-bold">
        <span>LABELS</span>
      </div>
      <div className="flex flex-col space-y-4 overflow-y-auto ">
        {product.merchantLabels && product.merchantLabels.length ? (
          product.merchantLabels.map((label) => (
            <div className="flex flex-col space-y-1 rounded-md bg-gmc-surf bg-opacity-80 p-2">
              <span>{label.name ? label.name : '<title>'}</span>
            </div>
          ))
        ) : (
          <span>{'<labels>'}</span>
        )}
      </div>
    </div>
  );
};

export default ProductPreviewLabels;
