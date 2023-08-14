import {
  SearchFunctionFiltersDto,
  SearchFunctionRequestDto,
  SearchFunctionResponseDto,
} from 'gmc-types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useHttpsCallable } from 'react-firebase-hooks/functions';
import ComparableProduct from '../components/SearchPage/ComparableProduct';
import ListProduct from '../components/SearchPage/ListProduct';
import LoadingMarquee from '../components/SearchPage/LoadingScreen/LoadingMarquee';
import SearchChoiceBar from '../components/SearchPage/SearchChoiceBar';
import SearchMarquee from '../components/SearchPage/SearchMarquee';
import { useUser } from '../components/UserProvider';
import { functions } from '../lib/firebase';
import ListPagingHeader from '../components/SearchPage/ListPagingHeader';
import Image from 'next/image';
import SearchLoadingScreen from '../components/SearchPage/SearchLoadingScreen';

export default function Search({ props }) {
  const router = useRouter();
  const user = useUser();
  const [searchResponse, setSearchResponse] =
    useState<SearchFunctionResponseDto>({
      hits: 0,
    });
  const [executeCallable, executing, error] = useHttpsCallable<
    SearchFunctionRequestDto,
    SearchFunctionResponseDto
  >(functions, 'searchFunction');
  const [compareModeOn, setCompareModeOn] = useState(false);
  const [compareProductIndex, setCompareProductIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeFilters, setActiveFilters] = useState<SearchFunctionFiltersDto>({
    region: 'UK',
    labels: [],
  });

  useEffect(() => {
    if (router.isReady) {
      if (router.query.q && router.query.q !== searchResponse.query) {
        // setCompareModeOn(!!router.query.choice);
        const req: SearchFunctionRequestDto = {
          query: router.query.q as string,
          sort: router.query.sort as string,
          filters: activeFilters,
        };
        handleSearch(
          req,
          router.query.choice ? Number(router.query.choice) - 1 : 0
        );
      } else if (
        router.query.choice &&
        Number(router.query.choice) - 1 !== compareProductIndex
      ) {
        setCompareModeOn(true);
        setCompareProductIndex(Number(router.query.choice) - 1);
      } else if (!router.query.choice) {
        setCompareModeOn(false);
      }
    }
  }, [router.isReady, router.query, router.pathname]);

  const handleRemoveCompareMode = () => {
    setCompareProductIndex(0);
    setCompareModeOn(false);
    router.replace(
      `/search?q=${encodeURIComponent(
        (router.query.q as string).trim()
      ).replace(/[%20]+/g, '+')}`
    );
  };

  const handleProductSelect = (index: number) => {
    setCompareProductIndex(index);
    setCompareModeOn(true);
    router.replace(
      `/search?q=${encodeURIComponent(
        (router.query.q as string).trim()
      ).replace(/[%20]+/g, '+')}${
        searchResponse.sort === 'price' ? '&sort=price' : ''
      }&choice=${index + 1}`
    );
  };

  const handleChangePage = (page: number) => {
    handleSearch({
      query: searchResponse.query,
      sort: searchResponse.sort,
      page,
      pageSize: searchResponse.pageSize,
      filters: activeFilters,
    });
  };

  const handleSearch = async (
    request: SearchFunctionRequestDto,
    indexViaPath?: number
  ): Promise<SearchFunctionResponseDto> => {
    console.log('searching...');
    try {
      setLoading(true);
      let result = await executeCallable({
        ...request,
        page: indexViaPath ? Math.floor(indexViaPath / 10) : request.page,
        pageSize: 10,
      });
      setSearchResponse(result.data);
      router.replace(
        `/search?q=${encodeURIComponent(
          (router.query.q as string).trim()
        ).replace(/[%20]+/g, '+')}${
          request.sort === 'price' ? '&sort=price' : ''
        }${
          indexViaPath || compareModeOn
            ? `&choice=${
                indexViaPath && indexViaPath <= result.data.hits
                  ? indexViaPath + 1
                  : 1
              }`
            : ''
        }`
      );
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

  return (
    <>
      <Head>
        <title>Search | Give Me Choice</title>
      </Head>

      <div
        id="search-page"
        className="flex h-full w-full divide-x-1.5 divide-secondary-dark-10 border-t-1.5 border-secondary-dark-10"
      >
        <div
          id="choice-bar-container"
          className="max-h-full w-1/3 overflow-y-auto xl:w-1/4"
        >
          <SearchChoiceBar
            loading={loading || executing}
            searchResponse={searchResponse}
            compareModeOn={compareModeOn}
            removeCompareMode={handleRemoveCompareMode}
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
            onSearch={handleSearch}
          />
        </div>

        <div
          id="search-product-container"
          className="flex min-h-screen w-2/3 flex-col justify-between border-b-1.5 border-secondary-dark-10 bg-secondary from-gmc-ocean-light-50 via-primary-light-50 to-gmc-surf-light-50 xl:w-3/4"
        >
          {loading || executing ? (
            <SearchLoadingScreen />
          ) : (
            <div
              id="search-products"
              className="flex max-h-full w-full flex-wrap items-start justify-start overflow-y-auto overflow-x-hidden"
            >
              {compareModeOn ? (
                <ComparableProduct
                  product={
                    searchResponse.data[
                      compareProductIndex % searchResponse.pageSize
                    ]
                  }
                  index={compareProductIndex}
                  isFirst={compareProductIndex % searchResponse.pageSize === 0}
                  isLast={
                    (compareProductIndex % searchResponse.pageSize) + 1 ===
                    searchResponse.data.length
                  }
                  nextProduct={() =>
                    handleProductSelect(compareProductIndex + 1)
                  }
                  prevProduct={() =>
                    handleProductSelect(compareProductIndex - 1)
                  }
                />
              ) : (
                searchResponse.data && (
                  <>
                    <ListPagingHeader
                      searchResponse={searchResponse}
                      nextPage={() => handleChangePage(searchResponse.page + 1)}
                      prevPage={() => handleChangePage(searchResponse.page - 1)}
                      firstPage={() => handleChangePage(0)}
                      lastPage={() =>
                        handleChangePage(
                          Math.ceil(
                            searchResponse.hits / searchResponse.pageSize
                          ) - 1
                        )
                      }
                    />
                    {searchResponse.data.map((product, i) => (
                      <ListProduct
                        key={i}
                        index={
                          i + searchResponse.page * searchResponse.pageSize
                        }
                        product={product}
                        selectProduct={() =>
                          handleProductSelect(
                            i + searchResponse.page * searchResponse.pageSize
                          )
                        }
                      />
                    ))}
                    <ListPagingHeader
                      searchResponse={searchResponse}
                      nextPage={() => handleChangePage(searchResponse.page + 1)}
                      prevPage={() => handleChangePage(searchResponse.page - 1)}
                      firstPage={() => handleChangePage(0)}
                      lastPage={() =>
                        handleChangePage(
                          Math.ceil(
                            searchResponse.hits / searchResponse.pageSize
                          ) - 1
                        )
                      }
                    />
                  </>
                )
              )}
            </div>
          )}
          {!loading && !executing && <SearchMarquee />}
        </div>
      </div>
    </>
  );
}
