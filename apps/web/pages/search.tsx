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
import SearchChoiceBar from '../components/SearchPage/SearchChoiceBar';
import { functions } from '../lib/firebase';
import LoadingMarquee from '../components/SearchPage/LoadingMarquee';

export default function Search({ props }) {
  const router = useRouter();
  const [searchResponse, setSearchResponse] =
    useState<SearchFunctionResponseDto>({
      hits: 0,
    });
  const [executeCallable, executing, error] = useHttpsCallable<
    SearchFunctionRequestDto,
    SearchFunctionResponseDto
  >(functions, 'searchFunction');
  const [compareModeOn, setCompareModeOn] = useState(false);
  const [compareProductIndex, setCompareProductIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<SearchFunctionFiltersDto>({
    region: 'UK',
    labels: [],
  });

  useEffect(() => {
    console.log('effect!');
    if (router.isReady) {
      setCompareModeOn(false);
      const req: SearchFunctionRequestDto = {
        query: router.query.q as string,
        filters: activeFilters,
      };
      handleSearch(req);
    }
  }, [router.isReady, router.query]);

  const handleSetCompareMode = (on: boolean) => {
    window.scroll(0, 0);
    setCompareProductIndex(0);
    setCompareModeOn(on);
  };

  const handleProductSelect = (index: number) => {
    setCompareProductIndex(index);
    setCompareModeOn(true);
  };

  const handleSearch = async (
    request: SearchFunctionRequestDto
  ): Promise<SearchFunctionResponseDto> => {
    try {
      setLoading(true);
      let result = await executeCallable(request);
      console.log('search result: ', result);
      setCompareProductIndex(0);
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

  return (
    <>
      <Head>
        <title>Search | Give Me Choice</title>
      </Head>

      <div
        id="search-page"
        className="fixed mt-24 flex h-full w-full divide-x-1.5 divide-secondary-dark-10 pb-24"
      >
        <div id="choice-bar-container" className="h-full w-1/4 overflow-y-auto">
          <SearchChoiceBar
            loading={loading || executing}
            searchResponse={searchResponse}
            compareModeOn={compareModeOn}
            onCompareModeChange={handleSetCompareMode}
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
            onSearch={handleSearch}
          />
        </div>
        <div
          id="search-product-container"
          className="flex h-full w-3/4 flex-wrap overflow-y-auto"
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
                    setCompareProductIndex(compareProductIndex + 1)
                  }
                  prevProduct={() =>
                    setCompareProductIndex(compareProductIndex - 1)
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
                        selectProduct={() => handleProductSelect(i)}
                      />
                    ))}
                  <div />
                  <div />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
