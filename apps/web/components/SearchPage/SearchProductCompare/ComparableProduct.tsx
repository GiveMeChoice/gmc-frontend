import cn from 'classnames';
import { SearchProductDto } from 'gmc-types';
import React from 'react';
import { getUserTheme } from '../../../lib/theme';
import { useUser } from '../../UserProvider';

interface Props {
  index: number;
  product: SearchProductDto;
  isLast: boolean;
  nextProduct: () => void;
  prevProduct: () => void;
}

const ComparableProduct: React.FC<Props> = ({
  index,
  product,
  isLast,
  nextProduct,
  prevProduct,
}) => {
  const { profile } = useUser();
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex w-full border-b-2 border-black dark:border-white">
        <div
          className={`flex w-1/5 items-center justify-center border-r-2 border-black dark:border-white bg-${
            getUserTheme(profile).modal
          }`}
        >
          <span className="text-6xl">{index + 1}</span>
        </div>
        <div className="flex w-2/5 items-center border-r-2 border-black p-4 dark:border-white">
          <span className="text-2xl">{product.title}</span>
        </div>
        <div
          onClick={() => {
            if (index > 0) prevProduct();
          }}
          className={cn(
            `flex aspect-square w-1/5 select-none items-center justify-center border-r-2 border-black dark:border-white bg-${
              getUserTheme(profile).modal
            }`,
            {
              'bg-inherit': index !== 0,
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
            `flex aspect-square w-1/5 select-none items-center justify-center bg-${
              getUserTheme(profile).modal
            }`,
            {
              'bg-inherit': !isLast,
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

      <div className="flex w-full border-b-2 border-black dark:border-white">
        <div className="flex aspect-[4/5] w-1/5 items-center justify-center border-r-2 border-black px-1.5 dark:border-white">
          <img
            src={product.images.detail.url}
            className="block h-auto w-auto rounded-xl"
          />
        </div>
        <span className="h-full w-2/5 overflow-y-auto border-r-2 border-black p-4 text-sm dark:border-white">
          {product.description}
        </span>
      </div>
    </div>
  );
};

export default ComparableProduct;
