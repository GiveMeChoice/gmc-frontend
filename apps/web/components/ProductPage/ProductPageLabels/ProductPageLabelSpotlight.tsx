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
    <div className="flex flex-col items-center gap-y-6 divide-y-1.5 divide-zinc-700 pt-10 pb-6">
      <div className="flex h-fit min-h-[250px] flex-col items-center gap-y-6 px-4 py-4">
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
        <span className="w-full text-center text-[15px] leading-[1.4] text-gray-900">
          {label.gmcLabel.description
            ? label.gmcLabel.description
            : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut porta libero accumsan pulvinar placerat. Mauris eleifend, magna id rutrum ultrices, nisi erat vehicula quam, id mollis ipsum enim at enim.'}
        </span>
      </div>
      <div className="flex h-fit min-h-[250px] w-full flex-col items-center gap-y-4 p-4">
        <span className="font-bold">Label Origin</span>
        <div className="flex w-full items-center justify-center gap-x-4">
          <img
            src={label.logo}
            title="Merchant Logo"
            className="h-9 w-9 rounded-full border border-zinc-800 bg-secondary shadow-sm"
            alt="LOGO"
          />
          <span className="text-lg italic">{`"${label.description}"`}</span>
        </div>
        <span className="text-center leading-snug">
          via
          <a
            className="cursor-pointer pl-1.5 text-gmc-ocean-light-10 hover:underline"
            href={label.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            Ethical Superstore
          </a>
        </span>
      </div>
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
