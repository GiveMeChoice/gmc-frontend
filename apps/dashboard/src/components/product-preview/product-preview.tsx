import {
  useScreenData,
  useScreenDataDispatch,
} from '@root/context-providers/screen-data.provider';
import cn from 'classnames';
import { IProduct } from 'gmc-types';
import React from 'react';
import LoadingWheel from '../shared/loading-wheel';
import ProductPreviewImage from './product-preview-image';
import ProductPreviewInfo from './product-preview-info';
import ProductPreviewLabels from './product-preview-labels';
import ProductPreviewReviews from './product-preview-reviews';
import ProductIntegrationInfo from '../screens/products-screen/product-integration-info';

interface Props {
  previewOn?: boolean;
  onClose?: () => void;
  product: Partial<IProduct>;
}

const ProductPreview: React.FC<Props> = ({ previewOn, onClose, product }) => {
  const { previewProduct } = useScreenData();
  const dataDispatch = useScreenDataDispatch();

  return (
    <div
      className={cn({
        hidden: !previewProduct,
        'fixed z-20 flex h-screen w-screen items-center justify-center overflow-auto bg-gmc-surf bg-opacity-40 pt-8':
          previewProduct,
      })}
    >
      <button
        className="fixed left-8 top-8 h-10 rounded-md border-2 border-gmc-berry bg-zinc-900 px-4 text-sm text-white hover:bg-zinc-800 active:bg-zinc-700"
        onClick={() => {
          dataDispatch({ type: 'CLOSE_PRODUCT_PREVIEW' });
        }}
      >
        Close
      </button>
      <div className="h-5/6 w-9/12 rounded-sm border-2 border-gmc-berry bg-secondary">
        <div className="flex h-full space-x-4 p-2">
          {previewProduct ? (
            <>
              <div className="w-3/5 space-y-4">
                <div className="h-1/2">
                  <ProductPreviewInfo product={previewProduct} />
                </div>
                <div className="flex h-2/5 space-x-4">
                  <ProductPreviewLabels product={previewProduct} />
                </div>
              </div>
              <div className="w-2/5 space-y-4">
                <div className="h-1/2">
                  <ProductPreviewImage product={previewProduct} />
                </div>
                <div className="h-2/5">
                  {/* <ProductPreviewReviews product={previewProduct} /> */}
                  <ProductIntegrationInfo product={previewProduct} />
                </div>
              </div>
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <LoadingWheel size="w-16" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;
