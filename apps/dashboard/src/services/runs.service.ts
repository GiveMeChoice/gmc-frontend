import { IData, DataAction } from '@root/context-providers/data.provider';
import { IFilters } from '@root/context-providers/filters.provider';
import axios from 'axios';
import { IScreenControl } from './screen-controls.service';
import { PageRequest } from './shared/page-request.interface';
import { PageResponse } from './shared/page-response.interface';

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
    '/source-runs/find',
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
      ...(filters.sourceIdentifier && {
        identifier: filters.sourceIdentifier,
      }),
      ...(filters.providerId && {
        providerId: filters.providerId,
      }),
    },
  };
}

const runsScreenControl: IScreenControl = {
  pathname: '/product-sources/runs',
  title: 'Runs',
  readScreenMeta(data) {
    return data.runsMeta;
  },
  async refreshData(filters: IFilters, data: IData): Promise<DataAction> {
    return {
      type: 'REFRESH_RUNS',
      value: await find(filters, data.runsMeta),
    };
  },
  async refreshPage(page: PageRequest, filters: IFilters): Promise<DataAction> {
    return {
      type: 'REFRESH_RUNS',
      value: await find(filters, page),
    };
  },
  async refreshSort(
    sort: string,
    direction: string,
    filters: IFilters,
    data: IData
  ): Promise<DataAction> {
    return {
      type: 'REFRESH_RUNS',
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
