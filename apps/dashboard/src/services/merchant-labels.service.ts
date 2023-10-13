import {
  ScreenDataAction,
  IScreenData,
} from '@root/context-providers/screen-data.provider';
import { IFilters } from '@root/context-providers/filters.provider';
import axios from 'axios';
import { IScreenControl } from './shared/screen-control.interface';
import { IMerchantLabel, PageRequest, PageResponse } from 'gmc-types';

const getOne = async (id): Promise<IMerchantLabel> => {
  const res = await axios.get<IMerchantLabel>(`/merchant-labels/${id}`);
  return res.data;
};

const getAll = async (
  pageRequest?: PageRequest
): Promise<PageResponse<IMerchantLabel>> => {
  const res = await axios.get<PageResponse<IMerchantLabel>>(
    '/merchant-labels',
    {
      params: pageRequest,
    }
  );
  return res.data;
};

const find = async (
  filters: IFilters,
  pageRequest?: PageRequest
): Promise<PageResponse<IMerchantLabel>> => {
  const res = await axios.post<PageResponse<IMerchantLabel>>(
    '/merchant-labels/find',
    extractMerchantLabelFilters(filters),
    {
      params: pageRequest,
    }
  );
  return res.data;
};

const update = async (id: string, updates: Partial<IMerchantLabel>) => {
  const res = await axios.put<IMerchantLabel>(
    `/merchant-labels/${id}`,
    updates
  );
  return res.data;
};

const assignGmcLabel = async (
  merchantLabelId: string,
  gmcLabelId: string
): Promise<IMerchantLabel> => {
  const res = await axios.post<IMerchantLabel>(
    `/merchant-labels/${merchantLabelId}/assign`,
    {},
    {
      params: {
        gmcLabelId,
      },
    }
  );
  return res.data;
};

const extractMerchantLabelFilters = (
  filters: IFilters
): Partial<IMerchantLabel> => ({
  ...(filters.merchantId && { merchantId: filters.merchantId }),
  ...(filters.merchantLabelCode && {
    merchantLabelCode: filters.merchantLabelCode,
  }),
  ...(filters.gmcLabelId && { gmcLabelId: filters.gmcLabelId }),
  ...(filters.labelUnassigned && { unassigned: true }),
});

const labelsScreenControl: IScreenControl = {
  pathname: '/mappings/merchant-labels',
  title: 'Map Labels',
  readScreenMeta(data) {
    return data.merchantLabelsMeta;
  },
  async refreshData(
    filters: IFilters,
    data: IScreenData
  ): Promise<ScreenDataAction> {
    return {
      type: 'SCREEN_REFRESH_MERCHANT_LABELS',
      value: await find(filters, data.merchantLabelsMeta),
    };
  },
  async changePage(
    page: PageRequest,
    filters: IFilters
  ): Promise<ScreenDataAction> {
    return {
      type: 'SCREEN_REFRESH_MERCHANT_LABELS',
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
      type: 'SCREEN_REFRESH_MERCHANT_LABELS',
      value: await find(filters, {
        ...data.merchantLabelsMeta,
        sort,
        direction,
      }),
    };
  },
};

const merchantLabelsService = {
  getOne,
  getAll,
  find,
  update,
  assignGmcLabel,
  labelsScreenControl,
};
export default merchantLabelsService;
