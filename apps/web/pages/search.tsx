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
import LoadingMarquee from '../components/SearchPage/LoadingMarquee';
import SearchChoiceBar from '../components/SearchPage/SearchChoiceBar';
import SearchMarquee from '../components/SearchPage/SearchMarquee';
import { useUser } from '../components/UserProvider';
import { functions } from '../lib/firebase';

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
    console.log(router);
    console.log(JSON.stringify(router.query));
    if (router.isReady) {
      if (router.query.q && router.query.q !== searchResponse.query) {
        // setCompareModeOn(!!router.query.choice);
        const req: SearchFunctionRequestDto = {
          query: router.query.q as string,
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
    window.scroll(0, 0);
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
      ).replace(/[%20]+/g, '+')}&choice=${index + 1}`
    );
  };

  const handleSearch = async (
    request: SearchFunctionRequestDto,
    index?: number
  ): Promise<SearchFunctionResponseDto> => {
    console.log('searching...');
    try {
      setLoading(true);
      let result = await executeCallable({
        ...request,
        pageSize: 12,
      });
      // setCompareProductIndex(index && index < result.data.hits - 1 ? index : 0);
      setSearchResponse(result.data);
      router.replace(
        `/search?q=${encodeURIComponent(
          (router.query.q as string).trim()
        ).replace(/[%20]+/g, '+')}${
          index || compareModeOn
            ? `&choice=${index && index <= result.data.hits ? index + 1 : 1}`
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
        className="fixed flex h-full w-full divide-x-1.5 divide-secondary-dark-10 pb-24"
      >
        <div
          id="choice-bar-container"
          className="h-full w-1/3 overflow-y-auto xl:w-1/4"
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
          className="flex min-h-full w-2/3 flex-wrap overflow-y-auto bg-secondary from-gmc-ocean-light-50 via-primary-light-50 to-gmc-surf-light-50 xl:w-3/4"
        >
          {loading || executing ? (
            <div className="background-animate boder-1.5 flex aspect-video h-full w-full flex-col items-center justify-evenly rounded-sm border-zinc-800 bg-gradient-to-r from-gmc-surf via-primary to-gmc-sunset">
              <LoadingMarquee />
              <div className="rounded-full border-1.5 border-black p-6">
                <img
                  className="h-28 w-28 rounded-full"
                  src="/img/GMC_G_black.svg"
                />
              </div>
              <LoadingMarquee />
            </div>
          ) : (
            // </div>
            <>
              {compareModeOn ? (
                <ComparableProduct
                  product={searchResponse.data[compareProductIndex]}
                  index={compareProductIndex}
                  isLast={
                    compareProductIndex + 1 === searchResponse.data.length
                  }
                  nextProduct={() =>
                    handleProductSelect(compareProductIndex + 1)
                  }
                  prevProduct={() =>
                    handleProductSelect(compareProductIndex - 1)
                  }
                />
              ) : (
                <>
                  {searchResponse.data &&
                    searchResponse.data.map((product, i) => (
                      <ListProduct
                        key={i}
                        index={i}
                        product={product}
                        blur={!user.user && i > 9}
                        isLast={i === searchResponse.data.length - 1}
                        selectProduct={() => handleProductSelect(i)}
                      />
                    ))}
                </>
              )}
              <div className="flex h-[200px] w-full items-center border-t-1.5 bg-secondary"></div>
              <div className="w-full pt-4">
                <SearchMarquee />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
