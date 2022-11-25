import { ISource } from '@root/services/sources.service';
import React from 'react';
import CopyIdButton from '../copy-id-button';
import ActivationSwitch from '../activation-switch';
import ScreenSectionCell from '../screen/screen-section-cell';
import ScreenSectionRow from '../screen/screen-section-row';
import ViewSourceRunsCell from './view-source-runs-cell';

interface Props {
  providerKey: string;
  source: ISource;
  index: number;
}

const SourcesListRow: React.FC<Props> = ({ providerKey, source, index }) => {
  return (
    <ScreenSectionRow>
      <ScreenSectionCell styles="w-3/12 flex flex-col justify-evenly">
        <h2 className="font-bold">{providerKey}</h2>
        <span className="">{source.description}</span>
      </ScreenSectionCell>
      <ScreenSectionCell styles="flex w-7/12 flex-col space-y-1.5">
        <div className="flex">
          <span className="mr-1">{source.identifier}</span>
          <CopyIdButton index={index} id={source.id} />
        </div>
        <div className="flex w-full space-x-4">
          <div className="flex w-1/3 items-start">
            <ActivationSwitch active={source.active} id={source.id} />
          </div>
          <div>STATUS: {source.status}</div>
        </div>
      </ScreenSectionCell>
      <ViewSourceRunsCell sourceId={source.id} identifier={source.identifier} />
    </ScreenSectionRow>
  );
};

export default SourcesListRow;
