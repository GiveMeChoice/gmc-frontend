import cn from 'classnames';
import React, { useEffect } from 'react';
import { FlatLabel } from '../../../ComparableProduct';

interface Props {
  label: FlatLabel;
}

const ComparableProductLabelSpotlight: React.FC<Props> = ({ label }) => {
  return (
    <>
      {label && (
        <div className="flex h-full w-full flex-col divide-y-1.5 divide-secondary-dark-10">
          <div className="flex h-1/2 flex-col items-center justify-evenly gap-y-4 px-8 py-6">
            <div className="flex items-center gap-x-2">
              <div
                className={cn(
                  'h-5 w-5 rounded-full border border-secondary-dark-10',
                  {
                    'bg-primary': label.type === 'Certifications',
                    'bg-gmc-beach-light-10': label.type === 'Origin',
                    'bg-gmc-soil-light-50': label.type === 'Uncategorized',
                  }
                )}
              />
              <span className="text-zinc-900">{label.name.toUpperCase()}</span>
            </div>
            {/* <div
              className={cn(
                'w-fit cursor-pointer rounded-full border border-zinc-700 px-3 py-1 text-sm shadow-sm',
                {
                  'bg-primary': label.type === 'Certifications',
                  'bg-gmc-beach-light-10': label.type === 'Origin',
                  'bg-gmc-soil-light-50': label.type === 'Uncategorized',
                }
              )}
            >
              {label.name}
            </div> */}
            <div className="text-zinc-500">
              {label.type} {' > '} {label.name}
            </div>
            <div className="text-sm">{label.description}</div>
          </div>
          <div className="flex w-full flex-col items-center gap-y-4 px-8 py-6">
            <div className="w-full text-center text-sm underline">
              Original Merchant Label
            </div>
            <div
              className="flex h-9 w-fit cursor-pointer items-center gap-x-1 rounded-full border border-zinc-600 bg-secondary pl-1 pr-2 shadow-sm"
              title={label.merchantLabel.description}
              // onClick={handleMerchantClick}
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
