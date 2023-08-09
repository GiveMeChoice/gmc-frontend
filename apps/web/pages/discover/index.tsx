import Head from 'next/head';
import DiscoverFooter from '../../components/DiscoverFooter';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Give Me Choice</title>
      </Head>

      <div className="fixed h-full w-full">
        <div
          id="search-result-container"
          className="flex h-full w-full flex-col px-3 pt-1 dark:border-white md:flex-row md:border-x-0 md:px-0"
        >
          DISCOVERY SECTION
        </div>
        <DiscoverFooter />
      </div>
    </>
  );
}
