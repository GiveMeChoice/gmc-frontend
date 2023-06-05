import { useScreenDataDispatch } from '@root/context-providers/screen-data.provider';
import productsService, { IProduct } from '@root/services/products.service';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';
import { useParams } from 'react-router-dom';
import CopyIdButton from '../shared/copy-id-button';
import LoadingWheel from '../shared/loading-wheel';

const MappingAssistant: React.FC = () => {
  const { shortId } = useParams();
  const dataDispatch = useScreenDataDispatch();
  const [providerKey, setProviderKey] = useState('');

  const [extracted, setExtracted] = useState(null);
  const [canExtract, setCanExtract] = useState<NodeJS.Timeout>();
  const [extracting, setExtracting] = useState(false);
  const [showExtracted, setShowExtracted] = useState(false);

  const [mapped, setMapped] = useState(null);
  const [mappedLoading, setMappedLoading] = useState(false);
  const [showMapped, setShowMapped] = useState(false);

  const [product, setProduct] = useState<IProduct>(null);
  const [canProductRefresh, setCanProductRefresh] = useState<NodeJS.Timeout>();
  const [productRefreshing, setProductRefreshing] = useState(false);
  const [showProduct, setShowProduct] = useState(true);

  const [indexableMap, setIndexableMap] = useState<any>(null);
  const [canMapIndexable, setCanMapIndexable] = useState<NodeJS.Timeout>();
  const [mappingIndexable, setMappingIndexable] = useState(false);
  const [showIndexable, setShowIndexable] = useState(false);

  const [indexedProduct, setIndexedProduct] = useState<any>(null);
  const [canReindexProduct, setCanReindexProduct] = useState<NodeJS.Timeout>();
  const [reindexingProduct, setReindexingProduct] = useState(false);
  const [showIndexedProduct, setShowIndexedProduct] = useState(true);

  useEffect(() => {
    productsService.getCurrentlyIndexed(shortId).then((indexed) => {
      setIndexedProduct(indexed);
    });
    productsService.getOne(shortId).then((product) => {
      setProduct(product);
      setProviderKey(product.provider.key);
    });
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
      productsService
        .extract(shortId, true)
        .then((data) => setExtracted(data))
        .finally(() => {
          setExtracting(false);
        });
    }
  };

  const onRemap = () => {
    setMapped(null);
    setMappedLoading(true);
    productsService
      .map(shortId)
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
      productsService
        .refresh(shortId)
        .then((data) => setProduct(data))
        .finally(() => {
          setProductRefreshing(false);
        });
    }
  };

  const onMapIndexable = () => {
    if (!canMapIndexable) {
      const timeout = setTimeout(() => {
        setCanMapIndexable(null);
      }, 2000);
      setCanMapIndexable(timeout);
    } else {
      setMappingIndexable(true);
      clearTimeout(canMapIndexable);
      setCanMapIndexable(null);
      setIndexableMap(null);
      productsService
        .mapToIndexable(shortId)
        .then((data) => setIndexableMap(data))
        .finally(() => {
          setMappingIndexable(false);
        });
    }
  };

  const onReindex = () => {
    if (!canReindexProduct) {
      const timeout = setTimeout(() => {
        setCanReindexProduct(null);
      }, 2000);
      setCanReindexProduct(timeout);
    } else {
      setReindexingProduct(true);
      clearTimeout(canReindexProduct);
      setCanReindexProduct(null);
      setIndexedProduct(null);
      productsService
        .index(shortId)
        .then((data) => setIndexedProduct(data))
        .finally(() => {
          setReindexingProduct(false);
        });
    }
  };

  return (
    <div className="flex h-full w-full max-w-full overflow-y-hidden overflow-x-scroll pb-8">
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
          REMAP SOURCE
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
                !canMapIndexable,
              'border-gmc-heart bg-gmc-heart bg-opacity-20': canMapIndexable,
            }
          )}
          onClick={onMapIndexable}
          disabled={mappingIndexable}
        >
          {mappingIndexable ? (
            <div className="">
              <LoadingWheel size="w-8" />
            </div>
          ) : (
            `${canMapIndexable ? 'CONFIRM' : 'MAP INDEXABLE'}`
          )}
        </button>
        {/* REINDEX BUTTON  */}
        <button
          className={cn(
            'mt-8 flex h-16 w-20 items-center justify-center rounded-md border-2 px-2 text-xs text-secondary active:bg-opacity-50',
            {
              'border-gmc-sunset hover:bg-zinc-700 active:bg-gmc-sunset':
                !canReindexProduct,
              'border-gmc-heart bg-gmc-heart bg-opacity-20': canReindexProduct,
            }
          )}
          onClick={onReindex}
          disabled={reindexingProduct}
        >
          {reindexingProduct ? (
            <div className="">
              <LoadingWheel size="w-8" />
            </div>
          ) : (
            `${canReindexProduct ? 'CONFIRM' : 'REINDEX'}`
          )}
        </button>
      </div>

      {/* 
            DATA DISPLAY
      */}

      <div id="data-display" className="mr-80 flex h-full w-fit gap-2">
        {/* EXTRACTED */}
        <div
          className={cn(
            'h-screen bg-zinc-800  text-xs transition-width duration-500 ease-in-out',
            {
              'w-128': showExtracted,
              'w-24': !showExtracted,
            }
          )}
        >
          <div className="relative top-0 left-0 h-full w-full">
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
            {showExtracted && (
              <JSONPretty
                id="json-pretty"
                data={extracted ? extracted : { loading: extracting }}
                mainStyle="padding:1em"
                style={{ height: '100%', overflowY: 'auto' }}
              />
            )}
          </div>
        </div>
        {/* MAPPED */}
        <div
          className={cn(
            'h-full max-h-screen bg-zinc-800 text-xs transition-width duration-500 ease-in-out',
            {
              'w-128': showMapped,
              'w-24': !showMapped,
            }
          )}
        >
          <div className="relative top-0 left-0 h-full w-full">
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
            {showMapped && (
              <JSONPretty
                id="json-pretty"
                data={mapped ? mapped : { loading: mappedLoading }}
                mainStyle="padding:1em"
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
          <div className="relative top-0 left-0 h-full w-full">
            <div
              className="flex h-12 cursor-pointer items-center justify-center space-x-1 bg-secondary pl-2 font-bold"
              onClick={() => {
                setShowProduct(!showProduct);
              }}
            >
              <span className="p-2">PRODUCT</span>{' '}
              {showProduct && (
                <CopyIdButton id={shortId + '-loaded'} content={product} />
              )}
            </div>
            {showProduct && (
              <JSONPretty
                id="json-pretty"
                data={product ? product : { loading: productRefreshing }}
                mainStyle="padding:1em"
                style={{ height: '100%', overflowY: 'auto' }}
              />
            )}
          </div>
        </div>
        {/* INDEXABLE MAP */}
        <div
          className={cn(
            'h-full max-h-screen bg-zinc-800 text-xs transition-width duration-500 ease-in-out',
            {
              'w-128': showIndexable,
              'w-24': !showIndexable,
            }
          )}
        >
          <div className="relative top-0 left-0 h-full w-full">
            <div
              className="flex h-12 cursor-pointer items-center justify-center space-x-1 bg-secondary pl-2 font-bold"
              onClick={() => {
                setShowIndexable(!showIndexable);
              }}
            >
              <span className="p-2">Indexable Map</span>{' '}
              {showIndexable && (
                <CopyIdButton
                  id={shortId + '-indexable'}
                  content={indexableMap}
                />
              )}
            </div>
            {showIndexable && (
              <JSONPretty
                id="json-pretty"
                data={
                  indexableMap ? indexableMap : { loading: mappingIndexable }
                }
                mainStyle="padding:1em"
                style={{ height: '100%', overflowY: 'auto' }}
              />
            )}
          </div>
        </div>

        {/* CURRENTLY INDEXED */}
        <div
          className={cn(
            'h-full max-h-screen bg-zinc-800 text-xs transition-width duration-500 ease-in-out',
            {
              'w-128': showIndexedProduct,
              'w-24': !showIndexedProduct,
            }
          )}
        >
          <div className="relative top-0 left-0 h-full w-full">
            <div
              className="flex h-12 cursor-pointer items-center justify-center space-x-1 bg-secondary pl-2 font-bold"
              onClick={() => {
                setShowIndexedProduct(!showIndexedProduct);
              }}
            >
              <span className="p-2">Currently Indexed</span>
              {showIndexedProduct && (
                <CopyIdButton
                  id={shortId + '-indexed-product'}
                  content={indexedProduct}
                />
              )}
            </div>
            {showIndexedProduct && (
              <JSONPretty
                id="json-pretty"
                data={
                  indexedProduct
                    ? indexedProduct
                    : { loading: reindexingProduct }
                }
                mainStyle="padding:1em"
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
