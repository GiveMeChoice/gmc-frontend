import { SearchProductDto } from 'gmc-types';
import React from 'react';
import LeadListProduct from './SearchProductList/LeadListProduct';
import ListProduct from './SearchProductList/ListProduct';

interface Props {
  products: SearchProductDto[];
  onProductSelect: (index: number) => void;
}

const SearchProductList: React.FC<Props> = ({ products, onProductSelect }) => {
  return (
    <>
      {products &&
        products.map((product, i) => (
          <div className="flex w-full border-r-2 border-b-2 border-l-2 border-black dark:border-white md:border-l-0 xl:w-1/2">
            {i === 0 || i === 1 ? (
              <LeadListProduct
                key={i}
                index={i}
                product={product}
                selectProduct={onProductSelect}
              />
            ) : (
              <ListProduct
                key={i}
                index={i}
                product={product}
                selectProduct={onProductSelect}
              />
            )}
          </div>
        ))}
    </>
  );
};

export default SearchProductList;
