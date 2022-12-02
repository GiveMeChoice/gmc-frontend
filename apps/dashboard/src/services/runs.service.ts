import { IFilters } from '@root/context-providers/filters.provider';
import axios from 'axios';
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

const search = async (
  filters: IFilters,
  pageRequest?: PageRequest
): Promise<PageResponse<IRun>> => {
  const res = await axios.post<PageResponse<IRun>>(
    '/product-runs/search',
    extractRunFilters(filters),
    {
      params: pageRequest,
    }
  );
  return res.data;
};

const runsService = {
  search,
};

export default runsService;

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
