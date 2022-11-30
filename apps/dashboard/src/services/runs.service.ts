import { IFilters } from '@root/context-providers/filters.provider';
import axios from 'axios';
import { PageRequest } from './shared/page-request.interface';
import { PageResponse } from './shared/page-response.interface';

export interface IRun {
  id: string;
  sourceId: string;
  foundCount: number;
  ownedCount: number;
  createdCount: number;
  adoptedCount: number;
  staleCount: number;
  keepAliveSignalCount: number;
  refreshSignalCount: number;
  failureCount: number;
  startedAt: Date;
  completedAt: Date;
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
    '/source-runs/search',
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
    ...(filters.sourceId && { sourceId: filters.sourceId }),
    ...(filters.sourceIdentifier && {
      source: {
        identifier: filters.sourceIdentifier,
      },
    }),
    ...(filters.providerId && {
      source: {
        providerId: filters.providerId,
      },
    }),
  };
}
