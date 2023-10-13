import cn from 'classnames';
import { IMerchantLabel } from 'gmc-types';
import React from 'react';

interface Props {
  labels: IMerchantLabel[];
  spotlightIndex: number;
  setSpotlightIndex: (i: number) => void;
}

const ProductPageLabelList: React.FC<Props> = ({
  labels,
  spotlightIndex,
  setSpotlightIndex,
}) => {
  return (
    <div className="flex h-full justify-center py-7">
      <div className="flex h-full w-full flex-grow flex-col">
        {labels.map((label, i) => (
          <div
            className="group flex h-[28px] w-full cursor-pointer items-center gap-x-2"
            onClick={() => setSpotlightIndex(i)}
          >
            <div className="w-[16%]" />
            <div className="aspect-square h-[14px] rounded-full bg-gmc-berry" />
            <span className="text-[16px] group-hover:underline group-active:text-zinc-600">
              {label.gmcLabel.name.toUpperCase()}
            </span>
            <div className="pl-1">
              <img
                draggable={false}
                src="/img/left-arrow.svg"
                alt="Left arrow"
                height={28}
                width={28}
                className={cn('', {
                  'hidden group-hover:block': spotlightIndex !== i,
                  block: spotlightIndex === i,
                })}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPageLabelList;
