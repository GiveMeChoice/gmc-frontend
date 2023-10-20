import ConfirmableButton from '@root/components/shared/confirmable-button';
import FramedButton from '@root/components/shared/framed-button';
import { formatErrorMessage } from '@root/helpers/format-error-message';
import integrationService from '@root/services/integration.service';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenSectionRow from '../shared/screen-section-row';
import ProductHeader from './product-header';
import ProductAssignmentSummary from './product-assignment-summary';
import ProductIntegrationInfo from './product-integration-info';
import ProductTitle from './product-title';
import productDocumentsService from '@root/services/product-documents.service';
import { IProduct } from 'gmc-types';
import productsService from '@root/services/products.service';

interface Props {
  product: IProduct;
}

const ProductListRow: React.FC<Props> = ({ product: initialProduct }) => {
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setProduct(initialProduct);
  }, [initialProduct]);

  const handleRefreshProduct = async () => {
    try {
      const updated = await integrationService.refreshProduct(
        product.shortId,
        false
      );
      setProduct(updated);
    } catch (e) {
      console.error(formatErrorMessage(e));
    }
  };

  const handleIndexProduct = async () => {
    try {
      await productDocumentsService.index(product.shortId);
      const updated = await productsService.getOne(product.shortId);
      setProduct(updated);
    } catch (e) {
      console.error(formatErrorMessage(e));
    }
  };

  return product ? (
    <ScreenSectionRow>
      <div className="flex w-full flex-col divide-y divide-zinc-400">
        <div className="flex w-full">
          <div className="flex w-10/12 flex-col divide-y divide-zinc-400">
            <ProductHeader product={product} />
            {product.title && <ProductTitle product={product} />}
            <ProductAssignmentSummary product={product} />
          </div>
          <div className="flex h-full w-2/12 flex-col items-center justify-evenly divide-y divide-zinc-400 border-l border-zinc-400">
            <div className="flex h-1/3 items-center justify-center">
              <FramedButton
                title="Mapping Assistant"
                onClick={() =>
                  navigate(`/products/${product.shortId}/mapping-assistant`)
                }
              />
            </div>
            <div className="flex w-full flex-col items-center justify-evenly space-y-3 pt-4">
              <div className="h-10">
                <ConfirmableButton
                  important
                  title="Refresh Now"
                  onConfirm={handleRefreshProduct}
                />
              </div>
              <div className="h-10">
                <ConfirmableButton
                  important
                  title="Index Now"
                  onConfirm={handleIndexProduct}
                />
              </div>
            </div>
          </div>
        </div>
        {product.errorMessage && (
          <div className="w-full py-5">
            <div className="flex w-10/12 items-center justify-center gap-x-1 text-gmc-heart">
              <span className="font-bold">Error Msg:&nbsp;</span>
              <span className="text-center italic text-black">
                {`"${product.errorMessage}"`}
              </span>
            </div>
          </div>
        )}
      </div>
    </ScreenSectionRow>
  ) : (
    <></>
  );
};

export default ProductListRow;
