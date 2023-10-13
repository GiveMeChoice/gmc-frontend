import { useFilters } from '@root/context-providers/filters.provider';
import { useMasterData } from '@root/context-providers/master-data.provider';
import {
  useScreenData,
  useScreenDataDispatch,
} from '@root/context-providers/screen-data.provider';
import channelsService from '@root/services/channels.service';
import React, { useEffect, useState } from 'react';
import ChannelListRow from './channels-screen/channel-list-row';
import ScreenSection from './shared/screen-section';
import ScreenSectionRow from './shared/screen-section-row';
import CreateChannelDialog from './channels-screen/create-channel-dialog';

const ChannelsScreen: React.FC = () => {
  const { channels: sources, channelsMeta: sourcesMeta } = useScreenData();
  const dispatch = useScreenDataDispatch();
  const { activeFilters } = useFilters();
  const { readProviderKey } = useMasterData();
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (!sources.length) {
      setLoading(true);
      channelsService
        .find(activeFilters, sourcesMeta)
        .then((sources) => {
          dispatch({ type: 'SCREEN_REFRESH_CHANNELS', value: sources });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  const handleCreateRequest = () => {
    setCreating(true);
  };

  return (
    <ScreenSection
      title={'Channel List'}
      sortFields={[
        {
          name: 'merchantId',
          title: 'Merchant',
        },
        {
          name: 'providerId',
          title: 'Provider',
        },
        {
          name: 'name',
          title: 'Name',
        },
        {
          name: 'status',
          title: 'Status',
        },
      ]}
      meta={sourcesMeta}
      onCreateRequest={handleCreateRequest}
    >
      {creating && <CreateChannelDialog onClose={() => setCreating(false)} />}
      {sources.length ? (
        sources.map((s, i) => (
          <ChannelListRow
            key={i}
            channel={s}
            providerKey={readProviderKey(s.providerId)}
            index={i}
          />
        ))
      ) : (
        <ScreenSectionRow>
          <span className="m-3 ml-6 text-sm italic">
            {loading ? 'Loading...' : 'No Sources Found'}
          </span>
        </ScreenSectionRow>
      )}
    </ScreenSection>
  );
};

export default ChannelsScreen;
