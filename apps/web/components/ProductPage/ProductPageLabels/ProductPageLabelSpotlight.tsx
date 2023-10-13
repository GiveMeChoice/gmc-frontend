import { IGmcLabel, IMerchantLabel } from 'gmc-types';
import Link from 'next/link';
import React from 'react';

interface Props {
  label: IMerchantLabel;
}

interface LinkProps {
  label: Partial<IGmcLabel>;
}

const ProductPageLabelSpotlight: React.FC<Props> = ({ label }) => {
  return (
    <div className="flex flex-col items-center px-4 py-10">
      <LabelLink label={label.gmcLabel}>
        {/* <div className="h-fit w-fit rounded-full bg-black">
          <div className="translate-x-[1px] -translate-y-[1.5px] cursor-pointer rounded-full border-1.5 border-zinc-700 bg-gmc-berry py-2.5 px-7 text-center font-bold tracking-wide text-black transition-transform duration-150 hover:translate-x-[4px] hover:-translate-y-[4px] active:translate-x-[1px] active:-translate-y-[1.5px]"> */}
        {label.gmcLabel.name.toUpperCase()}
        {/* </div>
        </div> */}
      </LabelLink>
    </div>
  );
};

const LabelLink: React.FC<LinkProps> = ({ label, children }) => (
  <Link
    href={`/shop/label/${label.parent.parent.slug}/${label.parent.slug}/${label.slug}`}
  >
    {children}
  </Link>
);

export default ProductPageLabelSpotlight;
