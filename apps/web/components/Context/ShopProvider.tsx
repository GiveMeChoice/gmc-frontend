import {
  IGenericFilter,
  IGmcCategory,
  IGmcLabel,
  INestedEntity,
  INestedFacet,
  INestedFilter,
  ISearchFunctionFilters,
  ISearchFunctionRequest,
  ISearchFunctionResponse,
} from 'gmc-types';
import { useRouter } from 'next/router';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useHttpsCallable } from 'react-firebase-hooks/functions';
import { pathToFilterDeepEqual } from '../../lib/filter-helpers';
import { functions } from '../../lib/firebase';
import { logger } from '../../lib/logger';

export interface IShopNavContext {
  initialized?: boolean;
  categories: IGmcCategory[];
  labels: IGmcLabel[];
}

export interface IShopProvider {
  initialized?: boolean;
  baseCategories: IGmcCategory[];
  baseLabels: IGmcLabel[];
  search: (options?: ISearchOptions) => void;
  searching: boolean;
  paging: boolean;
  request: ISearchFunctionRequest;
  pageFacets: INestedFacet[];
  response: ISearchFunctionResponse;
  readBaseLabel: (slug: string) => IGmcLabel;
  readBaseCategory: (slug: string) => IGmcLabel;
}

export interface ISearchOptions {
  q?: string;
  page?: number;
  filterUpdates?: Partial<ISearchFunctionFilters>;
  basePath?: string;
  categoryPageRequest?: boolean;
  labelPageRequest?: boolean;
  addLabelFilter?: INestedFilter;
  searchPageRequest?: boolean;
  noScroll?: boolean;
}

const URL_TOKEN_DIVIDER = '_';

const ShopContext = createContext<IShopProvider>(null);

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [initialized, setInitialized] = useState(false);
  const [baseCategories, setBaseCategories] = useState<IGmcCategory[]>([]);
  const [baseLabels, setBaseLabels] = useState<IGmcLabel[]>([]);
  const [searching, setSearching] = useState(true);
  const [paging, setPaging] = useState(false);
  const [pageFacets, setPageFacets] = useState<INestedFacet[]>();
  const [executeCallable, executing, error] = useHttpsCallable<
    ISearchFunctionRequest,
    ISearchFunctionResponse
  >(functions, 'searchFunction');
  const [request, setRequest] = useState<ISearchFunctionRequest>({
    filters: {
      region: 'UK',
      labels: [],
    },
  });

  const [response, setResponse] = useState<ISearchFunctionResponse>({
    hits: 0,
    data: [],
  });

  useEffect(() => {
    async function init() {
      if (!initialized) {
        logger.debug('Initializing Shop Provider');
        const res: IShopNavContext = await (
          await fetch('/api/shop-nav')
        ).json();
        setBaseCategories(
          res.categories.sort((a, b) => a.name.localeCompare(b.name))
        );
        setBaseLabels(res.labels);
        setInitialized(true);
      }
    }
    async function syncToPath() {
      if (!paging) {
        setSearching(true);
      }
      const extractedRequest = extractRequestFromUrl();
      const pageFacetRequest = buildPageFacetRequest(extractedRequest);
      populateFilterNames(extractedRequest.filters);
      setRequest(extractedRequest);
      Promise.all([
        executeSearchFunction(extractedRequest),
        executeSearchFunction(pageFacetRequest),
      ])
        .then(([searchResult, pageFacetResult]) => {
          setResponse(searchResult);
          if (pageFacetResult) {
            setPageFacets(
              router.pathname.includes('/shop/category')
                ? pageFacetResult.facets.categories
                : pageFacetResult.facets.labels
            );
          }
        })
        .catch((e) => {
          logger.debug('search failure: ' + JSON.stringify(e));
        })
        .finally(() => {
          setSearching(false);
          setPaging(false);
        });
    }
    // begin here //
    if (!initialized) {
      init();
    }
    if (router.isReady) {
      if (
        router.asPath.includes('/shop') &&
        (!!router.query.q || !!router.query.categories || !!router.query.labels)
      ) {
        logger.debug('syncing to query params');
        syncToPath();
      } else {
        logger.debug('not in shop. removing params');
        setRequest({
          filters: {
            labels: [],
          },
        });
        setPageFacets(null);
      }
    }
  }, [router]);

  // page facets allow us to display sibling counts in shop menu entity list
  const buildPageFacetRequest = (extractedRequest: ISearchFunctionRequest) => {
    if (
      router.pathname.includes('/shop/category') ||
      router.pathname.includes('/shop/label')
    ) {
      return {
        filters: {
          ...extractedRequest.filters,
          ...(router.pathname.includes('/shop/category') && {
            category: null,
          }),
          ...(router.pathname.includes('/shop/label') && {
            labels: extractedRequest.filters.labels.filter(
              (l) => !pathToFilterDeepEqual(router.query.labels as string[], l)
            ),
          }),
        },
        page: 0,
        pageSize: 0,
      };
    } else {
      return null;
    }
  };

  const executeSearchFunction = async (
    request: ISearchFunctionRequest
  ): Promise<ISearchFunctionResponse> => {
    if (request) {
      const result = await executeCallable(request);
      return result.data;
    } else return null;
  };

  // ensures that filter name are always populated, when filter is first extracted from URL
  const populateFilterNames = (filters: ISearchFunctionFilters) => {
    if (filters.category) {
      applyNestedFilterName(filters.category, baseCategories);
    }
    if (filters.labels.length) {
      filters.labels.forEach((l) => {
        applyNestedFilterName(l, baseLabels);
      });
    }
    if (filters.brand) {
      filters.brand.name = filters.brand.value.replaceAll('-', ' ');
    }
  };

  const applyNestedFilterName = (
    filter: INestedFilter,
    entity: INestedEntity[]
  ) => {
    filter.name = filter.value;
    const baseEntity = entity.find((e) => e.slug === filter.value);
    if (baseEntity) {
      filter.name = baseEntity.name;
      if (filter.subfilter) {
        const subEntity1 = baseEntity.children.find(
          (sub1) => sub1.slug === filter.subfilter.value
        );
        if (subEntity1) {
          filter.subfilter.name = subEntity1.name;
          if (filter.subfilter.subfilter) {
            const subEntity2 = subEntity1.children.find(
              (sub2) => sub2.slug === filter.subfilter.subfilter.value
            );
            if (subEntity2) {
              filter.subfilter.subfilter.name = subEntity2.name;
            }
          }
        }
      }
    }
  };

  const mapNestedFilterFromQueryParam = (p): INestedFilter => {
    const [base, sub1, sub2] = p.split(URL_TOKEN_DIVIDER);
    return {
      value: base,
      ...(sub1 && {
        subfilter: {
          value: sub1,
          ...(sub2 && {
            subfilter: {
              value: sub2,
            },
          }),
        },
      }),
    } as INestedFilter;
  };

  const extractRequestFromUrl = (): ISearchFunctionRequest => {
    const { page, q, categories, labels, lab, cat, brand, price } =
      router.query;
    const filters: Partial<ISearchFunctionFilters> = {};
    if (categories) {
      const [cat, subcat1, subcat2] = categories as string[];
      filters.category = {
        value: cat,
        ...(subcat1 && {
          subfilter: {
            value: subcat1,
            ...(subcat2 && {
              subfilter: {
                value: subcat2,
              },
            }),
          },
        }),
      } as INestedFilter;
    } else if (cat) {
      filters.category = mapNestedFilterFromQueryParam(cat);
    }
    filters.labels = [];
    if (labels) {
      const [label, subLabel1, subLabel2] = labels as string[];
      filters.labels.push({
        value: label,
        ...(subLabel1 && {
          subfilter: {
            value: subLabel1,
            ...(subLabel2 && {
              subfilter: {
                value: subLabel2,
              },
            }),
          },
        }),
      } as INestedFilter);
    }
    if (lab && lab.length) {
      logger.debug(lab);
      filters.labels = [
        ...filters.labels,
        ...(typeof lab === 'string'
          ? [mapNestedFilterFromQueryParam(lab)]
          : lab.map(mapNestedFilterFromQueryParam)),
      ];
    }
    if (brand) {
      filters.brand = {
        value: brand as string,
      } as IGenericFilter;
    }
    if (price) {
      filters.priceRange = price as any;
    }
    return {
      ...(q && { query: q as string }),
      page: (page && !isNaN(page as any) && (page as any) > 0
        ? (page as any) - 1
        : 0) as number,
      filters,
      pageSize: 10,
    };
  };

  const removeConflictingBranchLabelFilters = (
    addedLabel: INestedFilter,
    existingLabels: INestedFilter[]
  ): INestedFilter[] => {
    logger.debug(JSON.stringify(addedLabel));
    if (!existingLabels) {
      return [addedLabel];
    } else {
      if (!addedLabel.subfilter) {
        /// added base label -> clear all children
        return [
          addedLabel,
          ...existingLabels.filter((l) => l.value !== addedLabel.value),
        ];
      } else {
        // clear direct parents and any children labels
        return [
          addedLabel,
          ...existingLabels.filter(
            (l) =>
              !(
                l.value === addedLabel.value &&
                (!l.subfilter ||
                  (l.subfilter.value === addedLabel.subfilter.value &&
                    addedLabel.subfilter.subfilter &&
                    !l.subfilter.subfilter) ||
                  (!addedLabel.subfilter.subfilter && l.subfilter.subfilter))
              )
          ),
        ];
      }
    }
  };

  const search = (options: ISearchOptions) => {
    if (options.page || options.page === 0) {
      setPaging(true);
      logger.debug('paging!');
    } else {
      setSearching(true);
    }
    const updatedRequest: ISearchFunctionRequest = {
      ...((options.q || request.query) && {
        query: options.q ? options.q : request.query,
      }),
      ...(options.page && {
        page: options.page,
      }),
      filters: {
        ...request.filters,
        ...(options.filterUpdates && { ...options.filterUpdates }),
      },
    };
    if (options.addLabelFilter) {
      updatedRequest.filters.labels = removeConflictingBranchLabelFilters(
        options.addLabelFilter,
        updatedRequest.filters.labels
      );
    }
    updatedRequest.filters.labels = updatedRequest.filters.labels.filter(
      (l) =>
        !pathToFilterDeepEqual(router.query.labels as string[], l) &&
        (!options.labelPageRequest ||
          options.basePath.split('/')[3] !== l.value)
    );
    setRequest(updatedRequest);
    router.push(
      {
        pathname: options.basePath ? options.basePath : router.basePath,
        query: applyRequestToUrl(updatedRequest, options),
      },
      null,
      { ...(options.noScroll && { scroll: false }) }
    );
  };

  const applyRequestToUrl = (
    updatedRequest: ISearchFunctionRequest,
    options: ISearchOptions
  ) => {
    return {
      ...(updatedRequest.query && { q: updatedRequest.query }),
      ...(router.query.categories &&
        !options.searchPageRequest &&
        !options.categoryPageRequest && {
          categories: router.query.categories,
        }),
      ...(router.query.labels &&
        !options.searchPageRequest &&
        !options.labelPageRequest && {
          labels: router.query.labels,
        }),
      ...(!router.query.categories && {
        ...(updatedRequest.filters.category && {
          cat: `${updatedRequest.filters.category.value}${
            updatedRequest.filters.category.subfilter
              ? URL_TOKEN_DIVIDER +
                updatedRequest.filters.category.subfilter.value +
                `${
                  updatedRequest.filters.category.subfilter.subfilter
                    ? URL_TOKEN_DIVIDER +
                      updatedRequest.filters.category.subfilter.subfilter.value
                    : ''
                }`
              : ''
          }`,
        }),
      }),
      ...(updatedRequest.filters.labels.length && {
        lab: updatedRequest.filters.labels.map(
          (l) =>
            `${l.value}${
              l.subfilter
                ? URL_TOKEN_DIVIDER +
                  l.subfilter.value +
                  `${
                    l.subfilter.subfilter
                      ? URL_TOKEN_DIVIDER + l.subfilter.subfilter.value
                      : ''
                  }`
                : ''
            }`
        ),
      }),
      ...(updatedRequest.filters.brand && {
        brand: updatedRequest.filters.brand.value,
      }),
      ...(updatedRequest.filters.priceRange && {
        price: updatedRequest.filters.priceRange,
      }),
      ...(updatedRequest.page && {
        page: updatedRequest.page + 1,
      }),
    };
  };

  const readBaseLabel = (slug: string) => {
    if (initialized) {
      return baseLabels.find((l) => l.slug === slug);
    } else {
      return {
        color: '#a7f700', // PRIMARY
      } as IGmcLabel;
    }
  };

  const readBaseCategory = (slug: string) => {
    if (initialized) {
      return baseCategories.find((l) => l.slug === slug);
    } else {
      return {
        color: '#a7f700', // PRIMARY
      } as IGmcCategory;
    }
  };

  return (
    <ShopContext.Provider
      value={{
        paging,
        searching,
        request,
        response,
        pageFacets,
        search,
        baseCategories,
        baseLabels,
        readBaseCategory,
        readBaseLabel,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
