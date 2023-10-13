import { useScreenDataDispatch } from '@root/context-providers/screen-data.provider';
import { IProduct } from 'gmc-types';
import React from 'react';

interface Props {
  product: IProduct;
}

const ProductTitle: React.FC<Props> = ({ product }) => {
  const screenDataDispatch = useScreenDataDispatch();

  return (
    <div className="flex w-full items-center justify-center gap-x-8 px-8">
      <span className="text-center text-lg leading-[1.2]">
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
      </span>
      <img
        src={product.images.length ? product.images[0].url : ''}
        className="border--1.5 h-16 border-zinc-700"
      />
    </div>
  );
};

export default ProductTitle;
