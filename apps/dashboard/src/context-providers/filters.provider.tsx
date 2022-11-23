import providersService from '@root/services/providers.service';
import {
  createContext,
  Dispatch,
  Reducer,
  useContext,
  useEffect,
  useReducer,
} from 'react';

export interface IFiltersState {
  activeFilters: IFilters;
  options: {
    providerSelect: ProviderSelectType[];
  };
}

export const initialFilters = {
  providerId: '',
  providerActivation: '',
  sourceIdentifier: '',
  sourceActivation: '',
  sourceStatus: '',
};

export interface IFilters {
  providerId: string;
  providerActivation: string;
  sourceIdentifier: string;
  sourceActivation: string;
  sourceStatus: string;
}

export type FiltersAction =
  | {
      type: 'SAVE_FILTERS';
      value: IFilters;
    }
  | {
      type: 'SET_PROVIDER_SELECT_OPTIONS';
      value: ProviderSelectType[];
    };

type ProviderSelectType = {
  id: string;
  key: string;
};

const FiltersContext = createContext<IFiltersState>(null);
const FiltersDispatchContext = createContext<Dispatch<FiltersAction>>(null);

export const FiltersProvider: React.FC = ({ children }) => {
  const [filterState, dispatch] = useReducer<
    Reducer<IFiltersState, FiltersAction>
  >(filtersReducer, {
    activeFilters: initialFilters,
    options: {
      providerSelect: [],
    },
  });

  useEffect(() => {
    providersService.getAll().then((providers) => {
      dispatch({
        type: 'SET_PROVIDER_SELECT_OPTIONS',
        value: providers.map((p) => ({ id: p.id, key: p.key })),
      });
    });
  }, []);

  return (
    <FiltersContext.Provider value={filterState}>
      <FiltersDispatchContext.Provider value={dispatch}>
        {children}
      </FiltersDispatchContext.Provider>
    </FiltersContext.Provider>
  );
};

function filtersReducer(
  data: IFiltersState,
  action: FiltersAction
): IFiltersState {
  console.log(JSON.stringify(action.value));
  switch (action.type) {
    case 'SAVE_FILTERS':
      return {
        ...data,
        activeFilters: action.value,
      };
    case 'SET_PROVIDER_SELECT_OPTIONS':
      return {
        ...data,
        options: {
          providerSelect: action.value,
        },
      };
    default:
      break;
  }
  return data;
}

export const useFilters = () => useContext(FiltersContext);
export const useFiltersDispatch = () => useContext(FiltersDispatchContext);
