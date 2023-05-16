import {
  SearchFunctionFiltersDto,
  SearchFunctionRequestDto,
  SearchFunctionResponseDto,
} from 'gmc-types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useHttpsCallable } from 'react-firebase-hooks/functions';
import SearchChoiceBar from '../components/SearchPage/SearchChoiceBar';
import SearchProductCompare from '../components/SearchPage/SearchProductCompare';
import SearchProductList from '../components/SearchPage/SearchProductList';
import { functions } from '../lib/firebase';

export default function Search({ props }) {
  const router = useRouter();
  const [searchResponse, setSearchResponse] =
    useState<SearchFunctionResponseDto>({
      hits: 0,
    });
  const [searchRequest, setSearchRequest] = useState<SearchFunctionRequestDto>({
    query: router.query.q as string,
    filters: {
      region: 'UK',
      labels: [],
    },
  });
  const [executeCallable, executing, error] = useHttpsCallable<
    SearchFunctionRequestDto,
    SearchFunctionResponseDto
  >(functions, 'searchFunction');
  const [compareModeOn, setCompareModeOn] = useState(false);
  const [compareProductIndex, setCompareProductIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (router.isReady) {
      setCompareModeOn(false);
      const req: SearchFunctionRequestDto = {
        query: router.query.q as string,
        filters: {
          region: 'UK',
          labels: [],
        },
      };
      setSearchRequest(req);
      executeSearch(req);
    }
  }, [router.isReady, router.query]);

  const executeSearch = async (
    request: SearchFunctionRequestDto
  ): Promise<SearchFunctionResponseDto> => {
    try {
      setLoading(true);
      let result = await executeCallable(request);
      console.log('search result: ', result);
      setSearchResponse(result.data);
    } catch (err) {
      console.log(err);
      return {
        hits: 0,
        error: err,
      };
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = async (
    updatedFilter: SearchFunctionFiltersDto
  ) => {
    const updatedRequest = {
      ...searchRequest,
      filters: {
        ...searchRequest.filters,
        ...updatedFilter,
      },
    };
    setSearchRequest(updatedRequest);
    setCompareModeOn(false);
    await executeSearch(updatedRequest);
  };

  const handleSetCompareMode = (on: boolean) => {
    setCompareProductIndex(0);
    setCompareModeOn(on);
  };

  const handleProductSelect = (index: number) => {
    setCompareProductIndex(index);
    setCompareModeOn(true);
  };

  const handleSortChange = async (sort?: string) => {
    const updatedRequest = {
      ...searchRequest,
      sort,
    };
    setSearchRequest(updatedRequest);
    await executeSearch(updatedRequest);
  };

  return (
    <>
      <Head>
        <title>Search | Give Me Choice</title>
      </Head>

      <div className="fixed h-full w-full">
        <div
          id="search-result-container"
          className="mt-24 flex h-full w-full flex-col border-x-2 border-black px-3 pt-1 dark:border-white md:flex-row md:border-x-0 md:px-0"
        >
          <SearchChoiceBar
            loading={loading || executing}
            hits={searchResponse.hits}
            filters={searchRequest.filters}
            facets={searchResponse.facets}
            sort={searchRequest.sort}
            compareModeOn={compareModeOn}
            onFilterChange={handleFilterChange}
            onCompareModeChange={handleSetCompareMode}
            onSortChange={handleSortChange}
          />
          <div
            id="search-products"
            className="flex h-full flex-wrap overflow-y-auto border-t-2 border-black pb-32 dark:border-white md:w-2/3 xl:w-3/4"
          >
            {loading || executing ? (
              <div className="flex h-full w-full items-center justify-center">
                Loading animation...
              </div>
            ) : (
              <>
                {compareModeOn ? (
                  <SearchProductCompare
                    products={searchResponse.data}
                    selected={compareProductIndex}
                  />
                ) : (
                  <SearchProductList
                    products={searchResponse.data}
                    onProductSelect={handleProductSelect}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
