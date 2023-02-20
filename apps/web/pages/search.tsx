import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useHttpsCallable } from 'react-firebase-hooks/functions';
import SearchBar from '../components/SearchBar';
import { functions } from '../lib/firebase';
import { elasticMessage } from 'search/elastic-client';

export default function Search({ props }) {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [executeCallable, executing, error] = useHttpsCallable(
    functions,
    'searchFunction'
  );

  useEffect(() => {
    if (router.isReady) {
      console.log('query: ', router.query);
      executeSearch();
    }
  }, [router.isReady, router.query]);

  const executeSearch = async () => {
    setData(null);
    let result = await executeCallable({ query: router.query.q });
    setData(result.data.hits?.hits);
  };

  return (
    <>
      <Head>
        <title>Search | Give Me Choice</title>
      </Head>

      <div className="pt fixed h-full w-full">
        <div className="mb-2 flex w-full justify-center pl-4">
          <div className="w-1/2">
            <SearchBar />
          </div>
        </div>

        <div
          id="search-result-container"
          className="flex h-full w-full flex-col border-secondary-dark-10 border-opacity-90 md:flex-row"
        >
          <div
            id="search-summary"
            className="border-t-2 border-r-2 md:w-1/3 xl:w-1/4"
          >
            filters and sech
            {JSON.stringify(elasticMessage)}
          </div>
          <div id="search-products" className="border-t-2 md:w-2/3 xl:w-3/4">
            products
            <p>
              {error && <strong>Error: {JSON.stringify(error)}</strong>}
              {executing && <span>Function executing...</span>}
              {data && <span>{JSON.stringify(data)}</span>}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
