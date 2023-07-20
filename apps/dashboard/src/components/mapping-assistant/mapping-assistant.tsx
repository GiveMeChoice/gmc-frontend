import { useScreenDataDispatch } from '@root/context-providers/screen-data.provider';
import integrationService from '@root/services/integration.service';
import productsService, { IProduct } from '@root/services/products.service';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';
import { useParams } from 'react-router-dom';
import CopyIdButton from '../shared/copy-id-button';
import LoadingWheel from '../shared/loading-wheel';
import { ProductDocument } from 'gmc-types';
import productDocumentsService from '@root/services/product-documents.service';

const MappingAssistant: React.FC = () => {
  const { shortId } = useParams();
  const dataDispatch = useScreenDataDispatch();
  const [providerKey, setProviderKey] = useState('');

  const [extracted, setExtracted] = useState(null);
  const [canExtract, setCanExtract] = useState<NodeJS.Timeout>();
  const [extracting, setExtracting] = useState(false);
  const [showExtracted, setShowExtracted] = useState(true);

  const [mapped, setMapped] = useState(null);
  const [mappedLoading, setMappedLoading] = useState(false);
  const [showMapped, setShowMapped] = useState(false);

  const [product, setProduct] = useState<IProduct>(null);
  const [canProductRefresh, setCanProductRefresh] = useState<NodeJS.Timeout>();
  const [productRefreshing, setProductRefreshing] = useState(false);
  const [showProduct, setShowProduct] = useState(true);

  const [mappedDocument, setMappedDocument] = useState<ProductDocument>(null);
  const [canMapDocument, setCanMapDocument] = useState<NodeJS.Timeout>();
  const [mappingDocument, setMappingDocument] = useState(false);
  const [showMappedDocument, setShowMappedDocument] = useState(false);

  const [productDocument, setProductDocument] = useState<ProductDocument>(null);
  const [canIndexProduct, setCanIndexProduct] = useState<NodeJS.Timeout>();
  const [indexingProduct, setIndexingProduct] = useState(false);
  const [showProductDocument, setShowProductDocument] = useState(true);

  useEffect(() => {
    if (shortId) {
      productDocumentsService.getOne(shortId).then((document) => {
        setProductDocument(document);
      });
      productsService.getOne(shortId).then((product) => {
        setProduct(product);
        setProviderKey(product.merchant.key);
      });
    }
  }, [shortId]);

  const onExtract = () => {
    if (!canExtract) {
      const timeout = setTimeout(() => {
        setCanExtract(null);
      }, 2000);
      setCanExtract(timeout);
    } else {
      setExtracting(true);
      clearTimeout(canExtract);
      setCanExtract(null);
      setExtracted(null);
      integrationService
        .extractProduct(shortId, true)
        .then((data) => setExtracted(data))
        .finally(() => {
          setExtracting(false);
        });
    }
  };

  const onRemap = () => {
    setMapped(null);
    setMappedLoading(true);
    integrationService
      .mapProduct(shortId, false)
      .then((data) => setMapped(data))
      .finally(() => setMappedLoading(false));
  };

  const onRefresh = () => {
    if (!canProductRefresh) {
      const timeout = setTimeout(() => {
        setCanProductRefresh(null);
      }, 2000);
      setCanProductRefresh(timeout);
    } else {
      setProductRefreshing(true);
      clearTimeout(canProductRefresh);
      setCanProductRefresh(null);
      setProduct(null);
      integrationService
        .refreshProduct(shortId, false)
        .then((data) => setProduct(data))
        .finally(() => {
          setProductRefreshing(false);
        });
    }
  };

  const onMapDocument = () => {
    if (!canMapDocument) {
      const timeout = setTimeout(() => {
        setCanMapDocument(null);
      }, 2000);
      setCanMapDocument(timeout);
    } else {
      setMappingDocument(true);
      clearTimeout(canMapDocument);
      setCanMapDocument(null);
      setMappedDocument(null);
      productDocumentsService
        .map(shortId)
        .then((doc) => setMappedDocument(doc))
        .finally(() => {
          setMappingDocument(false);
        });
    }
  };

  const onIndex = () => {
    if (!canIndexProduct) {
      const timeout = setTimeout(() => {
        setCanIndexProduct(null);
      }, 2000);
      setCanIndexProduct(timeout);
    } else {
      setIndexingProduct(true);
      clearTimeout(canIndexProduct);
      setCanIndexProduct(null);
      setProductDocument(null);
      productDocumentsService
        .index(shortId)
        .then((doc) => setProductDocument(doc))
        .finally(() => {
          setIndexingProduct(false);
        });
    }
  };

  return (
    <div id="mapping-assistant" className="flex h-full w-full pb-8">
      <div className="flex w-1/12 flex-col items-center p-3 text-xs  text-primary">
        <div className="flex flex-col items-center space-y-0.5">
          <span className="text-xs font-bold">Provider</span>
          <span className="text-sm text-secondary">
            {providerKey ? providerKey : ''}
          </span>
        </div>
        <div className="mt-4 flex flex-col items-center space-y-0.5">
          <span className="text-xs font-bold">Product ID</span>
          <span className="text-sm text-secondary">{shortId}</span>
        </div>
        {/* EXTRACT BUTTON  */}
        <button
          className={cn(
            'mt-8 flex h-16 w-20 items-center justify-center rounded-md border-2 px-2 text-xs text-secondary active:bg-opacity-50',
            {
              'border-gmc-sunset hover:bg-zinc-700 active:bg-gmc-sunset':
                !canExtract,
              'border-gmc-heart bg-gmc-heart bg-opacity-20': canExtract,
            }
          )}
          onClick={onExtract}
          disabled={extracting}
        >
          {extracting ? (
            <div className="">
              <LoadingWheel size="w-8" />
            </div>
          ) : (
            `${canExtract ? 'CONFIRM' : 'EXTRACT SOURCE'}`
          )}
        </button>
        {/* REMAP BUTTON */}
        <button
          className="mt-8 h-16 w-full rounded-md border-2 border-gmc-surf px-2  py-1 text-xs text-secondary hover:bg-zinc-700 active:bg-gmc-surf active:bg-opacity-50"
          onClick={onRemap}
        >
          REMAP PRODUCT
        </button>
        {/* REFRESH BUTTON  */}
        <button
          className={cn(
            'mt-8 flex h-16 w-20 items-center justify-center rounded-md border-2 px-2 text-xs text-secondary active:bg-opacity-50',
            {
              'border-gmc-beach hover:bg-zinc-700 active:bg-gmc-beach':
                !canProductRefresh,
              'border-gmc-heart bg-gmc-heart bg-opacity-20': canProductRefresh,
            }
          )}
          onClick={onRefresh}
          disabled={productRefreshing}
        >
          {productRefreshing ? (
            <div className="">
              <LoadingWheel size="w-8" />
            </div>
          ) : (
            `${canProductRefresh ? 'CONFIRM' : 'REFRESH PRODUCT'}`
          )}
        </button>
        {/* MAP INDEXABLE BUTTON  */}
        <button
          className={cn(
            'mt-8 flex h-16 w-20 items-center justify-center rounded-md border-2 px-2 text-xs text-secondary active:bg-opacity-50',
            {
              'border-gmc-surf hover:bg-zinc-700 active:bg-gmc-surf':
                !canMapDocument,
              'border-gmc-heart bg-gmc-heart bg-opacity-20': canMapDocument,
            }
          )}
          onClick={onMapDocument}
          disabled={mappingDocument}
        >
          {mappingDocument ? (
            <div className="">
              <LoadingWheel size="w-8" />
            </div>
          ) : (
            `${canMapDocument ? 'CONFIRM' : 'MAP DOCUMENT'}`
          )}
        </button>
        {/* REINDEX BUTTON  */}
        <button
          className={cn(
            'mt-8 flex h-16 w-20 items-center justify-center rounded-md border-2 px-2 text-xs text-secondary active:bg-opacity-50',
            {
              'border-gmc-sunset hover:bg-zinc-700 active:bg-gmc-sunset':
                !canIndexProduct,
              'border-gmc-heart bg-gmc-heart bg-opacity-20': canIndexProduct,
            }
          )}
          onClick={onIndex}
          disabled={indexingProduct}
        >
          {indexingProduct ? (
            <div className="">
              <LoadingWheel size="w-8" />
            </div>
          ) : (
            `${canIndexProduct ? 'CONFIRM' : 'REINDEX'}`
          )}
        </button>
      </div>

      {/* 
            DATA DISPLAY
      */}

      <div
        id="data-display"
        className="flex h-full gap-2 overflow-y-hidden overflow-x-scroll"
      >
        {/* EXTRACTED */}
        <div
          className={cn(
            'h-full max-h-screen  bg-zinc-800 text-xs transition-width duration-500 ease-in-out',
            {
              'w-128': showExtracted,
              'w-24': !showExtracted,
            }
          )}
        >
          <div
            className="flex h-12 cursor-pointer items-center justify-center space-x-1 bg-secondary pl-2 font-bold"
            onClick={() => {
              setShowExtracted(!showExtracted);
            }}
          >
            <span className="p-2">EXTRACTED</span>{' '}
            {showExtracted && (
              <CopyIdButton id={shortId + '-extracted'} content={extracted} />
            )}
          </div>
          <div className="relative top-0 left-0 h-full w-full overflow-y-scroll">
            {showExtracted && (
              <JSONPretty
                id="json-pretty"
                data={extracted ? extracted : { loading: extracting }}
                mainStyle="padding:1em;padding-bottom:7em"
                style={{ height: '100%', paddingBottom: '25px' }}
              />
            )}
          </div>
        </div>
        {/* MAPPED */}
        <div
          className={cn(
            'h-full max-h-screen  bg-zinc-800 text-xs transition-width duration-500 ease-in-out',
            {
              'w-128': showMapped,
              'w-24': !showMapped,
            }
          )}
        >
          <div
            className="flex h-12 cursor-pointer items-center justify-center space-x-1 bg-secondary pl-2 font-bold"
            onClick={() => {
              setShowMapped(!showMapped);
            }}
          >
            <span className="p-2">MAPPED</span>{' '}
            {showMapped && (
              <CopyIdButton id={shortId + '-mapped'} content={mapped} />
            )}
          </div>
          <div className="relative top-0 left-0 h-full w-full overflow-y-scroll">
            {showMapped && (
              <JSONPretty
                id="json-pretty"
                data={mapped ? mapped : { loading: mappedLoading }}
                mainStyle="padding:1em;padding-bottom:7em"
                style={{ height: '100%', overflowY: 'auto' }}
              />
            )}
          </div>
        </div>
        {/* LOADED */}
        <div
          className={cn(
            'h-full max-h-screen bg-zinc-800 text-xs transition-width duration-500 ease-in-out',
            {
              'w-128': showProduct,
              'w-24': !showProduct,
            }
          )}
        >
          <div
            className="flex h-12 cursor-pointer items-center justify-center space-x-1 bg-secondary pl-2 font-bold"
            onClick={() => {
              setShowProduct(!showProduct);
            }}
          >
            <span className="p-2">LIVE PRODUCT</span>{' '}
            {showProduct && (
              <CopyIdButton id={shortId + '-loaded'} content={product} />
            )}
          </div>
          <div className="relative top-0 left-0 h-full w-full overflow-y-scroll">
            {showProduct && (
              <JSONPretty
                id="json-pretty"
                data={product ? product : { loading: productRefreshing }}
                mainStyle="padding:1em;padding-bottom:7em"
                style={{ height: '100%' }}
              />
            )}
          </div>
        </div>
        {/* INDEXABLE MAP */}
        <div
          className={cn(
            'h-full max-h-screen  bg-zinc-800 text-xs transition-width duration-500 ease-in-out',
            {
              'w-128': showMappedDocument,
              'w-24': !showMappedDocument,
            }
          )}
        >
          <div
            className="flex h-12 cursor-pointer items-center justify-center space-x-1 bg-secondary pl-2 font-bold"
            onClick={() => {
              setShowMappedDocument(!showMappedDocument);
            }}
          >
            <span className="p-2">MAPPED DOCUMENT</span>{' '}
            {showMappedDocument && (
              <CopyIdButton
                id={shortId + '-indexable'}
                content={mappedDocument}
              />
            )}
          </div>
          <div className="relative top-0 left-0 h-full w-full overflow-y-scroll">
            {showMappedDocument && (
              <JSONPretty
                id="json-pretty"
                data={
                  mappedDocument ? mappedDocument : { loading: mappingDocument }
                }
                mainStyle="padding:1em;padding-bottom:7em"
                style={{ height: '100%', overflowY: 'auto' }}
              />
            )}
          </div>
        </div>

        {/* CURRENTLY INDEXED */}
        <div
          className={cn(
            'h-full max-h-screen  bg-zinc-800 text-xs transition-width duration-500 ease-in-out',
            {
              'w-128': showProductDocument,
              'w-24': !showProductDocument,
            }
          )}
        >
          <div
            className="flex h-12 cursor-pointer items-center justify-center space-x-1 bg-secondary pl-2 font-bold"
            onClick={() => {
              setShowProductDocument(!showProductDocument);
            }}
          >
            <span className="p-2">LIVE DOCUMENT</span>
            {showProductDocument && (
              <CopyIdButton
                id={shortId + '-indexed-product'}
                content={productDocument}
              />
            )}
          </div>
          <div className="relative top-0 left-0 h-full w-full overflow-y-scroll">
            {showProductDocument && (
              <JSONPretty
                id="json-pretty"
                data={
                  productDocument
                    ? productDocument
                    : { loading: indexingProduct }
                }
                mainStyle="padding:1em;padding-bottom:7em"
                style={{ height: '100%', overflowY: 'auto' }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MappingAssistant;
