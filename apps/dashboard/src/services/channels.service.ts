import {
  ScreenDataAction,
  IScreenData,
} from '@root/context-providers/screen-data.provider';
import { IFilters } from '@root/context-providers/filters.provider';
import axios from 'axios';
import { IMerchant } from './merchants.service';
import { IProvider } from './providers.service';
import { IRun } from './runs.service';
import { PageRequest } from './shared/page-request.interface';
import { PageResponse } from './shared/page-response.interface';
import { IScreenControl } from './shared/screen-control.interface';

export interface IChannel {
  id: string;
  description: string; //updateable
  active: boolean; //updateable
  runIntervalHours: number; //updateable
  expirationHours: number; //updateable
  retryLimit: number; //updateable
  etlCode1: string; //updateable
  etlCode2: string; //updateable
  etlCode3: string; //updateable
  etlCode4: string; //updateable
  etlCode5: string; //updateable
  retryCount: number;
  status: string;
  lastRunAt: Date;
  merchantId: string;
  providerId: string;
  merchant?: Partial<IMerchant>;
  provider?: Partial<IProvider>;
  // calculated fields
  runCount: number;
  productCount: number;
}

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
  channelsScreenControl,
};
export default channelsService;
