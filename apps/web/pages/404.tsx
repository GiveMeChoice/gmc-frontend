import Head from 'next/head';
import DiscoverFooter from '../components/DiscoverFooter';
import GiveMeBar from '../components/GiveMeBar';

export default function Home() {
  return (
    // <div className="flex min-h-screen flex-col items-center justify-center py-2">
    <>
      <Head>
        <title>404 | Give Me Choice</title>
      </Head>

      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center ">
        <div className="mb-20 flex w-full justify-center">Page Not Found</div>
        <DiscoverFooter />
      </div>
    </>
  );
}
