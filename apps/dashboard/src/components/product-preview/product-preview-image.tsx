import { IProduct } from 'gmc-types';
import React from 'react';

interface Props {
  product: Partial<IProduct>;
}

const ProductPreviewImage: React.FC<Props> = ({ product }) => {
  return (
    <div className="flex h-full items-center justify-center rounded-sm border-2 border-black p-2">
      <img
        src={product.images ? product.images[0].url : ''}
        alt="<mainImage>"
        className="max-h-full"
      />
    </div>
  );
};

export default ProductPreviewImage;
