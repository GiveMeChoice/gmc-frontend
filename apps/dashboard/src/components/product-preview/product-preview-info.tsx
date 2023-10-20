import React from 'react';
import cn from 'classnames';
import { IProduct } from 'gmc-types';

interface Props {
  product: Partial<IProduct>;
}

const ProductPreviewInfo: React.FC<Props> = ({ product }) => {
  return (
    <div className="flex h-full flex-col space-y-2 overflow-y-auto rounded-sm border-2 border-black p-6">
      <a
        className={cn('text-lg font-bold', {
          'cursor-pointer text-gmc-ocean hover:underline': !product.offerUrl,
        })}
        target="_blank"
        href={product.offerUrl}
        rel="noreferrer"
      >
        <span className="text-gmc-ocean hover:underline">
          {product.title ? product.title : '<title>'}
        </span>
      </a>
      <span className="py-4 text-2xl font-bold">
        {product.currency ? product.currency : '<curr>'}{' '}
        {product.price ? product.price : '<price>'}
      </span>
      <span className="text-sm">
        SKU: {product.sku ? product.sku : '<sku>'}
      </span>
      <span className="whitespace-pre-line text-sm">
        {product.description ? product.description : '<description>'}
      </span>
    </div>
  );
};

export default ProductPreviewInfo;
