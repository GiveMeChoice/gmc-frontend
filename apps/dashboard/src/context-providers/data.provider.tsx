import { IProvider } from '@root/services/providers.service';
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
  providers: IProvider[];
  sources: ISource[];
}

export type DataAction =
  | {
      type: 'REFRESH_PROVIDERS';
      value: IProvider[];
    }
  | {
      type: 'REFRESH_SOURCES';
      value: ISource[];
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

function dataReducer(data: IData, action: DataAction) {
  switch (action.type) {
    case 'REFRESH_PROVIDERS':
      return {
        ...data,
        providers: action.value,
      };
    case 'REFRESH_SOURCES':
      return {
        ...data,
        sources: action.value,
      };
    default:
      break;
  }
  return data;
}

const initialData: IData = {
  providers: [],
  sources: [],
};
