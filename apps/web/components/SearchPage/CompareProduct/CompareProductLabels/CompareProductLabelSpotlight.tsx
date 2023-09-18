import Link from 'next/link';
import React from 'react';
import { FlatLabel, getLabelColor } from '../../../../lib/labels';

interface Props {
  label: FlatLabel;
}

const CompareProductLabelSpotlight: React.FC<Props> = ({ label }) => {
  return (
    <>
      {label && (
        <div className="flex min-h-[400px] w-full flex-col divide-y-1.5 divide-secondary-dark-10 overflow-y-auto">
          <div className="flex min-h-[200px] flex-col items-center gap-y-6 px-8 py-8">
            {/* <div className="cursor-pointer text-center text-zinc-600 hover:underline">
              {label.type} {' > '} {label.name}
            </div> */}
            <div className="flex items-center gap-x-2.5 rounded-none py-1 pl-2.5 pr-4">
              <Link href={`/shop/labels/${label.name}`}>
                <div className="h-full w-full bg-black">
                  <div
                    className={`bordr-1.5 text-zinc-00 w-fit min-w-[60px] cursor-pointer border-black py-[12px] px-[24px] text-center text-[15px] font-bold text-zinc-800 transition-all duration-200 hover:-translate-y-1 hover:translate-x-[3px] active:translate-x-0 active:translate-y-0 bg-${getLabelColor(
                      label.type
                    )}`}
                  >
                    {label.name.toUpperCase()}
                  </div>
                </div>
              </Link>
            </div>
            <div className="text-center text-sm">{label.description}</div>
          </div>
          <div className="flex w-full flex-col items-center gap-y-6 p-8">
            <div className="text w-full text-center font-bold text-zinc-600">
              Label Provenance
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

export default CompareProductLabelSpotlight;
