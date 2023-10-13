import {
  useScreenData,
  useScreenDataDispatch,
} from '@root/context-providers/screen-data.provider';
import React from 'react';
import LoadingWheel from '../shared/loading-wheel';
import GmcLabelColumn from './gmc-labels-screen/gmc-label-column';
import ScreenSection from './shared/screen-section';
import { gmcLabelsService } from '@root/services/gmc-labels.service';
import { IGmcLabel } from 'gmc-types';

const GmcLabelsScreen: React.FC = () => {
  const data = useScreenData();
  const dispach = useScreenDataDispatch();

  const handleSelectLabel = (label: IGmcLabel) => {
    dispach({
      type: 'SCREEN_UPDATE_GMC_LABELS',
      value: {
        ...data.gmcLabelScreenData,
        selectedLabel: label,
        selectedSubLabel1: null,
        subLabels1: null,
        subLabels2: null,
      },
    });
    gmcLabelsService.getOne(label.id).then((label) => {
      dispach({
        type: 'SCREEN_UPDATE_GMC_LABELS',
        value: {
          ...data.gmcLabelScreenData,
          selectedLabel: label,
          selectedSubLabel1: null,
          subLabels1: label.children.sort((a, b) =>
            a.name.localeCompare(b.name)
          ),
          subLabels2: null,
        },
      });
    });
  };

  const handleSelectSubLabel1 = (subLabel: IGmcLabel) => {
    dispach({
      type: 'SCREEN_UPDATE_GMC_LABELS',
      value: {
        ...data.gmcLabelScreenData,
        selectedSubLabel1: subLabel,
        subLabels2: null,
      },
    });
    gmcLabelsService.getOne(subLabel.id).then((label) => {
      dispach({
        type: 'SCREEN_UPDATE_GMC_LABELS',
        value: {
          ...data.gmcLabelScreenData,
          selectedSubLabel1: subLabel,
          subLabels2: label.children.sort((a, b) =>
            a.name.localeCompare(b.name)
          ),
        },
      });
    });
  };

  return (
    <ScreenSection title={'GMC Labels'} sortFields={[]} meta={null}>
      <div className="flex h-full w-full divide-x-1.5 divide-zinc-900">
        <div className="flex w-1/3 justify-center">
          {data.gmcLabelScreenData.labels ? (
            <GmcLabelColumn
              selected={data.gmcLabelScreenData.selectedLabel}
              labels={data.gmcLabelScreenData.labels}
              onSelectLabel={handleSelectLabel}
            />
          ) : (
            <div className="flex h-screen w-full items-center justify-center">
              <LoadingWheel size="h-[64px]" />
            </div>
          )}
        </div>
        <div className="w-1/3">
          {data.gmcLabelScreenData.selectedLabel &&
            (data.gmcLabelScreenData.subLabels1 ? (
              <GmcLabelColumn
                parent={data.gmcLabelScreenData.selectedLabel}
                labels={data.gmcLabelScreenData.subLabels1}
                selected={data.gmcLabelScreenData.selectedSubLabel1}
                onSelectLabel={handleSelectSubLabel1}
              />
            ) : (
              <div className="flex h-screen w-full items-center justify-center">
                <LoadingWheel size="h-[64px]" />
              </div>
            ))}
        </div>
        <div className="w-1/3">
          {data.gmcLabelScreenData.selectedSubLabel1 &&
            (data.gmcLabelScreenData.subLabels2 ? (
              <GmcLabelColumn
                superParent={data.gmcLabelScreenData.selectedLabel}
                parent={data.gmcLabelScreenData.selectedSubLabel1}
                labels={data.gmcLabelScreenData.subLabels2}
              />
            ) : (
              <div className="flex h-screen w-full items-center justify-center">
                <LoadingWheel size="h-[64px]" />
              </div>
            ))}
        </div>
      </div>
    </ScreenSection>
  );
};

export default GmcLabelsScreen;
