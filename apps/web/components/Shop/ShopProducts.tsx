import React from 'react';
import { useSearch } from '../SearchProvider';
import ListPagingHeader from '../SearchPage/ListPagingHeader';
import { IEntityPageData } from '../../lib/types';
import ShopProduct from './ShopProduct';

interface Props {
  color: string;
}

const ShopProducts: React.FC<Props> = ({ color }) => {
  const search = useSearch();

  return (
    <div
      id="shop-products"
      className="mb-8 flex h-full min-h-screen w-full flex-col justify-between overflow-y-auto overflow-x-hidden bg-secondary"
    >
      <div className="">
        <ListPagingHeader color={color} bottom />
        {search.loading ? (
          <div className="flex h-full w-full items-center justify-center border-t-1.5 border-zinc-700 bg-opacity-95">
            <span>Loading...</span>
          </div>
        ) : (
          <>
            {!search.loading && !!search.response.data.length ? (
              <div className="flex flex-wrap items-start justify-start">
                {search.response.data &&
                  search.response.data.map((product, i) => (
                    <ShopProduct index={i} product={product as any} />
                  ))}
              </div>
            ) : (
              <div className="flex h-1/2 w-full items-center justify-center border-t-1.5 border-zinc-700 bg-opacity-95">
                <span>No Products Found</span>
              </div>
            )}
          </>
        )}
      </div>
      <ListPagingHeader color={color} bottom />
    </div>
  );
};

export default ShopProducts;
