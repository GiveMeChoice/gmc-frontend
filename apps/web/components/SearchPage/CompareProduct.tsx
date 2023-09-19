import { MerchantLabelDocument, ProductDocument } from 'gmc-types';
import React, { useEffect, useState } from 'react';
import CompareProductLabels from './CompareProduct/ComareProductLabels';
import CompareBuyBoxBuyNowButton from './CompareProduct/CompareProductBuyBox/CompareBuyBoxBuyNowButton';
import CompareProductDescription from './CompareProduct/CompareProductDescription';
import CompareProductHeading from './CompareProduct/CompareProductHeading';
import CompareProductImage from './CompareProduct/CompareProductImage';
import CompareProductLabelSpotlight from './CompareProduct/CompareProductLabels/CompareProductLabelSpotlight';
import CompareBuyBoxCategory from './CompareProduct/CompareProductBuyBox/CompareBuyBoxCategory';

interface Props {
  index: number;
  product: ProductDocument;
  isFirst: boolean;
  isLast: boolean;
  nextProduct: () => void;
  prevProduct: () => void;
  closeCompareMode: () => void;
}

export type FlatLabel = {
  index: number;
  merchantLabel: MerchantLabelDocument;
  type: string;
  name: string;
  description: string;
};

const CompareProduct: React.FC<Props> = (props) => {
  const [flatLabels, setFlatLabels] = useState<FlatLabel[]>([]);
  const [labelSpotlight, setLabelSpotlight] = useState(0);

  useEffect(() => {
    setLabelSpotlight(0);
    if (props.product && props.product.labels) {
      const flattened = props.product.labels.map((label, index) => ({
        index,
        merchantLabel: label.merchantLabel,
        type: label.gmcLabel.name,
        name: !label.gmcLabel.sublabel
          ? label.gmcLabel.name
          : !label.gmcLabel.sublabel.sublabel
          ? label.gmcLabel.sublabel.name
          : label.gmcLabel.sublabel.sublabel.name,
        description: !label.gmcLabel.sublabel
          ? label.gmcLabel.description
          : !label.gmcLabel.sublabel.sublabel
          ? label.gmcLabel.sublabel.description
          : label.gmcLabel.sublabel.sublabel.description,
      }));
      setFlatLabels(flattened);
    }
  }, [props.product]);

  return (
    <>
      {props.product && (
        <div className="flex h-fit w-full flex-col divide-y-1.5 divide-zinc-700 bg-white">
          <CompareProductHeading {...props} />
          <div className="flex w-full divide-x-1.5 divide-zinc-700">
            <div className="flex w-[50%] flex-col divide-y-1.5 divide-zinc-700">
              {/* <CompareProductBuyBox product={props.product} /> */}
              <div className="p-2 px-8">
                <CompareBuyBoxCategory category={props.product.category} />
              </div>
              <CompareProductImage product={props.product} />
              <CompareBuyBoxBuyNowButton product={props.product} />
              <CompareProductDescription
                description={props.product.description}
              />
            </div>
            <div className="flex w-[50%] flex-col divide-y-1.5 divide-zinc-700">
              <div className="flex h-full w-full flex-col divide-y-1.5 divide-zinc-700">
                <div className="bg-secondry border--1.5 text-cnter w-full border-zinc-700 bg-white px-7 py-2.5 text-[14px] font-bold tracking-wide text-zinc-800">
                  Product Labels
                </div>
                <div className="flex h-full w-full divide-x-1.5 divide-zinc-700">
                  <div className="h-full w-[45%]">
                    <CompareProductLabels
                      labels={flatLabels}
                      spotlight={labelSpotlight}
                      setSpotlight={setLabelSpotlight}
                    />
                  </div>
                  <div className="flex w-[55%]">
                    <CompareProductLabelSpotlight
                      label={flatLabels[labelSpotlight]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=""></div>
        </div>
      )}
    </>
  );
};

export default CompareProduct;

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}
