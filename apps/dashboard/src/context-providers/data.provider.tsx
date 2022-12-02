import { IJobStatus } from '@root/services/jobs.service';
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
  jobs: IJobStatus[];
  providers: IProvider[];
  sources: ISource[];
  runs: IRun[];
  products: IProduct[];
  providersMeta: PageMeta;
  sourcesMeta: PageMeta;
  runsMeta: PageMeta;
  productsMeta: PageMeta;
}

export type DataAction =
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
  console.log('Action: ' + action.type);
  switch (action.type) {
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
    default:
      break;
  }
  return data;
}

export const initialData: IData = {
  jobs: [],
  providers: [],
  sources: [],
  runs: [],
  products: [],
  providersMeta: {},
  sourcesMeta: { sort: 'identifier', direction: 'DESC' },
  runsMeta: { sort: 'runAt', direction: 'DESC' },
  productsMeta: {},
};
