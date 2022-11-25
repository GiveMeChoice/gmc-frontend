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
    sourceStatusSelect: string[];
  };
  filterBarVisible: boolean;
}

export interface IFilters {
  providerId: string;
  providerActivation: string;
  sourceId: string;
  sourceIdentifier: string;
  sourceActivation: string;
  sourceStatus?: string;
}

export type FiltersAction =
  | {
      type: 'SAVE_FILTERS';
      value: IFilters;
    }
  | {
      type: 'ENTER_FILTER_BAR';
    }
  | {
      type: 'EXIT_FILTER_BAR';
    }
  | {
      type: 'TOGGLE_FILTER_BAR';
    }
  | {
      type: 'SET_PROVIDER_SELECT_OPTIONS';
      value: ProviderSelectType[];
    };

export type ProviderSelectType = {
  id: string;
  key: string;
};

export const initialFilters = {
  providerId: '',
  providerActivation: '',
  sourceId: '',
  sourceIdentifier: '',
  sourceActivation: '',
  sourceStatus: '',
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
      sourceStatusSelect: ['READY', 'BUSY', 'DOWN'],
    },
    filterBarVisible: false,
  });

  useEffect(() => {
    providersService.getAll().then((providers) => {
      dispatch({
        type: 'SET_PROVIDER_SELECT_OPTIONS',
        value: providers.data.map((p) => ({ id: p.id, key: p.key })),
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
  console.log(action.type);
  console.log(data.filterBarVisible);
  switch (action.type) {
    case 'ENTER_FILTER_BAR':
      return {
        ...data,
        filterBarVisible: true,
      };
    case 'EXIT_FILTER_BAR':
      return {
        ...data,
        filterBarVisible: false,
      };
    case 'TOGGLE_FILTER_BAR':
      return {
        ...data,
        filterBarVisible: !data.filterBarVisible,
      };
    case 'SAVE_FILTERS':
      return {
        ...data,
        activeFilters: action.value,
      };
    case 'SET_PROVIDER_SELECT_OPTIONS':
      return {
        ...data,
        options: {
          ...data.options,
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
