import {
  useScreenData,
  useScreenDataDispatch,
} from '@root/context-providers/screen-data.provider';
import { gmcLabelsService } from '@root/services/gmc-labels.service';
import React from 'react';
import LoadingWheel from '../shared/loading-wheel';
import GmcLabelColumn from './gmc-labels-screen/gmc-label-column';
import ScreenSection from './shared/screen-section';

const GmcLabelsScreen: React.FC = () => {
  const data = useScreenData();
  const dispach = useScreenDataDispatch();

  const handleSelectLabel = (labelId: string) => {
    dispach({
      type: 'SCREEN_UPDATE_GMC_LABELS',
      value: {
        ...data.gmcLabelScreenData,
        selectedLabelId: labelId,
        selectedSubLabel1Id: null,
        subLabels1: null,
        subLabels2: null,
      },
    });
    gmcLabelsService.getOne(labelId).then((label) => {
      dispach({
        type: 'SCREEN_UPDATE_GMC_LABELS',
        value: {
          ...data.gmcLabelScreenData,
          selectedLabelId: labelId,
          selectedSubLabel1Id: null,
          subLabels1: label.children.sort((a, b) =>
            a.name.localeCompare(b.name)
          ),
          subLabels2: null,
        },
      });
    });
  };

  const handleSelectSubLabel1 = (subLabelId: string) => {
    dispach({
      type: 'SCREEN_UPDATE_GMC_LABELS',
      value: {
        ...data.gmcLabelScreenData,
        selectedSubLabel1Id: subLabelId,
        subLabels2: null,
      },
    });
    gmcLabelsService.getOne(subLabelId).then((label) => {
      dispach({
        type: 'SCREEN_UPDATE_GMC_LABELS',
        value: {
          ...data.gmcLabelScreenData,
          selectedSubLabel1Id: subLabelId,
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
              labels={data.gmcLabelScreenData.labels}
              selectedId={data.gmcLabelScreenData.selectedLabelId}
              onSelectLabel={handleSelectLabel}
            />
          ) : (
            <div className="flex h-screen w-full items-center justify-center">
              <LoadingWheel size="h-[64px]" />
            </div>
          )}
        </div>
        <div className="w-1/3">
          {data.gmcLabelScreenData.selectedLabelId &&
            (data.gmcLabelScreenData.subLabels1 ? (
              <GmcLabelColumn
                parentId={data.gmcLabelScreenData.selectedLabelId}
                labels={data.gmcLabelScreenData.subLabels1}
                selectedId={data.gmcLabelScreenData.selectedSubLabel1Id}
                onSelectLabel={handleSelectSubLabel1}
              />
            ) : (
              <div className="flex h-screen w-full items-center justify-center">
                <LoadingWheel size="h-[64px]" />
              </div>
            ))}
        </div>
        <div className="w-1/3">
          {data.gmcLabelScreenData.selectedSubLabel1Id &&
            (data.gmcLabelScreenData.subLabels2 ? (
              <GmcLabelColumn
                parentId={data.gmcLabelScreenData.selectedSubLabel1Id}
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
