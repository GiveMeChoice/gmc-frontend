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
  const color = label.gmcLabel.parent
    ? label.gmcLabel.parent.parent
      ? label.gmcLabel.parent.parent.color
      : label.gmcLabel.parent.color
    : label.gmcLabel.color;
  return (
    <div className="flex flex-col items-center gap-y-6 px-4 py-10">
      <LabelLink label={label.gmcLabel}>
        <div className="h-fit w-fit rounded-full bg-black">
          <div className="flex translate-x-[1px] -translate-y-[1.5px] cursor-pointer items-center rounded-full border border-zinc-900 bg-white py-2.5 pl-4 pr-6 text-center font-bold tracking-wide text-black transition-transform duration-150 hover:translate-x-[4px] hover:-translate-y-[4px] active:translate-x-[1px] active:-translate-y-[1.5px]">
            <div
              style={{ backgroundColor: color }}
              className="mr-3 aspect-square h-[15px] rounded-full bg-primary"
            />
            {label.gmcLabel.name.toUpperCase()}
          </div>
        </div>
      </LabelLink>
      <span className="w- text-center text-[15px] leading-[1.4] text-gray-900">
        {label.gmcLabel.description
          ? label.gmcLabel.description
          : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porta libero accumsan pulvinar placerat. Mauris eleifend, magna id rutrum ultrices, nisi erat vehicula quam, id mollis ipsum enim at enim.'}
      </span>
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
