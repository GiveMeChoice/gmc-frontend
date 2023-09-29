import {
  createContext,
  Dispatch,
  ReactFragment,
  Reducer,
  useContext,
  useReducer,
} from 'react';

export interface IFilters {
  merchantId?: string;
  merchantRegion?: string;
  providerId?: string;
  providerActivation?: string;
  channelId?: string;
  channelActivation?: string;
  channelStatus?: string;
  gmcProductId?: string;
  merchantProductCode?: string;
  productStatus?: string;
  productError?: boolean;
  merchantLabelCode?: string;
  gmcLabelId?: string;
  labelUnassigned?: boolean;
  merchantCategoryCode?: string;
  gmcCategoryId?: string;
  categoryUnassigned?: boolean;
  gmcBrandId?: string;
  merchantBrandCode?: string;
}

export type FiltersContextType = {
  activeFilters: IFilters;
  filterBarVisible: boolean;
};

export type FiltersAction =
  | {
      type: 'FILTERS_SAVE';
      value: IFilters;
    }
  | {
      type: 'FILTERS_CLEAR';
    }
  | {
      type: 'FILTERS_BAR_TOGGLE';
    }
  | {
      type: 'INIT_PROVIDER_SELECT_OPTIONS';
      value: ProviderSelectType[];
    }
  | {
      type: 'INIT_GMC_CATEGORY_SELECT_OPTIONS';
      value: ReactFragment[];
    }
  | {
      type: 'INIT_GMC_LABEL_SELECT_OPTIONS';
      value: ReactFragment[];
    };

export type ProviderSelectType = {
  id: string;
  key: string;
};

export const initialFilters: IFilters = {
  merchantId: '',
  merchantRegion: '',
  providerId: '',
  providerActivation: '',
  channelId: '',
  channelActivation: '',
  channelStatus: '',
  productStatus: '',
  gmcProductId: '',
  merchantProductCode: '',
  productError: false,
  merchantLabelCode: '',
  gmcLabelId: '',
  merchantCategoryCode: '',
  gmcCategoryId: '',
  gmcBrandId: '',
  merchantBrandCode: '',
};

const FiltersContext = createContext<FiltersContextType>(null);
const FiltersDispatchContext = createContext<Dispatch<FiltersAction>>(null);

export const FiltersProvider: React.FC = ({ children }) => {
  const [filterState, dispatch] = useReducer<
    Reducer<FiltersContextType, FiltersAction>
  >(filtersReducer, {
    activeFilters: initialFilters,
    filterBarVisible: false,
  });

  return (
    <FiltersContext.Provider value={filterState}>
      <FiltersDispatchContext.Provider value={dispatch}>
        {children}
      </FiltersDispatchContext.Provider>
    </FiltersContext.Provider>
  );
};

function filtersReducer(
  data: FiltersContextType,
  action: FiltersAction
): FiltersContextType {
  switch (action.type) {
    case 'FILTERS_BAR_TOGGLE':
      return {
        ...data,
        filterBarVisible: !data.filterBarVisible,
      };
    case 'FILTERS_SAVE':
      return {
        ...data,
        activeFilters: action.value,
      };
    case 'FILTERS_CLEAR':
      return {
        ...data,
        activeFilters: initialFilters,
      };
    default:
      break;
  }
  return data;
}

export const useFilters = () => useContext(FiltersContext);
export const useFiltersDispatch = () => useContext(FiltersDispatchContext);
