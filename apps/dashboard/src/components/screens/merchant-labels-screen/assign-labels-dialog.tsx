/* eslint-disable @next/next/no-img-element */
import { useScreenData } from '@root/context-providers/screen-data.provider';
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import ConfirmableButton from '@root/components/shared/confirmable-button';
import LoadingWheel from '@root/components/shared/loading-wheel';
import MerchantLabelChip from './merchant-label-chip';
import { gmcLabelsService } from '@root/services/gmc-labels.service';
import { IMerchantLabel, IGmcLabel } from 'gmc-types';
const CancelIcon = require('../../../assets/images/cancel-icon.svg');
const LeftArrowIcon = require('../../../assets/images/left-arrow.svg');
const RightArrowIcon = require('../../../assets/images/right-arrow.svg');
const SaveIcon = require('../../../assets/images/save-icon2.svg');
const CheckIcon = require('../../../assets/images/check-icon.svg');

interface Props {
  merchantLabel: IMerchantLabel;
  onCancel: () => void;
  onAssign: (merchantLabelId: string, gmcLabelId: string) => Promise<void>;
}

const AssignLabelsDialog: React.FC<Props> = ({
  merchantLabel,
  onAssign,
  onCancel,
}) => {
  const data = useScreenData();
  const [gmcLabel, setGmcLabel] = useState<IGmcLabel>(null);
  const [gmcSubLabel, setGmcSubLabel] = useState<IGmcLabel>(null);
  const [gmcSubLabel2, setGmcSubLabel2] = useState<IGmcLabel>(null);
  const [labelList, setLabelList] = useState<IGmcLabel[]>(null);

  useEffect(() => {
    setLabelList(data.gmcLabelScreenData.labels);
  }, []);

  const handleBack = () => {
    setLabelList(null);
    if (gmcSubLabel2) {
      setGmcSubLabel2(null);
      gmcLabelsService.getOne(gmcSubLabel.id).then((cat) => {
        setLabelList(cat.children);
      });
    } else if (gmcSubLabel) {
      setGmcSubLabel(null);
      gmcLabelsService.getOne(gmcLabel.id).then((cat) => {
        setLabelList(cat.children);
      });
    } else {
      setGmcLabel(null);
      setLabelList(data.gmcLabelScreenData.labels);
    }
  };

  const handleSelectLabel = (selectedLabel: IGmcLabel) => {
    setLabelList(null);
    if (gmcSubLabel) {
      setGmcSubLabel2(selectedLabel);
    } else if (gmcLabel) {
      setGmcSubLabel(selectedLabel);
      gmcLabelsService.getOne(selectedLabel.id).then((cat) => {
        setLabelList(cat.children);
      });
    } else {
      setGmcLabel(selectedLabel);
      gmcLabelsService.getOne(selectedLabel.id).then((cat) => {
        setLabelList(cat.children);
      });
    }
  };
  return (
    <div className="flex h-full w-full flex-col divide-y-1.5 divide-zinc-400 border-l border-zinc-400">
      <div className="flex h-fit w-full flex-col items-center space-y-2 bg-white py-3">
        <span className="font-bold">{merchantLabel.merchant.name}</span>
        <MerchantLabelChip merchantLabel={merchantLabel} />
        <span className="text-sm italic">{merchantLabel.description}</span>
      </div>
      <div className="flex h-fit w-full flex-col items-center space-y-2 bg-white py-3">
        <span className="font-bold">Give Me Choice</span>
        <span className="text-sm italic">
          {gmcLabel
            ? gmcSubLabel
              ? gmcSubLabel2
                ? `${gmcLabel.name} > ${gmcSubLabel.name} > ${gmcSubLabel2.name}`
                : `${gmcLabel.name} > ${gmcSubLabel.name} > ...`
              : `${gmcLabel.name} > ...`
            : '...'}
        </span>
      </div>
      <div className="flex h-16 w-full divide-x-1.5 divide-zinc-400">
        <button
          className={cn(
            'flex h-full flex-col items-center justify-center space-y-2 hover:bg-gmc-sunset-light-50 active:bg-gmc-sunset-light-30',
            {
              'w-full': !gmcLabel,
              'w-1/2': gmcLabel,
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
              hidden: !gmcLabel,
            }
          )}
          onClick={handleBack}
        >
          <img className="h-[65%]" src={LeftArrowIcon} alt="cancel" />
        </button>
      </div>
      {gmcSubLabel2 ? (
        <div className="flex h-32 w-full items-center justify-center p-4">
          <ConfirmableButton
            important
            title={
              <div className="m-2 flex h-full w-full flex-col items-center justify-center">
                <img className="h-[40%]" src={SaveIcon} alt="save" />
                <span className="text-sm">ASSIGN LABEL</span>
              </div>
            }
            onConfirm={() => onAssign(merchantLabel.id, gmcSubLabel2.id)}
          />
        </div>
      ) : labelList ? (
        labelList.map((label) => (
          <div className="flex h-16 w-full divide-x-1.5 divide-zinc-400">
            <div className="flex w-3/4 items-center justify-center bg-white text-lg">
              {label.name}
            </div>
            <div
              className={cn(
                'flex w-1/4 cursor-pointer items-center justify-center hover:bg-primary active:bg-primary-light-10',
                {}
              )}
              onClick={() => handleSelectLabel(label)}
            >
              {gmcSubLabel ? (
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

export default AssignLabelsDialog;
