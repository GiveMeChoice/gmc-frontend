import { IProduct } from '@root/services/products.service';
import React from 'react';

interface Props {
  product: Partial<IProduct>;
}

const ProductPreviewInfo: React.FC<Props> = ({ product }) => {
  return (
    <div className="flex h-full items-center justify-center rounded-sm border-2 border-black p-2">
      <img src={product.mainImage} alt="<mainImage>" className="max-h-full" />
    </div>
  );
};

export default ProductPreviewInfo;
