import { toDateString } from '@root/helpers/to-date-string';
import { IProduct } from '@root/services/products.service';
import React from 'react';

interface Props {
  product: IProduct;
}

const ProductIntegrationInfo: React.FC<Props> = ({ product }) => {
  return (
    <div className="divide- flex flex-wrap justify-evenly divide-zinc-300 whitespace-nowrap px-6 py-4 text-xs text-zinc-600">
      <div className="flex w-1/3 flex-col items-center justify-center gap-y-2 px-4">
        <div className="flex flex-wrap items-center gap-x-1.5">
          <span className="text-center font-bold">Created:</span>
          <span>{toDateString(product.createdAt)}</span>
        </div>
        <hr className="w-full border-zinc-300" />
        <div className="flex flex-wrap items-center gap-x-1.5">
          <span className="text-center font-bold">Updated:</span>
          <span>{toDateString(product.updatedAt)}</span>
        </div>
      </div>
      <div className="flex w-1/3 flex-col items-center justify-center gap-y-2 px-4">
        <div className="flex flex-wrap items-center gap-x-1.5">
          <span className="text-center font-bold">Expires At:</span>
          <span className="whitespace-nowrap text-center">
            {toDateString(product.expiresAt)}
          </span>
        </div>
        <hr className="w-full border-zinc-300" />
        <div className="flex flex-wrap items-center gap-x-1.5">
          <span className="text-center font-bold">Refreshed At:</span>
          <span>{`${toDateString(product.refreshedAt)} (${
            product.refreshReason
          })`}</span>
        </div>
      </div>
      <div className="flex w-1/3 flex-col items-center justify-center gap-y-2 px-4">
        <div className="flex flex-wrap items-center gap-x-1.5">
          <span className="text-center font-bold">Keep Alives:</span>
          <span className="font-base">{product.keepAliveCount}</span>
        </div>
        {product.refreshReason && (
          <>
            <hr className="w-full border-zinc-300" />
            <div className="flex flex-wrap items-center gap-x-1.5">
              <span className="text-center font-bold">Indexed At:</span>
              <span className="italic">{toDateString(product.indexedAt)}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductIntegrationInfo;
