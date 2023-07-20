import ConfirmableButton from '@root/components/shared/confirmable-button';
import FramedButton from '@root/components/shared/framed-button';
import { formatErrorMessage } from '@root/helpers/format-error-message';
import integrationService from '@root/services/integration.service';
import productsService, { IProduct } from '@root/services/products.service';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenSectionRow from '../shared/screen-section-row';
import ProductHeader from './product-header';
import ProductIdsAndCategories from './product-ids-and-categories';
import ProductIntegrationInfo from './product-integration-info';
import ProductTitle from './product-title';
import productDocumentsService from '@root/services/product-documents.service';

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
            <ProductIdsAndCategories product={product} />
            <ProductIntegrationInfo product={product} />
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
            <div className="flex w-full flex-col items-center justify-center space-y-4">
              <div className=""></div>
              <ConfirmableButton
                title="Refresh Now"
                onConfirm={handleRefreshProduct}
              />
              <ConfirmableButton
                title="Index Now"
                onConfirm={handleIndexProduct}
              />
            </div>
          </div>
        </div>
        {product.errorMessage && (
          <span className="py-3 text-center text-sm italic text-gmc-heart">
            {product.errorMessage}
          </span>
        )}
      </div>
    </ScreenSectionRow>
  ) : (
    <></>
  );
};

export default ProductListRow;
