import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useHttpsCallable } from 'react-firebase-hooks/functions';
import { functions } from '../lib/firebase';

export default function Search({ props }) {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [executeCallable, executing, error] = useHttpsCallable(
    functions,
    'search'
  );

  useEffect(() => {
    if (router.isReady) {
      console.log('query: ', router.query);
      executeSearch();
    }
  }, [router.isReady]);

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

      <div className="fixed border-t-2 border-secondary-dark-10 pt-16">
        <p>
          {error && <strong>Error: {JSON.stringify(error)}</strong>}
          {executing && <span>Function executing...</span>}
          {data && <span>{JSON.stringify(data)}</span>}
        </p>
      </div>
    </>
  );
}
