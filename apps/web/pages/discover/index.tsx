import Head from 'next/head';
import DiscoverFooter from '../../components/DiscoverFooter';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Give Me Choice</title>
      </Head>

      <div
        id="discover-container"
        className="flex h-screen w-full flex-col justify-between"
      >
        <div className="flex h-full w-full items-center justify-center">
          <span className="text-6xl">DISCOVER PAGE</span>
        </div>
      </div>
    </>
  );
}
