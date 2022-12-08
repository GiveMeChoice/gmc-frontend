import { IProduct } from '@root/services/products.service';
import React from 'react';
import cn from 'classnames';

interface Props {
  product: Partial<IProduct>;
}

const ProductPreviewInfo: React.FC<Props> = ({ product }) => {
  return (
    <div className="flex flex-col space-y-2 rounded-sm border-2 border-black p-2">
      <a
        className={cn('text-lg font-bold', {
          'text-zinc-500': !product.offerLink,
        })}
        href={product.offerLink}
      >
        {product.title ? product.title : '<title>'}
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
