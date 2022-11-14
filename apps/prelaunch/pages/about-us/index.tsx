import Head from 'next/head';
import { Button } from 'ui';

export default function Blog({ allPosts: initialAllPosts, preview }) {
  return (
    <div>
      <Head>
        <title>Give Me Choice - About Us</title>
      </Head>
      <div>
        <h1 className="text-3xl">About Us</h1>
        <Button />
      </div>
    </div>
  );
}
