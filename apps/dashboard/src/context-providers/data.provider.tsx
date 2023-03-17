import { IBrand } from '@root/services/brands.service';
import { IProviderCategory } from '@root/services/categories.service';
import { IJobStatus } from '@root/services/jobs.service';
import { ILabel } from '@root/services/labels.service';
import { IProduct } from '@root/services/products.service';
import { IProvider } from '@root/services/providers.service';
import { IRun } from '@root/services/runs.service';
import {
  PageMeta,
  PageResponse,
} from '@root/services/shared/page-response.interface';
import { ISource } from '@root/services/sources.service';
import {
  createContext,
  Dispatch,
  FC,
  Reducer,
  useContext,
  useReducer,
} from 'react';

export interface IData {
  loading: boolean;
  jobs: IJobStatus[];
  providers: IProvider[];
  providersMeta: PageMeta;
  sources: ISource[];
  sourcesMeta: PageMeta;
  runs: IRun[];
  runsMeta: PageMeta;
  products: IProduct[];
  productsMeta: PageMeta;
  labels: ILabel[];
  labelsMeta: PageMeta;
  categories: IProviderCategory[];
  categoriesMeta: PageMeta;
  brands: IBrand[];
  brandsMeta: PageMeta;
  previewProduct: IProduct | null;
  searchQuery: string;
  searchResults: IProduct[];
}

export type DataAction =
  | {
      type: 'START_LOADING';
    }
  | {
      type: 'FINISH_LOADING';
    }
  | {
      type: 'OPEN_PRODUCT_PREVIEW';
      value: IProduct;
    }
  | {
      type: 'CLOSE_PRODUCT_PREVIEW';
    }
  | {
      type: 'REFRESH_JOBS';
      value: IJobStatus[];
    }
  | {
      type: 'REFRESH_PROVIDERS';
      value: PageResponse<IProvider>;
    }
  | {
      type: 'REFRESH_SOURCES';
      value: PageResponse<ISource>;
    }
  | {
      type: 'REFRESH_RUNS';
      value: PageResponse<IRun>;
    }
  | {
      type: 'REFRESH_PRODUCTS';
      value: PageResponse<IProduct>;
    }
  | {
      type: 'REFRESH_LABELS';
      value: PageResponse<ILabel>;
    }
  | {
      type: 'REFRESH_PROVIDER_CATEGORIES';
      value: PageResponse<IProviderCategory>;
    }
  | {
      type: 'REFRESH_BRANDS';
      value: PageResponse<IBrand>;
    }
  | {
      type: 'START_SEARCH';
      value: string;
    }
  | {
      type: 'SET_SEARCH_RESULTS';
      value: IProduct[];
    }
  | {
      type: 'UPDATE_JOB';
      value: IJobStatus;
    }
  | {
      type: 'UPDATE_PROVIDER';
      value: IProvider;
    }
  | {
      type: 'UPDATE_SOURCE';
      value: ISource;
    }
  | {
      type: 'UPDATE_LABEL';
      value: ILabel;
    }
  | {
      type: 'UPDATE_PROVIDER_CATEGORY';
      value: IProviderCategory;
    };

const DataContext = createContext<IData>(null);
const DataDispatchContext = createContext<Dispatch<DataAction>>(null);

export const DataProvider: FC = ({ children }) => {
  const [data, dispatch] = useReducer<Reducer<IData, DataAction>>(
    dataReducer,
    initialData
  );

  return (
    <DataContext.Provider value={data}>
      <DataDispatchContext.Provider value={dispatch}>
        {children}
      </DataDispatchContext.Provider>
    </DataContext.Provider>
  );
};

export function useData() {
  return useContext(DataContext);
}

export function useDataDispatch() {
  return useContext(DataDispatchContext);
}

function dataReducer(data: IData, action: DataAction): IData {
  switch (action.type) {
    case 'START_LOADING':
      return {
        ...data,
        loading: true,
      };
    case 'FINISH_LOADING':
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
    case 'REFRESH_JOBS':
      return {
        ...data,
        jobs: action.value,
      };
    case 'REFRESH_PROVIDERS':
      return {
        ...data,
        providers: action.value.data,
        providersMeta: action.value.meta,
      };
    case 'REFRESH_SOURCES':
      return {
        ...data,
        sources: action.value.data,
        sourcesMeta: action.value.meta,
      };
    case 'REFRESH_RUNS':
      return {
        ...data,
        runs: action.value.data,
        runsMeta: action.value.meta,
      };
    case 'REFRESH_PRODUCTS':
      return {
        ...data,
        products: action.value.data,
        productsMeta: action.value.meta,
      };
    case 'REFRESH_LABELS':
      return {
        ...data,
        labels: action.value.data,
        labelsMeta: action.value.meta,
      };
    case 'REFRESH_PROVIDER_CATEGORIES':
      return {
        ...data,
        categories: action.value.data,
        categoriesMeta: action.value.meta,
      };
    case 'REFRESH_BRANDS':
      return {
        ...data,
        brands: action.value.data,
        brandsMeta: action.value.meta,
      };
    case 'START_SEARCH':
      return {
        ...data,
        searchResults: null,
        searchQuery: action.value,
      };
    case 'SET_SEARCH_RESULTS':
      return {
        ...data,
        searchResults: action.value,
      };
    case 'UPDATE_JOB':
      return {
        ...data,
        jobs: data.jobs.map((j) =>
          j.name === action.value.name ? action.value : j
        ),
      };
    case 'UPDATE_PROVIDER':
      return {
        ...data,
        providers: data.providers.map((p) =>
          p.id === action.value.id ? action.value : p
        ),
      };
    case 'UPDATE_SOURCE':
      return {
        ...data,
        sources: data.sources.map((s) =>
          s.id === action.value.id ? action.value : s
        ),
      };
    case 'UPDATE_LABEL':
      return {
        ...data,
        labels: data.labels.map((l) =>
          l.id === action.value.id ? action.value : l
        ),
      };
    case 'UPDATE_PROVIDER_CATEGORY':
      return {
        ...data,
        categories: data.categories.map((c) =>
          c.id === action.value.id ? action.value : c
        ),
      };
    default:
      break;
  }
  return data;
}

export const initialData: IData = {
  loading: false,
  jobs: [],
  providers: [],
  providersMeta: {},
  sources: [],
  sourcesMeta: { sort: 'identifier', direction: 'DESC' },
  runs: [],
  runsMeta: { sort: 'runAt', direction: 'DESC' },
  products: [],
  productsMeta: {},
  labels: [],
  labelsMeta: { sort: 'code', direction: 'ASC' },
  categories: [],
  categoriesMeta: { sort: 'code', direction: 'ASC' },
  brands: [],
  brandsMeta: { sort: 'code', direction: 'ASC' },
  previewProduct: null,
  searchQuery: '',
  searchResults: [],
};
