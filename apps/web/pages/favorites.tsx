import Head from 'next/head';
import DiscoverFooter from '../components/DiscoverFooter';

export default function Favorites() {
  return (
    // <div className="flex min-h-screen flex-col items-center justify-center py-2">
    <>
      <Head>
        <title>Favorites | Give Me Choice</title>
      </Head>

      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center ">
        <div className="mb-20 flex w-full justify-center">My Favorites</div>
        <DiscoverFooter />
      </div>
    </>
  );
}
