import Head from 'next/head';
import DiscoverFooter from '../components/DiscoverFooter';
import ShopLayout from '../components/Shop/ShopLayout';

export default function Home() {
  return (
    <>
      <Head>
        <title>404 | Give Me Choice</title>
      </Head>
      <ShopLayout>
        <div className="mb-10 flex h-full flex-col items-center justify-between">
          <div className="flex h-1/2 w-full flex-col items-center justify-center">
            <span className="text-[54px] font-bold">404</span>
            <span className="text-lg">Page Not Found</span>
          </div>
          <DiscoverFooter />
        </div>
      </ShopLayout>
    </>
  );
}
