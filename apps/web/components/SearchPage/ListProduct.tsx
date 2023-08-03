import { ProductDocument } from 'gmc-types';
import React, { useEffect, useState } from 'react';
import ListProductInfoBox from './ListProduct/ListProductInfoBox';
import ListProductHeading from './ListProduct/ListProductHeading';

interface Props {
  index: number;
  product: ProductDocument;
  selectProduct: (i: number) => void;
}

const ListProduct: React.FC<Props> = ({ index, product, selectProduct }) => {
  const [imgSrc, setImgSrc] = useState<string>('');
  useEffect(() => {
    let images = product.images.filter((img) => img.type === 'LIST');
    if (images.length === 0) {
      images = product.images;
    }
    if (images.length > 0) {
      const primary = images.find((img) => img.primary);
      setImgSrc(primary ? primary.url : images[0].url);
    }
  }, [product]);

  const handleProductClick = (e, index) => {
    e.preventDefault();
    console.log(e);
    if (e.target.id !== 'list-product-heart') {
      selectProduct(index);
    }
  };

  return (
    <div
      className="group flex max-h-[400px] w-1/2 cursor-pointer flex-col divide-y-1.5 divide-secondary-dark-10 border-r-1.5 border-b-1.5 border-secondary-dark-10"
      onClick={(e) => handleProductClick(e, index)}
    >
      <ListProductHeading index={index} title={product.title} />
      <div className="flex h-full w-full divide-x-1.5 divide-secondary-dark-10">
        <div className="w-3/5">
          <ListProductInfoBox product={product} />
        </div>
        <div
          className={`group relative flex max-h-full w-2/5  flex-col items-start justify-center  bg-white`}
        >
          <div className="flex h-full w-full items-center justify-center">
            <div className="p-2 py-3.5">
              <img
                src={imgSrc.startsWith('http') ? imgSrc : `http://${imgSrc}`}
                className="transition-transform duration-300 group-hover:scale-[1.035]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
