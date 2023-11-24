import cn from 'classnames';
import { IGmcLabel, IMerchantLabel } from 'gmc-types';
import React, { useEffect } from 'react';
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
  useEffect(() => {}, [spotlightIndex]);
  return (
    <div className="flex h-full w-full flex-grow flex-col divide-y-1.5 divide-zinc-700 bg-secondary">
      {labels.map((label, i) => (
        <div
          className="group h-[60px] w-full cursor-default bg-white"
          onMouseEnter={() => setSpotlightIndex(i)}
        >
          <div
            className={cn(
              'relative flex h-full w-full items-center gap-x-2 border-4 bg-white pl-8',
              {
                'border-primary': spotlightIndex === i,
                'border-white hover:border-primary': spotlightIndex !== i,
              }
            )}
          >
            <div
              style={{
                backgroundColor: getBaseLabel(label.gmcLabel as IGmcLabel)
                  .color,
              }}
              className="mr-1 aspect-square h-[14px] rounded-full"
            />
            <span className={cn('text-[16px] group-active:text-zinc-600', {})}>
              {label.gmcLabel.name.toUpperCase()}
            </span>
          </div>
        </div>
      ))}
      <div />
    </div>
  );
};

export default ProductPageLabelList;
