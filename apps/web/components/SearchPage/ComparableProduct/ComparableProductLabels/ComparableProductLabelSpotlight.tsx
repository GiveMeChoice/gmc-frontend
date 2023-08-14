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
          <div className="flex min-h-[200px] flex-col items-center gap-y-4 px-8 py-6">
            <div className="flex items-center gap-x-2.5 rounded-full border-2 border-secondary-dark-10 py-1 pl-2.5 pr-4">
              <div
                className={cn(
                  `borer h-[14px] w-[14px] rounded-full border-zinc-800 bg-${getLabelColor(
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
