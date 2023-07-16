import { useFilters } from '@root/context-providers/filters.provider';
import {
  useScreenData,
  useScreenDataDispatch,
} from '@root/context-providers/screen-data.provider';
import productsService from '@root/services/products.service';
import React, { useEffect, useState } from 'react';
import ProductListRow from './products-screen/product-list-row';
import ScreenSection from './shared/screen-section';
import ScreenSectionRow from './shared/screen-section-row';

const ProductsScreen: React.FC = () => {
  const { products, productsMeta } = useScreenData();
  const dataDispatch = useScreenDataDispatch();
  const { activeFilters } = useFilters();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!products.length) {
      setLoading(true);
      productsService
        .find(activeFilters, productsMeta)
        .then((products) => {
          dataDispatch({ type: 'SCREEN_REFRESH_PRODUCTS', value: products });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  return (
    <ScreenSection
      title="Products"
      sortFields={[
        {
          name: 'integrationStatus',
          title: 'Status',
        },
        {
          name: 'createdAt',
          title: 'Created',
        },
        {
          name: 'updatedAt',
          title: 'Updated',
        },
        {
          name: 'refreshedAt',
          title: 'Last Refresh',
        },
        {
          name: 'expiresAt',
          title: 'Expires At',
        },
        {
          name: 'keepAliveCount',
          title: 'Keep Alives',
        },
      ]}
      meta={productsMeta}
    >
      {products.length ? (
        products.map((p, i) => <ProductListRow key={i} product={p} />)
      ) : (
        <ScreenSectionRow>
          <span className="m-3 ml-6 text-sm italic">
            {loading ? 'Loading...' : 'No Products Found'}
          </span>
        </ScreenSectionRow>
      )}
    </ScreenSection>
  );
};

export default ProductsScreen;
