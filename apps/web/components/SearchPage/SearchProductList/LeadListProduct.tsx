import { SearchProductDto } from 'gmc-types';
import React from 'react';
import { getUserTheme } from '../../../lib/theme';
import ProductInfoBox from '../SearchProductCompare/InfoBox';
import { useUser } from '../../UserProvider';

interface Props {
  index: number;
  product: SearchProductDto;
  selectProduct: (i: number) => void;
}

const LeadListProduct: React.FC<Props> = ({
  index,
  product,
  selectProduct,
}) => {
  const { profile } = useUser();
  return (
    <div className="flex h-full w-full flex-col">
      <div
        className=" flex h-full w-full cursor-pointer"
        onClick={() => selectProduct(index)}
      >
        {/* info */}
        <div className=" flex h-full w-3/5 flex-col">
          {/* product title */}
          <div
            className={`hidden h-fit w-full border-b-2 border-black  dark:border-white md:flex bg-${
              getUserTheme(profile).base
            }`}
          >
            <div
              className={`flex aspect-square h-full items-center justify-center border-r-2  border-black bg-${
                getUserTheme(profile).accent
              } text-2xl`}
            >
              {index + 1}
            </div>
            <span className="flex h-full flex-grow items-center justify-center p-4 text-lg">
              {product.title}
            </span>
          </div>
          {/* info box */}
          <ProductInfoBox product={product} />
        </div>

        {/* image */}
        <div
          className={`group relative flex max-h-full w-2/5  flex-col items-start justify-center border-l-2 border-black bg-zinc-500`}
        >
          <div className="flex h-full items-center py-2">
            <img
              src={product.images.list.url}
              className="absolute h-auto max-h-full w-auto transition-transform duration-500"
            />
          </div>
          <span
            className={`relative top-full  flex h-1/6 w-full -translate-y-full items-center justify-center opacity-0 group-hover:opacity-100 bg-${
              getUserTheme(profile).modal
            } border-t border-zinc-200 bg-opacity-90 duration-500`}
          >
            <img
              draggable={false}
              src="/img/magnify.svg"
              alt="Magnify Icon"
              className="h-1/2"
            />
          </span>
        </div>

        {/* <div style="position: relative; dex: 1;">
        <img src="image.png" style="position: absolute; dex: 2;" />
        <span
          id="overlay_text"
          style="position: relative; top: -10px; dex: 3;"
        >
          OVERLAY
        </span>
      </div> */}
      </div>
      {/* <div className="w/ flex flex-col">
        <div>LABELS:</div>
        {product.labels.map((label) => (
          <span>{label.description}</span>
        ))}
        {product.labels.map((label) => (
          <span>{label.description}</span>
        ))}
        {product.labels.map((label) => (
          <span>{label.description}</span>
        ))}
      </div> */}
    </div>
  );
};

export default LeadListProduct;
