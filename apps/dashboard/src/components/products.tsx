import {
  useData,
  useDataDispatch,
} from '@root/context-providers/data.provider';
import { useFilters } from '@root/context-providers/filters.provider';
import productsService from '@root/services/products.service';
import React, { useEffect, useState } from 'react';
import CopyIdButton from './copy-id-button';
import ScreenSection from './screen/screen-section';
import ScreenSectionCell from './screen/screen-section-cell';
import ScreenSectionRow from './screen/screen-section-row';

const ProductsScreen: React.FC = () => {
  const { products, productsMeta } = useData();
  const dispatch = useDataDispatch();
  const { activeFilters } = useFilters();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!products.length) {
      setLoading(true);
      productsService
        .search(activeFilters, productsMeta)
        .then((products) => {
          dispatch({ type: 'REFRESH_PRODUCTS', value: products });
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
          name: 'providerKey',
          title: 'Provider',
        },
      ]}
      meta={productsMeta}
    >
      {products.length ? (
        products.map((p, i) => (
          <ScreenSectionRow>
            <ScreenSectionCell styles="w-2/12 flex flex-col justify-evenly pr-2">
              <div>
                <h2 className="mb-1 text-sm">{p.providerKey}</h2>
                <div className="flex items-center">
                  <span className="text-sm font-bold">{p.shortId}</span>
                  <CopyIdButton id={p.shortId} index={i} />
                </div>
              </div>
            </ScreenSectionCell>
            <ScreenSectionCell styles="w-5/12">
              <div className="text-sm">{p.title}</div>
            </ScreenSectionCell>
            <ScreenSectionCell styles="w-5/12">
              <img src={p.image} className="h-60" />
            </ScreenSectionCell>
          </ScreenSectionRow>
        ))
      ) : (
        <ScreenSectionRow>
          <span className="m-3">
            {loading ? 'Loading...' : 'No Products Found'}
          </span>
        </ScreenSectionRow>
      )}
    </ScreenSection>
  );
};

export default ProductsScreen;
