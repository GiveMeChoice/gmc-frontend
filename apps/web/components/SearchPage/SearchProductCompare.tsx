import { SearchProductDto } from 'gmc-types';
import React, { useEffect, useState } from 'react';
import ComparableProduct from './SearchProductCompare/ComparableProduct';

interface Props {
  products: SearchProductDto[];
  selected: number;
}

const SearchProductCompare: React.FC<Props> = ({ products, selected }) => {
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  useEffect(() => {
    setSelectedProductIndex(selected);
  }, []);

  const nextProduct = () => {
    setSelectedProductIndex(selectedProductIndex + 1);
  };

  const prevProduct = () => {
    setSelectedProductIndex(selectedProductIndex - 1);
  };

  return (
    <ComparableProduct
      product={products[selectedProductIndex]}
      index={selectedProductIndex}
      isLast={selectedProductIndex + 1 === products.length}
      nextProduct={nextProduct}
      prevProduct={prevProduct}
    />
  );
};

export default SearchProductCompare;
