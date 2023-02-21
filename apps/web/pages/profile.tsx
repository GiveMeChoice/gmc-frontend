import Head from 'next/head';
import DiscoverFooter from '../components/DiscoverFooter';
import SearchBar from '../components/SearchBar';

export default function Home() {
  return (
    // <div className="flex min-h-screen flex-col items-center justify-center py-2">
    <>
      <Head>
        <title>Profile | Give Me Choice</title>
      </Head>

      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center ">
        <div className="mb-20 flex w-full justify-center">
          USER PROFILE PAGE
        </div>
        <DiscoverFooter />
      </div>
    </>
  );
}
