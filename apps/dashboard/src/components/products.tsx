import {
  useData,
  useDataDispatch,
} from '@root/context-providers/data.provider';
import { useFilters } from '@root/context-providers/filters.provider';
import { toDateString } from '@root/helpers/to-date-string';
import productsService from '@root/services/products.service';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import CopyIdButton from './copy-id-button';
import ScreenSection from './screen/screen-section';
import ScreenSectionCell from './screen/screen-section-cell';
import ScreenSectionRow from './screen/screen-section-row';
import SourceIdCell from './source-id-cell';

const ProductsScreen: React.FC = () => {
  const { products, productsMeta } = useData();
  const dataDispatch = useDataDispatch();
  const { activeFilters } = useFilters();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!products.length) {
      setLoading(true);
      productsService
        .search(activeFilters, productsMeta)
        .then((products) => {
          dataDispatch({ type: 'REFRESH_PRODUCTS', value: products });
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
        products.map((p, i) => (
          <ScreenSectionRow>
            <SourceIdCell
              width="w-2/12"
              providerId={p.providerId}
              sourceIdentifier={p.source.identifier}
              sourceDescription={p.source.description}
              showLink
            />
            {/* product data cell  */}
            <ScreenSectionCell styles="w-8/12 flex flex-col divide-y divide-zinc-300 space-y-2">
              <div className="flex w-full items-center pt-1">
                <span
                  className={cn(
                    'w-1/6 rounded-full border border-secondary-dark-50 bg-opacity-40 px-2.5 py-1 text-center text-sm',
                    {
                      'bg-gmc-forest': p.integrationStatus === 'LIVE',
                      'bg-gmc-beach': p.integrationStatus === 'PENDING',
                      'bg-gmc-heart': p.integrationStatus === 'EXPIRED',
                    }
                  )}
                >
                  {p.integrationStatus}
                </span>
                <div className="w-8/12 px-3 text-center text-sm">
                  {p.link ? (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gmc-ocean underline-offset-2 hover:underline"
                    >
                      {p.title}
                    </a>
                  ) : (
                    p.title
                  )}
                </div>
                <div className="flex w-1/6 items-center justify-center">
                  <span
                    className={cn(
                      'rounded-md border border-zinc-300 px-2 py-1 text-sm',
                      {
                        'text-secondary-dark-40': !p.price,
                        'font-bold text-zinc-700': p.price,
                      }
                    )}
                  >
                    {p.price} <span className="font-normal">£</span>
                  </span>
                </div>
              </div>
              {/* <div className="flex h-full w-full flex-col p-2"> */}
              {/* ID SECTION */}
              <div className="flex flex-wrap items-center justify-evenly pt-2 text-sm">
                <div className="flex items-center">
                  <span className="font-bold text-zinc-600">Internal ID:</span>
                  <span className="ml-2">{p.shortId}</span>
                  <CopyIdButton id={p.shortId} />
                </div>
                <div className="flex items-center">
                  <span className="font-bold text-zinc-600">Provider ID:</span>
                  <span className="ml-2">{p.providerProductId}</span>
                  <CopyIdButton id={p.providerProductId} />
                </div>
              </div>
              {/* 
                PRODUCT INFO
               */}
              <div className="flex h-full w-full flex-col flex-wrap justify-between pt-4 pb-2">
                {/* PRODUCT DATES */}
                <div className="flex items-center justify-between px-6">
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <span className="w-24 text-sm font-bold text-zinc-600">
                        Created:{' '}
                      </span>
                      <span>{toDateString(p.createdAt)}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-24 text-sm font-bold text-zinc-600">
                        Updated:{' '}
                      </span>
                      <span>{toDateString(p.updatedAt)}</span>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <span className="w-24 text-sm font-bold text-zinc-600">
                        Last Refresh:{' '}
                      </span>
                      <span>
                        {p.refreshedAt ? toDateString(p.refreshedAt) : 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-24 text-sm font-bold text-zinc-600">
                        Expires At:{' '}
                      </span>
                      <span className="">{toDateString(p.expiresAt)}</span>
                    </div>
                  </div>
                </div>
                {/* Other Integration STuff... */}
                <div className="flex items-center justify-center pt-2 text-sm font-bold text-zinc-600">
                  Keep Alive Count:{' '}
                  <span className="pl-1.5 text-lg font-normal">
                    {p.keepAliveCount}
                  </span>
                </div>
              </div>
              {p.hasIntegrationError && (
                <span className="pt-2 pb-1 text-center text-sm font-bold text-gmc-heart">
                  {p.errorMessage}
                </span>
              )}
            </ScreenSectionCell>

            <ScreenSectionCell styles="flex w-2/12 items-center">
              <img src={''} alt="Product Image" className="h-fit" />
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
