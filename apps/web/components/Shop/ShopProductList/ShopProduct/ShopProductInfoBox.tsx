import { ProductDocument } from 'gmc-types';
import React, { useEffect, useState } from 'react';
import { FlatLabel, flattenLabelDocuments } from '../../../../lib/labels';
import { useShop } from '../../../Context/ShopProvider';
import InfoBoxHeart from '../../../Common/InfoBoxHeart';

interface Props {
  product: ProductDocument;
}

const ShopProductInfoBox: React.FC<Props> = ({ product }) => {
  const [flatLabels, setFlatLabels] = useState<FlatLabel[]>([]);
  const shop = useShop();

  useEffect(() => {
    const flatLabels = flattenLabelDocuments(product.labels);
    setFlatLabels(
      flatLabels.map((flat) => {
        let color = '';
        const baseLabel = shop.baseLabels.find(
          (l) => l.slug === flat.baseLabelSlug
        );
        if (baseLabel) {
          color = baseLabel.color;
        }
        return {
          ...flat,
          color,
        };
      })
    );
  }, [shop.initialized, product.id]);

  return (
    <div className="mx-1 flex h-full w-full cursor-pointer flex-col justify-between gap-y-2 bg-white p-6 py-6 pt-5">
      <div className="flex w-full items-center justify-between">
        <span className="text-[18px] font-bold">£ {product.price}</span>
        <div id="list-product-heart" className="list-heart">
          <InfoBoxHeart product={product} />
        </div>
      </div>

      <div className="mt-7 flex flex-grow flex-col items-start gap-y-[11px] text-[13px] text-zinc-800">
        {flatLabels.slice(0, 5).map((flatLabel, i) => (
          <div
            className={
              'group flex w-fit items-center gap-x-2.5 whitespace-pre-wrap rounded-none transition-none duration-300'
            }
          >
            <div
              style={{ backgroundColor: flatLabel.color }}
              className={`aspect-square w-3 rounded-full bg-primary transition-all duration-300`}
            />
            <span className="leading-[1.2]">
              {flatLabel.name.toUpperCase()}
            </span>
          </div>
        ))}
        {product.labels.length > 5 && (
          <span className="m-1.5 pt-1 text-[13px] text-zinc-900">
            {product.labels.length - 5} More...
          </span>
        )}
      </div>
      <div className="flex w-full items-center justify-start gap-x-3">
        <div className="flex items-center justify-center gap-1 border-1.5 border-zinc-400 bg-white py-1.5 px-2.5 text-zinc-500">
          <span className="whitespace-nowrap text-xs">
            {`${product.brand.name
              .substring(0, 30)
              .trim()
              .toLocaleUpperCase()}${
              product.brand.name.length > 30 ? '...' : ''
            }`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShopProductInfoBox;
