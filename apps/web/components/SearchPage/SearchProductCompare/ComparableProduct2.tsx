import { MerchantLabelDocument, ProductDocument } from 'gmc-types';
import React, { useEffect, useState } from 'react';
import ComparableProductBuyBox from './ComparableProduct/ComparableProductBuyBox';
import ComparableProductDescription from './ComparableProduct/ComparableProductBuyBox/ComarableProductDescription';
import ComparableProductLabels from './ComparableProduct/ComparableProductBuyBox/ComarableProductLabels';
import ComparableProductLabelInfo from './ComparableProduct/ComparableProductBuyBox/ComparableProductLabels/ComparableProductLabelInfo';
import ComparableProductImages from './ComparableProduct/ComparableProductImages';
import ComparableProductTitleRow from './ComparableProduct/ComparableProductTitleRow';

interface Props {
  index: number;
  product: ProductDocument;
  isLast: boolean;
  nextProduct: () => void;
  prevProduct: () => void;
}

export type FlatLabel = {
  index: number;
  merchantLabel: MerchantLabelDocument;
  type: string;
  name: string;
};

const ComparableProduct2: React.FC<Props> = (props) => {
  const [flatLabels, setFlatLabels] = useState<FlatLabel[]>([]);
  const [labelSpotlight, setLabelSpotlight] = useState(0);

  useEffect(() => {
    setLabelSpotlight(0);
    const flattened = props.product.labels.map((label, index) => ({
      index,
      merchantLabel: label.merchantLabel,
      type: label.gmcLabel.name,
      name: !label.gmcLabel.sublabel
        ? label.gmcLabel.name
        : !label.gmcLabel.sublabel.sublabel
        ? label.gmcLabel.sublabel.name
        : label.gmcLabel.sublabel.sublabel.name,
    }));
    setFlatLabels(flattened);
  }, [props.product]);

  return (
    <div className="flex  w-full flex-col divide-y-1.5 divide-black">
      {/*  */}
      <ComparableProductTitleRow {...props} />
      {/*  */}
      <div className="flex w-full divide-x-1.5 divide-black">
        <div className="w-7/12 divide-y-1.5 divide-black">
          <ComparableProductBuyBox product={props.product} />
        </div>
        <div className="w-5/12">
          <ComparableProductImages product={props.product} />
        </div>
      </div>
      {/*  */}
      <div className="flex w-full divide-x-1.5 divide-black">
        <div className="w-4/12">
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
        <div className="flex w-5/12">
          <ComparableProductLabelInfo label={flatLabels[labelSpotlight]} />
        </div>
      </div>
      <div className=""></div>
    </div>
  );
};

export default ComparableProduct2;

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}
