import { HttpsCallableResult } from 'firebase/functions';
import {
  NestedFacetDto,
  NestedFilterDto,
  SearchFunctionFacetsDto,
  SearchFunctionFiltersDto,
  SearchFunctionRequestDto,
  SearchFunctionResponseDto,
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
import { filterDeepEqual, pathToFilterDeepEqual } from '../lib/deep-equal';
import { functions } from '../lib/firebase';

export interface ISearchProvider {
  loading: boolean;
  request: SearchFunctionRequestDto;
  pageFacets: NestedFacetDto[];
  response: SearchFunctionResponseDto;
  nextPage: () => void;
  prevPage: () => void;
  execute: (
    // update: Partial<SearchFunctionFiltersDto>,
    options?: IExecuteSearchOptions
  ) => void;
}

export interface IExecuteSearchOptions {
  query?: string;
  page?: number;
  filterUpdates?: Partial<SearchFunctionFiltersDto>;
  basePath?: string;
  categoryPageRequest?: boolean;
  labelPageRequest?: boolean;
  searchPageRequest?: boolean;
  noScroll?: boolean;
}

const URL_TOKEN_DIVIDER = '_';

const SearchContext = createContext<ISearchProvider>(null);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [pageFacets, setPageFacets] = useState<NestedFacetDto[]>();
  const [executeCallable, executing, error] = useHttpsCallable<
    SearchFunctionRequestDto,
    SearchFunctionResponseDto
  >(functions, 'searchFunction');
  const [request, setRequest] = useState<SearchFunctionRequestDto>({
    filters: {
      region: 'UK',
      labels: [],
    },
  });

  const [response, setResponse] = useState<SearchFunctionResponseDto>({
    hits: 0,
    data: [],
  });

  useEffect(() => {
    async function performSearch() {
      setLoading(true);
      const extractedRequest = extractQueryParams();
      let pageFacetResult: HttpsCallableResult<SearchFunctionResponseDto> =
        null;
      let searchResult: HttpsCallableResult<SearchFunctionResponseDto> = null;
      try {
        console.log('searching 3: ' + JSON.stringify(router.query));
        console.log('seraching 4: ' + JSON.stringify(extractedRequest));
        if (router.pathname.includes('/shop/category')) {
          pageFacetResult = await executeCallable({
            filters: {
              ...extractedRequest.filters,
              category: null,
            },
            page: 0,
            pageSize: 0,
          });
          setPageFacets(pageFacetResult.data.facets.categories);
        } else if (router.pathname.includes('/shop/label')) {
          pageFacetResult = await executeCallable({
            filters: {
              ...extractedRequest.filters,
              labels: extractedRequest.filters.labels.filter(
                (l) =>
                  !pathToFilterDeepEqual(router.query.labels as string[], l)
              ),
            },
            page: 0,
            pageSize: 0,
          });
          setPageFacets(pageFacetResult.data.facets.labels);
        }
        searchResult = await executeCallable(extractedRequest);
      } catch (e) {
        console.log('search failure: ' + JSON.stringify(e));
      } finally {
        setLoading(false);
      }
      setResponse(searchResult.data);
      copyExistingFilterText(extractedRequest.filters, request.filters);
      copyFacetTextToFilters(
        extractedRequest.filters,
        searchResult.data.facets
      );
      setRequest({
        ...extractedRequest,
      });
    }
    if (router.isReady) {
      if (
        router.asPath.includes('/shop') &&
        (!!router.query.q || !!router.query.categories || !!router.query.labels)
      ) {
        console.log('performing search');
        performSearch();
      } else {
        console.log(
          'removing page facets becaaaaause ' + JSON.stringify(router.query)
        );
        setRequest({
          filters: {
            labels: [],
          },
        });
        setPageFacets(null);
      }
    }
  }, [router.asPath, router.isReady]);

  const copyExistingFilterText = (
    target: SearchFunctionFiltersDto,
    source: SearchFunctionFiltersDto
  ) => {
    if (filterDeepEqual(target.category, source.category)) {
      applyNestedFilterText(target.category, source.category);
    }
    target.labels.forEach((label) => {
      let sourceLabel = source.labels.find((l) => filterDeepEqual(l, label));
      if (sourceLabel) applyNestedFilterText(label, sourceLabel);
    });
  };

  const applyNestedFilterText = (
    target: NestedFilterDto,
    source: NestedFilterDto
  ) => {
    target.name = source.name ? source.name : target.name;
    if (target.subfilter) {
      target.subfilter.name = source.subfilter.name
        ? source.subfilter.name
        : target.subfilter.name;
      if (target.subfilter.subfilter) {
        target.subfilter.subfilter.name = source.subfilter.subfilter.name
          ? source.subfilter.subfilter.name
          : target.subfilter.subfilter.name;
      }
    }
  };

  const copyFacetTextToFilters = (
    filters: SearchFunctionFiltersDto,
    facets: SearchFunctionFacetsDto
  ) => {
    if (filters.category) {
      findAndApplyNestedFilterFacetText(filters.category, facets.categories);
    }
    filters.labels.forEach((l) => {
      findAndApplyNestedFilterFacetText(l, facets.labels);
    });
    return filters;
  };

  const findAndApplyNestedFilterFacetText = (
    filter: NestedFilterDto,
    facets: NestedFacetDto[]
  ) => {
    const facet = facets.find((f) => f.value === filter.value);
    if (facet) {
      filter.name = facet.name;
      if (filter.subfilter) {
        const subcat1Facet = facet.subfacets.find(
          (f) => f.value === filter.subfilter.value
        );
        filter.subfilter.name = subcat1Facet.name;
        if (filter.subfilter.subfilter) {
          filter.subfilter.subfilter.name = subcat1Facet.subfacets.find(
            (f) => f.value === filter.subfilter.subfilter.value
          ).name;
        }
      }
    }
    return filter;
  };

  const mapNestedTokenFromQueryParam = (p): NestedFilterDto => {
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
    } as NestedFilterDto;
  };

  const extractQueryParams = (): SearchFunctionRequestDto => {
    const { page, q, categories, labels, lab, cat } = router.query;
    const filters: Partial<SearchFunctionFiltersDto> = {};
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
      } as NestedFilterDto;
    } else if (cat) {
      filters.category = mapNestedTokenFromQueryParam(cat);
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
      } as NestedFilterDto);
    }
    if (lab && lab.length) {
      console.log(lab);
      filters.labels = [
        ...filters.labels,
        ...(typeof lab === 'string'
          ? [mapNestedTokenFromQueryParam(lab)]
          : lab.map(mapNestedTokenFromQueryParam)),
      ];
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

  const nextPage = async () => {
    console.log('next paging');
    const updatedRequest = {
      ...request,
      page: request.page + 1,
    };
    router.push({
      pathname: router.basePath,
      query: {
        ...(router.query.categories && { categories: router.query.categories }),
        page: request.page + 2,
      },
    });
    setRequest(updatedRequest);
  };

  const prevPage = async () => {};

  const execute = (options: IExecuteSearchOptions) => {
    console.log('executing with options: ' + JSON.stringify(options));
    const req: SearchFunctionRequestDto = {
      ...((options.query || request.query) && {
        query: options.query ? options.query : request.query,
      }),
      filters: {
        ...request.filters,
        ...(options.filterUpdates && { ...options.filterUpdates }),
      },
    };
    applyRequestAndNavigate(req, options);
  };

  const applyRequestAndNavigate = (
    req: SearchFunctionRequestDto,
    options: IExecuteSearchOptions
  ) => {
    req.filters.labels = req.filters.labels.filter(
      (l) =>
        !pathToFilterDeepEqual(router.query.labels as string[], l) &&
        (!options.labelPageRequest ||
          options.basePath.split('/')[3] !== l.value)
    );
    // console.log('appling: ' + JSON.stringify(response.facets));
    // console.log('to: ' + JSON.stringify(req.filters));
    req.filters = copyFacetTextToFilters(req.filters, response.facets);
    setRequest(req);
    router.push(
      {
        pathname: options.basePath ? options.basePath : router.basePath,
        query: {
          ...(req.query && { q: req.query }),
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
            ...(req.filters.category && {
              cat: `${req.filters.category.value}${
                req.filters.category.subfilter
                  ? URL_TOKEN_DIVIDER +
                    req.filters.category.subfilter.value +
                    `${
                      req.filters.category.subfilter.subfilter
                        ? URL_TOKEN_DIVIDER +
                          req.filters.category.subfilter.subfilter.value
                        : ''
                    }`
                  : ''
              }`,
            }),
          }),
          ...(req.page &&
            (!options.categoryPageRequest || options.labelPageRequest) && {
              page: req.page,
            }),
          lab: req.filters.labels.map(
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
        },
      },
      null,
      { ...(options.noScroll && { scroll: false }) }
    );
  };

  return (
    <SearchContext.Provider
      value={{
        loading,
        request,
        response,
        nextPage,
        prevPage,
        pageFacets,
        execute,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
