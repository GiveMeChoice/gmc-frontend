import React from 'react';
import { ProductEntity } from 'search/product';

interface Props {
  index: number;
  product: ProductEntity;
  selectProduct: (i) => void;
}

const Product: React.FC<Props> = ({ index, product, selectProduct }) => {
  return (
    <div
      className="flex w-full cursor-pointer"
      onClick={() => selectProduct(index)}
    >
      <div className="hidden w-1/4 items-center justify-center border-r-2 border-black bg-gmc-ocean bg-opacity-50 text-6xl md:flex">
        {index + 1}
      </div>
      <div className="w-1/2 border-r-2 border-black">
        <div className="group flex flex-col gap-3 p-4 transition-transform duration-300 hover:scale-105">
          <span className="cursor-pointer text-2xl group-hover:underline group-active:text-gmc-berry md:text-lg">
            {product.title}
          </span>
          <span className="text-sm">
            {`${product.description.substring(0, 55).trim()}${
              product.description && product.description.length > 255
                ? '...'
                : ''
            }`}
          </span>
          <div className="flex items-center gap-4">
            <span className="font-bold">{product.brand.description}</span>
            <span className="text-sm">{product.price}</span>
          </div>
        </div>
      </div>

      <div className="flex w-1/2 flex-col overflow-hidden md:w-1/4">
        <div className="flex h-1/3 w-full items-center justify-center border-black bg-primary bg-opacity-80 text-4xl md:hidden md:border-r-2">
          {index + 1}
        </div>
        <div className="flex h-2/3 items-center justify-center duration-300 hover:scale-110 md:h-full">
          <img
            src={product.listImage}
            className="block h-auto max-h-full w-auto p-2"
          />
        </div>
      </div>
    </div>
  );
};

export default Product;
