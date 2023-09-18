import { ProductDocument } from 'gmc-types';
import React, { useEffect, useState } from 'react';
import InfoBoxBrand from './ListProductInfoBox/InfoBoxBrand';
import InfoBoxHeart from './ListProductInfoBox/InfoBoxHeart';
import { FlatLabel, flattenLabels, getLabelColor } from '../../../lib/labels';
import cn from 'classnames';

interface Props {
  product: ProductDocument;
  onSelectProduct: (e) => void;
}

const ListProductInfoBox: React.FC<Props> = ({ product, onSelectProduct }) => {
  const [flatLabels, setFlatLabels] = useState<FlatLabel[]>([]);
  const [signupModalOpen, setSignupModalOpen] = useState(false);

  useEffect(() => {
    setFlatLabels(flattenLabels(product.labels));
  }, []);

  return (
    <div
      className={`mx-1 flex h-full w-full cursor-pointer flex-col justify-between gap-y-3 bg-white p-7 py-6`}
      onClick={(e) => {
        if (!signupModalOpen) {
          onSelectProduct(e);
        }
      }}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center justify-between text-zinc-800">
          <span className="text-[28px]">£ {product.price}</span>
        </div>
        <div id="list-product-heart" className="list-heart">
          <InfoBoxHeart
            modalOpen={signupModalOpen}
            setModalOpen={setSignupModalOpen}
            product={product}
          />
        </div>
      </div>

      <div className="flex flex-col items-start space-y-1 pl-1 text-[13px] text-zinc-800">
        {flatLabels.slice(0, 5).map((sl, i) => (
          <div
            className={cn(
              'group flex w-fit items-center gap-x-2.5 whitespace-pre-wrap rounded-none transition-none duration-300'
            )}
          >
            <div
              className={cn(
                `h-3 w-3 rounded-full bg-primary transition-all duration-300 bg-${getLabelColor(
                  sl.type
                )}`,
                {}
              )}
            />
            <span className={cn(' transition-all duration-300', {})}>
              {sl.name.toUpperCase()}
            </span>
          </div>
        ))}
        {product.labels.length > 5 && (
          <span className="m-1.5 pt-1 text-[14px] text-zinc-900">
            {product.labels.length - 5} More...
          </span>
        )}
      </div>
      <div className="flex w-full items-center justify-end gap-x-3">
        <InfoBoxBrand brand={product.brand} />
      </div>
    </div>
  );
};

export default ListProductInfoBox;
