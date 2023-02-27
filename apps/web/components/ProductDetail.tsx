import React from 'react';
import { ProductEntity } from 'search/product';
import cn from 'classnames';

interface Props {
  index: number;
  product: ProductEntity;
  isLast: boolean;
  nextProduct: () => void;
  prevProduct: () => void;
}

const ProductDetail: React.FC<Props> = ({
  index,
  product,
  isLast,
  nextProduct,
  prevProduct,
}) => {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex w-full border-b-2 border-black">
        <div className="flex w-1/5 items-center justify-center border-r-2 border-black">
          <span className="text-6xl">{index + 1}</span>
        </div>
        <div className="flex w-2/5 items-center border-r-2 border-black p-4">
          <span className="text-2xl">{product.title}</span>
        </div>
        <div
          onClick={() => {
            if (index > 0) prevProduct();
          }}
          className={cn(
            'flex aspect-square w-1/5 select-none items-center justify-center border-r-2 border-black',
            {
              'bg-secondary': index === 0,
              'cursor-pointer hover:bg-primary active:bg-primary-light-20':
                index !== 0,
            }
          )}
        >
          <img
            draggable={false}
            src="/img/left-arrow.svg"
            alt="Left arrow"
            className={cn('h-auto max-h-24 w-auto', {
              hidden: index === 0,
            })}
          />
        </div>
        <div
          onClick={() => {
            if (!isLast) nextProduct();
          }}
          className={cn(
            'flex aspect-square w-1/5 select-none items-center justify-center',
            {
              'bg-secondary': isLast,
              'cursor-pointer hover:bg-primary active:bg-primary-light-20':
                !isLast,
            }
          )}
        >
          <img
            draggable={false}
            src="/img/right-arrow.svg"
            alt="Right arrow"
            className={cn('h-auto max-h-24 w-auto', {
              hidden: isLast,
            })}
          />
        </div>
      </div>

      <div className="flex w-full border-b-2 border-black">
        <div className="flex aspect-[4/5] w-1/5 items-center justify-center border-r-2 border-black">
          <img src={product.listImage} className="block h-auto w-auto" />
        </div>
        <span className="h-full w-2/5 overflow-y-auto border-r-2 border-black p-4 text-sm">
          {product.description}
        </span>
      </div>
    </div>
  );
};

export default ProductDetail;
