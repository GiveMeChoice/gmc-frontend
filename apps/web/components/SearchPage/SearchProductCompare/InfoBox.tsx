import { ProductDocument } from 'gmc-types';
import React, { useEffect, useState } from 'react';
import { getUserTheme } from '../../../lib/theme';
import { useUser } from '../../UserProvider';
import cn from 'classnames';

interface Props {
  product: ProductDocument;
}

type SimpleLabel = {
  type: string;
  name: string;
};

const ProductInfoBox: React.FC<Props> = ({ product }) => {
  const { profile } = useUser();
  const [labels, setLabels] = useState<SimpleLabel[]>([]);

  useEffect(() => {
    const simpleLabels = product.labels.map((label) => ({
      type: label.gmcLabel.name,
      name: !label.gmcLabel.sublabel
        ? label.gmcLabel.name
        : !label.gmcLabel.sublabel.sublabel
        ? label.gmcLabel.sublabel.name
        : label.gmcLabel.sublabel.sublabel.name,
    }));
    setLabels(simpleLabels);
  }, [product]);

  return (
    <div
      className={`h-full w-full bg-${
        getUserTheme(profile).base
      } flex flex-col gap-4 px-5 pt-4 pb-6`}
    >
      <div className="flex items-center justify-between gap-4 pr-2 font-bold">
        <div className="flex items-center gap-2">
          {product.brand.logo && (
            <img
              src={product.brand.logo}
              className="h-12 w-12 rounded-full border border-zinc-500"
            />
          )}
          <span className="font-bold">{product.brand.name}</span>
        </div>
        <span className="text-lg">£ {product.price}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-zinc-800">
          {product.description
            ? `${product.description.substring(0, 250).trim()}${
                product.description.length > 250 ? '...' : ''
              }`
            : ''}
        </span>
      </div>
      <div className="flex w-full items-center justify-end gap-1">
        {/* <span className="pr-1 text-sm">Sold by:</span> */}
        <img
          src={product.merchant.logo}
          className="h-8 w-8 rounded-full border border-zinc-500"
        />
        <span className="text-sm font-bold">{product.merchant.name}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {labels.map((label) => (
          // <div className="rounded-full border border-zinc-800">
          //   <div className="rounded-full border-1.5 ">
          <div
            className={cn(
              'flex items-center gap-1.5 rounded-full border border-zinc-700 px-3 py-1 text-xs shadow-sm',
              {
                'bg-primary': label.type === 'Certifications',
                'bg-gmc-beach-light-10': label.type === 'Origin',
                'bg-gmc-soil-light-50': label.type === 'Uncategorized',
              }
            )}
          >
            {label.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductInfoBox;
