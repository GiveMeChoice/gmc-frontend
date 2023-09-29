/* eslint-disable @next/next/no-img-element */
import { useScreenData } from '@root/context-providers/screen-data.provider';
import { IGmcLabel, gmcLabelsService } from '@root/services/gmc-labels.service';
import { IMerchantLabel } from '@root/services/merchant-labels.service';
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import ConfirmableButton from '@root/components/shared/confirmable-button';
import LoadingWheel from '@root/components/shared/loading-wheel';
import { IMerchantBrand } from '@root/services/merchant-brands.service';
import { IGmcBrand, gmcBrandsService } from '@root/services/gmc-brands.service';
const CancelIcon = require('../../../assets/images/cancel-icon.svg');
const LeftArrowIcon = require('../../../assets/images/left-arrow.svg');
const RightArrowIcon = require('../../../assets/images/right-arrow.svg');
const SaveIcon = require('../../../assets/images/save-icon2.svg');
const CheckIcon = require('../../../assets/images/check-icon.svg');

interface Props {
  merchantBrand: IMerchantBrand;
  onCancel: () => void;
  onAssign: (merchantBrandId: string, gmcLabelId: string) => Promise<void>;
}

const AssignBrandsDialog: React.FC<Props> = ({
  merchantBrand: merchantLabel,
  onAssign,
  onCancel,
}) => {
  const [brandList, setBrandList] = useState<IGmcBrand[]>(null);
  const [gmcBrand, setGmcBrand] = useState<IGmcBrand>(null);

  useEffect(() => {
    gmcBrandsService
      .getAll()
      .then((brands) => {
        setBrandList(brands);
      })
      .finally(() => {});
  }, []);

  const handleBack = () => {
    setGmcBrand(null);
  };

  const handleSelectBrand = (selectedBrand: IGmcBrand) => {
    setGmcBrand(selectedBrand);
  };

  return (
    <div className="flex h-full w-full flex-col divide-y-1.5 divide-zinc-400">
      <div className="flex h-20 w-full flex-col items-center space-y-1.5 bg-white py-2">
        <span className="font-bold">{merchantLabel.merchant.name}</span>
        <span className="text-sm italic">{merchantLabel.name}</span>
      </div>
      <div className="flex h-20 w-full flex-col items-center space-y-1.5 bg-white py-2">
        <span className="font-bold">Give Me Choice</span>
        <span className="text-sm italic">
          {gmcBrand ? gmcBrand.name : '...'}
        </span>
      </div>
      <div className="flex h-16 w-full divide-x-1.5 divide-zinc-400">
        <button
          className={cn(
            'flex h-full w-full flex-col items-center justify-center space-y-2 hover:bg-gmc-sunset-light-50 active:bg-gmc-sunset-light-30',
            {}
          )}
          onClick={onCancel}
        >
          {<img className="h-[44%]" src={CancelIcon} alt="cancel" />}
        </button>
        <button
          className={cn(
            'flex h-full w-1/2 flex-col items-center justify-center space-y-2 hover:bg-primary active:bg-primary-light-10',
            {
              hidden: !gmcBrand,
            }
          )}
          onClick={handleBack}
        >
          <img className="h-[65%]" src={LeftArrowIcon} alt="cancel" />
        </button>
      </div>
      {gmcBrand ? (
        <div className="flex h-32 w-full items-center justify-center p-4">
          <ConfirmableButton
            important
            title={
              <div className="m-2 flex h-full w-full flex-col items-center justify-center">
                <img className="h-[40%]" src={SaveIcon} alt="save" />
                <span className="text-sm">ASSIGN BRAND</span>
              </div>
            }
            onConfirm={() => onAssign(merchantLabel.id, gmcBrand.id)}
          />
        </div>
      ) : brandList ? (
        brandList.map((brand) => (
          <div className="flex h-16 w-full divide-x-1.5 divide-zinc-400">
            <div className="flex w-3/4 items-center justify-center bg-white text-lg">
              {brand.name}
            </div>
            <div
              className={cn(
                'flex w-1/4 cursor-pointer items-center justify-center hover:bg-primary active:bg-primary-light-10',
                {}
              )}
              onClick={() => handleSelectBrand(brand)}
            >
              <img className="h-1/2" src={RightArrowIcon} alt="arrow" />
            </div>
          </div>
        ))
      ) : (
        <div className="flex w-full justify-center py-12">
          <LoadingWheel size="w-1/5" />
        </div>
      )}
      <div />
    </div>
  );
};

export default AssignBrandsDialog;
