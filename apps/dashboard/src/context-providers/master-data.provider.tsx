import { useAuth } from '@root/components/auth/auth.provider';
import { formatErrorMessage } from '@root/helpers/format-error-message';
import {
  gmcCategoriesService,
  IGmcCategory,
} from '@root/services/gmc-categories.service';
import { gmcLabelsService, IGmcLabel } from '@root/services/gmc-labels.service';
import merchantsService from '@root/services/merchants.service';
import providersService from '@root/services/providers.service';
import {
  createContext,
  ReactFragment,
  useContext,
  useEffect,
  useState,
} from 'react';

export type KeyType = {
  id: string;
  key: string;
};

export interface IMasterData {
  merchantKeys: KeyType[];
  providerKeys: KeyType[];
  gmcCategorySelect: ReactFragment[];
  gmcLabelSelect: ReactFragment[];
  gmcCategoryTitles: EntityTitle[];
  gmcLabelTitles: EntityTitle[];
  channelStatuses: string[];
  productStatuses: string[];
  jobSchedules: string[];
  merchantRegions: string[];
}

interface EntityTitle {
  id: string;
  name: string;
}

export type MasterDataContextType = IMasterData & {
  initialized: boolean;
  readMerchantKey: (merchantId: string) => string;
  readMerchantId: (merchantKey: string) => string;
  readProviderKey: (providerId: string) => string;
  readProviderId: (providerKey: string) => string;
  readGmcCategoryName: (gmcCategoryId: string) => string;
  readGmcLabelName: (gmcCategoryId: string) => string;
  refreshGmcCategories: () => Promise<void>;
  refreshGmcLabels: () => Promise<void>;
};

const MasterDataContext = createContext<MasterDataContextType>(null);

export const MasterDataProvider: React.FC = ({ children }) => {
  const auth = useAuth();
  const [initialized, setInitialized] = useState<boolean>(false);
  const [masterData, setMasterData] = useState<IMasterData>({
    merchantKeys: [],
    providerKeys: [],
    gmcLabelSelect: [],
    gmcCategorySelect: [],
    gmcCategoryTitles: [],
    gmcLabelTitles: [],
    merchantRegions: ['UK', 'US', 'NL'],
    channelStatuses: ['READY', 'BUSY', 'DOWN'],
    productStatuses: ['LIVE', 'PENDING', 'EXPIRED'],
    jobSchedules: [
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
  });

  useEffect(() => {
    if (auth.user && !initialized) {
      Promise.all([
        merchantsService.getAll(),
        providersService.getAll(),
        gmcLabelsService.getAll(),
        gmcCategoriesService.getAll(),
      ]).then(([merchants, providers, gmcLabels, gmcCategories]) => {
        const categorySelect: ReactFragment[] = [];
        const categoryTitles: EntityTitle[] = [];
        const labelSelect: ReactFragment[] = [];
        const labelTitles: EntityTitle[] = [];
        setMasterData({
          ...masterData,
          merchantKeys: merchants.data.map((m) => ({
            id: m.id,
            key: m.key,
          })),
          providerKeys: providers.data.map((p) => ({ id: p.id, key: p.key })),
          gmcLabelSelect: traverseTree(gmcLabels, [], labelSelect, labelTitles),
          gmcLabelTitles: labelTitles,
          gmcCategorySelect: gmcCategories.map((cat) =>
            traverseTree(cat, [], categorySelect, categoryTitles)
          ),
          gmcCategoryTitles: categoryTitles,
        });
        setInitialized(true);
      });
    }
  }, [auth.user]);

  const readMerchantKey = (merchantId: string): string => {
    return masterData.merchantKeys.find((m) => m.id === merchantId).key;
  };

  const readMerchantId = (merchantKey: string): string => {
    return masterData.merchantKeys.find((m) => m.key === merchantKey).id;
  };

  const readProviderKey = (providerId: string): string => {
    return masterData.providerKeys.find((p) => p.id === providerId).key;
  };

  const readProviderId = (providerKey: string): string => {
    return masterData.providerKeys.find((p) => p.key === providerKey).id;
  };

  const readGmcCategoryName = (gmcCategoryId): string => {
    return masterData.gmcCategoryTitles.find((t) => t.id === gmcCategoryId)
      .name;
  };

  const readGmcLabelName = (gmcLabelId): string => {
    return masterData.gmcLabelTitles.find((t) => t.id === gmcLabelId).name;
  };

  const refreshGmcCategories = async () => {
    gmcCategoriesService.getAll().then((gmcCategories) => {
      const categorySelect: ReactFragment[] = [];
      const categoryTitles: EntityTitle[] = [];
      setMasterData({
        ...masterData,
        gmcCategorySelect: gmcCategories.map((cat) =>
          traverseTree(cat, [], categorySelect, categoryTitles)
        ),
        gmcCategoryTitles: categoryTitles,
      });
    });
  };

  const refreshGmcLabels = async () => {
    gmcLabelsService.getAll().then((gmcLabels) => {
      const labelSelect: ReactFragment[] = [];
      const labelTitles: EntityTitle[] = [];
      setMasterData({
        ...masterData,
        gmcLabelSelect: traverseTree(gmcLabels, [], labelSelect, labelTitles),
        gmcLabelTitles: labelTitles,
      });
    });
  };

  return (
    <MasterDataContext.Provider
      value={{
        ...masterData,
        initialized,
        readMerchantId,
        readMerchantKey,
        readProviderId,
        readProviderKey,
        refreshGmcCategories,
        refreshGmcLabels,
        readGmcCategoryName,
        readGmcLabelName,
      }}
    >
      {children}
    </MasterDataContext.Provider>
  );
};

const traverseTree = (
  node: IGmcCategory | IGmcLabel,
  parentNames: string[],
  options: any[],
  titles: EntityTitle[]
) => {
  let levelNames = [];
  if (node.name !== 'Root') {
    levelNames = parentNames.concat([node.name]);
    titles.push({
      id: node.id,
      name: levelNames.join(' > '),
    });
    options.push(
      <option key={options.length} value={node.id}>
        {levelNames.join(' > ')}
      </option>
    );
  }
  node.children.forEach((cat) => {
    traverseTree(cat, levelNames, options, titles);
  });
  return options;
};

export const useMasterData = () => useContext(MasterDataContext);
