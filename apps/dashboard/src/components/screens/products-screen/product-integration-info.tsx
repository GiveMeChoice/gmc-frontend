import CopyIdButton from '@root/components/shared/copy-id-button';
import { toDateString } from '@root/helpers/to-date-string';
import { IProduct } from 'gmc-types';
import React from 'react';

interface Props {
  product: IProduct;
}

const ProductIntegrationInfo: React.FC<Props> = ({ product }) => {
  return (
    <div className="flex flex-col divide-y-1.5 divide-zinc-400">
      <div className="flex items-center justify-evenly gap-y-1 pb-4 text-base">
        <div className="flex items-center gap-x-1">
          <span className="font-bold text-zinc-600">GMC ID:</span>
          <span className="">{product.shortId}</span>
          <CopyIdButton id={product.shortId} />
        </div>
        <div className="flex items-center gap-x-1">
          <span className="font-bold text-zinc-600">Merchant ID:</span>
          <span className="">{product.merchantProductCode}</span>
          <CopyIdButton id={product.merchantProductCode} />
        </div>
      </div>
      <div className="divide- flex flex-wrap justify-evenly divide-zinc-300 whitespace-nowrap px-0 pt-4 text-sm text-zinc-600">
        <div className="flex w-1/2 flex-col items-center justify-evenly gap-y-4 px-4">
          <div className="flex flex-wrap items-center gap-x-1.5">
            <span className="text-center font-bold">Created:</span>
            <span>{toDateString(product.createdAt)}</span>
          </div>
          <hr className="w-full border-zinc-300" />
          <div className="flex flex-wrap items-center gap-x-1.5">
            <span className="text-center font-bold">Updated:</span>
            <span>{toDateString(product.updatedAt)}</span>
          </div>
          <hr className="w-full border-zinc-300" />
          <div className="flex flex-wrap items-center gap-x-1.5">
            <span className="text-center font-bold">Refreshed At:</span>
            <span>{`${toDateString(product.refreshedAt)} (${
              product.refreshReason
            })`}</span>
          </div>
          <hr className="w-full border-zinc-300" />
        </div>
        <div className="flex w-1/2 flex-col items-center  gap-y-4 px-4">
          <div className="flex flex-wrap items-center gap-x-1.5">
            <span className="text-center font-bold">Keep Alives:</span>
            <span className="font-base">{product.keepAliveCount}</span>
          </div>
          <hr className="w-full border-zinc-300" />
          <div className="flex flex-wrap items-center gap-x-1.5">
            <span className="text-center font-bold">Expires At:</span>
            <span className="whitespace-nowrap text-center">
              {toDateString(product.expiresAt)}
            </span>
          </div>
          <hr className="w-full border-zinc-300" />
          {product.refreshReason && (
            <>
              <div className="flex flex-wrap items-center gap-x-1.5">
                <span className="text-center font-bold">Indexed At:</span>
                <span className="italic">
                  {toDateString(product.indexedAt)}
                </span>
              </div>
              <hr className="w-full border-zinc-300" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductIntegrationInfo;
