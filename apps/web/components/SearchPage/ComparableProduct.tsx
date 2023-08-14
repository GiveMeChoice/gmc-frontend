import { MerchantLabelDocument, ProductDocument } from 'gmc-types';
import React, { useEffect, useState } from 'react';
import ComparableProductDescription from './ComparableProduct/ComarableProductDescription';
import ComparableProductLabels from './ComparableProduct/ComarableProductLabels';
import ComparableProductBuyBox from './ComparableProduct/ComparableProductBuyBox';
import ComparableProductHeading from './ComparableProduct/ComparableProductHeading';
import ComparableProductImages from './ComparableProduct/ComparableProductImages';
import ComparableProductLabelSpotlight from './ComparableProduct/ComparableProductLabels/ComparableProductLabelSpotlight';

interface Props {
  index: number;
  product: ProductDocument;
  isFirst: boolean;
  isLast: boolean;
  nextProduct: () => void;
  prevProduct: () => void;
}

export type FlatLabel = {
  index: number;
  merchantLabel: MerchantLabelDocument;
  type: string;
  name: string;
  description: string;
};

const ComparableProduct: React.FC<Props> = (props) => {
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
        <div className="flex h-fit w-full flex-col divide-y-1.5 divide-secondary-dark-10 bg-white">
          <ComparableProductHeading {...props} />
          <div className="flex w-full divide-x-1.5 divide-secondary-dark-10">
            <div className="w-5/12">
              <ComparableProductImages product={props.product} />
            </div>
            <div className="w-7/12 divide-y-1.5 divide-secondary-dark-10">
              <ComparableProductBuyBox product={props.product} />
            </div>
          </div>
          <div className="flex w-full divide-x-1.5 divide-secondary-dark-10">
            <div className="w-5/12">
              <ComparableProductDescription
                description={props.product.description}
              />
            </div>
            <div className="flex w-3/12">
              <ComparableProductLabels
                labels={flatLabels}
                spotlight={labelSpotlight}
                setSpotlight={setLabelSpotlight}
              />
            </div>
            <div className="flex w-4/12">
              <ComparableProductLabelSpotlight
                label={flatLabels[labelSpotlight]}
              />
            </div>
          </div>
          <div className=""></div>
        </div>
      )}
    </>
  );
};

export default ComparableProduct;

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}
