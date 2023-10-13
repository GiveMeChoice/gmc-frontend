import { IMerchantLabel, IProduct } from 'gmc-types';
import React, { useEffect, useState } from 'react';
import ProductPageLabelList from './ProductPageLabels/ProductPageLabelList';
import ProductPageLabelSpotlight from './ProductPageLabels/ProductPageLabelSpotlight';
import { useRouter } from 'next/router';

interface Props {
  labels: IMerchantLabel[];
}

const ProductPageLabels: React.FC<Props> = ({ labels }) => {
  const router = useRouter();
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  useEffect(() => {
    if (router.query.spotlight) {
      try {
        const spotlight = Number(router.query.spotlight);
        console.log('spotlight: ' + spotlight);
        setSpotlightIndex(
          !isNaN(spotlight) && spotlightIndex !== spotlight ? spotlight : 0
        );
      } catch (ignore) {
        setSpotlightIndex(0);
      }
    } else {
      console.log('no spotlight');
      setSpotlightIndex(0);
    }
  }, [router.isReady]);

  const updateSpotlightIndex = (i) => {
    setSpotlightIndex(i);
    router.replace(
      {
        query: {
          ...router.query,
          spotlight: i,
        },
      },
      null,
      { scroll: false }
    );
  };

  return (
    <div className="flex h-full flex-col divide-y-1.5 divide-zinc-700">
      <div className="w-full py-3 text-center text-[15px] font-bold">
        Product Labels
      </div>
      <div className="flex h-full w-full divide-x-1.5 divide-zinc-700">
        <div className="flex h-full w-1/2 flex-col divide-y-1.5 divide-zinc-700">
          {/* <div className="w-full py-2 text-center text-[15px] font-bold">
            Product Labels
          </div> */}
          <ProductPageLabelList
            labels={labels}
            spotlightIndex={spotlightIndex}
            setSpotlightIndex={updateSpotlightIndex}
          />
        </div>
        <div className="w-1/2">
          <ProductPageLabelSpotlight label={labels[spotlightIndex]} />
        </div>
      </div>
    </div>
  );
};

export default ProductPageLabels;
