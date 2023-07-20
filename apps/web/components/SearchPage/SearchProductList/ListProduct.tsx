import { ProductDocument } from 'gmc-types';
import React from 'react';
import { getUserTheme } from '../../../lib/theme';
import { useUser } from '../../UserProvider';

interface Props {
  index: number;
  product: ProductDocument;
  selectProduct: (i) => void;
}

const ListProduct: React.FC<Props> = ({ index, product, selectProduct }) => {
  const { profile } = useUser();
  return (
    <div
      className="group flex w-full cursor-pointer"
      onClick={() => selectProduct(index)}
    >
      <div
        className={`hidden w-1/4 items-center justify-center border-r-1.5 border-black text-5xl dark:border-white bg-${
          getUserTheme(profile).modal
        } group-hover:bg-primary md:flex`}
      >
        {index + 1}
      </div>
      <div
        className={`w-1/2 border-r-1.5 border-black dark:border-white bg-${
          getUserTheme(profile).accent
        }`}
      >
        <div className="flex h-full flex-col justify-evenly gap-3 py-3 px-5">
          <span className="cursor-pointer text-2xl underline-offset-2 transition-transform duration-300 group-hover:underline group-active:text-gmc-berry md:text-lg">
            {product.title}
          </span>
          <span className="text-sm">
            {`${
              product.description && product.description.substring(0, 55).trim()
            }${
              product.description && product.description.length > 255
                ? '...'
                : ''
            }`}
          </span>
          <div className="flex items-center gap-4">
            <span className="font-bold">{product.brand.name}</span>
            <span className="text-sm">{product.price}</span>
          </div>
        </div>
      </div>

      <div className="flex w-1/2 flex-col overflow-hidden md:w-1/4">
        <div className="flex h-1/3 w-full items-center justify-center border-b-1.5 border-black bg-opacity-80 text-4xl group-hover:bg-primary dark:border-white md:hidden md:border-r-1.5">
          {index + 1}
        </div>
        <div
          className={`-z-10 flex h-2/3 scale-110 items-center justify-center bg-white duration-300 md:h-full`}
        >
          <img
            src={product.images.list.url}
            className="block h-auto max-h-full w-auto rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
