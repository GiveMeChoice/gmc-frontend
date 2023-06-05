import {
  ScreenDataAction,
  IScreenData,
} from '@root/context-providers/screen-data.provider';
import { IFilters } from '@root/context-providers/filters.provider';
import axios from 'axios';
import { PageRequest } from './shared/page-request.interface';
import { PageResponse } from './shared/page-response.interface';
import { IScreenControl } from './shared/screen-control.interface';
import { IGmcLabel } from './gmc-labels.service';
import { IMerchant } from './merchants.service';

export interface IMerchantLabel {
  id: string;
  merchantId: string;
  merchantLabelCode: string;
  name: string;
  description: string;
  logo: string;
  url: string;
  createdAt: Date;
  gmcLabelId?: string;
  gmcLabel?: Partial<IGmcLabel>;
  merchant?: Partial<IMerchant>;
  // calculated fields
  productCount: number;
}

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

const extractMerchantLabelFilters = (
  filters: IFilters
): Partial<IMerchantLabel> => ({
  ...(filters.providerId && { merchantId: filters.providerId }),
  ...(filters.labelGroupId && { groupId: filters.labelGroupId }),
});

const labelsScreenControl: IScreenControl = {
  pathname: '/mappings/merchant-labels',
  title: 'Labels',
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
  labelsScreenControl,
};
export default merchantLabelsService;
