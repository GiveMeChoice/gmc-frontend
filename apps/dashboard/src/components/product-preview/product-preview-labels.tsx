import { IProduct } from '@root/services/products.service';
import React from 'react';
import cn from 'classnames';
import { toDateString } from '@root/helpers/to-date-string';

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
        {product.labels && product.labels.length ? (
          product.labels.map((label) => (
            <div className="flex flex-col space-y-1 rounded-md bg-gmc-surf bg-opacity-80 p-2">
              <span>{label.title ? label.title : '<title>'}</span>
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
