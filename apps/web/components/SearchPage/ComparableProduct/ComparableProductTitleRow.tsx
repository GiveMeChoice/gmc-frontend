import { ProductDocument } from 'gmc-types';
import React from 'react';
import cn from 'classnames';

interface Props {
  index: number;
  product: ProductDocument;
  isLast: boolean;
  nextProduct: () => void;
  prevProduct: () => void;
}

const ComparableProductTitleRow: React.FC<Props> = ({
  index,
  product,
  isLast,
  nextProduct,
  prevProduct,
}) => {
  return (
    <div className="flex h-20 w-full justify-between divide-x-1.5 divide-black">
      <div className="flex aspect-4/3 items-center justify-center bg-secondary p-8">
        <span className="text-5xl">{index + 1}</span>
      </div>
      <div className="flex flex-grow items-center justify-center">
        <span className="text-xl">{product.title}</span>
      </div>
      <div className="flex justify-evenly divide-x-1.5 divide-black">
        <div
          onClick={() => {
            if (index > 0) prevProduct();
          }}
          className={cn(
            `flex aspect-4/3 h-full select-none items-center justify-center bg-secondary dark:border-white`,
            {
              'cursor-pointer bg-white hover:bg-primary active:bg-primary-light-20':
                index !== 0,
            }
          )}
        >
          <img
            draggable={false}
            src="/img/left-arrow.svg"
            alt="Left arrow"
            className={cn('h-3/4', {
              hidden: index === 0,
            })}
          />
        </div>
        <div
          onClick={() => {
            if (!isLast) nextProduct();
          }}
          className={cn(
            `flex aspect-4/3 h-full select-none items-center justify-center bg-secondary`,
            {
              'cursor-pointer bg-white hover:bg-primary active:bg-primary-light-20':
                !isLast,
            }
          )}
        >
          <img
            draggable={false}
            src="/img/right-arrow.svg"
            alt="Right arrow"
            className={cn('h-3/4', {
              hidden: isLast,
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default ComparableProductTitleRow;
