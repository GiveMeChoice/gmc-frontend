import productsService, { IProduct } from '@root/services/products.service';
import React, { useEffect, useState } from 'react';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';
import { useParams } from 'react-router-dom';
import LoadingWheel from './loading-wheel';
import cn from 'classnames';
import CopyIdButton from './copy-id-button';
import ProductPreview from './product-preview/product-preview';

const MappingAssistant: React.FC = () => {
  const { shortId } = useParams();
  const [providerKey, setProviderKey] = useState('');
  const [previewMappedOn, setPreviewMappedOn] = useState(false);
  const [previewProductOn, setPreviewProductOn] = useState(false);

  const [extracted, setExtracted] = useState(null);
  const [extractedLoading, setExtractedLoading] = useState(true);
  const [extractable, setExtractable] = useState<NodeJS.Timeout>();
  const [extracting, setExtracting] = useState(false);

  const [mapped, setMapped] = useState(null);
  const [mappedLoading, setMappedLoading] = useState(false);

  const [product, setProduct] = useState<IProduct>(null);
  const [productLoading, setProductLoading] = useState(true);
  const [refreshable, setRefreshable] = useState<NodeJS.Timeout>();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    productsService
      .extract(shortId)
      .then((data) => setExtracted(data))
      .finally(() => setExtractedLoading(false));
    // productsService
    //   .map(shortId)
    //   .then((data) => setMapped(data))
    //   .finally(() => setMappedLoading(false));
    productsService
      .getOne(shortId)
      .then((product) => {
        setProduct(product);
        setProviderKey(product.provider.key);
      })
      .finally(() => setProductLoading(false));
  }, [shortId]);

  const onExtract = () => {
    if (!extractable) {
      const timeout = setTimeout(() => {
        setExtractable(null);
      }, 2000);
      setExtractable(timeout);
    } else {
      setExtracting(true);
      clearTimeout(extractable);
      setExtractable(null);
      setExtracted(null);
      setExtractedLoading(true);
      productsService
        .extract(shortId, false)
        .then((data) => setExtracted(data))
        .finally(() => {
          setExtractedLoading(false);
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
    if (!refreshable) {
      const timeout = setTimeout(() => {
        setRefreshable(null);
      }, 2000);
      setRefreshable(timeout);
    } else {
      setRefreshing(true);
      clearTimeout(refreshable);
      setRefreshable(null);
      setProduct(null);
      setProductLoading(true);
      productsService
        .refresh(shortId)
        .then((data) => setProduct(data))
        .finally(() => {
          setProductLoading(false);
          setRefreshing(false);
        });
    }
  };

  return (
    <div className="flex w-full pr-3">
      <div className="mt-4 flex w-36 flex-col items-center px-1 text-sm  text-primary">
        <div className="flex flex-col items-center space-y-0.5">
          <span className="text-sm font-bold">Provider</span>
          <span className="text-lg text-secondary">
            {providerKey ? providerKey : ''}
          </span>
        </div>
        <div className="mt-4 flex flex-col items-center space-y-0.5">
          <span className="text-sm font-bold">Product ID</span>
          <span className="text-lg text-secondary">{shortId}</span>
        </div>
        {/* EXTRACT BUTTON  */}
        <button
          className={cn(
            'mt-8 h-16 w-4/5 rounded-md border-4 px-2 text-sm text-secondary',
            {
              'border-gmc-sunset hover:bg-zinc-800 active:bg-primary-dark-30':
                !extractable,
              'border-gmc-heart bg-gmc-heart bg-opacity-50 active:bg-opacity-80':
                extractable,
            }
          )}
          onClick={onExtract}
          disabled={extracting}
        >
          {extracting ? (
            <div className="mt-2">
              <LoadingWheel size="w-8" />
            </div>
          ) : (
            `${extractable ? 'CONFIRM' : 'EXTRACT SOURCE'}`
          )}
        </button>
        {/* REMAP BUTTON */}
        <button
          className="mt-8 h-16 w-4/5 rounded-md border-4 border-gmc-surf px-2  py-1 text-sm text-secondary hover:bg-zinc-800 active:bg-primary-dark-30"
          onClick={onRemap}
        >
          REMAP SOURCE
        </button>
        <button
          className="mt-2 h-12 w-4/5 rounded-md border-4 border-gmc-berry px-2 text-sm text-secondary hover:bg-zinc-800 active:bg-primary-dark-30"
          onClick={() => {
            setPreviewProductOn(false);
            setPreviewMappedOn(true);
          }}
        >
          PREVIEW
        </button>

        {/* REFRESH BUTTON  */}
        <button
          className={cn(
            'mt-8 h-16 w-4/5 rounded-md border-4 px-2 text-sm text-secondary',
            {
              'border-gmc-beach hover:bg-zinc-800 active:bg-primary-dark-30':
                !refreshable,
              'border-gmc-heart bg-gmc-heart bg-opacity-50 active:bg-opacity-80':
                refreshable,
            }
          )}
          onClick={onRefresh}
          disabled={refreshing}
        >
          {refreshing ? (
            <div className="mt-2">
              <LoadingWheel size="w-8" />
            </div>
          ) : (
            `${refreshable ? 'CONFIRM' : 'REFRESH PRODUCT'}`
          )}
        </button>
        <button
          className="mt-2 h-12 w-4/5 rounded-md border-4 border-gmc-berry px-2 text-sm text-secondary hover:bg-zinc-800 active:bg-primary-dark-30"
          onClick={() => {
            setPreviewMappedOn(false);
            setPreviewProductOn(true);
          }}
        >
          PREVIEW
        </button>
      </div>

      {/* PREVIEW */}
      <div
        className={cn({
          hidden: !previewProductOn && !previewMappedOn,
          'fixed left-32 z-10 flex h-full w-full overflow-auto bg-gmc-surf bg-opacity-40':
            previewProductOn || previewMappedOn,
        })}
      >
        <button
          className="absolute left-9 top-4 h-10 rounded-md border-2 border-gmc-berry bg-zinc-900 px-4 text-sm text-white hover:bg-zinc-800 active:bg-primary-dark-30"
          onClick={() => {
            setPreviewProductOn(false);
            setPreviewMappedOn(false);
          }}
        >
          Close
        </button>
        <div className="ml-32 h-5/6 w-9/12 rounded-sm border-2 border-gmc-berry bg-secondary">
          <ProductPreview product={previewProductOn ? product : mapped} />
        </div>
      </div>

      {/* EXTRACTED */}
      <div className="max-h-screen w-4/12 pr-3 text-sm">
        <div className="relative top-0 left-0 h-full w-full overflow-y-auto">
          <div className="flex items-center space-x-1 bg-secondary pl-2 font-bold">
            <span>EXTRACTED</span>{' '}
            <CopyIdButton id={shortId + '-extracted'} content={extracted} />
          </div>
          <JSONPretty
            id="json-pretty"
            data={extracted ? extracted : { loading: extractedLoading }}
            mainStyle="padding:1em"
          />
        </div>
      </div>
      {/* MAPPED */}
      <div className="max-h-screen w-4/12 pr-3 text-sm">
        <div className="relative top-0 left-0 h-full w-full overflow-y-auto">
          <div className="flex items-center space-x-1 bg-secondary pl-2 font-bold">
            <span>MAPPED</span>{' '}
            <CopyIdButton id={shortId + '-mapped'} content={mapped} />
          </div>
          <JSONPretty
            id="json-pretty"
            data={mapped ? mapped : { loading: mappedLoading }}
            mainStyle="padding:1em"
          />
        </div>
      </div>
      {/* LOADED */}
      <div className="max-h-screen w-4/12 text-sm">
        <div className="relative top-0 left-0 h-full w-full overflow-y-auto">
          <div className="flex items-center space-x-1 bg-secondary pl-2 font-bold">
            <span>LOADED</span>{' '}
            <CopyIdButton id={shortId + '-loaded'} content={product} />
          </div>
          <JSONPretty
            id="json-pretty"
            data={product ? product : { loading: productLoading }}
            mainStyle="padding:1em"
          />
        </div>
      </div>
    </div>
  );
};

export default MappingAssistant;
