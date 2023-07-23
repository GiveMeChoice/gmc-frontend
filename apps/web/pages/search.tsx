import { SearchFunctionRequestDto, SearchFunctionResponseDto } from 'gmc-types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useHttpsCallable } from 'react-firebase-hooks/functions';
import ComparableProduct from '../components/SearchPage/ComparableProduct';
import LeadListProduct from '../components/SearchPage/LeadListProduct';
import SearchChoiceBar from '../components/SearchPage/SearchChoiceBar';
import { functions } from '../lib/firebase';

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
        className="fixed mt-24 flex h-full w-full divide-x-1.5 divide-black pb-28"
      >
        <div id="choice-bar-container" className="h-full w-1/4 overflow-y-auto">
          <SearchChoiceBar
            loading={loading || executing}
            searchResponse={searchResponse}
            compareModeOn={compareModeOn}
            onCompareModeChange={handleSetCompareMode}
            onSearch={handleSearch}
          />
        </div>
        <div
          id="search-product-container"
          className="flex h-full w-3/4 flex-wrap overflow-y-auto"
        >
          {loading || executing ? (
            <div className="flex h-full items-center justify-center">
              Loading animation... ?
            </div>
          ) : (
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
                  {searchResponse.data.length &&
                    searchResponse.data.map((product, i) => (
                      <LeadListProduct
                        key={i}
                        index={i}
                        product={product}
                        selectProduct={() => handleProductSelect(i)}
                      />
                    ))}
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
