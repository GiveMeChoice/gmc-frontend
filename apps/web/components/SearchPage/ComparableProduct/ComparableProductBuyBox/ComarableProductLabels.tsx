import { LabelDocument, MerchantLabelDocument } from 'gmc-types';
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import ComparableProductLabelInfo from './ComparableProductLabels/ComparableProductLabelInfo';
import { FlatLabel } from '../../ComparableProduct';

interface Props {
  labels: FlatLabel[];
  spotlight: number;
  setSpotlight: (i) => void;
}

const ComparableProductLabels: React.FC<Props> = ({
  labels,
  spotlight,
  setSpotlight,
}) => {
  const handleAddSpotlight = (index) => {
    setSpotlight(index);
  };

  return (
    <div className="flex w-full flex-col items-center space-y-2 px-3 pt-4">
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-5 px-4 pt-4 pb-8 text-sm">
        {labels.map((sl) => (
          <div
            className={cn(
              'w-fit cursor-pointer gap-1.5 rounded-full border px-3 py-1 text-sm shadow-sm',
              {
                'border-zinc-800 ring-zinc-700 hover:scale-[1.01] hover:ring-1':
                  spotlight !== sl.index,
                'border-2 border-white shadow-lg shadow-zinc-400 ring-2 ring-zinc-700 transition-shadow duration-150':
                  spotlight === sl.index,
                'bg-primary': sl.type === 'Certifications',
                'bg-gmc-beach-light-10': sl.type === 'Origin',
                'bg-gmc-soil-light-50': sl.type === 'Uncategorized',
              }
            )}
            onClick={() => handleAddSpotlight(sl.index)}
          >
            {sl.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparableProductLabels;
