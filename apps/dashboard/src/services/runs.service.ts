import {
  IScreenData,
  ScreenDataAction,
} from '@root/context-providers/screen-data.provider';
import { IFilters } from '@root/context-providers/filters.provider';
import axios from 'axios';
import { PageRequest } from './shared/page-request.interface';
import { PageResponse } from './shared/page-response.interface';
import { IScreenControl } from './shared/screen-control.interface';

export interface IRun {
  id: string;
  runAt: Date;
  runTime: number;
  sourceDate: Date;
  sourceId: string;
  foundCount: number;
  ownedCount: number;
  createdCount: number;
  adoptedCount: number;
  pendingCount: number;
  foreignCount: number;
  staleCount: number;
  keepAliveSignalCount: number;
  refreshSignalCount: number;
  failureCount: number;
  errorMessage: string;
  source: {
    providerId?: string;
    identifier?: string;
    description?: string;
  };
}

const find = async (
  filters: IFilters,
  pageRequest?: PageRequest
): Promise<PageResponse<IRun>> => {
  const res = await axios.post<PageResponse<IRun>>(
    '/runs/find',
    extractRunFilters(filters),
    {
      params: pageRequest,
    }
  );
  return res.data;
};

function extractRunFilters(filters: IFilters): Partial<IRun> {
  return {
    source: {
      ...(filters.channelId && {
        identifier: filters.channelId,
      }),
      ...(filters.providerId && {
        providerId: filters.providerId,
      }),
    },
  };
}

const runsScreenControl: IScreenControl = {
  pathname: '/integration/runs',
  title: 'Runs',
  readScreenMeta(data) {
    return data.runsMeta;
  },
  async refreshData(
    filters: IFilters,
    data: IScreenData
  ): Promise<ScreenDataAction> {
    return {
      type: 'SCREEN_REFRESH_RUNS',
      value: await find(filters, data.runsMeta),
    };
  },
  async changePage(
    page: PageRequest,
    filters: IFilters
  ): Promise<ScreenDataAction> {
    return {
      type: 'SCREEN_REFRESH_RUNS',
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
      type: 'SCREEN_REFRESH_RUNS',
      value: await find(filters, {
        ...data.runsMeta,
        sort,
        direction,
      }),
    };
  },
};

const runsService = {
  find,
  runsScreenControl,
};
export default runsService;
