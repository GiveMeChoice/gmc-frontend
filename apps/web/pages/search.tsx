import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useHttpsCallable } from 'react-firebase-hooks/functions';
import SearchBar from '../components/SearchBar';
import { functions } from '../lib/firebase';
import { SearchRequest, SearchResult } from 'search/function';
import { ProductEntity } from 'search/product';
import Product from '../components/Product';
import Image from 'next/image';
import ProductDetail from '../components/ProductDetail';

export default function Search({ props }) {
  const router = useRouter();
  const [searchResult, setSearchResult] = useState<SearchResult>(null);
  const [executeCallable, executing, error] = useHttpsCallable<
    SearchRequest,
    SearchResult
  >(functions, 'searchFunction');
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);

  useEffect(() => {
    if (router.isReady) {
      console.log('query: ', router.query);
      console.log(functions.region);
      executeSearch();
    }
  }, [router.isReady, router.query]);

  const executeSearch = async () => {
    setSearchResult(null);
    setSelectedProductIndex(null);
    try {
      let result = await executeCallable({ query: router.query.q as string });
      setSearchResult(result.data);
      console.log(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const selectProduct = (index: number) => {
    setSelectedProductIndex(index);
  };

  const unselectProduct = () => {
    setSelectedProductIndex(null);
  };

  const nextProduct = () => {
    setSelectedProductIndex(selectedProductIndex + 1);
  };

  const prevProduct = () => {
    setSelectedProductIndex(selectedProductIndex - 1);
  };

  return (
    <>
      <Head>
        <title>Search | Give Me Choice</title>
      </Head>

      <div className="fixed h-full w-full">
        <div className="mb-2 flex h-24 w-full justify-center pl-4">
          <div className="w-1/2">
            <SearchBar />
          </div>
        </div>

        <div
          id="search-result-container"
          className="flex h-full w-full flex-col border-x-2 border-black px-3 md:flex-row md:border-x-0 md:px-0"
        >
          <div
            id="search-summary"
            className="border-black md:w-1/3 md:border-t-2 md:border-r-2 xl:w-1/4"
          >
            {executing && <span>Searching...</span>}
            {searchResult && (
              <>
                <div className="flex w-full p-4">
                  <span
                    className="cursor-pointer text-2xl hover:underline active:text-gmc-berry"
                    onClick={unselectProduct}
                  >
                    {`${searchResult.hits.total.value} Results`}
                  </span>
                </div>
                <div className="mt-20 flex items-center gap-4 p-4">
                  <Image
                    draggable={false}
                    src="/img/filters-icon.png"
                    alt="Filters Icon"
                    height={24}
                    width={24}
                  />
                  <span className="text-lg">Filters</span>
                </div>
              </>
            )}
          </div>
          <div
            id="search-products"
            className="flex h-full flex-wrap overflow-y-auto border-t-2 border-black pb-32 md:w-2/3 xl:w-3/4"
          >
            {executing && <span>Function executing...</span>}
            {searchResult &&
              (selectedProductIndex != null ? (
                <ProductDetail
                  index={selectedProductIndex}
                  product={searchResult.hits.hits[selectedProductIndex]._source}
                  isLast={
                    selectedProductIndex + 1 == searchResult.hits.hits.length
                  }
                  nextProduct={nextProduct}
                  prevProduct={prevProduct}
                />
              ) : (
                searchResult.hits.hits.map((product, i) => (
                  <div className="flex w-full border-r-2 border-b-2 border-l-2 border-black md:border-l-0 xl:w-1/2">
                    <Product
                      key={i}
                      index={i}
                      product={product._source}
                      selectProduct={selectProduct}
                    />
                  </div>
                ))
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
