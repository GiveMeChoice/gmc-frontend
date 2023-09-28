/* eslint-disable @next/next/no-img-element */
import ConfirmableButton from '@root/components/shared/confirmable-button';
import LoadingWheel from '@root/components/shared/loading-wheel';
import { useScreenData } from '@root/context-providers/screen-data.provider';
import {
  IGmcCategory,
  gmcCategoriesService,
} from '@root/services/gmc-categories.service';
import { IMerchantCategory } from '@root/services/merchant-categories.service';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
const CancelIcon = require('../../../assets/images/cancel-icon.svg');
const LeftArrowIcon = require('../../../assets/images/left-arrow.svg');
const RightArrowIcon = require('../../../assets/images/right-arrow.svg');
const SaveIcon = require('../../../assets/images/save-icon2.svg');
const CheckIcon = require('../../../assets/images/check-icon.svg');

interface Props {
  merchantCategory: IMerchantCategory;
  onCancel: () => void;
  onAssign: (
    merchantCategoryId: string,
    gmcCategoryId: string
  ) => Promise<void>;
}

const AssignCategoriesDialog: React.FC<Props> = ({
  merchantCategory,
  onAssign,
  onCancel,
}) => {
  const data = useScreenData();
  const [gmcCategory, setGmcCategory] = useState<IGmcCategory>(null);
  const [gmcSubCategory, setGmcSubCategory] = useState<IGmcCategory>(null);
  const [gmcSubCategory2, setGmcSubCategory2] = useState<IGmcCategory>(null);
  const [categoryList, setCategoryList] = useState<IGmcCategory[]>(null);

  useEffect(() => {
    setCategoryList(data.gmcCategoryScreenData.categories);
  }, []);

  const handleBack = () => {
    setCategoryList(null);
    if (gmcSubCategory2) {
      setGmcSubCategory2(null);
      gmcCategoriesService.getOne(gmcSubCategory.id).then((cat) => {
        setCategoryList(cat.children);
      });
    } else if (gmcSubCategory) {
      setGmcSubCategory(null);
      gmcCategoriesService.getOne(gmcCategory.id).then((cat) => {
        setCategoryList(cat.children);
      });
    } else {
      setGmcCategory(null);
      setCategoryList(data.gmcCategoryScreenData.categories);
    }
  };

  const handleSelectCategory = (selectedCategory: IGmcCategory) => {
    setCategoryList(null);
    if (gmcSubCategory) {
      setGmcSubCategory2(selectedCategory);
    } else if (gmcCategory) {
      setGmcSubCategory(selectedCategory);
      gmcCategoriesService.getOne(selectedCategory.id).then((cat) => {
        setCategoryList(cat.children);
      });
    } else {
      setGmcCategory(selectedCategory);
      gmcCategoriesService.getOne(selectedCategory.id).then((cat) => {
        setCategoryList(cat.children);
      });
    }
  };

  return (
    <div className="flex h-full w-full flex-col divide-y-1.5 divide-zinc-400">
      <div className="flex h-20 w-full flex-col items-center space-y-1.5 bg-white py-2">
        <span className="font-bold">{merchantCategory.merchant.name}</span>
        <span className="text-sm italic">{merchantCategory.name}</span>
      </div>
      <div className="flex h-20 w-full flex-col items-center space-y-1.5 bg-white py-2">
        <span className="font-bold">Give Me Choice</span>
        <span className="text-sm italic">
          {gmcCategory
            ? gmcSubCategory
              ? gmcSubCategory2
                ? `${gmcCategory.name} > ${gmcSubCategory.name} > ${gmcSubCategory2.name}`
                : `${gmcCategory.name} > ${gmcSubCategory.name} > ...`
              : `${gmcCategory.name} > ...`
            : '...'}
        </span>
      </div>
      <div className="flex h-16 w-full divide-x-1.5 divide-zinc-400">
        <button
          className={cn(
            'flex h-full flex-col items-center justify-center space-y-2 hover:bg-primary active:bg-primary-light-10',
            {
              'w-full': !gmcCategory,
              'w-1/2': gmcCategory,
            }
          )}
          onClick={onCancel}
        >
          {<img className="h-[44%]" src={CancelIcon} alt="cancel" />}
        </button>
        <button
          className={cn(
            'flex h-full w-1/2 flex-col items-center justify-center space-y-2 hover:bg-primary active:bg-primary-light-10',
            {
              hidden: !gmcCategory,
            }
          )}
          onClick={handleBack}
        >
          <img className="h-[65%]" src={LeftArrowIcon} alt="cancel" />
        </button>
      </div>
      {gmcSubCategory2 ? (
        <div className="flex h-32 w-full items-center justify-center p-4">
          <ConfirmableButton
            important
            title={
              <div className="m-2 flex h-full w-full flex-col items-center justify-center">
                <img className="h-[40%]" src={SaveIcon} alt="save" />
                <span className="text-sm">ASSIGN CATEGORY</span>
              </div>
            }
            onConfirm={() => onAssign(merchantCategory.id, gmcSubCategory2.id)}
          />
        </div>
      ) : categoryList ? (
        categoryList.map((category) => (
          <div className="flex h-16 w-full divide-x-1.5 divide-zinc-400">
            <div className="flex w-3/4 items-center justify-center bg-white text-lg">
              {category.name}
            </div>
            <div
              className={cn(
                'flex w-1/4 cursor-pointer items-center justify-center hover:bg-primary active:bg-primary-light-10',
                {}
              )}
              onClick={() => handleSelectCategory(category)}
            >
              {gmcSubCategory ? (
                <img className="h-1/2" src={CheckIcon} alt="check" />
              ) : (
                <img className="h-1/2" src={RightArrowIcon} alt="arrow" />
              )}
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

export default AssignCategoriesDialog;
