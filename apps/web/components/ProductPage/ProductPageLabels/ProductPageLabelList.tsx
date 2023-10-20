import cn from 'classnames';
import { IGmcLabel, IMerchantLabel } from 'gmc-types';
import React from 'react';
import { getBaseLabel } from '../../../lib/labels';

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
    <div className="flex h-full justify-center py-8">
      <div className="flex h-full w-full flex-grow flex-col">
        {labels.map((label, i) => (
          <div
            className="group flex h-[30px] w-full cursor-pointer items-center gap-x-2"
            onClick={() => setSpotlightIndex(i)}
          >
            <div className="w-[16%]" />
            <div
              style={{
                backgroundColor: getBaseLabel(label.gmcLabel as IGmcLabel)
                  .color,
              }}
              className="mr-1 aspect-square h-[14px] rounded-full"
            />
            <span
              className={cn(
                'text-[16px] group-hover:underline group-active:text-zinc-600',
                {
                  underline: spotlightIndex === i,
                }
              )}
            >
              {label.gmcLabel.name.toUpperCase()}
            </span>
            <div className="pl-1">
              <img
                draggable={false}
                src="/img/left-arrow.svg"
                alt="Left arrow"
                height={28}
                width={28}
                className={cn('hidden', {
                  'group-hover:block': spotlightIndex !== i,
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
