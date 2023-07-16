import { SearchProductDto } from 'gmc-types';
import React from 'react';
import LeadListProduct from './SearchProductList/LeadListProduct';

interface Props {
  products: SearchProductDto[];
  onProductSelect: (index: number) => void;
}

const SearchProductList: React.FC<Props> = ({ products, onProductSelect }) => {
  return (
    <>
      {products &&
        products.map((product, i) => (
          <div className="flex w-full border-r-1.5 border-b-1.5 border-l-1.5 border-black dark:border-white md:border-l-0">
            <LeadListProduct
              key={i}
              index={i}
              product={product}
              selectProduct={onProductSelect}
            />
          </div>
        ))}
    </>
  );
};

export default SearchProductList;
