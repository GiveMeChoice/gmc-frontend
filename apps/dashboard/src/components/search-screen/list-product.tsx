import { useDataDispatch } from '@root/context-providers/data.provider';
import { toCurrencySymbol } from '@root/helpers/to-currency-symbol';
import { IProduct } from '@root/services/products.service';
import React from 'react';

interface Props {
  product: IProduct;
}

const ListProduct: React.FC<Props> = ({ product }) => {
  const dataDispatch = useDataDispatch();

  return (
    <div
      className="mt-4 ml-4 flex h-full w-64 cursor-pointer flex-col rounded-sm bg-white shadow-sm shadow-zinc-300"
      onClick={() =>
        dataDispatch({
          type: 'OPEN_PRODUCT_PREVIEW',
          value: product,
        })
      }
    >
      <img
        className="max-h-3/4 rounded-md"
        src={product.listImage}
        alt="Product Choice"
      />
      <div id="product-data" className="p-4">
        <span className="mt-2 w-full text-sm font-medium">{product.title}</span>
        <div className="mt-2 flex items-start">
          <span className="pt-1 pr-0.5 font-medium">
            {toCurrencySymbol(product.currency)}
          </span>
          <span className="rounded-full border border-gmc-ocean text-sm">
            {/* {product} */}
          </span>
          <span className="text-4xl">{product.price}</span>
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
