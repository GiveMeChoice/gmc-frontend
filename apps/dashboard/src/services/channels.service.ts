import { IFilters } from '@root/context-providers/filters.provider';
import {
  IScreenData,
  ScreenDataAction,
} from '@root/context-providers/screen-data.provider';
import axios from 'axios';
import { IScreenControl } from './shared/screen-control.interface';
import { IChannel, PageRequest, PageResponse } from 'gmc-types';

const find = async (
  filters: IFilters,
  pageRequest?: PageRequest
): Promise<PageResponse<IChannel>> => {
  const res = await axios.post<PageResponse<IChannel>>(
    '/channels/find',
    extractChannelFilters(filters),
    {
      params: pageRequest,
    }
  );
  return res.data;
};

const getAll = async (
  pageRequest?: PageRequest
): Promise<PageResponse<IChannel>> => {
  const res = await axios.get<PageResponse<IChannel>>('/channels', {
    params: pageRequest,
  });
  return res.data;
};

const getOne = async (id: string): Promise<IChannel> => {
  const res = await axios.get<IChannel>(`/channels/${id}`);
  return res.data;
};

const update = async (
  id: string,
  updates: Partial<IChannel>
): Promise<IChannel> => {
  const res = await axios.put<IChannel>(`/channels/${id}`, updates);
  return res.data;
};

const create = async (
  merchantKey: string,
  providerKey: string,
  channel: Partial<IChannel>
): Promise<IChannel> => {
  const res = await axios.post<IChannel>('/channels', {
    merchantKey,
    providerKey,
    ...channel,
  });
  return res.data;
};

const deleteOne = async (id: string) => {
  await axios.delete(`/channels/${id}`);
};

const extractChannelFilters = (filters: IFilters): Partial<IChannel> => ({
  ...(filters.merchantId && { merchant: { id: filters.merchantId } }),
  ...(filters.providerId && { provider: { id: filters.providerId } }),
  ...(filters.channelActivation && {
    active: filters.channelActivation === 'active',
  }),
  ...(filters.channelId && {
    identifier: filters.channelId,
  }),
  ...(filters.channelStatus && {
    status: filters.channelStatus,
  }),
});

const channelsScreenControl: IScreenControl = {
  pathname: '/integration/channels',
  title: 'Channels',
  readScreenMeta(data) {
    return data.channelsMeta;
  },
  async refreshData(
    filters: IFilters,
    data: IScreenData
  ): Promise<ScreenDataAction> {
    return {
      type: 'SCREEN_REFRESH_CHANNELS',
      value: await find(filters, data.channelsMeta),
    };
  },
  async changePage(
    page: PageRequest,
    filters: IFilters
  ): Promise<ScreenDataAction> {
    return {
      type: 'SCREEN_REFRESH_CHANNELS',
      value: await find(filters, page),
    };
  },
  async sortData(
    sort: string,
    direction: string,
    filters: IFilters,
    data: IScreenData
  ): Promise<ScreenDataAction> {
    return {
      type: 'SCREEN_REFRESH_CHANNELS',
      value: await find(filters, {
        ...data.channelsMeta,
        sort,
        direction,
      }),
    };
  },
};

const channelsService = {
  find,
  update,
  getOne,
  getAll,
  deleteOne,
  create,
  channelsScreenControl,
};
export default channelsService;
