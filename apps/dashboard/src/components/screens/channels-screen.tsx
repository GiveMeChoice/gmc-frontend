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

const ChannelsScreen: React.FC = () => {
  const { channels: sources, channelsMeta: sourcesMeta } = useScreenData();
  const dispatch = useScreenDataDispatch();
  const { activeFilters } = useFilters();
  const { readProviderKey } = useMasterData();
  const [loading, setLoading] = useState(false);

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
          name: 'description',
          title: 'Description',
        },
        {
          name: 'status',
          title: 'Status',
        },
        // {
        //   name: 'retryCount',
        //   title: 'Retries',
        // },
        // {
        //   name: 'lastRunAt',
        //   title: 'Last Run Date',
        // },
        // {
        //   name: 'ownedCount',
        //   title: 'Owned',
        // },
      ]}
      meta={sourcesMeta}
    >
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
          <span className="m-3">
            {loading ? 'Loading...' : 'No Sources Found'}
          </span>
        </ScreenSectionRow>
      )}
    </ScreenSection>
  );
};

export default ChannelsScreen;
