import { ProductDocument } from 'gmc-types';
import React from 'react';
import cn from 'classnames';
import BuyBoxCategory from './ComparableProductBuyBox/BuyBoxCategory';

interface Props {
  index: number;
  product: ProductDocument;
  isFirst: boolean;
  isLast: boolean;
  nextProduct: () => void;
  prevProduct: () => void;
}

const ComparableProductHeading: React.FC<Props> = ({
  index,
  product,
  isFirst,
  isLast,
  nextProduct,
  prevProduct,
}) => {
  return (
    <div className="flex w-full justify-between divide-x-1.5 divide-secondary-dark-10">
      <div className="flex w-full flex-col divide-y-1.5 divide-secondary-dark-10">
        <div className="flex h-24 w-full divide-x-1.5 divide-secondary-dark-10">
          <div className="flex aspect-4/3 h-full items-center justify-center bg-secondary p-8">
            <span className="text-4xl">{index + 1}</span>
          </div>
          <div className="flex flex-grow items-center justify-center px-8">
            <span className="text-[22px]">
              {product.title.replace(/\uFFFD/g, '')}
            </span>
          </div>
          {!(isFirst && isLast) && (
            <div className="flex h-full justify-evenly divide-x-1.5 divide-secondary-dark-10">
              <div
                onClick={() => {
                  if (!isFirst) prevProduct();
                }}
                className={cn(
                  `flex aspect-4/3 h-full select-none items-center justify-center bg-secondary dark:border-white`,
                  {
                    'cursor-pointer bg-white hover:bg-primary active:bg-primary-light-20':
                      !isFirst,
                  }
                )}
              >
                <img
                  draggable={false}
                  src="/img/left-arrow.svg"
                  alt="Left arrow"
                  className={cn('h-2/3', {
                    hidden: isFirst,
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
                  className={cn('h-2/3', {
                    hidden: isLast,
                  })}
                />
              </div>
            </div>
          )}
        </div>
        <div className="flex h-11 w-full items-center px-8">
          <BuyBoxCategory category={product.category} />
        </div>
      </div>
    </div>
  );
};

export default ComparableProductHeading;
