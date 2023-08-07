import cn from 'classnames';
import React, { useEffect } from 'react';
import { FlatLabel } from '../../ComparableProduct';
import { getLabelColor } from '../../../../lib/labels';

interface Props {
  label: FlatLabel;
}

const ComparableProductLabelSpotlight: React.FC<Props> = ({ label }) => {
  return (
    <>
      {label && (
        <div className="flex h-[400px] w-full flex-col divide-y-1.5 divide-secondary-dark-10 overflow-y-auto">
          <div className="flex flex-col items-center gap-y-4 px-8 py-6">
            <div className="flex items-center gap-x-2.5 rounded-full py-1.5 px-3">
              <div
                className={cn(
                  `h-[17px] w-[17px] rounded-full border border-zinc-800 bg-${getLabelColor(
                    label.type
                  )}`,
                  {}
                )}
              />
              <span className="text-zinc-900">{label.name.toUpperCase()}</span>
            </div>
            <div className="text-sm">{label.description}</div>
            <div className="text-zinc-600">
              {label.type} {' > '} {label.name}
            </div>
          </div>
          <div className="flex w-full flex-col items-center gap-y-4 px-8 py-6">
            <div className="w-full text-center text-sm">
              Original Merchant Label
            </div>
            <div
              className="flex h-9 w-fit cursor-pointer items-center gap-x-1 rounded-full border border-zinc-600 bg-secondary pl-1 pr-2 shadow-sm"
              title={label.merchantLabel.description}
            >
              <img
                src={label.merchantLabel.logo}
                title="Merchant Logo"
                className="h-7 w-7 rounded-full border border-zinc-600 bg-secondary"
                alt="LOGO"
              />
              <span className="text-ellipsis whitespace-nowrap px-0.5 text-sm">
                {label.merchantLabel.name}
              </span>
            </div>
            <span className="text-sm italic">{`"${label.merchantLabel.description}"`}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ComparableProductLabelSpotlight;
