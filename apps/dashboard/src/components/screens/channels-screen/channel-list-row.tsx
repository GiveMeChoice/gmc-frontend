import React, { useEffect } from 'react';
import ScreenSectionRow from '../shared/screen-section-row';
import ChannelHeader from './channel-header';
import EditableChannelFields from './editable-channel-fields';
import ChannelButtonPanel from './channel-button-panel';
import { IChannel } from 'gmc-types';

interface Props {
  providerKey: string;
  channel: IChannel;
  index: number;
}

const ChannelListRow: React.FC<Props> = ({ channel, index }) => {
  useEffect(() => {}, [channel]);
  return (
    <ScreenSectionRow key={index}>
      <div className="flex w-full divide-x divide-zinc-500">
        <div className="flex w-4/5 flex-col divide-y divide-zinc-500">
          <ChannelHeader channel={channel} />
          <EditableChannelFields channel={channel} />
        </div>
        <div className="flex w-1/5 flex-col items-center justify-center space-y-2.5 p-4">
          <ChannelButtonPanel channel={channel} />
        </div>
      </div>
    </ScreenSectionRow>
  );
};

export default ChannelListRow;
