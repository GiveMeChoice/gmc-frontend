import { useAuth } from '@root/components/auth/auth.provider';
import categoriesService, {
  ICategory,
} from '@root/services/categories.service';
import labelsService, { ILabelGroup } from '@root/services/labels.service';
import providersService from '@root/services/providers.service';
import {
  createContext,
  Dispatch,
  ReactFragment,
  Reducer,
  useContext,
  useEffect,
  useReducer,
} from 'react';

export interface IFiltersState {
  activeFilters: IFilters;
  options: {
    providerSelect: ProviderSelectType[];
    categorySelect: ReactFragment[];
    labelGroupSelect: ILabelGroup[];
    sourceStatusSelect: string[];
    productStatusSelect: string[];
    jobScheduleSelect: string[];
  };
  filterBarVisible: boolean;
}

export interface IFilters {
  providerId?: string;
  providerActivation?: string;
  sourceIdentifier?: string;
  sourceActivation?: string;
  sourceStatus?: string;
  productShortId?: string;
  productProviderId?: string;
  productStatus?: string;
  productIntegrationError?: boolean;
  providerLabelCode?: string;
  labelGroupId?: string;
  providerCategoryCode?: string;
  categoryId?: string;
}

export type FiltersAction =
  | {
      type: 'SAVE_FILTERS';
      value: IFilters;
    }
  | {
      type: 'CLEAR_FILTERS';
    }
  | {
      type: 'TOGGLE_FILTER_BAR';
    }
  | {
      type: 'INIT_PROVIDER_SELECT_OPTIONS';
      value: ProviderSelectType[];
    }
  | {
      type: 'INIT_CATEGORY_GROUP_SELECT_OPTIONS';
      value: ReactFragment[];
    }
  | {
      type: 'INIT_LABEL_GROUP_SELECT_OPTIONS';
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
  providerLabelCode: '',
  labelGroupId: '',
  providerCategoryCode: '',
  categoryId: '',
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
      categorySelect: null,
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
          type: 'INIT_PROVIDER_SELECT_OPTIONS',
          value: providers.data.map((p) => ({ id: p.id, key: p.key })),
        });
      });
      categoriesService.getRoot().then((root) => {
        const options: ReactFragment[] = [];
        prepareTreeOptions(root, [], options);
        dispatch({
          type: 'INIT_CATEGORY_GROUP_SELECT_OPTIONS',
          value: options,
        });
      });
      labelsService.getAllGroups().then((groups) => {
        dispatch({
          type: 'INIT_LABEL_GROUP_SELECT_OPTIONS',
          value: groups,
        });
      });
    }
  }, [auth.user]);

  const prepareTreeOptions = (
    node: ICategory | ILabelGroup,
    parentNames: string[],
    options: any[]
  ) => {
    let levelNames = [];
    if (node.name !== 'Root') {
      levelNames = parentNames.concat([node.name]);
      options.push(
        <option key={options.length} value={node.id}>
          {levelNames.join(' > ')}
        </option>
      );
    }
    node.children.forEach((cat) => {
      prepareTreeOptions(cat, levelNames, options);
    });
  };

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
    case 'CLEAR_FILTERS':
      return {
        ...data,
        activeFilters: initialFilters,
      };
    case 'INIT_PROVIDER_SELECT_OPTIONS':
      return {
        ...data,
        options: {
          ...data.options,
          providerSelect: action.value,
        },
      };
    case 'INIT_CATEGORY_GROUP_SELECT_OPTIONS':
      return {
        ...data,
        options: {
          ...data.options,
          categorySelect: action.value,
        },
      };
    case 'INIT_LABEL_GROUP_SELECT_OPTIONS':
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
