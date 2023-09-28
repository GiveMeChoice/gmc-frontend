import { IMerchantBrand } from '@root/services/merchant-brands.service';
import { IMerchantCategory } from '@root/services/merchant-categories.service';
import { IJobStatus } from '@root/services/jobs.service';
import { IMerchantLabel } from '@root/services/merchant-labels.service';
import { IProduct } from '@root/services/products.service';
import { IProvider } from '@root/services/providers.service';
import { IRun } from '@root/services/runs.service';
import {
  PageMeta,
  PageResponse,
} from '@root/services/shared/page-response.interface';
import { IChannel } from '@root/services/channels.service';
import {
  createContext,
  Dispatch,
  FC,
  Reducer,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { IMerchant } from '@root/services/merchants.service';
import { IToast } from '@root/services/toast.service';
import {
  IGmcCategoryScreenData,
  gmcCategoriesService,
} from '@root/services/gmc-categories.service';

export interface IScreenData {
  loading: boolean;
  jobs: IJobStatus[];
  providers: IProvider[];
  providersMeta: PageMeta;
  channels: IChannel[];
  channelsMeta: PageMeta;
  runs: IRun[];
  runsMeta: PageMeta;
  products: IProduct[];
  productsMeta: PageMeta;
  previewProduct: IProduct | null;
  merchants: IMerchant[];
  merchantsMeta: PageMeta;
  merchantLabels: IMerchantLabel[];
  merchantLabelsMeta: PageMeta;
  merchantCategories: IMerchantCategory[];
  merchantCategoriesMeta: PageMeta;
  merchantBrands: IMerchantBrand[];
  merchantBrandsMeta: PageMeta;
  gmcCategoryScreenData: IGmcCategoryScreenData;
  toast?: IToast;
}

export type ScreenDataAction =
  | {
      type: 'SCREEN_START_LOADING';
    }
  | {
      type: 'SCREEN_END_LOADING';
    }
  | {
      type: 'OPEN_PRODUCT_PREVIEW';
      value: IProduct;
    }
  | {
      type: 'CLOSE_PRODUCT_PREVIEW';
    }
  | {
      type: 'SCREEN_REFRESH_JOBS';
      value: IJobStatus[];
    }
  | {
      type: 'SCREEN_REFRESH_PROVIDERS';
      value: PageResponse<IProvider>;
    }
  | {
      type: 'SCREEN_REFRESH_CHANNELS';
      value: PageResponse<IChannel>;
    }
  | {
      type: 'SCREEN_REFRESH_RUNS';
      value: PageResponse<IRun>;
    }
  | {
      type: 'SCREEN_REFRESH_PRODUCTS';
      value: PageResponse<IProduct>;
    }
  | {
      type: 'SCREEN_REFRESH_MERCHANTS';
      value: PageResponse<IMerchant>;
    }
  | {
      type: 'SCREEN_REFRESH_MERCHANT_LABELS';
      value: PageResponse<IMerchantLabel>;
    }
  | {
      type: 'SCREEN_REFRESH_MERCHANT_CATEGORIES';
      value: PageResponse<IMerchantCategory>;
    }
  | {
      type: 'SCREEN_REFRESH_MERCHANT_BRANDS';
      value: PageResponse<IMerchantBrand>;
    }
  | {
      type: 'SCREEN_UPDATE_JOB';
      value: IJobStatus;
    }
  | {
      type: 'SCREEN_UPDATE_PROVIDER';
      value: IProvider;
    }
  | {
      type: 'SCREEN_UPDATE_CHANNEL';
      value: IChannel;
    }
  | {
      type: 'SCREEN_UPDATE_MERCHANT';
      value: IMerchant;
    }
  | {
      type: 'SCREEN_UPDATE_MERCHANT_LABEL';
      value: IMerchantLabel;
    }
  | {
      type: 'SCREEN_UPDATE_MERCHANT_CATEGORY';
      value: IMerchantCategory;
    }
  | {
      type: 'SCREEN_UPDATE_MERCHANT_BRAND';
      value: IMerchantBrand;
    }
  | {
      type: 'SCREEN_UPDATE_GMC_CATEGORIES';
      value: IGmcCategoryScreenData;
    }
  | {
      type: 'SET_TOAST';
      value: IToast;
    }
  | {
      type: 'REMOVE_TOAST';
      value: IToast;
    }
  | {
      type: 'NO_OP';
      value: null;
    };

const ScreenDataContext = createContext<IScreenData>(null);
const ScreenDataDispatchContext =
  createContext<Dispatch<ScreenDataAction>>(null);

export const ScreenDataProvider: FC = ({ children }) => {
  const [data, dispatch] = useReducer<Reducer<IScreenData, ScreenDataAction>>(
    dataReducer,
    initialData
  );

  useEffect(() => {
    gmcCategoriesService.getTop().then((categories) => {
      dispatch({
        type: 'SCREEN_UPDATE_GMC_CATEGORIES',
        value: {
          ...data.gmcCategoryScreenData,
          categories: categories.sort((a, b) => a.name.localeCompare(b.name)),
        },
      });
    });
  }, []);

  return (
    <ScreenDataContext.Provider value={data}>
      <ScreenDataDispatchContext.Provider value={dispatch}>
        {children}
      </ScreenDataDispatchContext.Provider>
    </ScreenDataContext.Provider>
  );
};

export function useScreenData() {
  return useContext(ScreenDataContext);
}

export function useScreenDataDispatch() {
  return useContext(ScreenDataDispatchContext);
}

function dataReducer(data: IScreenData, action: ScreenDataAction): IScreenData {
  switch (action.type) {
    case 'SCREEN_START_LOADING':
      return {
        ...data,
        loading: true,
      };
    case 'SCREEN_END_LOADING':
      return {
        ...data,
        loading: false,
      };
    case 'OPEN_PRODUCT_PREVIEW':
      return {
        ...data,
        previewProduct: action.value,
      };
    case 'CLOSE_PRODUCT_PREVIEW':
      return {
        ...data,
        previewProduct: null,
      };
    case 'SCREEN_REFRESH_JOBS':
      return {
        ...data,
        jobs: action.value,
      };
    case 'SCREEN_REFRESH_PROVIDERS':
      return {
        ...data,
        providers: action.value.data,
        providersMeta: action.value.meta,
      };
    case 'SCREEN_REFRESH_CHANNELS':
      return {
        ...data,
        channels: action.value.data,
        channelsMeta: action.value.meta,
      };
    case 'SCREEN_REFRESH_RUNS':
      return {
        ...data,
        runs: action.value.data,
        runsMeta: action.value.meta,
      };
    case 'SCREEN_REFRESH_PRODUCTS':
      return {
        ...data,
        products: action.value.data,
        productsMeta: action.value.meta,
      };
    case 'SCREEN_REFRESH_MERCHANTS':
      return {
        ...data,
        merchants: action.value.data,
        merchantsMeta: action.value.meta,
      };
    case 'SCREEN_REFRESH_MERCHANT_LABELS':
      return {
        ...data,
        merchantLabels: action.value.data,
        merchantLabelsMeta: action.value.meta,
      };
    case 'SCREEN_REFRESH_MERCHANT_CATEGORIES':
      return {
        ...data,
        merchantCategories: action.value.data,
        merchantCategoriesMeta: action.value.meta,
      };
    case 'SCREEN_REFRESH_MERCHANT_BRANDS':
      return {
        ...data,
        merchantBrands: action.value.data,
        merchantBrandsMeta: action.value.meta,
      };
    case 'SCREEN_UPDATE_JOB':
      return {
        ...data,
        jobs: data.jobs.map((j) =>
          j.name === action.value.name ? action.value : j
        ),
      };
    case 'SCREEN_UPDATE_PROVIDER':
      return {
        ...data,
        providers: data.providers.map((p) =>
          p.id === action.value.id ? action.value : p
        ),
      };
    case 'SCREEN_UPDATE_CHANNEL':
      return {
        ...data,
        channels: data.channels.map((s) =>
          s.id === action.value.id ? action.value : s
        ),
      };
    case 'SCREEN_UPDATE_MERCHANT':
      return {
        ...data,
        merchants: data.merchants.map((s) =>
          s.id === action.value.id ? action.value : s
        ),
      };
    case 'SCREEN_UPDATE_MERCHANT_LABEL':
      return {
        ...data,
        merchantLabels: data.merchantLabels.map((l) =>
          l.id === action.value.id ? action.value : l
        ),
      };
    case 'SCREEN_UPDATE_MERCHANT_CATEGORY':
      return {
        ...data,
        merchantCategories: data.merchantCategories.map((c) =>
          c.id === action.value.id ? action.value : c
        ),
      };
    case 'SCREEN_UPDATE_MERCHANT_BRAND':
      return {
        ...data,
        merchantBrands: data.merchantBrands.map((c) =>
          c.id === action.value.id ? action.value : c
        ),
      };
    case 'SCREEN_UPDATE_GMC_CATEGORIES':
      return {
        ...data,
        gmcCategoryScreenData: action.value,
      };
    case 'SET_TOAST':
      return {
        ...data,
        toast: action.value,
      };
    case 'REMOVE_TOAST':
      return {
        ...data,
        toast: null,
      };
    case 'NO_OP':
      return {
        ...data,
      };
    default:
      break;
  }
  return data;
}

export const initialData: IScreenData = {
  loading: false,
  jobs: [],
  providers: [],
  providersMeta: { sort: 'key', direction: 'ASC' },
  channels: [],
  channelsMeta: {},
  runs: [],
  runsMeta: { sort: 'runAt', direction: 'DESC' },
  products: [],
  productsMeta: {},
  merchants: [],
  merchantsMeta: { sort: 'key', direction: 'ASC' },
  merchantLabels: [],
  merchantLabelsMeta: { sort: 'merchantLabelCode', direction: 'ASC' },
  merchantCategories: [],
  merchantCategoriesMeta: { sort: 'merchantCategoryCode', direction: 'ASC' },
  merchantBrands: [],
  merchantBrandsMeta: { sort: 'merchantBrandCode', direction: 'ASC' },
  previewProduct: null,
  gmcCategoryScreenData: {
    categories: null,
    subCategories1: null,
    subCategories2: null,
    selectedCategoryId: null,
    selectedSubCategory1Id: null,
  },
};
