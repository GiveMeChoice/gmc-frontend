import React from 'react';
import { useShop } from '../Context/ShopProvider';
import ListPagingHeader from './ShopProductList/ListPagingHeader';
import ShopProduct from './ShopProductList/ShopProduct';
import Image from 'next/image';

interface Props {
  color: string;
}

const ShopProductList: React.FC<Props> = ({ color }) => {
  const shop = useShop();

  return (
    <div
      id="shop-products"
      className="flex h-full max-h-full w-full flex-col justify-between overflow-x-hidden overflow-y-clip bg-secondary"
    >
      <div className="flex h-full flex-col">
        <ListPagingHeader color={color} bottom noTop />
        {shop.searching || shop.paging ? (
          <div className="flex h-full w-full items-start justify-center bg-opacity-95">
            <span className="mt-24">Loading...</span>
          </div>
        ) : (
          <>
            {!shop.searching && !!shop.response.data.length ? (
              <div className="mb-8 flex flex-wrap items-start justify-start">
                {shop.response.data &&
                  shop.response.data.map((product, i) => (
                    <ShopProduct index={i} product={product as any} />
                  ))}
              </div>
            ) : (
              <div className="flex h-full w-full items-start justify-center bg-opacity-95">
                <div className="mt-20 flex flex-col gap-y-3">
                  <Image
                    className="select-none rounded-full"
                    draggable={false}
                    src="/img/person.svg"
                    alt="angle right"
                    width="36"
                    height="36"
                  />
                  <span className="">No Products Found</span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <ListPagingHeader color={color} />
    </div>
  );
};

export default ShopProductList;
