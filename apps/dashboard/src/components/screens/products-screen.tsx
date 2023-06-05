import {
  useScreenData,
  useScreenDataDispatch,
} from '@root/context-providers/screen-data.provider';
import { useFilters } from '@root/context-providers/filters.provider';
import { toDateString } from '@root/helpers/to-date-string';
import productsService from '@root/services/products.service';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CopyIdButton from '../shared/copy-id-button';
import ScreenSection from './shared/screen-section';
import ScreenSectionCell from './shared/screen-section-cell';
import ScreenSectionRow from './shared/screen-section-row';
import SourceIdCell from '../shared/source-id-cell';

const ProductsScreen: React.FC = () => {
  const { products, productsMeta } = useScreenData();
  const dataDispatch = useScreenDataDispatch();
  const { activeFilters } = useFilters();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    <>
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
            <ScreenSectionRow key={i}>
              {/* <ProductPreview /> */}
              <SourceIdCell
                width="w-44"
                providerId={p.providerId}
                sourceIdentifier={p.source.identifier}
                sourceDescription={p.source.description}
                showLink
              />
              {/* product data cell  */}
              <ScreenSectionCell styles="w-10/12 flex flex-col divide-y divide-zinc-300 space-y-2">
                <div className="flex flex-wrap items-center pt-1">
                  <span
                    className={cn(
                      'flex w-24 items-center justify-center rounded-full border border-secondary-dark-50 p-1 text-center text-sm font-bold',
                      {
                        'bg-primary': p.integrationStatus === 'LIVE',
                        'bg-gmc-beach': p.integrationStatus === 'PENDING',
                        'bg-gmc-heart': p.integrationStatus === 'EXPIRED',
                      }
                    )}
                  >
                    {p.integrationStatus}
                  </span>
                  {/* ID SECTION */}
                  <div className="flex flex-grow flex-wrap items-center justify-evenly text-sm">
                    <div className="flex items-center">
                      <span className="font-bold text-zinc-600">
                        Provider ID:
                      </span>
                      <span className="ml-2">{p.providerProductId}</span>
                      <CopyIdButton id={p.providerProductId} />
                    </div>
                    <div className="flex items-center">
                      <span className="font-bold text-zinc-600">GMC ID:</span>
                      <span className="ml-2">{p.shortId}</span>
                      <CopyIdButton id={p.shortId} />
                    </div>
                  </div>
                </div>
                {/* 
                PRODUCT TITLE
                 */}
                {p.title && (
                  <div className="w-full px-4 pt-2 text-center text-base">
                    {p.integrationStatus === 'LIVE' ? (
                      <a
                        target="_blank"
                        rel="noreferrer"
                        className="cursor-pointer text-gmc-ocean underline-offset-2 hover:underline"
                        onClick={() => {
                          if (p.integrationStatus === 'LIVE') {
                            dataDispatch({
                              type: 'OPEN_PRODUCT_PREVIEW',
                              value: products[i],
                            });
                          }
                        }}
                      >
                        {p.title}
                      </a>
                    ) : (
                      p.title
                    )}
                  </div>
                )}
                {/* CATEGORY SECTION */}
                <div className="flex flex-wrap items-center justify-evenly pt-2 text-sm">
                  <div className="flex items-center">
                    <span className="font-bold text-zinc-600">
                      Provider Category:
                    </span>
                    <span className="ml-2">
                      {p.providerCategory
                        ? p.providerCategory.description
                        : 'None'}
                    </span>
                    <CopyIdButton id={p.providerProductId} />
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold text-zinc-600">
                      GMC Category:
                    </span>
                    <span className="ml-2">
                      {p.providerCategory && p.providerCategory.categoryId
                        ? p.providerCategory.gmcCategory.name
                        : 'None Assigned'}
                    </span>
                    {/* <CopyIdButton id={p.shortId} /> */}
                  </div>
                </div>
                {/* 
                PRODUCT INFO
               */}
                <div className="flex h-full w-full flex-col flex-wrap justify-between pt-4 pb-2">
                  {/* PRODUCT DATES */}
                  <div className="flex flex-wrap items-start justify-between px-6">
                    <div className="flex flex-col pt-1.5">
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

                    <div className="flex flex-col pt-1.5">
                      <div className="flex items-center">
                        <span className="w-24 text-sm font-bold text-zinc-600">
                          Last Refresh:{' '}
                        </span>
                        <span>{toDateString(p.refreshedAt)}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-24 text-sm font-bold text-zinc-600">
                          Expires At:{' '}
                        </span>
                        <span className="">{toDateString(p.expiresAt)}</span>
                      </div>
                    </div>

                    <div className="flex flex-col pt-1.5">
                      <div className="flex items-center">
                        <span className="w-24 text-sm font-bold text-zinc-600">
                          Source Date:{' '}
                        </span>
                        <span className="">{toDateString(p.sourceDate)}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-24 text-sm font-bold text-zinc-600">
                          Refresh Reason:{' '}
                        </span>
                        <span className="">{p.refreshReason}</span>
                      </div>
                    </div>
                  </div>
                  {/* Other Integration STuff... */}
                  <div className="flex w-full flex-wrap items-center justify-evenly pt-2 text-sm font-bold text-zinc-600">
                    <div className="flex w-48 items-center justify-center">
                      <button
                        className={cn(
                          'rounded-md border bg-secondary p-3 text-sm ',
                          {
                            'border-zinc-400 hover:bg-primary-light-50 active:bg-primary':
                              true,
                          }
                        )}
                        onClick={() =>
                          navigate(`/products/${p.shortId}/mapping-assistant`)
                        }
                      >
                        Mapping Assistant
                      </button>
                    </div>
                    <div className="flex w-48 items-center justify-center">
                      Keep Alive Count:{' '}
                      <span className="pl-1.5 text-lg font-normal">
                        {p.keepAliveCount}
                      </span>
                    </div>
                  </div>
                </div>
                {p.hasIntegrationError && (
                  <span className="pt-2 pb-1 text-center text-sm italic text-gmc-heart">
                    {p.errorMessage}
                  </span>
                )}
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
    </>
  );
};

export default ProductsScreen;
