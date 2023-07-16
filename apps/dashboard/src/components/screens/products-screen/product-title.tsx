import { useScreenDataDispatch } from '@root/context-providers/screen-data.provider';
import { IProduct } from '@root/services/products.service';
import React from 'react';

interface Props {
  product: IProduct;
}

const ProductTitle: React.FC<Props> = ({ product }) => {
  const screenDataDispatch = useScreenDataDispatch();

  return (
    <div className="w-full px-4 py-2 text-center">
      {product.refreshedAt ? (
        <a
          target="_blank"
          rel="noreferrer"
          className="cursor-pointer text-gmc-ocean underline-offset-2 hover:underline"
          onClick={() => {
            screenDataDispatch({
              type: 'OPEN_PRODUCT_PREVIEW',
              value: product,
            });
          }}
        >
          {product.title}
        </a>
      ) : (
        product.title
      )}
    </div>
  );
};

export default ProductTitle;
