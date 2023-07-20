import cn from 'classnames';
import {
  ImageDocument,
  MerchantLabelDocument,
  ProductDocument,
} from 'gmc-types';
import React, { useEffect, useState } from 'react';
import { getUserTheme } from '../../../lib/theme';
import { useUser } from '../../UserProvider';

interface Props {
  index: number;
  product: ProductDocument;
  isLast: boolean;
  nextProduct: () => void;
  prevProduct: () => void;
}

type FlatLabel = {
  merchantLabel: MerchantLabelDocument;
  type: string;
  name: string;
};

const ComparableProduct: React.FC<Props> = ({
  index,
  product,
  isLast,
  nextProduct,
  prevProduct,
}) => {
  const [images, setImages] = useState<ImageDocument[]>([]);
  const { profile } = useUser();
  const [labels, setLabels] = useState<FlatLabel[]>([]);
  const [labelGroups, setLabelGroups] = useState<string[]>([]);

  useEffect(() => {
    const flatLabels: FlatLabel[] = product.labels.map((label) => ({
      merchantLabel: label.merchantLabel,
      type: label.gmcLabel.name,
      name: !label.gmcLabel.sublabel
        ? label.gmcLabel.name
        : !label.gmcLabel.sublabel.sublabel
        ? label.gmcLabel.sublabel.name
        : label.gmcLabel.sublabel.sublabel.name,
    }));
    setLabels(flatLabels);
    setLabelGroups(
      product.labels
        .map((l) => l.gmcLabel.name)
        .filter(onlyUnique)
        .sort()
    );
    setImages(product.images.filter((img) => img.type === 'DETAIL'));
  }, [product]);

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex w-full border-b-1.5 border-black dark:border-white">
        <div
          className={`flex w-1/5 items-center justify-center border-r-1.5 border-black dark:border-white bg-${
            getUserTheme(profile).modal
          }`}
        >
          <span className="text-6xl">{index + 1}</span>
        </div>
        <div className="flex w-2/5 items-center border-r-1.5 border-black p-4 dark:border-white">
          <span className="text-2xl">{product.title}</span>
        </div>
        <div
          onClick={() => {
            if (index > 0) prevProduct();
          }}
          className={cn(
            `flex aspect-square w-1/5 select-none items-center justify-center border-r-1.5 border-black dark:border-white bg-${
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

      <div className="flex w-full divide-x-1.5 divide-black border-b-1.5 border-black dark:border-white">
        <div className="flex h-full w-1/4 flex-col divide-y-1.5 divide-black">
          {labelGroups.map((group) => (
            <div className="p-2">
              {group}
              <div className="flex flex-col">
                {labels
                  .filter((l) => l.type === group)
                  .map((label) => (
                    <span className="">
                      {label.name}
                      {'->'}
                      {label.merchantLabel.name}
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>
        <span className="h-full w-2/5 overflow-y-auto p-4 text-sm dark:border-white">
          {product.description}
        </span>
        <div className="flex aspect-[4/5] w-1/5 items-center justify-center px-1.5 dark:border-white">
          <img
            src={images.length ? images[0].url : ''}
            className="block h-auto w-auto rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default ComparableProduct;

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}
