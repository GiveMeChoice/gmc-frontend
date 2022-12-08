import { IProduct } from '@root/services/products.service';
import React from 'react';
import LoadingWheel from '../loading-wheel';
import ProductPreviewImage from './product-preview-image';
import ProductPreviewInfo from './product-preview-info';
import ProductPreviewLabels from './product-preview-labels';
import ProductPreviewReviews from './product-preview-reviews';

interface Props {
  product: Partial<IProduct>;
}

const ProductPreview: React.FC<Props> = ({ product }) => {
  return (
    <div className="flex h-full space-x-4 p-2">
      {product ? (
        <>
          <div className="w-3/5 space-y-4">
            <div className="h-1/2">
              <ProductPreviewInfo product={product} />
            </div>
            <div className="flex h-2/5 space-x-4">
              <div className="w-1/2">other stuff</div>
              <div className="w-1/2">
                <ProductPreviewLabels product={product} />
              </div>
            </div>
          </div>
          <div className="w-2/5 space-y-4">
            <div className="h-1/2">
              <ProductPreviewImage product={product} />
            </div>
            <div className="h-2/5">
              <ProductPreviewReviews product={product} />
            </div>
          </div>
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <LoadingWheel size="w-16" />
        </div>
      )}
    </div>
  );
};

export default ProductPreview;
