import { useAuth } from '@root/components/auth/auth.provider';
import categoriesService, {
  ICategoryGroup,
} from '@root/services/categories.service';
import labelsService, { ILabelGroup } from '@root/services/labels.service';
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
    categoryGroupSelect: ICategoryGroup[];
    labelGroupSelect: ILabelGroup[];
    sourceStatusSelect: string[];
    productStatusSelect: string[];
    jobScheduleSelect: string[];
  };
  filterBarVisible: boolean;
}

export interface IFilters {
  providerId: string;
  providerActivation: string;
  sourceIdentifier: string;
  sourceActivation: string;
  sourceStatus?: string;
  productShortId?: string;
  productProviderId?: string;
  productStatus?: string;
  productIntegrationError?: boolean;
  labelCode?: string;
  labelGroupId?: string;
  categoryCode?: string;
  categoryGroupId?: string;
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
    }
  | {
      type: 'SET_CATEGORY_GROUP_SELECT_OPTIONS';
      value: ICategoryGroup[];
    }
  | {
      type: 'SET_LABEL_GROUP_SELECT_OPTIONS';
      value: ILabelGroup[];
    };

export type ProviderSelectType = {
  id: string;
  key: string;
};

export const initialFilters: IFilters = {
  providerId: '',
  providerActivation: '',
  sourceIdentifier: '',
  sourceActivation: '',
  sourceStatus: '',
  productStatus: '',
  productShortId: '',
  productProviderId: '',
  productIntegrationError: false,
  labelCode: '',
  labelGroupId: '',
  categoryCode: '',
  categoryGroupId: '',
};

const FiltersContext = createContext<IFiltersState>(null);
const FiltersDispatchContext = createContext<Dispatch<FiltersAction>>(null);

export const FiltersProvider: React.FC = ({ children }) => {
  const auth = useAuth();
  const [filterState, dispatch] = useReducer<
    Reducer<IFiltersState, FiltersAction>
  >(filtersReducer, {
    activeFilters: initialFilters,
    options: {
      providerSelect: [],
      labelGroupSelect: [],
      categoryGroupSelect: [],
      sourceStatusSelect: ['READY', 'BUSY', 'DOWN'],
      productStatusSelect: ['LIVE', 'PENDING', 'EXPIRED'],
      jobScheduleSelect: [
        'EVERY_SECOND',
        'EVERY_10_SECONDS',
        'EVERY_30_SECONDS',
        'EVERY_MINUTE',
        'EVERY_5_MINUTES',
        'EVERY_10_MINUTES',
        'EVERY_30_MINUTES',
        'EVERY_HOUR',
        'EVERY_2_HOURS',
        'EVERY_8_HOURS',
        'EVERY_12_HOURS',
        'EVERY_DAY_AT_MIDNIGHT',
        'EVERY_DAY_AT_NOON',
        'EVERY_WEEK',
        'EVERY_YEAR',
      ],
    },
    filterBarVisible: false,
  });

  useEffect(() => {
    if (auth.user) {
      providersService.getAll().then((providers) => {
        dispatch({
          type: 'SET_PROVIDER_SELECT_OPTIONS',
          value: providers.data.map((p) => ({ id: p.id, key: p.key })),
        });
      });
      categoriesService.getAllGroups().then((groups) => {
        dispatch({
          type: 'SET_CATEGORY_GROUP_SELECT_OPTIONS',
          value: groups,
        });
      });
      labelsService.getAllGroups().then((groups) => {
        dispatch({
          type: 'SET_LABEL_GROUP_SELECT_OPTIONS',
          value: groups,
        });
      });
    }
  }, [auth.user]);

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
    case 'SET_CATEGORY_GROUP_SELECT_OPTIONS':
      return {
        ...data,
        options: {
          ...data.options,
          categoryGroupSelect: action.value,
        },
      };
    case 'SET_LABEL_GROUP_SELECT_OPTIONS':
      return {
        ...data,
        options: {
          ...data.options,
          labelGroupSelect: action.value,
        },
      };
    default:
      break;
  }
  return data;
}

export const useFilters = () => useContext(FiltersContext);
export const useFiltersDispatch = () => useContext(FiltersDispatchContext);
