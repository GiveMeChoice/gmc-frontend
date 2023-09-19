import cn from 'classnames';
import { ProductDocument } from 'gmc-types';
import Link from 'next/link';
import React from 'react';

interface Props {
  index: number;
  product: ProductDocument;
  isFirst: boolean;
  isLast: boolean;
  nextProduct: () => void;
  prevProduct: () => void;
  closeCompareMode: () => void;
}

const CompareProductHeading: React.FC<Props> = ({
  index,
  product,
  isFirst,
  isLast,
  nextProduct,
  prevProduct,
  closeCompareMode,
}) => {
  return (
    <div className="flex w-full justify-between divide-x-1.5 divide-zinc-700">
      <div className="flex w-full flex-col divide-y-1.5 divide-zinc-700">
        <div className="flex h-24 w-full divide-x-1.5 divide-zinc-700">
          <div className="flex aspect-4/3 h-full items-center justify-center p-8">
            <span className="text-4xl">{index + 1}</span>
          </div>
          <div className="flex flex-grow items-center justify-center px-8 text-center">
            <Link href={`/shop/product/${product.id}`}>
              <span className="cursor-pointer text-[23px] font-bold tracking-wide text-zinc-800 hover:underline">
                {product.title.replace(/\uFFFD/g, '')}
              </span>
            </Link>
          </div>
          {!(isFirst && isLast) && (
            <div className="flex h-full justify-evenly divide-x-1.5 divide-zinc-700">
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
                  className={cn('h-[60%]', {
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
                  className={cn('h-[60%]', {
                    hidden: isLast,
                  })}
                />
              </div>
            </div>
          )}
          <div
            className="flex aspect-square h-full cursor-pointer select-none items-center justify-center hover:bg-primary"
            onClick={closeCompareMode}
          >
            <img
              draggable={false}
              src="/img/close.svg"
              alt="Close"
              className={cn('h-[38%]', {})}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareProductHeading;
